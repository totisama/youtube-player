import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { supabase } from '../utils/supabase'
import { Playlist } from '../types'
import { Link } from 'react-router-dom'
// import { ModalConfirm } from './ModalConfirm'

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const PlaylistCard = styled(Link)`
  background: #222222;
  width: 300px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  }
`

const PlaylistTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  margin: 0;
`

const Hr = styled.hr`
  width: 100%;
  margin: 10px 0;
`

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`

const PlaylistDescription = styled.p`
  font-size: 16px;
`

const VideosCount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ff7700;
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
    scale: 1.1;
  }
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
  color: white;
`

export const PlaylistsList = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [error, setError] = useState<string | null>(null)

  const deletePlaylist = async (id: string) => {
    const { error } = await supabase.from('playlists').delete().eq('id', id)

    if (error) {
      setError('There was a problem deleting the playlist')
      return
    }

    setPlaylists(playlists.filter((playlist) => playlist.id !== id))
  }

  useEffect(() => {
    const retreivePlaylists = async () => {
      const { data } = await supabase.from('playlists').select()

      if (!data) {
        setError('There was a problem getting the playlists')
        setPlaylists([])
        return
      }

      setPlaylists(data)
    }

    retreivePlaylists()
  }, [])

  return (
    <Section>
      {playlists.map((playlist) => (
        <PlaylistCard to={`/playlists/${playlist.id}`} key={playlist.id}>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <Hr />
          <InformationSection>
            <PlaylistDescription>{playlist.description}</PlaylistDescription>
            <VideosCount>Videos: {playlist.videos_count}</VideosCount>
          </InformationSection>
          <Buttons>
            {/* <Button
              onClick={() => {
                deletePlaylist(playlist.id)
              }}
            >
              🗑️ Delete
            </Button> */}
          </Buttons>
        </PlaylistCard>
      ))}
      {error && <Error>{error}</Error>}
    </Section>
  )
}
