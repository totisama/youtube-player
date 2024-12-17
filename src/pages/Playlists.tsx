import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CreatePlaylistModal } from '../components/CreatePlaylistModal'
import { createPlaylist, deletePlaylist } from '../lib/playlist'
import useSWR, { mutate } from 'swr'
import { PLAYLIST_URL, USER_ID } from '../constants'
import { fetcher } from '../utils/fetcher'
import { PlaylistRespose } from '../types/types'
import { Loader } from '../components/Loader'
import { Link } from 'react-router'

const MY_PLAYLISTS_URL = `${PLAYLIST_URL}?userId=${USER_ID}`

export const Playlists = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())
  const { data, error, isLoading } = useSWR<PlaylistRespose>(
    MY_PLAYLISTS_URL,
    fetcher
  )
  const playlists = data?.playlists

  const submitPlaylist = async (data: { name: string }) => {
    await createPlaylist(data)
    await mutate(MY_PLAYLISTS_URL)
    setOpenModal(false)
  }

  const removePlaylist = async (id: string) => {
    console.log('removing playlist', id)
    setLoadingIds((prev) => new Set(prev).add(id))
    await deletePlaylist(id)
    await mutate(`${PLAYLIST_URL}?userId=${USER_ID}`)

    setLoadingIds((prev) => {
      const updated = new Set(prev)
      updated.delete(id)
      return updated
    })
  }

  if (error) {
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
        <strong>Error loading playlists</strong>
      </LayoutContainer>
    )
  }

  console.log('playlists', playlists)

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
      {isLoading ? (
        <Loader />
      ) : (
        <PlaylistList>
          {playlists &&
            playlists.map((playlist) => (
              <PlaylistItem key={playlist?.id}>
                {playlist?.name}
                {loadingIds.has(playlist?.id) ? (
                  <Loader />
                ) : (
                  <div>
                    <ViewButton to={`/playlist/${playlist?.id}`}>
                      View
                    </ViewButton>
                    <DeleteButton onClick={() => removePlaylist(playlist?.id)}>
                      Delete
                    </DeleteButton>
                  </div>
                )}
              </PlaylistItem>
            ))}
        </PlaylistList>
      )}
      <CreatePlaylistModal
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

const PlaylistItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #2c2c2c;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.2s;
`

const ViewButton = styled(Link)`
  display: inline-block;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #aa0000;
    transform: scale(1.05);
  }
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
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #cc0000;
    transform: scale(1.05);
  }
`
