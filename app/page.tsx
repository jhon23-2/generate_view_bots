"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Eye, ThumbsUp, MessageCircle } from "lucide-react"
import { type YouTubeVideo, formatViewCount, formatPublishedDate } from "@/lib/youtube"

export default function HomePage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPopularVideos = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/youtube/popular")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch videos")
      }

      setVideos(data.videos)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularVideos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading popular videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchPopularVideos} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">YouTube Popular This Week</h1>
          <p className="text-muted-foreground text-lg">Discover the most popular videos from the past 7 days</p>
          <Button onClick={fetchPopularVideos} className="mt-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Refreshing...
              </>
            ) : (
              "Refresh Videos"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={video.thumbnails.medium.url || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, "_blank")}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                </div>
                <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-bold">
                  #{index + 1}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{video.channelTitle}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatViewCount(video.statistics.viewCount)}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {formatViewCount(video.statistics.likeCount)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {formatViewCount(video.statistics.commentCount)}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-2">{formatPublishedDate(video.publishedAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {videos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos found for this week.</p>
          </div>
        )}
      </div>
    </div>
  )
}
