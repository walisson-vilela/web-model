import styled from 'styled-components'

export const Container = styled.div`
  width: 600px;

  table {
    border: none !important;
    display: block;

    tbody {
      display: block;

      tr {
        display: flex;

        td {
          background-color: unset !important;
          vertical-align: top;

          :first-child {
            padding-left: 0;
          }

          :last-child {
            padding-right: 0;
          }

          strong {
            color: #263046;
          }
        }
      }
    }
  }
`

export const FlexContainer = styled.div`
  display: flex;
`

export const BoldFlexContainer = styled(FlexContainer)`
  font-weight: bold;
`

export const SpaceBetweenContainer = styled(FlexContainer)`
  justify-content: space-between;
`

export const Ellipsis = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 7px;
`

export const MarginXAuto = styled.div`
  margin-left: auto;
  margin-right: 28px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

interface RoundedImageProps {
  src: string
}

export const RoundedImage = styled.div<RoundedImageProps>`
  width: 64px;
  height: 64px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: 100%;
`

export const NormalH5 = styled.h5`
  font-weight: normal;
`
