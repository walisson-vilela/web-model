import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'

export const Info = styled.div`
  width: 100%;
  display: block;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`

export const Text = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #192338;
  gap: 3.5px;

  span {
    max-width: 33%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .authorName {
    max-width: 19%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg:hover {
    cursor: pointer;
  }
`

interface CustomPopUpProps {
  clickOutSide: boolean
}
export const CustomPopup = styled(Popup)<CustomPopUpProps>`
  background-color: #fff !important;
  padding: 0 !important;
  margin: 0 !important;
  &::before {
    background-color: #fff !important;
  }
`

export const StatusContainet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

interface PositionOut {
  isOut: number
}

export const Position = styled.div<PositionOut>`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  margin-bottom: 16px;
  border-top: 1px solid #ccc;

  strong {
    margin-bottom: 8px;
    font: normal normal bold 14px/24px Lato;
    color: #000000cc;
  }

  span {
    display: flex;
    align-items: center;
    margin-top: 8px;
    font: normal normal normal 14px/17px Lato;
    color: ${(props) => (props.isOut === 1 ? '#EF5350' : '#66bb6a')};

    svg {
      margin-right: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const MapContainer = styled.div`
  width: 100%;
  height: 123px;
`

export const Map = styled.div`
  width: 100%;
  height: 100%;
`

export const Skus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  border-top: 1px solid #ccc;

  strong {
    font: normal normal bold 14px/24px Lato;
    color: #000000cc;
  }

  ul {
    margin: 0 0 8px 0 !important;
    padding-left: 24px;

    li {
      margin-bottom: 8px;

      p {
        display: flex;
        align-items: center;

        .spacer {
          margin: 0 4px;
        }
      }
    }
  }

  .description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 85%;
  }
`
