import styled from 'styled-components'
import { Outlet } from 'react-router'

export function MainLayout() {
  return (
    <LayoutContainer>
      <Header>
        <h1>YouTube Video Finder</h1>
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f4f4f4;
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
  flex-grow: 1;
  padding: 20px;
`
