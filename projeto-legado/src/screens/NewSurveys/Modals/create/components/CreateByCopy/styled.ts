import { LabelProps, Checkbox as SemanticCheckBox } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  width: 340px;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 14px 21px;
  border-bottom: 1px solid #e6e6e6;

  & > h1 {
    text-align: left;
    font: normal normal bold 18px/20px Lato;
    letter-spacing: 0px;
    color: #263046;
    opacity: 1;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-inline: 14px;
  & > div:first-child {
    width: 100% !important;
  }
`

export const ItemsContainer = styled.div`
  width: 100%;
  height: 140px;
`

export const ItemsRow = styled.div`
  background-color: white;
  border-bottom: 1px solid #e2e2e3;

  :nth-child(odd) {
    background-color: #fafafb;
  }
`

export const Checkbox = styled(SemanticCheckBox)`
  width: 100%;
`

export const Label = styled.label<LabelProps>`
  overflow: hidden;
  padding: ${(props) =>
    props.p14
      ? '7px 14px 7px 45px !important'
      : '14px 14px 14px 45px !important'};

  &:before,
  &:after {
    top: calc(50% - 8.5px) !important;
    left: 14px !important;
  }

  p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-child {
      font-size: 14px;
      color: #192338;
    }

    &:last-child:not(:first-child) {
      font-size: 12px;
      color: #8a8f99;
    }
  }
`

export const footer = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 21px;
  border-top: 1px solid #e6e6e6;
  bottom: 0;
`

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.s1};

  i {
    margin: 0 !important;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > span {
    font-size: 14px;
    color: #192338;
  }

  & > small {
    font-size: 12px;
    color: #8a8f99;
  }
`
