import styled from 'styled-components'
import { SEARCH_URL } from '../constants'
import { Video } from '../types/types'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import { Link } from 'react-router'

export const RelatedVideos = ({ searchValue }: { searchValue: string }) => {
  const { data: relatedVideosData } = useSWR<Video[]>(
    `${SEARCH_URL}?q=${searchValue}`,
    fetcher
  )

  return (
    <Sidebar>
      <SidebarTitle>Related Videos</SidebarTitle>
      <SidebarContent>
        {relatedVideosData &&
          relatedVideosData.length > 0 &&
          relatedVideosData.map((video) => (
            <SidebarVideo
              key={video.id.videoId}
              to={`/video/${video.id.videoId}`}
            >
              <Thumbnail src={video.snippet.thumbnails.url} alt={video.title} />
              <RelatedVideoTitle>{video.title}</RelatedVideoTitle>
            </SidebarVideo>
          ))}
      </SidebarContent>
    </Sidebar>
  )
}

const Sidebar = styled.aside`
  min-width: 250px;
  max-width: 300px;
  background: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  height: 100%;
  max-height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #ffffff;
`

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  max-height: 500px;
  padding-right: 5px;
`

const SidebarVideo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #444444;
  border-radius: 8px;
  background-color: #333333;

  &:hover {
    background-color: #444444;
  }
`

const Thumbnail = styled.img`
  width: 80px;
  height: 45px;
  border-radius: 4px;
`

const RelatedVideoTitle = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffffff;
`
