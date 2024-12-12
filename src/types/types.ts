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

export interface SearchContextType {
  search: string
  setSearch: (seconds: string) => void
}
