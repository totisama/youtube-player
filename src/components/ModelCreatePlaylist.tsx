import styled from 'styled-components'
import Modal from 'styled-react-modal'
import { supabase } from '../utils/supabase'

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #222222;
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

export const ModelCreatePlaylist = ({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean
  toggleModal: () => void
}) => {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as typeof e.currentTarget & {
      name: { value: string }
    }

    const value = form.name.value

    if (value === '') {
      return
    }

    await supabase.from('playlists').insert({ name: value })

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
        <CreateButton type="submit">Create new</CreateButton>
      </Form>
    </StyledModal>
  )
}
