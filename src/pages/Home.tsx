import styled from 'styled-components'
import useSWR from 'swr'
import { SearchContextType, Video } from '../types/types'
import { VideoCard } from '../components/VideoCard'
import { fetcher } from '../utils/fetcher'
import { SEARCH_URL } from '../constants'
import { useContext } from 'react'
import { SearchContext } from '../lib/contexts/SearchContext'
import { motion } from 'framer-motion'

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function Home() {
  const { search } = useContext(SearchContext) as SearchContextType
  const { data, error, isLoading } = useSWR<Video[]>(
    `${SEARCH_URL}?q=${search}`,
    fetcher
  )

  if (error) {
    return (
      <HomeContainer>
        <div>There was an error</div>
      </HomeContainer>
    )
  }

  return (
    <HomeContainer>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
        <VideoList
          as={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {data &&
            data.map((video) => (
              <VideoCard key={video.id.videoId} video={video} />
            ))}
        </VideoList>
      )}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const VideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
`
