import styled from 'styled-components'
import { Link, Outlet } from 'react-router'
import { SearchInput } from '../SearchInput'
import { FloatingPlayer } from '../FloatingPlayer'

export function MainLayout() {
  return (
    <LayoutContainer>
      <Header>
        <Link to="/">
          <h1>YouTube Player</h1>
        </Link>
        <SearchInput />
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
      <FloatingPlayer></FloatingPlayer>
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: #1e1e1e;
  color: #ffffff;
`

const Header = styled.header`
  padding: 20px;
  background-color: #ff0000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MainContent = styled.main`
  padding: 20px;
`
