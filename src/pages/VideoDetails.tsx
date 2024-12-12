import useSWR from 'swr'
import { VIDEO_URL } from '../constants'
import { useParams } from 'react-router'
import { Video } from '../types/types'
import { fetcher } from '../utils/fetcher'

export const VideoDetails = () => {
  const { videoId } = useParams()
  const { data, error, isLoading } = useSWR<Video>(
    `${VIDEO_URL}/${videoId}`,
    fetcher
  )

  return (
    <div>
      <h1>Video Details</h1>
    </div>
  )
}
