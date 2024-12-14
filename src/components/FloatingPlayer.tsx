import { useLocation } from 'react-router'
import { useContext, useState } from 'react'
import { CurrentVideo } from '../lib/contexts/CurrentVideoContext'
import { CurrentVideoType } from '../types/types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

export const FloatingPlayer = () => {
  const { shouldDisplay, setShouldDisplay, url, currentMinute } = useContext(
    CurrentVideo
  ) as CurrentVideoType
  const [isMinimized, setIsMinimized] = useState(false)
  const location = useLocation()
  const isVideoListPage = location.pathname === '/'
  const videoUrl = url + `&t=${currentMinute.toFixed(0)}`

  if (!isVideoListPage || !shouldDisplay) return null

  return (
    <Container>
      <TopHeader>
        <MinimizePlayer onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? (
            <svg
              viewBox="0 0 32 32"
              fill="currentColor"
              style={{ width: '20px', height: '30px' }}
            >
              <path
                fill-rule="evenodd"
                d="M28 12h-8V4a4 4 0 1 0-8 0v8H4a4 4 0 1 0 0 8h8v8a4 4 0 1 0 8 0v-8h8a4 4 0 1 0 0-8"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 -12 32 32"
              fill="currentColor"
              style={{ width: '20px', height: '30px' }}
            >
              <path
                fill-rule="evenodd"
                d="M28 0H4a4 4 0 1 0 0 8h24a4 4 0 1 0 0-8"
              />
            </svg>
          )}
        </MinimizePlayer>
        <CloseButton onClick={() => setShouldDisplay(false)}>
          <svg viewBox="0 0 24 24" style={{ width: '20px', height: '30px' }}>
            <path
              fill="currentColor"
              d="M6.995 7.006a1 1 0 0 0 0 1.415l3.585 3.585-3.585 3.585a1 1 0 1 0 1.414 1.414l3.585-3.585 3.585 3.585a1 1 0 0 0 1.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 0 0-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 0 0-1.414 0Z"
            />
          </svg>
        </CloseButton>
      </TopHeader>
      {isMinimized && (
        <ReactPlayer
          playing={true}
          url={videoUrl}
          controls={true}
          width="100%"
          height="100%"
        />
      )}
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

  header {
    display: none;
  }

  &:hover {
    header {
      display: flex;
    }
  }
`

const TopHeader = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(150, 150, 150, 0.5);
  width: 100%;
  justify-content: space-between;
  padding: 5px;
`

const MinimizePlayer = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    color: green;
  }
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
