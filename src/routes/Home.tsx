import styled from 'styled-components'
import { VideosList } from '../components/VideosList'
import { useSearchParams } from 'react-router-dom'

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`

const Container = styled.main`
  width: 90%;
  padding: 15px;
  gap: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Home() {
  const [searchParams] = useSearchParams()
  const titleParam = searchParams.get('title') || ''

  return (
    <Page>
      <Container>
        {titleParam !== '' && <VideosList titleParam={titleParam} />}
      </Container>
    </Page>
  )
}
