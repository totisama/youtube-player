import styled from 'styled-components'
import { Link } from 'react-router'
import { Video } from '../types/types'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card>
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
