import styled from 'styled-components'
import Modal from 'styled-react-modal'
import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react'
import { Playlist, Video } from '../types'

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222222;
  border-radius: 25px;
`

const Form = styled.form`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h2`
  color: #ffffff;
  font-size: 30px;
  text-align: center;
`

const Label = styled.label`
  color: #ffffff;
  font-size: 20px;
  margin-top: 20px;
  user-select: none;
`

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: 0;
  border-radius: 5px;
  margin-top: 10px;
  padding: 0 10px;
  font-size: 16px;
  background-color: #333333;
  color: #ffffff;
`

const CreateButton = styled.button`
  height: 40px;
  border: 0;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    scale: 1.05;
  }
`

const Error = styled.strong`
  font-size: 16px;
  color: red;
`

export const ModalAddToPlaylist = ({
  isOpen,
  toggleModal,
  video,
}: {
  isOpen: boolean
  toggleModal: () => void
  video: Video
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [error, setError] = useState<string | null>(null)

  const getExistingVideo = async () => {
    const dbVideo = await supabase
      .from('video')
      .select()
      .eq('video_id', video.videoId)

    return dbVideo
  }

  const createNewVideo = async () => {
    const { error: reqError, data: reqData } = await supabase
      .from('video')
      .insert({
        video_id: video.videoId,
        title: video.title,
        thumbnail_url: video.thumbnailUrl,
      })
      .select()

    return { reqError, reqData }
  }

  const createVideoPlaylist = async ({
    playlistId,
    dataId,
    videosCount,
  }: {
    playlistId: string
    dataId: string
    videosCount: number
  }) => {
    await supabase
      .from('playlist_video')
      .insert({ playlist_id: playlistId, video_id: dataId })

    await supabase
      .from('playlists')
      .update({ videos_count: videosCount + 1 })
      .eq('id', playlistId)
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { playlist } = e.target as typeof e.currentTarget & {
      playlist: { value: string }
    }

    const playlistId = playlist.value

    if (!playlistId) {
      setError('Select a playlist')
      return
    }

    const selectedPlaylist = playlists.find(
      (playlist) => String(playlist.id) === String(playlistId),
    )
    if (!selectedPlaylist) {
      setError('There was an error')
      return
    }

    const existingVideo = await getExistingVideo()
    let data = existingVideo.data
    let error = existingVideo.error

    // If the video is not in the database, we create it
    if (!data || data.length === 0) {
      const { reqData, reqError } = await createNewVideo()

      data = reqData
      error = reqError
    } else {
      const playlistVideo = await supabase
        .from('playlist_video')
        .select()
        .eq('playlist_id', playlistId)
        .eq('video_id', data[0].id)

      if (
        playlistVideo &&
        playlistVideo.data &&
        playlistVideo.data.length > 0
      ) {
        setError('This video is already in this playlist')
        return
      }
    }

    if (error || !data || data.length === 0) {
      setError('There was an error')
      return
    }

    await createVideoPlaylist({
      playlistId,
      dataId: data[0].id,
      videosCount: selectedPlaylist.videos_count,
    })

    toggleModal()
  }

  const changeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') return
    setError(null)
  }

  useEffect(() => {
    const getPlaylists = async () => {
      const { data } = await supabase.from('playlists').select('*')

      if (data === null) {
        setError('There was a problem getting the playlists')
        setPlaylists([])
        return
      }

      setPlaylists(data)
    }

    getPlaylists()
  }, [])

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Title>Select one of your playlists</Title>
      <Form onSubmit={submit}>
        <Label htmlFor="playlist">Playlist</Label>
        <Select onChange={changeOption} id="playlist">
          <option value={''}>Select a playlist...</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </Select>
        <Error>{error}</Error>
        <CreateButton type="submit">Add</CreateButton>
      </Form>
    </StyledModal>
  )
}
