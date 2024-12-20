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
import { ImportPlaylistModal } from '../components/ImportPlaylistModal'

const MY_PLAYLISTS_URL = `${PLAYLIST_URL}?userId=${USER_ID}`

export const Playlists = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openImportModal, setOpenImportModal] = useState(false)
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())
  const { data, error, isLoading } = useSWR<PlaylistRespose>(
    MY_PLAYLISTS_URL,
    fetcher
  )
  const playlists = data?.playlists

  const submitPlaylist = async (data: { name: string }) => {
    await createPlaylist(data)
    await mutate(MY_PLAYLISTS_URL)
    setOpenCreateModal(false)
  }

  const removePlaylist = async (id: string) => {
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
          <ActionsContainer>
            <CreateButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenImportModal(true)}
            >
              Import playlist
            </CreateButton>
            <CreateButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCreateModal(true)}
            >
              + Create Playlist
            </CreateButton>
          </ActionsContainer>
        </Header>
        <strong>Error loading playlists</strong>
      </LayoutContainer>
    )
  }

  return (
    <LayoutContainer>
      <Header>
        <h1>Playlists</h1>
        <ActionsContainer>
          <CreateButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenImportModal(true)}
          >
            Import playlist
          </CreateButton>
          <CreateButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenCreateModal(true)}
          >
            + Create Playlist
          </CreateButton>
        </ActionsContainer>
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
                  <ButtonsContainer>
                    <ViewButton to={`/playlist/${playlist?.id}`}>
                      View
                    </ViewButton>
                    <DeleteButton onClick={() => removePlaylist(playlist?.id)}>
                      Delete
                    </DeleteButton>
                  </ButtonsContainer>
                )}
              </PlaylistItem>
            ))}
        </PlaylistList>
      )}
      <CreatePlaylistModal
        title="Create Playlist"
        isOpen={openCreateModal}
        toggleModal={() => setOpenCreateModal(false)}
        onAccept={submitPlaylist}
      />
      <ImportPlaylistModal
        title="Import Playlist"
        isOpen={openImportModal}
        toggleModal={() => setOpenImportModal(false)}
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

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
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

const ButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
`

const DeleteButton = styled.button`
  display: inline-block;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.3s, transform 0.2s;
  background-color: #ff0000;

  &:hover {
    background-color: #cc0000;
  }
`

const BaseLinkButton = styled(Link)`
  display: inline-block;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.3s, transform 0.2s;
`

const ViewButton = styled(BaseLinkButton)`
  background-color: #0077ff;
  color: #ffffff;

  &:hover {
    background-color: #005fcc;
  }
`
