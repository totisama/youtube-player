import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { Playlist, VideoDB } from '../types'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  padding-left: 50px;
  width: 100%;
  height: 100vh;
  text-align: center;
  margin-top: 50px;
`

const TitleSection = styled.section`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const Title = styled.h1`
  font-size: 50px;
  color: #ff0000;
  text-align: center;
  padding: 0px;
  margin: 0px;
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

export const PlaylistVideos = () => {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [videos, setVideos] = useState<VideoDB | null>(null)

  useEffect(() => {
    const retreivePlaylist = async () => {
      const { data }: { data: Playlist[] | null } = await supabase
        .from('playlists')
        .select()
        .eq('id', id)

      if (!data) {
        setPlaylist(null)
        return
      }

      setPlaylist(data[0])
    }

    retreivePlaylist()
  }, [id])

  return (
    <Main>
      <BackButton to="/playlists">Back to playlists</BackButton>
      <TitleSection>
        <Title>{playlist?.name}</Title>
      </TitleSection>
    </Main>
  )
}
