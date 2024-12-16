import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CustomModal } from '../components/CreatePlaylistModal'
import { createPlaylist, deletePlaylist } from '../lib/playlist'

export const Playlists = () => {
  const [openModal, setOpenModal] = useState(false)
  const playlists = [
    { id: 1, name: 'Chill Vibes' },
    { id: 2, name: 'Workout Mix' },
    { id: 3, name: 'Top Hits' },
  ]

  const submitPlaylist = async (data: { name: string }) => {
    const response = await createPlaylist(data)
    console.log('Playlist created', response)
    setOpenModal(false)
  }

  const removePlaylist = async (id: number) => {
    await deletePlaylist(id)
    console.log('Playlist deleted')
  }

  return (
    <LayoutContainer>
      <Header>
        <h1>Playlists</h1>
        <CreateButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenModal(true)}
        >
          + Create Playlist
        </CreateButton>
      </Header>
      <PlaylistList>
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            whileHover={{
              scale: 1.05,
              backgroundColor: '#282828',
              color: '#fff',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {playlist.name}
            {/* urGnSkfzpIfwgPlqsyaZn */}
            <DeleteButton onClick={() => removePlaylist(playlist.id)}>
              Delete
            </DeleteButton>
          </PlaylistItem>
        ))}
      </PlaylistList>
      <CustomModal
        title="Create Playlist"
        isOpen={openModal}
        toggleModal={() => setOpenModal(false)}
        onAccept={submitPlaylist}
      />
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
  min-height: 100vh;
  color: white;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`

const CreateButton = styled(motion.button)`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`

const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 800px;
`

const PlaylistItem = styled(motion.div)`
  padding: 15px;
  background-color: #2c2c2c;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.2s;
`

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 10px;
`
