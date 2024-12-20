import Modal from 'styled-react-modal'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { importYoutubePlaylist } from '../lib/playlist'
import { mutate } from 'swr'
import { PLAYLIST_URL, USER_ID } from '../constants'

interface FormData {
  playlistUrl: string
}

export const ImportPlaylistModal = ({
  isOpen,
  toggleModal,
  title,
}: {
  title: string
  isOpen: boolean
  toggleModal: () => void
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>()
  const [isPending, startTransition] = useTransition()

  const importPlaylist = (data: FormData) => {
    let playlistURL: URL

    try {
      playlistURL = new URL(data.playlistUrl)
    } catch {
      setError('playlistUrl', {
        type: 'manual',
        message: 'Invalid URL',
      })
      return
    }

    if (!playlistURL.searchParams.has('list')) {
      setError('playlistUrl', {
        type: 'manual',
        message: 'The URL must contain a "list" parameter.',
      })
      return
    }
    const playlistId = playlistURL.searchParams.get('list')

    if (!playlistId) {
      setError('playlistUrl', {
        type: 'manual',
        message: 'Invalid URL',
      })
      return
    }

    const asyncLogic = async () => {
      await importYoutubePlaylist(playlistId)
      await mutate(`${PLAYLIST_URL}?userId=${USER_ID}`)
      toggleModal()
    }

    // Wrap synchronous logic inside startTransition
    startTransition(() => {
      asyncLogic()
    })

    console.log(playlistId)
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={isPending ? () => {} : toggleModal}
      onEscapeKeydown={isPending ? () => {} : toggleModal}
    >
      <Header>{title}</Header>
      <Form onSubmit={handleSubmit(importPlaylist)}>
        <Label htmlFor="name">Playlist URL</Label>
        <Input
          type="text"
          placeholder="Playlist URL..."
          {...register('playlistUrl', {
            required: { value: true, message: 'Required' },
          })}
        />
        {errors.playlistUrl && (
          <ErrorMessage>{errors.playlistUrl.message}</ErrorMessage>
        )}
        <Example>
          Ej:
          https://youtube.com/playlist?list=FLI4OKr52yaOtctTOk-whOJg&si=5gtP3JtteB_D-Yf1
        </Example>
        <ButtonsContainer>
          <Button className="accept" disabled={isPending} type="submit">
            {isPending ? 'Loading...' : 'Import Playlist'}
          </Button>
          <Button
            className="cancel"
            type="button"
            disabled={isPending}
            onClick={toggleModal}
          >
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
const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
`

const Example = styled.small`
  display: block;
  color: #999;
  font-size: 10px;
  margin-top: 5px;
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
