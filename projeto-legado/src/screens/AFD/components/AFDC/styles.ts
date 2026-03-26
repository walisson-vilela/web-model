import styled from 'styled-components'

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Sections = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  > * {
    border: 1px solid rgb(226, 226, 227);
    border-radius: 0.28571429rem;
    padding: 21px 14px;

    &:not(:last-child) {
      margin-bottom: 14px;
    }
  }
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 21px;
  color: #192338;
`

export const Footer = styled.div`
  background-color: #fcfcfc;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 14px 14px 0 0;
  gap: 7px;
`
