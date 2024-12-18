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
  shouldDisplay: boolean
  setShouldDisplay: (value: boolean) => void
  url: string
  setUrl: (value: string) => void
  currentMinute: number
  setCurrentMinute: (value: number) => void
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

export interface MinimizeButtonProps {
  isMinimized: boolean
  onClick: () => void
}

export interface CloseButtonProps {
  onClick: () => void
}

export interface PlaylistRespose {
  playlists: VideoPlaylist[]
}

export interface PlaylistVideo {
  videoId: string | undefined
  title: string | undefined
  thumbnailUrl: string | undefined
}

export interface VideoPlaylist {
  name: string
  id: string
  userId: string
  videos: PlaylistVideo[]
}
