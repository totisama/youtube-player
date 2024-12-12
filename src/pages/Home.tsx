import styled from 'styled-components'
import useSWR from 'swr'
import { SearchContextType, Video } from '../types/types'
import { VideoCard } from '../components/VideoCard'
import { fetcher } from '../utils/fetcher'
import { SEARCH_URL } from '../constants'
import { useContext } from 'react'
import { SearchContext } from '../lib/contexts/SearchContext'

export function Home() {
  const { search } = useContext(SearchContext) as SearchContextType
  const { data, error, isLoading } = useSWR<Video[], boolean>(
    `${SEARCH_URL}?q=${search}`,
    fetcher
  )

  if (isLoading || !data || error) return <div>Loading...</div>

  return (
    <HomeContainer>
      <VideoList>
        {data.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </VideoList>
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
