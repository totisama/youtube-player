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
  default: Default
  medium: Default
  high: Default
  standard: Default
  maxres: Default
}

export interface PlaylistContextType {
  videos: PlaylistVideo[]
  updatePlaylist: (playlistId: string, videoId: string | null) => void
  currentPlaylist: VideoPlaylist | null
  nextVideo: () => PlaylistVideo
  changeToVideo: (videoId: string) => void
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

export interface PlaylistResponse {
  kind: string
  etag: string
  items: PlaylistItem[]
  pageInfo: PageInfo
}

export interface PlaylistItem {
  kind: string
  etag: string
  id: string
  snippet: PlaylistItemSnippet
  contentDetails: ContentDetails
}

export interface ContentDetails {
  videoId: string
  videoPublishedAt: Date
}

export interface PlaylistItemSnippet {
  publishedAt: Date
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  playlistId: string
  position: number
  resourceId: ResourceID
  videoOwnerChannelTitle: string
  videoOwnerChannelId: string
}

export interface ResourceID {
  kind: string
  videoId: string
}

export interface Default {
  url: string
  width: number
  height: number
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface PlaylistMetadataResponse {
  kind: string
  etag: string
  pageInfo: PageInfo
  items: PlaylistMetadataItem[]
}

export interface PlaylistMetadataItem {
  kind: string
  etag: string
  id: string
  snippet: PlaylistMetadataSnippet
}

export interface PlaylistMetadataSnippet {
  publishedAt: Date
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  defaultLanguage: string
  localized: Localized
}

export interface Localized {
  title: string
  description: string
}
