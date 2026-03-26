import styled from 'styled-components'

export const PopupContent = styled.div`
  color: #dfdfdf;
  padding: 14px 21px;

  p {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 14px;
  }

  span {
    font-size: 14px;
    display: block;
    margin-bottom: 14px;

    strong {
      font-weight: 800;
    }
  }

  span:last-child {
    margin: 0;
  }
`

export const Link = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
