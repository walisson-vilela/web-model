import styled from 'styled-components'

import { Grid } from '../../../components/FormFields'

export const Container = styled(Grid.Row)`
  border: 1px solid #e2e2e3;
  border-radius: 4px;
  margin-bottom: 21px;
  margin-top: 21px !important;

  & > * {
    padding: 21px;
    border-right: 1px solid #e2e2e3;
  }

  & > *:last-child {
    border: none;
    padding-left: 28px;
  }
`

export const Title = styled.span`
  font: normal normal bold 18px/22px Lato;
  letter-spacing: 0px;
  color: #192338;
`

export const Link = styled.a`
  font: normal normal normal 13px/16px Lato;
  letter-spacing: 0px;
  color: #192338;
  text-decoration: none;

  &:hover {
    color: #192338;
  }
`

export const ItemConfigurated = styled.span`
  margin-left: 21px;
  font: normal normal normal 13px/16px Lato;
  letter-spacing: 0px;
  color: #192338;
`

export const Configuration = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const FileInput = styled.label`
  cursor: pointer;
  color: #3455abff;
  border: 1px solid #3455abff;
  border-radius: 4px;
  padding: 0 14px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  user-select: none;
  height: 33px;
  background-color: transparent;
  line-height: 2.15;

  :hover {
    color: #3455abb3;
    border-color: #3455abb3;
  }

  input {
    display: none;
  }
`

export const FileName = styled.span`
  font-size: 13px;
  color: #192338;
  opacity: 0.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EmailError = styled.span`
  font-size: 14px;
  color: #ef5350;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
