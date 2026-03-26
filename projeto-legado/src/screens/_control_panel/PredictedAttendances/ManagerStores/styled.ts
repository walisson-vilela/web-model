import styled from 'styled-components'

export const Link = styled.div`
  cursor: pointer;
  display: inline;

  :hover {
    text-decoration: underline;
  }

  > svg {
    vertical-align: text-top;
  }
`

export const RedText = styled.span`
  color: #db2828;
  margin-left: 8px;
`

export const SvgContainer = styled.div`
  position: absolute;
  top: 11px;
  left: 100%;
  display: inline;

  > svg {
    vertical-align: text-top;
  }
`

export const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none !important;
  cursor: pointer;
  svg {
    width: 15px;
    height: 15px;
    margin-left: 8px;
  }
  span {
    display: flex;
    align-items: center;
  }
`

export const TextWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`
