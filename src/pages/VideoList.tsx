import styled from 'styled-components'
import useSWR from 'swr'
import { Video } from '../types/types'
import { VideoCard } from '../components/VideoCard'
import { fetcher } from '../utils/fetcher'
import { SEARCH_URL } from '../constants'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router'
import { Loader } from '../components/Loader'

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const DEFAULT_SEARCH = 'Amazing videos'

export function VideoList() {
  const [search] = useSearchParams()
  const { data, error, isLoading } = useSWR<Video[]>(
    `${SEARCH_URL}?q=${search.size > 0 ? search : DEFAULT_SEARCH}`,
    fetcher
  )

  if (error) {
    return <Container>Error loading videos</Container>
  }

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  return (
    <Container>
      <List
        as={motion.div}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {data &&
          data.map((video) => (
            <VideoCard key={video.id.videoId} video={video} />
          ))}
      </List>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`
