import styled from 'styled-components'

export const Container = styled.div`
  width: 400px;

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

export const RedText = styled.span`
  color: #ef5350;
`

export const MarginXAuto = styled.div`
  margin-left: auto;
  margin-right: auto;
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
