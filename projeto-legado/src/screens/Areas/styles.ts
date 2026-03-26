import styled from 'styled-components'

export const Link = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    color: #b2b2b2;
    padding-top: 10px !important;
    font-size: 16px;
  }
`
