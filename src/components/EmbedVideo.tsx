import styled from 'styled-components'
import { fetcher } from '../utils'
import { Video } from '../types'
import useSWR from 'swr'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { YoutubeVideo } from './YoutubeVideo'

interface IFrameDivProps {
  showvideo: boolean
}

interface HideButton {
  showvideo: boolean
}

const IFrameDiv = styled(motion.div)<IFrameDivProps>`
  position: fixed;
  bottom: 0px;
  right: 0;
  background: #222222;
  width: ${(props) => (props.showvideo ? '400px;' : '50px;')};
  height: ${(props) => (props.showvideo ? '225px;' : '50px;')};
`

const HideButton = styled.button<HideButton>`
  position: absolute;
  color: #fff;
  border: 0;
  right: 0;
  width: ${(props) => (props.showvideo ? '30px;' : '50px;')};
  height: ${(props) => (props.showvideo ? '30px;' : '50px;')};
  background: ${(props) =>
    props.showvideo ? 'rgba(0, 0, 0, 0.5);' : '#222222;'};

  &:hover {
    background: #444444;
    cursor: pointer;
  }
`

export const EmbedVideo = ({ videoId }: { videoId: string }) => {
  const { data: video, error } = useSWR<Video>(
    `https://youtube.thorsteinsson.is/api/videos/${videoId}`,
    fetcher,
  )
  const [showVideo, setShowVideo] = useState(true)

  if (error || video === undefined) {
    return null
  }

  return (
    <IFrameDiv
      showvideo={showVideo}
      animate={{ height: showVideo ? 225 : 50, width: showVideo ? 400 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <HideButton
        showvideo={showVideo}
        onClick={() => setShowVideo(!showVideo)}
      >
        <motion.div
          animate={{ rotate: showVideo ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {showVideo ? 'X' : '✚'}
        </motion.div>
      </HideButton>
      {showVideo && <YoutubeVideo videoId={videoId} width={400} height={225} />}
    </IFrameDiv>
  )
}
