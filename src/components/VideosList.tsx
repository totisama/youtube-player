import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useSWR from 'swr'
import { fetcher, formatViews } from '../utils'
import { GeneralVideo } from '../types'

const List = styled.section`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`

const Video = styled(Link)`
  background: #222222;
  max-width: 390px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
  }
`

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #f1f1f1;
  text-align: left;
  gap: 10px;
`

const ChannelName = styled.h2`
  margin: 0;
  color: #aaa;
`

const Image = styled.img`
  width: 350px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`

const VideoTitle = styled.h1`
  text-wrap: wrap;
  font-size: 16px;
  margin: 0;
  margin-top: 10px;
`

const ExtraInfo = styled.span`
  color: #aaa;
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

export const VideosList = ({ titleParam = '' }: { titleParam: string }) => {
  const {
    data: videos,
    error,
    isLoading,
  } = useSWR<GeneralVideo[]>(
    `https://youtube.thorsteinsson.is/api/search?q=${titleParam}`,
    fetcher,
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <Error>Error loading videos</Error>

  return (
    <List>
      {videos?.map((video) => (
        <Video
          // video.id.videoId doesnt work
          key={video.snippet.thumbnails.id}
          to={`/detail/${video.snippet.thumbnails.id}`}
        >
          <Image src={video.snippet.thumbnails.url} alt={video.title} />
          <InfoSection>
            <VideoTitle>{video.title}</VideoTitle>
            <ChannelName>{video.channelName}</ChannelName>
            <ExtraInfo>
              {formatViews(video.views)} views · {video.snippet.publishedAt}
            </ExtraInfo>
          </InfoSection>
        </Video>
      ))}
    </List>
  )
}
