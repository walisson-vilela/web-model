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

const FlexContainer = styled.div`
  display: flex;
`

export const BoldFlexContainer = styled(FlexContainer)`
  font-weight: bold;
`

export const SpaceBetweenContainer = styled(FlexContainer)`
  justify-content: space-between;
`
