import styled from 'styled-components'

interface ContainerProps {
  showElement: boolean
}

export const ModalHeaderText = styled.strong`
  font: normal normal bold 18px/20px Lato;
  color: #263046;
`

export const Container = styled.div<ContainerProps>`
  flex: 1;
  & > div:nth-child(2) {
    height: ${(props) => (props.showElement ? '50%' : '73.5%')};
  }

  @media screen and (max-width: 1368px) {
    & > div:nth-child(2) {
      height: ${(props) => (props.showElement ? '24%' : '50%')};
    }
  }
`

export const ModalDescriptionText = styled.p`
  padding-block: 20px;
  font: normal normal normal 14px/20px Lato;
  color: #263046;
`
