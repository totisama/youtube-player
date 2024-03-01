import styled from 'styled-components'
import { fetcher } from '../utils'
import { CurrentVideoContextType, Video } from '../types'
import useSWR from 'swr'
import { CurrentVideoContext } from '../context/CurrentVideo'
import { useContext } from 'react'

const IFrame = styled.iframe`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 225px;
`

export const EmbedVideo = ({ videoId }: { videoId: string }) => {
  const { data: video, error } = useSWR<Video>(
    `https://youtube.thorsteinsson.is/api/videos/${videoId}`,
    fetcher,
  )
  const { currentSeconds } = useContext(
    CurrentVideoContext,
  ) as CurrentVideoContextType

  if (error || video === undefined) {
    return null
  }

  return (
    <IFrame
      width="400"
      height="225"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${currentSeconds}`}
      title={video.title}
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
