import styled from 'styled-components'

export * from '../../../../Categories/Manager/Modals/Create/components/Popup/components/SelectParent/styled'
export * from '../../styles'

export const LastCategoryLabel = styled.div`
  max-width: 100%;

  p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-child {
      font-weight: bold;
      font-size: 14px;
    }

    &:last-child:not(:first-child) {
      padding-top: 3.5px;
      font-weight: normal;
      font-size: 13px;
    }
  }
`
