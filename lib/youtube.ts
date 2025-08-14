export interface YouTubeVideo {
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

export function formatViewCount(viewCount: string): string {
  const count = Number.parseInt(viewCount)
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`
  }
  return `${count} views`
}

export function formatPublishedDate(publishedAt: string): string {
  const date = new Date(publishedAt)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return "1 day ago"
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}
