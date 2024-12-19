import ReactPlayer from 'react-player'
import styled from 'styled-components'
import useSWR from 'swr'
import { VIDEO_URL } from '../constants'
import { useParams, useSearchParams } from 'react-router'
import { CurrentVideoType, IndependentVideo } from '../types/types'
import { fetcher } from '../utils/fetcher'
import { useContext } from 'react'
import { CurrentVideo } from '../lib/contexts/CurrentVideoContext'
import { Loader } from '../components/Loader'
import { PlaylistVideos } from '../components/PlaylistVideos'
import { usePlaylist } from '../hooks/usePlaylist'

export const PlayPlaylist = () => {
  const { playlistId } = useParams()
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get('videoId')
  const { changeToNextVideo, changeVideo } = usePlaylist({
    playlistId,
    videoId,
  })
  const { data, error, isLoading } = useSWR<IndependentVideo>(
    `${VIDEO_URL}/${videoId}`,
    fetcher
  )
  const { setShouldDisplay, setUrl, setCurrentMinute } = useContext(
    CurrentVideo
  ) as CurrentVideoType

  if (isLoading) {
    return (
      <MessageContainer>
        <Loader />
      </MessageContainer>
    )
  }

  if (error || !data) {
    return <MessageContainer>Failed to load video</MessageContainer>
  }

  if (!playlistId || !videoId) {
    return <MessageContainer>Bad request</MessageContainer>
  }

  return (
    <PageContainer>
      <ContentContainer>
        <PlayerSection>
          <PlayerContainer>
            <ReactPlayer
              playing={true}
              url={data.url}
              controls={true}
              width="100%"
              height="100%"
              onStart={() => {
                setUrl(data.url)
                setShouldDisplay(true)
              }}
              onProgress={(data) => setCurrentMinute(data.playedSeconds)}
              onEnded={changeToNextVideo}
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
        <PlaylistVideos
          playlistId={playlistId}
          currentVideoId={videoId}
          changeVideo={changeVideo}
        />
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

const MessageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
`
