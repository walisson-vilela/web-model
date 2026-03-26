import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 7px;

  > div {
    margin-left: 18px;
  }

  > span {
    margin-left: 24px;
  }
`

interface TitleProps {
  invalid: boolean
}

export const Title = styled.span<TitleProps>`
  color: ${({ invalid }) => (invalid ? 'red' : 'black')};
  opacity: ${({ invalid }) => (invalid ? 1 : 0.5)};
`
