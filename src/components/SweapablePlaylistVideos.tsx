import { MutableRefObject, useEffect, useRef } from 'react'
import { createSwapy } from 'swapy'
import { PlaylistVideo } from '../types/types'
import { PlaylistVideoCard } from './PlaylistVideoCard'
import styled from 'styled-components'

export const SweapablePlaylistVideos = ({
  videos,
  videosOrder,
}: {
  videos: PlaylistVideo[]
  videosOrder: MutableRefObject<string[]>
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const swapy = createSwapy(containerRef.current)

    swapy.onSwap((event) => {
      videosOrder.current = event.newSlotItemMap.asArray.map(
        (item) => item.item
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <List ref={containerRef}>
      {videos.map((video, index) => (
        <SwapElement key={index} data-swapy-slot={index}>
          <PlaylistVideoCard
            swapyItem={`${video.videoId}`}
            disabled={true}
            key={video.videoId}
            video={video}
            removeVideo={() => {}}
          />
        </SwapElement>
      ))}
    </List>
  )
}

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`

const SwapElement = styled.div`
  display: flex;
  height: 100%;
`
