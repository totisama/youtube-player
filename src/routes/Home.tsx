import styled from 'styled-components'
import { useState } from 'react'
import { VideosList } from '../components/VideosList'

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`

const Container = styled.main`
  width: 90%;
  padding: 15px;
  gap: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Form = styled.form`
  background: #222222;
  width: 50%;
  display: flex;
  margin: 0 auto;
  padding: 35px;
  border-radius: 10px;
  gap: 20px;
`

const ButtonForm = styled.button`
  outline: 0;
  min-width: 100px;
  width: 20%;
  height: 50px;
  border: 2px solid #000000;
  color: #000000;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;

  &:hover,
  &:focus,
  &:active {
    background: #283a5d;
  }
`

const Input = styled.input`
  min-width: 200px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 2px solid #000000;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`

export default function Home() {
  const [name, setName] = useState('')

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as typeof e.currentTarget & {
      name: { value: string }
    }

    setName(form.name.value)
  }

  return (
    <Page>
      <Container onSubmit={submit}>
        <Form>
          <Input type="text" name="name" placeholder="Search" />
          <ButtonForm>Search videos</ButtonForm>
        </Form>
        {name !== '' && <VideosList name={name} />}
      </Container>
    </Page>
  )
}
