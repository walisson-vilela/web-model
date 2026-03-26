import styled from 'styled-components'

export const ContactContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d6d6d6;
  padding: 14px;
  cursor: pointer;
`

export const ContactInfo = styled.div`
  display: flex;
  gap: 14px;
`

export const ContactInfoImage = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const ContactInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  strong {
    font: normal normal bold 14px/15px Lato;
    color: #192338;
  }

  span {
    font: normal normal normal 14px/15px Lato;
    color: #192338;
  }
`
