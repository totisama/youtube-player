import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { fetcher } from '../utils'
import useSWR from 'swr'
import { Video } from '../types'

const Page = styled.section``

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

export const VideoDetails = () => {
  const { id } = useParams()
  const {
    data: video,
    error,
    isLoading,
  } = useSWR<Video>(
    `https://youtube.thorsteinsson.is/api/videos/${id}`,
    fetcher,
  )

  if (isLoading) return <div>Loading...</div>
  if (error || video === undefined) return <Error>Error loading videos</Error>

  console.log(video)

  return (
    <Page>
      <iframe
        width="1000"
        height="561"
        src={`https://www.youtube.com/embed/${id}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <h1>{video.title}</h1>
    </Page>
  )
}
