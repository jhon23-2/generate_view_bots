import { type NextRequest, NextResponse } from "next/server"

interface YouTubeVideo {
  id: string
  title: string
  channelTitle: string
  publishedAt: string
  thumbnails: {
    medium: {
      url: string
      width: number
      height: number
    }
  }
  statistics: {
    viewCount: string
    likeCount: string
    commentCount: string
  }
}

interface YouTubeApiResponse {
  items: Array<{
    id: string
    snippet: {
      title: string
      channelTitle: string
      publishedAt: string
      thumbnails: {
        medium: {
          url: string
          width: number
          height: number
        }
      }
    }
    statistics: {
      viewCount: string
      likeCount: string
      commentCount: string
    }
  }>
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "YouTube API key not configured" }, { status: 500 })
    }

    // Calculate date for last week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const publishedAfter = oneWeekAgo.toISOString()

    // First, search for popular videos from last week
    const searchUrl =
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&` +
      `order=viewCount&` +
      `publishedAfter=${publishedAfter}&` +
      `type=video&` +
      `maxResults=50&` +
      `key=${apiKey}`

    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json()

    if (!searchResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch from YouTube API", details: searchData }, { status: 500 })
    }

    // Get video IDs to fetch detailed statistics
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",")

    // Fetch detailed video statistics
    const videosUrl =
      `https://www.googleapis.com/youtube/v3/videos?` + `part=snippet,statistics&` + `id=${videoIds}&` + `key=${apiKey}`

    const videosResponse = await fetch(videosUrl)
    const videosData: YouTubeApiResponse = await videosResponse.json()

    if (!videosResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch video details", details: videosData }, { status: 500 })
    }

    // Transform and sort by view count
    const videos: YouTubeVideo[] = videosData.items
      .map((item) => ({
        id: item.id,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        statistics: item.statistics,
      }))
      .sort((a, b) => Number.parseInt(b.statistics.viewCount) - Number.parseInt(a.statistics.viewCount))
      .slice(0, 20) // Top 20 most popular

    return NextResponse.json({ videos })
  } catch (error) {
    console.error("YouTube API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
