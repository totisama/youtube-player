import styled from 'styled-components'
import { Link, Outlet } from 'react-router'
import { SearchInput } from '../SearchInput'
import { FloatingPlayer } from '../FloatingPlayer'
import { ModalProvider } from 'styled-react-modal'

export function MainLayout() {
  return (
    <ModalProvider>
      <LayoutContainer>
        <Header>
          <NavContainer>
            <Link to="/">
              <h2>YouTube Player</h2>
            </Link>
            <nav>
              <NavItem to="/playlists">Playlists</NavItem>
            </nav>
          </NavContainer>
          <SearchInput />
        </Header>
        <MainContent>
          <Outlet />
        </MainContent>
        <FloatingPlayer />
      </LayoutContainer>
    </ModalProvider>
  )
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

const NavContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: inline-block;
  transition: transform 0.2s, color 0.3s ease;

  &:hover {
    text-decoration: underline;
    transform: scale(1.1) rotate(3deg);
    color: #ffcc00;
  }

  &:active {
    transform: scale(1) rotate(0);
  }
`

const MainContent = styled.main`
  padding: 20px;
`
