import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { Playlist, PlaylistVideo, VideoDB } from '../types'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 50px;
  width: 100%;
  height: 100vh;
  text-align: center;
  margin-top: 15px;
`

const BackButton = styled(Link)`
  font-size: 20px;
  color: #ff0000;
  text-decoration: none;
  align-self: flex-start;
  background: #222222;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    scale: 1.1;
  }
`

const TitleSection = styled.section`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 50px;
  color: #ff0000;
  text-align: center;
  padding: 0px;
  margin: 0px;
`

const Videos = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`

const VideoCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Video = styled(Link)`
  background: #222222;
  max-width: 390px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`

const VideoTitle = styled.h1`
  text-wrap: wrap;
  font-size: 16px;
  margin: 0;
  margin-top: 10px;
  min-height: 60px;
  overflow: hidden;
  color: #f1f1f1;
`

const Image = styled.img`
  width: 350px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`

const Button = styled.button`
  height: 40px;
  border: 0;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  padding: 5px 15px;
  width: 50%;

  &:hover {
    scale: 1.1;
  }
`

export const PlaylistVideos = () => {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [videos, setVideos] = useState<PlaylistVideo[] | []>([])

  const deleteVideoFromPlaylist = async (
    videoId: string,
    playlistId: string,
  ) => {
    const { error } = await supabase
      .from('playlist_video')
      .delete()
      .eq('id', videoId)

    if (error) {
      // setError('There was a problem deleting the playlist')
      return
    }

    const response = await supabase
      .from('playlists')
      .select()
      .eq('id', playlistId)

    const playlists = response.data as Playlist[]

    if (!playlists || playlists.length === 0) {
      return
    }

    await supabase
      .from('playlists')
      .update({ videos_count: playlists[0].videos_count - 1 })
      .eq('id', playlistId)

    console.log(videos)
    const newVideos = videos.filter((video) => video.id !== videoId)
    console.log(newVideos)

    setVideos(newVideos)
  }

  useEffect(() => {
    const retreiveVideos = async () => {
      const response = await supabase
        .from('playlist_video')
        .select(
          'id, video_id, playlist_id, video ( id, video_id, title, thumbnail_url )',
        )
        .eq('playlist_id', id)

      if (!response.data || response.data.length === 0) {
        setPlaylist(null)
        return
      }

      const videosTyped = response.data as unknown as {
        id: string
        playlist_id: string
        video_id: string
        video: VideoDB
      }[]

      const dbVideos = videosTyped.map((video) => {
        return {
          id: video.id,
          playlist_id: video.playlist_id,
          video_id: video.video_id,
          video: {
            id: video.video.id,
            video_id: video.video.video_id,
            title: video.video.title,
            thumbnail_url: video.video.thumbnail_url,
          },
        }
      })

      setVideos(dbVideos)
    }

    const retreivePlaylist = async () => {
      const { data }: { data: Playlist[] | null } = await supabase
        .from('playlists')
        .select()
        .eq('id', id)

      if (!data) {
        setPlaylist(null)
        return
      }

      await retreiveVideos()

      setPlaylist(data[0])
    }

    retreivePlaylist()
  }, [id])

  return (
    <Main>
      <BackButton to="/playlists">Back to playlists</BackButton>
      <TitleSection>
        <Title>Playlist - {playlist?.name}</Title>
      </TitleSection>
      <Videos>
        {videos?.map((video) => (
          <VideoCard key={video.id}>
            <Video to={`/detail/${video.video.video_id}?playlistId=${id}`}>
              <Image src={video.video.thumbnail_url} alt={video.video.title} />
              <VideoTitle>{video.video.title}</VideoTitle>
            </Video>
            <Button
              onClick={() => {
                deleteVideoFromPlaylist(video.id, video.playlist_id)
              }}
            >
              🗑️ Delete
            </Button>
          </VideoCard>
        ))}
      </Videos>
    </Main>
  )
}
