import styled from 'styled-components'

export const Container = styled.div`
  width: 412px;
  height: 198px;
  padding: 14px;

  strong {
    font: normal normal bold 16px/19px Lato;
    letter-spacing: 0px;
    color: #dfdfdf;
    text-shadow: 0px 2px 6px #00000029;
    opacity: 1;
  }

  p {
    color: #fff;
    margin-top: 7px;
    line-height: 24px;
  }
`

export const TextElipse = styled.span`
  width: 100%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
