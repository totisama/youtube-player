import { useRef, useState } from 'react'
import { PlaylistContext } from '../contexts/PlaylistContext'
import { PlaylistVideo, VideoPlaylist } from '../../types/types'
import { getPlaylist } from '../playlist'

interface SearchProps {
  children: React.ReactNode
}

export const PlaylistProvider = ({ children }: SearchProps) => {
  const [currentPlaylist, setCurretPlaylist] = useState<VideoPlaylist | null>(
    null
  )
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videos = useRef<PlaylistVideo[]>([])

  const updatePlaylist = async (playlistId: string, videoId: string | null) => {
    const data = await getPlaylist(playlistId)

    if (!data) {
      console.error('Failed to get playlist')
      return
    }

    if (videoId) {
      const videoIndex = videos.current.findIndex(
        (video) => video.videoId === videoId
      )

      setCurrentVideoIndex(videoIndex)
    }

    videos.current = data.videos
    setCurretPlaylist(data)
  }

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.current.length
    setCurrentVideoIndex(nextIndex)

    return videos.current[nextIndex]
  }

  const changeToVideo = (videoId: string) => {
    const videoIndex = videos.current.findIndex(
      (video) => video.videoId === videoId
    )

    if (videoIndex === -1) {
      console.error('Video not found')
      return
    }

    setCurrentVideoIndex(videoIndex)
  }

  return (
    <PlaylistContext.Provider
      value={{
        currentPlaylist,
        videos: videos.current,
        updatePlaylist,
        nextVideo,
        changeToVideo,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}
