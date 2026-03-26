import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
`

export const LoaderContainer = styled.div`
  display: flex;
  padding: 21px;

  & > div {
    :after > .ui.loader:after {
      border-top-color: #fff !important;
    }
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  cursor: pointer;

  & > :last-child {
    ::before {
      width: 14px !important;
      height: 14px !important;
      top: calc(50% - 7px) !important;
    }
  }
`

export const ContainerNonClickable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  & > :last-child {
    ::before {
      width: 14px !important;
      height: 14px !important;
      top: calc(50% - 7px) !important;
    }
  }
`

export const Text = styled.span`
  font: normal normal normal 14px/24px Lato;
  color: #000000cc;
`

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  cursor: pointer;
  & > span {
    font: normal normal normal 13px/24px Lato;
    color: #ffffff;
  }
`

export const Fails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > span {
    font: normal normal normal 13px/24px Lato;
    color: #ffffff;
  }
`

export const Percentage = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;

  & > span {
    font: normal normal normal 14px/17px Lato;
    color: #ffffff;
  }

  & > strong {
    font: normal normal 900 24px/24px Lato;
    color: #ffffff;
  }
`
