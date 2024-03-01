import styled from 'styled-components'
import { VideosList } from '../components/VideosList'
import { useSearchParams } from 'react-router-dom'
import { EmbedVideo } from '../components/EmbedVideo'

const Container = styled.main`
  width: 100%;
  padding: 15px;
  gap: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Home() {
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('search') || ''
  const videoIdParam = searchParams.get('videoId') || ''

  return (
    <Container>
      {searchParam !== '' && <VideosList searchParam={searchParam} />}
      {videoIdParam !== '' && <EmbedVideo videoId={videoIdParam} />}
    </Container>
  )
}
