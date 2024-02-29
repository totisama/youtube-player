import styled from 'styled-components'
import { fetcher } from '../utils'
import { Video } from '../types'
import useSWR from 'swr'

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

  if (error || video === undefined) {
    return null
  }

  return (
    <IFrame
      width="400"
      height="225"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
      title={video.title}
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
