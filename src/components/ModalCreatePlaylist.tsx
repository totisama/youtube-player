import styled from 'styled-components'
import Modal from 'styled-react-modal'
import { supabase } from '../utils/supabase'
import { type NewPlaylist } from '../types'

const StyledModal = Modal.styled`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222222;
  padding: 20px 0;
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
  margin: 5px 0;
`

const Label = styled.label`
  color: #ffffff;
  font-size: 20px;
  margin-top: 20px;
  user-select: none;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ffffff;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  min-height: 100px;
  border-radius: 5px;
  border: 1px solid #ffffff;
`

export const ModalCreatePlaylist = ({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean
  toggleModal: () => void
}) => {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, description } = e.target as typeof e.currentTarget & {
      name: { value: string }
      description: { value: string }
    }

    const nameValue = name.value
    const desciptionValue = description.value

    if (nameValue === '') {
      return
    }

    const newPlaylist: NewPlaylist = {
      name: nameValue,
      videos_count: 0,
    }

    if (desciptionValue !== '') {
      newPlaylist.description = desciptionValue
    }

    await supabase.from('playlists').insert(newPlaylist)

    toggleModal()
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Title>Create a new playlist!</Title>
      <Form onSubmit={submit}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="name" />
        <Label htmlFor="description">Description</Label>
        <TextArea id="description" placeholder="Description" />
        <CreateButton type="submit">Create new</CreateButton>
      </Form>
    </StyledModal>
  )
}
