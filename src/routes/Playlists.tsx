import styled from 'styled-components'
import { PlaylistsList } from '../components/PlaylistsList'
import { useState } from 'react'
import { ModalCreatePlaylist } from '../components/ModalCreatePlaylist'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  padding-left: 50px;
  width: 100%;
  height: 100vh;
  text-align: center;
`

const TitleSection = styled.section`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const Title = styled.h1`
  font-size: 50px;
  color: #ff0000;
  text-align: center;
  padding: 0px;
  margin: 0px;
`

const AddNewButton = styled.button`
  background: #78ff00;
  outline: 0;
  width: 50px;
  height: 40px;
  border: 0;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;

  &:hover {
    scale: 1.05;
  }
`

export const Playlists = () => {
  const [isOpen, setIsOpen] = useState(false)

  function toggleModal() {
    setIsOpen(!isOpen)
  }

  return (
    <Main>
      <TitleSection>
        <Title>Playlists</Title>
        <AddNewButton onClick={toggleModal}>+</AddNewButton>
      </TitleSection>
      <PlaylistsList />
      <ModalCreatePlaylist isOpen={isOpen} toggleModal={toggleModal} />
    </Main>
  )
}
