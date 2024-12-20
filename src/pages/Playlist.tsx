import styled from 'styled-components'
import { motion } from 'framer-motion'
import { PlaylistVideoCard } from '../components/PlaylistVideoCard'
import { Link, useParams } from 'react-router'
import useSWR, { mutate } from 'swr'
import { PLAYLIST_URL } from '../constants'
import { fetcher } from '../utils/fetcher'
import { VideoPlaylist } from '../types/types'
import { Loader } from '../components/Loader'
import { deleteVideoFromPlaylist } from '../lib/playlist'

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
  const { data, error, isLoading } = useSWR<VideoPlaylist>(
    `${PLAYLIST_URL}/${playlistId}`,
    fetcher,
    { refreshInterval: 5000 }
  )
  const videos = data?.videos

  const removeVideo = async (videoId: string | undefined) => {
    if (!playlistId || !videoId) return

    await deleteVideoFromPlaylist(videoId, playlistId)
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
      <ActionsContainer>
        <PlayButton
          to={`/playlist/${playlistId}/play?videoId=${videos[0].videoId}`}
        >
          Play All
        </PlayButton>
      </ActionsContainer>
      <List
        as={motion.div}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {videos &&
          videos.map((video) => (
            <PlaylistVideoCard
              key={video.videoId}
              video={video}
              removeVideo={removeVideo}
            />
          ))}
      </List>
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

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  max-width: 800px;
`

const PlayButton = styled(Link)`
  padding: 8px 16px;
  background: #333;
  color: white;
  border-radius: 8px;
  text-decoration: none;
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`
