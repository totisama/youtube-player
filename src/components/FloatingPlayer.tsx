import { useLocation } from 'react-router'
import { useContext } from 'react'
import { CurrentVideo } from '../lib/contexts/CurrentVideoContext'
import { CurrentVideoType } from '../types/types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

export const FloatingPlayer = () => {
  const { shouldDisplay, setShouldDisplay, url } = useContext(
    CurrentVideo
  ) as CurrentVideoType
  const location = useLocation()
  const isVideoListPage = location.pathname === '/'

  if (!isVideoListPage || !shouldDisplay) return null

  return (
    <Container>
      <TopHeader>
        <CloseButton onClick={() => setShouldDisplay(false)}>X</CloseButton>
      </TopHeader>
      <ReactPlayer url={url} controls={true} width="100%" height="100%" />
    </Container>
  )
}

const Container = styled.article`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 300px;
  background-color: #000000;
`

const TopHeader = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(150, 150, 150, 0.3);
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    color: red;
  }
`
