import styled from 'styled-components'

import { WrapperProps } from './interfaces'

export const Pendencies = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: normal;
    color: #3455ab;
    text-decoration: underline;
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 14px;
`

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.isActive && '#F0F2F8'};
  height: 45px;
  padding-inline-end: 21px;
`
export const Manager = styled.div`
  width: 100%;
  height: calc(100% - 35px);
  margin-top: 14px;
  & > div {
    height: 100%;
  }
`
export const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`
export const OptionsAlert = styled.div`
  display: flex;
  & > p {
    text-align: left;
    letter-spacing: 0px;
    color: #666d7d;
    font: normal;
    & > strong {
      font: normal normal bold 14px/17px Lato;
    }
  }
`
export const PopupContent = styled.div`
  width: 600px;
  height: 100%;

  & > div > span {
    font: normal normal 600 16px/24px Lato;
  }
`
