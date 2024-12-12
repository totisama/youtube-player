import styled from 'styled-components'
import { Outlet } from 'react-router'
import { SearchInput } from '../SearchInput'

export function MainLayout() {
  return (
    <LayoutContainer>
      <Header>
        <h1>YouTube Video Finder</h1>
        <SearchInput />
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
  min-height: 100vh;
  width: 100vw;
  background-color: #d6d6d6;
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
