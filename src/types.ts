export interface GeneralVideo {
  id: ID
  url: string
  title: string
  channelName: string
  description: string
  durationRaw: string
  snippet: Snippet
  views: string
}

interface ID {
  videoID: string
}

interface Snippet {
  url: string
  duration: string
  publishedAt: string
  thumbnails: Thumbnails
  title: string
  views: string
}

interface Thumbnails {
  id: string
  url: string
  height: number
  width: number
}

export interface Video {
  videoId: string
  url: string
  title: string
  description: string
  owner: string
  channelId: string
  thumbnailUrl: string
  datePublished: Date
  genre: string
  paid: boolean
  unlisted: boolean
  isFamilyFriendly: boolean
  duration: number
  views: number
  regionsAllowed: string[]
  likeCount: number
}

export interface CurrentVideoContextType {
  currentSeconds: number
  setCurrentSeconds: (seconds: number) => void
}

export interface CurrentVideoProps {
  children: React.ReactNode
}

export interface YouTubeVideoProps {
  videoId: string
  width: number
  height: number
}
