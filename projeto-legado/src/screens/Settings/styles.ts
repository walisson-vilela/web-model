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

export const FiltersContainer = styled.div`
  margin: 0 !important;
  display: flex;
  align-items: center;
  position: relative;

  > * {
    padding: 0 14px;
    border-left: 1px solid #e2e2e3;
    height: 39px;
    display: flex;
    align-items: center;
  }
`
