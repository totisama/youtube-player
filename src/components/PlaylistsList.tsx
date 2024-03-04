import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const Playlist = styled.article`
  background: #222222;
  max-width: 390px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`

export const PlaylistsList = () => {
  return (
    <Section>
      <Playlist>
        <h2>Playlist 1</h2>
        <span>Songs: 1</span>
      </Playlist>
    </Section>
  )
}
