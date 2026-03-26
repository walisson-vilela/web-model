import styled from 'styled-components'

export const Answer = styled.div`
  display: block;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  span {
    display: flex;
    align-items: center;
    color: #b2b2b2 !important;
    gap: 8px;
  }
  img {
    width: 64px;
    height: 46px;
    object-fit: cover;
  }
`

export const Approvation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  span {
    color: #b2b2b2 !important;
  }
`
