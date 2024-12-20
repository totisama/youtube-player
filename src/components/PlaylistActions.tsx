import { Link } from 'react-router'
import styled from 'styled-components'

export const PlaylistActions = ({
  isSwaping,
  playlistId,
  videoId,
  saveVideosOrder,
  toggleSwaping,
}: {
  isSwaping: boolean
  playlistId: string | undefined
  videoId: string | undefined
  saveVideosOrder: () => void
  toggleSwaping: () => void
}) => {
  return (
    <ActionsContainer>
      {isSwaping ? (
        <>
          <SaveOrderButton onClick={saveVideosOrder}>
            Save Order
          </SaveOrderButton>
          <CancelButton onClick={toggleSwaping}>Cancel</CancelButton>
        </>
      ) : (
        <RearrangeButton onClick={toggleSwaping}>Rearrange</RearrangeButton>
      )}
      <PlayButton to={`/playlist/${playlistId}/play?videoId=${videoId}`}>
        Play All
      </PlayButton>
    </ActionsContainer>
  )
}

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  max-width: 800px;
`

const RearrangeButton = styled.button`
  padding: 8px 16px;
  background: #555;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #444;
    transform: scale(1.1);
  }
`

const SaveOrderButton = styled.button`
  padding: 8px 16px;
  background: #008000; /* Green for save */
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #006400; /* Darker green */
    transform: scale(1.1);
  }
`

const CancelButton = styled.button`
  padding: 8px 16px;
  background: #ff0000; /* Red for cancel */
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #cc0000; /* Darker red */
    transform: scale(1.1);
  }
`

const PlayButton = styled(Link)`
  padding: 8px 16px;
  background: #1e90ff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #1c86ee;
    transform: scale(1.1);
  }
`
