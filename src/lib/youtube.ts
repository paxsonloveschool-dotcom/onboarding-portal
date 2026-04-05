// YouTube Data API v3 client
// googleapis.com bypasses the egress proxy — only viable path in this env

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  thumbnailUrl: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  categoryId: string;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  thumbnailUrl: string;
}

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error(
      'YOUTUBE_API_KEY not set. Get one at https://console.cloud.google.com → Enable YouTube Data API v3 → Create API Key'
    );
  }
  return key;
}

// Fetch video metadata for up to 50 video IDs at once
export async function fetchVideos(videoIds: string[]): Promise<YouTubeVideo[]> {
  const apiKey = getApiKey();
  const results: YouTubeVideo[] = [];

  // YouTube API allows max 50 IDs per request
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const params = new URLSearchParams({
      part: 'snippet,statistics,contentDetails',
      id: batch.join(','),
      key: apiKey,
    });

    const res = await fetch(`${YOUTUBE_API_BASE}/videos?${params}`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`YouTube API error (${res.status}): ${error}`);
    }

    const data = await res.json();

    for (const item of data.items || []) {
      results.push({
        id: item.id,
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        channelTitle: item.snippet?.channelTitle || '',
        channelId: item.snippet?.channelId || '',
        publishedAt: item.snippet?.publishedAt || '',
        thumbnailUrl:
          item.snippet?.thumbnails?.maxres?.url ||
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          '',
        tags: item.snippet?.tags || [],
        viewCount: parseInt(item.statistics?.viewCount || '0', 10),
        likeCount: parseInt(item.statistics?.likeCount || '0', 10),
        commentCount: parseInt(item.statistics?.commentCount || '0', 10),
        duration: item.contentDetails?.duration || '',
        categoryId: item.snippet?.categoryId || '',
      });
    }
  }

  return results;
}

// Fetch channel info
export async function fetchChannel(channelId: string): Promise<YouTubeChannel | null> {
  const apiKey = getApiKey();
  const params = new URLSearchParams({
    part: 'snippet,statistics',
    id: channelId,
    key: apiKey,
  });

  const res = await fetch(`${YOUTUBE_API_BASE}/channels?${params}`);
  if (!res.ok) return null;

  const data = await res.json();
  const item = data.items?.[0];
  if (!item) return null;

  return {
    id: item.id,
    title: item.snippet?.title || '',
    description: item.snippet?.description || '',
    subscriberCount: parseInt(item.statistics?.subscriberCount || '0', 10),
    videoCount: parseInt(item.statistics?.videoCount || '0', 10),
    thumbnailUrl: item.snippet?.thumbnails?.high?.url || '',
  };
}

// Search YouTube
export async function searchYouTube(
  query: string,
  maxResults: number = 10
): Promise<{ videoId: string; title: string; channelTitle: string; publishedAt: string }[]> {
  const apiKey = getApiKey();
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: String(maxResults),
    key: apiKey,
  });

  const res = await fetch(`${YOUTUBE_API_BASE}/search?${params}`);
  if (!res.ok) return [];

  const data = await res.json();
  return (data.items || []).map((item: any) => ({
    videoId: item.id?.videoId || '',
    title: item.snippet?.title || '',
    channelTitle: item.snippet?.channelTitle || '',
    publishedAt: item.snippet?.publishedAt || '',
  }));
}

// Parse ISO 8601 duration (PT1H2M3S) to human readable
export function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h ` : '';
  const m = match[2] ? `${match[2]}m ` : '';
  const s = match[3] ? `${match[3]}s` : '';
  return `${h}${m}${s}`.trim() || '0s';
}

// Format view count
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
