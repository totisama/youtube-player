export interface Video {
  id: ID
  url: string
  title: string
  channelName: string
  description: string
  duration_raw: string
  snippet: Snippet
  views: string
}

export interface ID {
  videoId: string
}

export interface Snippet {
  url: string
  duration: string
  publishedAt: string
  thumbnails: Thumbnails
  title: string
  views: string
}

export interface Thumbnails {
  id: string
  url: string
  height: number
  width: number
}

export interface CurrentVideoType {
  playing: boolean
  setPlaying: (value: boolean) => void
  url: string
  setUrl: (value: string) => void
  currentMinute: string
  setCurrentMinute: (value: string) => void
}

export interface IndependentVideo {
  url: string
  title: string
  description: string
  owner: string
  thumbnailUrl: string
  datePublished: Date
  genre: string
  isFamilyFriendly: boolean
  duration: number
  views: number
  likeCount: number
  dislikeCount: number
}
