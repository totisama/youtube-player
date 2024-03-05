import styled from 'styled-components'
import Modal from 'styled-react-modal'
import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react'
import { Playlist } from '../types'

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
  outline: 0;
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
}: {
  isOpen: boolean
  toggleModal: () => void
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as typeof e.currentTarget & {
      name: { value: string }
    }

    const value = form.name.value

    if (!value) {
      setError('Select a playlist')
      return
    }

    await supabase.from('playlists').insert({ name: value })

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
        <Label htmlFor="name">Name</Label>
        <Select onChange={changeOption} id="name">
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
