import styled from 'styled-components'
import { PlaylistVideo } from '../types/types'
import { motion } from 'framer-motion'

interface VideoCardProps {
  video: PlaylistVideo
  removeVideo: (videoId: string | undefined) => void
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export function PlaylistVideoCard({ video, removeVideo }: VideoCardProps) {
  return (
    <Card as={motion.article} variants={itemVariants}>
      <ThumbnailWrapper>
        <Thumbnail src={video.thumbnailUrl} alt={video.title} />
      </ThumbnailWrapper>
      <Content>
        <Title>{video.title}</Title>
        <RemoveButton onClick={() => removeVideo(video.videoId)}>
          Remove
        </RemoveButton>
      </Content>
    </Card>
  )
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
`

const ThumbnailWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
`

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: auto;
  word-wrap: break-word;
`

const RemoveButton = styled.button`
  align-self: flex-end;
  padding: 8px 16px;
  background: #ff0000;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:not(:disabled):hover {
    background: #ff3333;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
