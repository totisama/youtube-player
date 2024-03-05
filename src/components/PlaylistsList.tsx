import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { supabase } from '../utils/supabase'
import { Playlist } from '../types'

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const Playlist = styled.article`
  background: #222222;
  width: 300px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`

const PlaylistTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  margin: 0;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`

const Button = styled.button`
  outline: 0;
  height: 40px;
  border: 0;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  padding: 5px 15px;

  &:hover {
    scale: 0.95;
  }
`

export const PlaylistsList = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    const retreivePlaylists = async () => {
      const { data } = await supabase.from('playlists').select()
      setPlaylists(data)
    }

    retreivePlaylists()
  }, [])

  return (
    <Section>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id}>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <Buttons>
            <Button>✍🏼 Edit</Button>
            <Button>🗑️ Delete</Button>
          </Buttons>
        </Playlist>
      ))}
    </Section>
  )
}
