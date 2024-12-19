import styled from 'styled-components'
import { VideoPlaylist } from '../types/types'
import { Link } from 'react-router'
import { PLAYLIST_URL } from '../constants'
import { fetcher } from '../utils/fetcher'
import useSWR from 'swr'

interface SidebarVideo {
  isCurrent: boolean
}

export const PlaylistVideos = ({
  playlistId,
  currentVideoId,
}: {
  playlistId: string
  currentVideoId: string
}) => {
  const { data } = useSWR<VideoPlaylist>(
    `${PLAYLIST_URL}/${playlistId}`,
    fetcher
  )
  const videos = data?.videos

  const isCurrentVideo = (videoId: string) => videoId === currentVideoId

  return (
    <Sidebar>
      <SidebarTitle>Playlist Videos</SidebarTitle>
      <SidebarContent>
        {videos &&
          videos.length > 0 &&
          videos.map((video) => {
            const isCurrent = isCurrentVideo(video.videoId)

            return (
              <SidebarVideo
                isCurrent={isCurrent}
                key={video.videoId}
                to={`/playlist/${playlistId}/play?videoId=${video.videoId}`}
              >
                {isCurrent && (
                  <PlayingContainer>
                    <Playing>Playing</Playing>
                  </PlayingContainer>
                )}
                <VideoInfo>
                  <Thumbnail src={video.thumbnailUrl} alt={video.title} />
                  <RelatedVideoTitle>{video.title}</RelatedVideoTitle>
                </VideoInfo>
              </SidebarVideo>
            )
          })}
      </SidebarContent>
    </Sidebar>
  )
}

const Sidebar = styled.div`
  min-width: 250px;
  max-width: 350px;
  background: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  height: 100%;
  max-height: 600px;

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
  max-height: 600px;
  overflow-y: scroll;
`

const SidebarVideo = styled(Link)<SidebarVideo>`
  padding: 5px 10px 10px;
  border: 1px solid #444444;
  border-radius: 8px;
  background-color: ${({ isCurrent }) => (isCurrent ? ' #555555;' : '#333333')};

  ${({ isCurrent }) =>
    !isCurrent &&
    `&:hover {
      background-color: #555555;
    }`};
`

const VideoInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const PlayingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`

const Playing = styled.span`
  color: #ffcc00;
  font-size: 0.9rem;
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
