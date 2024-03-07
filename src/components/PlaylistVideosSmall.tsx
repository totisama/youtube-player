import { useContext, useEffect, useState } from 'react'
import { CurrentVideoContextType, VideoDB } from '../types'
import { supabase } from '../utils/supabase'
import styled from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CurrentVideoContext } from '../context/CurrentVideo'

interface StyledVideoProps {
  currentvideo: string
}

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

const Video = styled(Link)<StyledVideoProps>`
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0px;
  padding: 25px;
  background-color: #2c2c2c;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  border: ${(props) =>
    props.currentvideo === 'true' ? '2px solid #ff0000' : 'none'};

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
  text-align: center;
`

const Current = styled.span`
  position: absolute;
  bottom: 0;
  right: 25px;
  color: #ff0000;
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;

  @media (max-width: 1000px) {
    top: 5px;
    left: 0px;
  }
`

export const PlaylistVideosSmall = ({ playlistId }: { playlistId: number }) => {
  const { id } = useParams()
  const [videos, setVideos] = useState<VideoDB[] | []>([])
  const navigate = useNavigate()
  const { hasFinished, setHasFinished } = useContext(
    CurrentVideoContext,
  ) as CurrentVideoContextType

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

  useEffect(() => {
    if (!hasFinished) return

    const changeVideo = () => {
      const currentVideo = videos.findIndex((video) => video.video_id === id)
      const nextVideo = videos[currentVideo + 1]

      setHasFinished(false)
      if (!nextVideo) return

      navigate(`/detail/${nextVideo.video_id}?playlistId=${playlistId}`)
    }

    changeVideo()
  }, [hasFinished, id, videos, setHasFinished, playlistId, navigate])

  return (
    <PlaylistVideos>
      <PlaylistTitle>Playlist Videos</PlaylistTitle>
      {videos.map((video) => {
        const currentVideo = id === video.video_id

        return (
          <Video
            currentvideo={currentVideo.toString()}
            key={video.id}
            to={`/detail/${video.video_id}?playlistId=${playlistId}`}
          >
            <VideoImage src={video.thumbnail_url} alt={video.title} />
            <VideoTitle>{video.title}</VideoTitle>
            {currentVideo && <Current>Current Video</Current>}
          </Video>
        )
      })}
    </PlaylistVideos>
  )
}
