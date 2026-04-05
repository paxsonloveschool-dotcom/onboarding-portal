'use client';

import { useState, useEffect, useCallback } from 'react';
import { VIDEO_LIBRARY, getCategories, getUniqueVideoIds, INFLUENCES } from '@/lib/video-library';
import { parseDuration, formatCount } from '@/lib/youtube';
import type { YouTubeVideo } from '@/lib/youtube';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error' | 'no-key';

interface ApiError {
  error: string;
  setup?: Record<string, string>;
}

export default function LibraryPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [error, setError] = useState<ApiError | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterInfluence, setFilterInfluence] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [sortBy, setSortBy] = useState<'title' | 'views' | 'date'>('date');

  const categories = ['All', ...getCategories()];
  const influences = ['All', ...Array.from(new Set(VIDEO_LIBRARY.map(v => v.influence)))];

  const fetchLibrary = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('/api/youtube?action=library');
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 503) {
          setStatus('no-key');
          setError(data);
        } else {
          setStatus('error');
          setError(data);
        }
        return;
      }

      setVideos(data.videos);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setError({ error: err.message || 'Failed to fetch' });
    }
  }, []);

  // Get library entries matching filters
  const libraryEntries = VIDEO_LIBRARY.filter(entry => {
    if (filterCategory !== 'All' && entry.category !== filterCategory) return false;
    if (filterInfluence !== 'All' && entry.influence !== filterInfluence) return false;
    return true;
  });

  // Match with fetched video data
  const enrichedVideos = libraryEntries
    .map(entry => {
      const video = videos.find(v => v.id === entry.id);
      return { entry, video };
    })
    .filter(({ video, entry }) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      if (video) {
        return video.title.toLowerCase().includes(q) || video.description.toLowerCase().includes(q) || video.channelTitle.toLowerCase().includes(q);
      }
      return entry.id.includes(q) || entry.influence.toLowerCase().includes(q) || (entry.notes || '').toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (!a.video || !b.video) return 0;
      switch (sortBy) {
        case 'views': return b.video.viewCount - a.video.viewCount;
        case 'date': return new Date(b.video.publishedAt).getTime() - new Date(a.video.publishedAt).getTime();
        case 'title': return a.video.title.localeCompare(b.video.title);
        default: return 0;
      }
    });

  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);
  const totalLikes = videos.reduce((sum, v) => sum + v.likeCount, 0);
  const uniqueChannels = new Set(videos.map(v => v.channelTitle)).size;

  return (
    <div className="text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
            Video Library
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {getUniqueVideoIds().length} videos from {INFLUENCES.length} influences — YouTube Data API v3
          </p>
        </div>
        <button
          onClick={fetchLibrary}
          disabled={status === 'loading'}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg text-sm font-medium hover:from-red-500 hover:to-yellow-500 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Fetching...' : status === 'success' ? 'Refresh' : 'Fetch All Videos'}
        </button>
      </div>

      {/* API Status */}
      {status === 'no-key' && error?.setup && (
        <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-5">
          <h2 className="text-lg font-bold text-yellow-400 mb-3">YouTube API Key Required</h2>
          <p className="text-sm text-gray-400 mb-4">
            The YouTube Data API v3 is the only path that works in this environment (googleapis.com bypasses the proxy).
          </p>
          <div className="space-y-2">
            {Object.entries(error.setup).map(([step, instruction]) => (
              <div key={step} className="flex items-start gap-3">
                <span className="text-yellow-400 text-sm font-mono w-12 shrink-0">{step}</span>
                <span className="text-sm text-gray-300">{instruction}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 font-mono">
              # Add to .env.local in project root:<br />
              YOUTUBE_API_KEY=AIza...your_key_here
            </p>
          </div>
        </div>
      )}

      {status === 'error' && !error?.setup && (
        <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-4">
          <p className="text-sm text-red-400">{error?.error || 'Unknown error'}</p>
        </div>
      )}

      {/* Stats (when loaded) */}
      {status === 'success' && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
            <p className="text-2xl font-bold text-purple-400">{videos.length}</p>
            <p className="text-xs text-gray-500">Videos Loaded</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
            <p className="text-2xl font-bold text-blue-400">{uniqueChannels}</p>
            <p className="text-xs text-gray-500">Channels</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
            <p className="text-2xl font-bold text-green-400">{formatCount(totalViews)}</p>
            <p className="text-xs text-gray-500">Total Views</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
            <p className="text-2xl font-bold text-red-400">{formatCount(totalLikes)}</p>
            <p className="text-xs text-gray-500">Total Likes</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
            <p className="text-2xl font-bold text-yellow-400">{getCategories().length}</p>
            <p className="text-xs text-gray-500">Categories</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
        />
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 py-1 mr-1">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2 py-1 rounded text-xs transition ${
                  filterCategory === cat ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 py-1 mr-1">Influence:</span>
            {influences.map(inf => (
              <button
                key={inf}
                onClick={() => setFilterInfluence(inf)}
                className={`px-2 py-1 rounded text-xs transition ${
                  filterInfluence === inf ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {inf}
              </button>
            ))}
          </div>
          {status === 'success' && (
            <div className="flex gap-1">
              <span className="text-xs text-gray-500 py-1 mr-1">Sort:</span>
              {(['date', 'views', 'title'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-2 py-1 rounded text-xs transition ${
                    sortBy === s ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {enrichedVideos.map(({ entry, video }) => (
          <button
            key={entry.id}
            onClick={() => video && setSelectedVideo(selectedVideo?.id === video.id ? null : video)}
            className={`text-left bg-gray-900 rounded-xl border overflow-hidden hover:border-purple-500/30 transition ${
              selectedVideo?.id === entry.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-800'
            }`}
          >
            {/* Thumbnail */}
            {video?.thumbnailUrl ? (
              <div className="relative aspect-video bg-gray-800">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  {parseDuration(video.duration)}
                </span>
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl text-gray-600">▶</span>
                  <p className="text-[10px] text-gray-600 mt-1 font-mono">{entry.id}</p>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-white line-clamp-2">
                {video?.title || entry.notes || entry.id}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-gray-500">
                  {video?.channelTitle || entry.influence}
                </span>
                {video && (
                  <span className="text-[10px] text-gray-600">
                    {formatCount(video.viewCount)} views
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-500">{entry.category}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-500">{entry.influence}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {enrichedVideos.length === 0 && (
        <p className="text-center text-gray-600 py-8">No videos match your filters.</p>
      )}

      {/* Selected Video Detail */}
      {selectedVideo && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 mr-4">
              <h2 className="text-lg font-bold text-white">{selectedVideo.title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">{selectedVideo.channelTitle}</span>
                <span className="text-xs text-gray-600">{new Date(selectedVideo.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-red-600 rounded-lg text-xs font-medium hover:bg-red-500 transition shrink-0"
            >
              Watch on YouTube
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="bg-gray-800 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-white">{formatCount(selectedVideo.viewCount)}</p>
              <p className="text-[10px] text-gray-500">Views</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-white">{formatCount(selectedVideo.likeCount)}</p>
              <p className="text-[10px] text-gray-500">Likes</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-white">{formatCount(selectedVideo.commentCount)}</p>
              <p className="text-[10px] text-gray-500">Comments</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-white">{parseDuration(selectedVideo.duration)}</p>
              <p className="text-[10px] text-gray-500">Duration</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Description:</p>
            <p className="text-xs text-gray-400 whitespace-pre-wrap max-h-40 overflow-y-auto">
              {selectedVideo.description || 'No description available.'}
            </p>
          </div>

          {/* Tags */}
          {selectedVideo.tags.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Tags:</p>
              <div className="flex flex-wrap gap-1">
                {selectedVideo.tags.slice(0, 20).map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400">{tag}</span>
                ))}
                {selectedVideo.tags.length > 20 && (
                  <span className="text-[10px] text-gray-600">+{selectedVideo.tags.length - 20} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Influences Reference */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Influences</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {INFLUENCES.map(inf => (
            <div key={inf.name} className="bg-gray-900 rounded-lg border border-gray-800 p-3">
              <h3 className="text-sm font-bold text-white">{inf.name}</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">{inf.role}</p>
              {inf.channel && (
                <p className="text-[10px] text-purple-400 font-mono mt-1">{inf.channel}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
