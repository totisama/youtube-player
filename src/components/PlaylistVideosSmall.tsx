import { useEffect, useState } from 'react'
import { VideoDB } from '../types'
import { supabase } from '../utils/supabase'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PlaylistVideos = styled.div`
  margin-top: 25px;
  width: 50%;
  height: 500px;
  background-color: #1c1c1c;
  padding: 10px 15px 20px 15px;
  scrollbar-width: thin;
  overflow-y: scroll;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

const PlaylistTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin: 15px 0px;
  color: #ff0000;
  font-size: 36px;
  text-align: center;
`

const Video = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0px;
  padding: 10px;
  background-color: #2c2c2c;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  &:hover {
    background-color: #3c3c3c;
  }
`

const VideoImage = styled.img`
  min-width: 300px;
  height: 150px;
  border-radius: 10px;
  object-fit: contain;
`

const VideoTitle = styled.h2`
  font-size: 20px;
  margin: 0px;
  color: white;
`

export const PlaylistVideosSmall = ({ playlistId }: { playlistId: number }) => {
  const [videos, setVideos] = useState<VideoDB[] | []>([])

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      const { error, data } = await supabase
        .from('playlist_video')
        .select('video ( id, video_id, title, thumbnail_url )')
        .eq('playlist_id', playlistId)

      if (error || !data || data.length === 0) {
        setVideos([])
        return
      }
      const videosTyped = data as unknown as { video: VideoDB }[]

      const dbVideos = videosTyped.map((video) => ({
        id: video.video.id,
        video_id: video.video.video_id,
        title: video.video.title,
        thumbnail_url: video.video.thumbnail_url,
      }))

      setVideos(dbVideos)
    }

    fetchPlaylistVideos()
  }, [playlistId])

  return (
    <PlaylistVideos>
      <PlaylistTitle>Playlist Videos</PlaylistTitle>
      {videos.map((video) => {
        return (
          <Video
            key={video.id}
            to={`/detail/${video.video_id}?playlistId=${playlistId}`}
          >
            <VideoImage src={video.thumbnail_url} alt={video.title} />
            <VideoTitle>{video.title}</VideoTitle>
          </Video>
        )
      })}
    </PlaylistVideos>
  )
}
