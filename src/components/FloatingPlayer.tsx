import { useLocation } from 'react-router'
import { useContext, useRef, useState } from 'react'
import { CurrentVideo } from '../lib/contexts/CurrentVideoContext'
import { CurrentVideoType } from '../types/types'
import ReactPlayer from 'react-player'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { MinimizeButton } from './MinimizeButton'
import { CloseButton } from './CloseButton'

export const FloatingPlayer = () => {
  const {
    shouldDisplay,
    setShouldDisplay,
    url,
    currentMinute,
    setCurrentMinute,
  } = useContext(CurrentVideo) as CurrentVideoType

  const [isMinimized, setIsMinimized] = useState(false)
  const location = useLocation()
  const isVideoListPage = location.pathname === '/'
  const videoUrl = `${url}&t=${currentMinute.toFixed(0)}`
  const currentMinuteRef = useRef(0)

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
    setCurrentMinute(currentMinuteRef.current)
  }

  if (!isVideoListPage || !shouldDisplay) return null

  return (
    <Container
      animate={{
        height: isMinimized ? '50px' : '300px',
        width: isMinimized ? '200px' : '400px',
      }}
      transition={{ duration: 0.3 }}
    >
      <TopHeader>
        <MinimizeButton isMinimized={isMinimized} onClick={toggleMinimize} />
        <CloseButton onClick={() => setShouldDisplay(false)} />
      </TopHeader>
      <AnimatePresence>
        {!isMinimized && (
          <ReactPlayer
            playing={true}
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
            onProgress={(data) => {
              currentMinuteRef.current = data.playedSeconds
            }}
          />
        )}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled(motion.article)`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #000000;
  overflow: hidden;
  border-radius: 8px;
`

const TopHeader = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(150, 150, 150, 0.5);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

export const StyledButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    color: red;
  }
`
