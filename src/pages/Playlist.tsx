import styled from 'styled-components'
import { motion } from 'framer-motion'
import { PlaylistVideoCard } from '../components/PlaylistVideoCard'
import { useParams } from 'react-router'
import useSWR, { mutate } from 'swr'
import { PLAYLIST_URL } from '../constants'
import { fetcher } from '../utils/fetcher'
import { VideoPlaylist } from '../types/types'
import { Loader } from '../components/Loader'
import { deleteVideoFromPlaylist, updatePlaylist } from '../lib/playlist'
import { useRef, useState } from 'react'
import { SweapablePlaylistVideos } from '../components/SweapablePlaylistVideos'
import { PlaylistActions } from '../components/PlaylistActions'

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const Playlist = () => {
  const { playlistId } = useParams()
  const [isSwaping, setIsSwaping] = useState(false)
  const videosOrder = useRef<string[]>([])

  const { data, error, isLoading } = useSWR<VideoPlaylist>(
    `${PLAYLIST_URL}/${playlistId}`,
    fetcher,
    { refreshInterval: 5000 }
  )
  const videos = data?.videos

  const toggleSwaping = () => {
    setIsSwaping(!isSwaping)
  }

  const removeVideo = async (videoId: string | undefined) => {
    if (!playlistId || !videoId) return

    await deleteVideoFromPlaylist(videoId, playlistId)
    await mutate(`${PLAYLIST_URL}/${playlistId}`)
  }

  const saveVideosOrder = async () => {
    if (!playlistId) {
      console.error('No playlist id found')
      return
    }

    if (videosOrder.current.length !== videos?.length) {
      console.error('Videos order length does not match')
      return
    }

    const videosNewOrder = videosOrder.current.map((videoId) =>
      data?.videos.find((video) => video.videoId === videoId)
    )

    if (videosNewOrder.includes(undefined)) {
      console.error('Failed to reorder videos due to missing video data')
      return
    }

    const playlist = { ...data, videos: videosNewOrder } as VideoPlaylist

    await updatePlaylist(playlist)
    setIsSwaping(false)
    await mutate(`${PLAYLIST_URL}/${playlistId}`)
  }

  if (error) {
    return <Container>Failed to load playlist</Container>
  }

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  if (!videos || videos?.length === 0) {
    return <Container>No videos found</Container>
  }

  return (
    <Container>
      <Title>{data?.name}</Title>
      <PlaylistActions
        isSwaping={isSwaping}
        playlistId={playlistId}
        videoId={videos[0].videoId}
        toggleSwaping={toggleSwaping}
        saveVideosOrder={saveVideosOrder}
      />
      {isSwaping ? (
        <SweapablePlaylistVideos videos={videos} videosOrder={videosOrder} />
      ) : (
        <List
          as={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {videos.map((video) => (
            <PlaylistVideoCard
              key={video.videoId}
              video={video}
              removeVideo={removeVideo}
            />
          ))}
        </List>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h1`
  font-size: 40px;
  color: white;
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`
