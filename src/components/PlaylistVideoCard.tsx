import styled from 'styled-components'
import { PlaylistVideo } from '../types/types'
import { motion } from 'framer-motion'

interface VideoCardProps {
  video: PlaylistVideo
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export function PlaylistVideoCard({ video }: VideoCardProps) {
  return (
    <Card as={motion.article} variants={itemVariants}>
      <Thumbnail src={video.thumbnailUrl} alt={video.title} />
      <Title>{video.title}</Title>
    </Card>
  )
}

const Card = styled.article`
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
`

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
  aspect-ratio: 16/9;
`

const Title = styled.h3`
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
`
