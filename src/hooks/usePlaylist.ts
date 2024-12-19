import { useContext, useEffect } from 'react'
import { PlaylistContextType } from '../types/types'
import { PlaylistContext } from '../lib/contexts/PlaylistContext'
import { useSearchParams } from 'react-router'

export const usePlaylist = ({
  playlistId,
  videoId,
}: {
  playlistId: string | undefined
  videoId: string | null
}) => {
  const [, setSearchParam] = useSearchParams()
  const { currentPlaylist, videos, updatePlaylist, nextVideo, changeToVideo } =
    useContext(PlaylistContext) as PlaylistContextType

  const changeToNextVideo = () => {
    const newVideo = nextVideo()
    setSearchParam(`videoId=${newVideo.videoId}`)
  }

  const changeVideo = (videoId: string) => {
    changeToVideo(videoId)
    videos.findIndex((video) => video.videoId === videoId)
    setSearchParam(`videoId=${videoId}`)
  }

  useEffect(() => {
    if (!playlistId) return

    updatePlaylist(playlistId, videoId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId])

  return { videos, currentPlaylist, changeToNextVideo, changeVideo }
}
