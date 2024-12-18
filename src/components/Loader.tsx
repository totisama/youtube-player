import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  display: inline-block;
  height: 4rem;
  width: 4rem;
  border: 4px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  color: #ffffff
  position: relative;
`

const VisuallyHidden = styled.span`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  padding: 0;
  clip: rect(0, 0, 0, 0);
  margin: -1px;
`

export const Loader = () => {
  return (
    <Spinner role="status" aria-label="Loading...">
      <VisuallyHidden>Loading...</VisuallyHidden>
    </Spinner>
  )
}
