import { Link } from 'react-router-dom'
import { SearchForm } from './SearchForm.tsx'
import styled from 'styled-components'

const Header = styled.header`
  width: 100%;
  display: flex;
  background: #222222;
  padding: 0px 20px;
  justify-content: space-between;
`

const Nav = styled.nav`
  background: #222222;
  width: 50%;
  display: flex;
  justify-content: start;
  padding-left: 10px;
`

const Ul = styled.ul`
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  list-style: none;
`

export const Item = styled(Link)`
  list-style: none;
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #cacfd7;
    text-decoration: underline;
  }
`

export const NavBar = () => {
  return (
    <Header>
      <Nav>
        <Ul>
          <Li>
            <Item to={'/'}>Home</Item>
          </Li>
          <Li>
            <Item to="/playlists">Playlists</Item>
          </Li>
        </Ul>
      </Nav>
      <SearchForm />
    </Header>
  )
}
