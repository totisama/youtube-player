import styled from 'styled-components'
import useSWR from 'swr'

const List = styled.section`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`

const Video = styled.a`
  background: #5d6f93;
  width: 100%;
  max-width: 300px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #282c34;

  &:hover {
    transform: scale(1.05);
  }
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

interface SWRValues {
  data: VideoInterface[]
  error: string
  isLoading: boolean
}

interface VideoInterface {
  id: ID
  url: string
  title: string
  channelName: string
  description: string
  durationRaw: string
  snippet: Snippet
  views: string
}

interface ID {
  videoID: string
}

interface Snippet {
  url: string
  duration: string
  publishedAt: string
  thumbnails: Thumbnails
  title: string
  views: string
}

interface Thumbnails {
  id: string
  url: string
  height: number
  width: number
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const VideosList = ({ name = '' }: { name: string }) => {
  const { data, error, isLoading } = useSWR<SWRValues>(
    `https://youtube.thorsteinsson.is/api/search?q=${name}`,
    fetcher,
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <Error>Error loading repos</Error>

  console.log(data)

  return (
    <List>
      {data?.map((video) => (
        <Video
          key={video.id.videoID}
          href={video.url}
          target="_blank"
          rel="noreferrer"
        >
          <img src={video.snippet.thumbnails.url} alt={video.title} />
          <h1>{video.title}</h1>
          <h2>{video.channelName}</h2>
          {video.description !== null && (
            <p>
              <strong>Description:</strong>
              <br />
              {video.description}
            </p>
          )}
          Total views: {video.views}
        </Video>
      ))}
    </List>
  )
}
