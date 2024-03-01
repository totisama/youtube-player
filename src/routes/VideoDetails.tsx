import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { fetcher, formatViews } from '../utils'
import useSWR from 'swr'
import { CurrentVideoContextType, Video } from '../types'
import YouTube, { type YouTubeProps } from 'react-youtube'
import { useContext } from 'react'
import { CurrentVideoContext } from '../context/CurrentVideo'

const Page = styled.main`
  margin-top: 25px;
  padding: 0px 50px;
  color: white;
  padding-bottom: 100px;
`

const TitleInfo = styled.div`
  display: flex;
  align-items: end;
  margin: 10px 0;
  gap: 10px;
`

const Title = styled.h1`
  font-size: 28px;
  margin: 0px;
`

const Information = styled.section`
  background-color: #1c1c1c;
  padding: 5px 0 20px 15px;
  margin-top: 10px;
  width: 80%;
`

const ChannelName = styled.h2`
  color: #dedede;
  font-size: 20px;
`

const Description = styled.p`
  color: #dedede;
  font-size: 18px;
`

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
  const opts: YouTubeProps['opts'] = {
    width: '1100',
    height: '615',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  const { setCurrentSeconds } = useContext(
    CurrentVideoContext,
  ) as CurrentVideoContextType
  let intervalId: ReturnType<typeof setInterval> | null = null

  const onPlay: YouTubeProps['onPlay'] = (event) => {
    intervalId = setInterval(() => {
      setCurrentSeconds(Math.floor(event.target.getCurrentTime()))
    }, 1000)
  }

  const onPause: YouTubeProps['onPause'] = () => {
    if (intervalId) clearInterval(intervalId)
    intervalId = null
  }

  if (isLoading) return <div>Loading...</div>
  if (error || video === undefined) return <Error>Error loading video</Error>

  return (
    <Page>
      <YouTube videoId={id} opts={opts} onPlay={onPlay} onPause={onPause} />
      <Information>
        <TitleInfo>
          <Title>{video.title}</Title>
          {formatViews(String(video.views))} views
        </TitleInfo>
        <ChannelName>{video.owner}</ChannelName>
        <Description>{video.description}</Description>
        {new Date(video.datePublished).toDateString()}
      </Information>
    </Page>
  )
}
