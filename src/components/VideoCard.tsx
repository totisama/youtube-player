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
    <Card as={motion.div} variants={itemVariants}>
      <Thumbnail src={video.snippet.thumbnails.url} alt={video.title} />
      <Title>{video.title}</Title>
      <StyledLink to={`/video/${video.id}`}>View Details</StyledLink>
    </Card>
  )
}

const Card = styled.div`
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`

const Title = styled.h3`
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
`

const StyledLink = styled(Link)`
  color: #ff0000;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
