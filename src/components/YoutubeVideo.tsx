import { CurrentVideoContextType, YouTubeVideoProps } from '../types'
import YouTube, { type YouTubeProps } from 'react-youtube'
import { useContext, useRef } from 'react'
import { CurrentVideoContext } from '../context/CurrentVideo'

export const YoutubeVideo = ({
  type = 'big',
  videoId,
  width,
  height,
  fromStart = false,
}: YouTubeVideoProps) => {
  const { currentSeconds, setCurrentSeconds, setHasFinished } = useContext(
    CurrentVideoContext,
  ) as CurrentVideoContextType
  const starSeconds = useRef(fromStart ? 0 : currentSeconds)
  let intervalId: ReturnType<typeof setInterval> | null = null

  const opts: YouTubeProps['opts'] = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 1,
      start: starSeconds.current,
    },
  }

  const onPlay: YouTubeProps['onPlay'] = (event) => {
    intervalId = setInterval(() => {
      setCurrentSeconds(Math.floor(event.target.getCurrentTime()))
    }, 1000)
  }

  const onPause: YouTubeProps['onPause'] = () => {
    if (intervalId) clearInterval(intervalId)
    intervalId = null
  }

  const onEnd: YouTubeProps['onEnd'] = () => {
    setHasFinished(true)
  }

  return (
    <YouTube
      key={videoId}
      videoId={videoId}
      opts={opts}
      onPlay={onPlay}
      onPause={onPause}
      onEnd={onEnd}
      iframeClassName={type === 'big' ? 'youtube-iframe' : ''}
    />
  )
}
