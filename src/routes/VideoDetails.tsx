import styled from 'styled-components'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetcher, formatViews } from '../utils'
import useSWR from 'swr'
import { Video } from '../types'
import { YoutubeVideo } from '../components/YoutubeVideo'
import { ModalAddToPlaylist } from '../components/ModalAddToPlaylist'
import { useEffect, useState } from 'react'
import { PlaylistVideosSmall } from '../components/PlaylistVideosSmall'

const Page = styled.main`
  margin-top: 25px;
  padding: 0px 50px;
  color: white;
  padding-bottom: 100px;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

const TitleInfo = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: end;
  gap: 10px;
  max-width: 80%;
`

const Title = styled.h1`
  font-size: 28px;
  margin: 0px;
`

const Extra = styled.span`
  font-size: 18px;
  color: #dedede;
  margin-bottom: 3px;
  width: 20%;
`

const Information = styled.section`
  background-color: #1c1c1c;
  padding: 10px 15px 20px 15px;
  margin-top: 10px;
  width: 80%;
`

const ChannelName = styled.h2`
  color: #dedede;
  font-size: 20px;
`

const Description = styled.p`
  color: #dedede;
  font-size: 18px;
`

const AddToPlaylist = styled.button`
  display: block;
  background: #ff000091;
  height: 30px;
  border: 0;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  color: white;

  &:hover {
    scale: 1.05;
  }
`

const Error = styled.strong`
  padding: 50px;
  font-size: 32px;
`

export const VideoDetails = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const {
    data: video,
    error,
    isLoading,
  } = useSWR<Video>(
    `https://youtube.thorsteinsson.is/api/videos/${id}`,
    fetcher,
  )
  const [searchParams] = useSearchParams()
  const playlistId = searchParams.get('playlistId') || ''

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {}, [])

  if (isLoading) return <div>Loading...</div>
  if (error || video === undefined || id === undefined)
    return <Error>Error loading video</Error>

  return (
    <Page>
      <YoutubeVideo
        key={id}
        videoId={id}
        width={1100}
        height={615}
        fromStart={true}
      />
      <Information>
        <Header>
          <TitleInfo>
            <Title>{video.title}</Title>
          </TitleInfo>
          <AddToPlaylist onClick={toggleModal}>Add to playlist!</AddToPlaylist>
        </Header>
        <ChannelName>{video.owner}</ChannelName>
        <Description>{video.description}</Description>
        <Extra>
          {formatViews(String(video.views))} views -{' '}
          {new Date(video.datePublished).toDateString()}
        </Extra>
      </Information>
      {playlistId && <PlaylistVideosSmall playlistId={Number(playlistId)} />}
      <ModalAddToPlaylist
        isOpen={isOpen}
        toggleModal={toggleModal}
        video={video}
      />
    </Page>
  )
}
