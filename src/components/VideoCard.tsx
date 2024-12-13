import styled from 'styled-components'
import { Link } from 'react-router'
import { Video } from '../types/types'
import { motion } from 'framer-motion'

interface VideoCardProps {
  video: Video
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card
      as={motion(Link)}
      to={`/video/${video.id.videoId}`}
      variants={itemVariants}
    >
      <Thumbnail src={video.snippet.thumbnails.url} alt={video.title} />
      <Title>{video.title}</Title>
    </Card>
  )
}

const Card = styled(Link)`
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease-out;

  &:hover {
    scale: 1.05;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
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
