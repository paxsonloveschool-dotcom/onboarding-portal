import { NextRequest, NextResponse } from 'next/server';
import { fetchVideos, fetchChannel, searchYouTube } from '@/lib/youtube';
import { getUniqueVideoIds } from '@/lib/video-library';

// GET /api/youtube — Fetch all library videos, or specific IDs, or search
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'library';
  const ids = searchParams.get('ids');
  const query = searchParams.get('q');
  const channelId = searchParams.get('channelId');

  try {
    switch (action) {
      case 'library': {
        // Fetch all videos from the master library
        const videoIds = ids ? ids.split(',') : getUniqueVideoIds();
        const videos = await fetchVideos(videoIds);
        return NextResponse.json({ videos, count: videos.length });
      }

      case 'search': {
        if (!query) {
          return NextResponse.json({ error: 'Missing ?q= parameter' }, { status: 400 });
        }
        const results = await searchYouTube(query, 20);
        return NextResponse.json({ results, count: results.length });
      }

      case 'channel': {
        if (!channelId) {
          return NextResponse.json({ error: 'Missing ?channelId= parameter' }, { status: 400 });
        }
        const channel = await fetchChannel(channelId);
        if (!channel) {
          return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
        }
        return NextResponse.json({ channel });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error: any) {
    const message = error?.message || 'Unknown error';

    // Specific guidance for missing API key
    if (message.includes('YOUTUBE_API_KEY')) {
      return NextResponse.json({
        error: 'YouTube API key not configured',
        setup: {
          step1: 'Go to https://console.cloud.google.com',
          step2: 'Create project → Enable "YouTube Data API v3"',
          step3: 'Create an API key',
          step4: 'Add YOUTUBE_API_KEY=your_key_here to .env.local',
          step5: 'Restart the dev server',
        },
      }, { status: 503 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
