import ReactPlayer from 'react-player'
import styled from 'styled-components'
import useSWR from 'swr'
import { SEARCH_URL, VIDEO_URL } from '../constants'
import { useParams } from 'react-router'
import { IndependentVideo, Video } from '../types/types'
import { fetcher } from '../utils/fetcher'

export const VideoDetails = () => {
  const { videoId } = useParams()
  const { data, error, isLoading } = useSWR<IndependentVideo>(
    `${VIDEO_URL}/${videoId}`,
    fetcher
  )
  const { data: relatedVideosData } = useSWR<Video[]>(
    `${SEARCH_URL}?q=${data?.genre || data?.title}`,
    fetcher
  )

  if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>
  if (error || !data)
    return <ErrorMessage>Failed to load video details.</ErrorMessage>

  return (
    <PageContainer>
      <ContentContainer>
        <PlayerSection>
          <PlayerContainer>
            <ReactPlayer
              url={data.url}
              controls={true}
              width="100%"
              height="100%"
              onStart={() => console.log('onStart')}
              onProgress={(data) => console.log('onProgress', data)}
            />
          </PlayerContainer>
          <Title>{data.title}</Title>
          <DetailsRow>
            <Views>{data.views.toLocaleString()} views</Views>
            <DatePublished>
              Published on {new Date(data.datePublished).toLocaleDateString()}
            </DatePublished>
          </DetailsRow>
          <Description>{data.description}</Description>
        </PlayerSection>
        <Sidebar>
          <SidebarTitle>Related Videos</SidebarTitle>
          <SidebarContent>
            {relatedVideosData &&
              relatedVideosData.length > 0 &&
              relatedVideosData.map((video) => (
                <SidebarVideo
                  key={video.id.videoId}
                  href={`/video/${video.id.videoId}`}
                >
                  <Thumbnail
                    src={video.snippet.thumbnails.url}
                    alt={video.title}
                  />
                  <RelatedVideoTitle>{video.title}</RelatedVideoTitle>
                </SidebarVideo>
              ))}
          </SidebarContent>
        </Sidebar>
      </ContentContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  min-height: 100vh;
  padding: 20px;
`

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const PlayerSection = styled.div`
  flex: 3;
  min-width: 0;
`

const PlayerContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`

const Title = styled.h1`
  font-size: 1.8rem;
  margin-top: 20px;
  color: #ffffff;
`

const DetailsRow = styled.div`
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #cccccc;
  margin: 10px 0;
`

const Views = styled.span`
  font-weight: bold;
`

const DatePublished = styled.span`
  color: #aaaaaa;
`

const Description = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin-top: 20px;
  line-height: 1.5;
`

const Sidebar = styled.div`
  flex: 1;
  min-width: 250px;
  background: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 100%;
  }
`

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #ffffff;
`

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 600px;
  overflow-y: scroll;
`

const SidebarVideo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #444444;
  border-radius: 8px;
  background-color: #333333;

  &:hover {
    background-color: #444444;
  }
`

const Thumbnail = styled.img`
  width: 80px;
  height: 45px;
  border-radius: 4px;
`

const RelatedVideoTitle = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffffff;
`

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #cccccc;
`

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #ff4c4c;
`
