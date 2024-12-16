import Modal from 'styled-react-modal'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
}

export const CustomModal = ({
  isOpen,
  toggleModal,
  title,
  onAccept,
}: {
  title: string
  isOpen: boolean
  onAccept: (value: FormData) => void
  toggleModal: () => void
}) => {
  const { register, handleSubmit } = useForm<FormData>()

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Header>{title}</Header>
      <Form onSubmit={handleSubmit(onAccept)}>
        <Label htmlFor="name">Playlist Name</Label>
        <Input
          type="text"
          placeholder="Playlist name..."
          {...register('name', {
            required: { value: true, message: 'Required' },
          })}
        />
        <ButtonsContainer>
          <Button className="accept" type="submit">
            Create Playlist
          </Button>
          <Button className="cancel" type="button" onClick={toggleModal}>
            Cancel
          </Button>
        </ButtonsContainer>
      </Form>
    </StyledModal>
  )
}

const StyledModal = Modal.styled`
  width: 24rem;
  max-width: 90%;
  padding: 1.5rem;
  background-color: #2c2c2c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const Header = styled.header`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
`

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #ff0000;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #cc0000;
  }

  &.cancel {
    background-color: #ff0000;
  }

  &.accept {
    background-color: #ffcc00;
  }
`
