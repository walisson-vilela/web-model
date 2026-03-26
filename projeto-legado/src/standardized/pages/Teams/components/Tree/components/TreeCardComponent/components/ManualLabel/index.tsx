import styled from 'styled-components'

import { NodeType } from '../../../../../../types'

const Container = styled.div`
  width: ${({ theme }) => theme.spacings.s3};
  height: ${({ theme }) => theme.spacings.s3};

  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.blue};
    border-color: ${({ theme }) => theme.colors.blue};
    span {
      font-weight: bold;
    }
  }
  &:not(.active) {
    color: ${({ theme }) => theme.colors.greyishBlue};
    background-color: ${({ theme }) => theme.colors.white};
    border-color: #d4d4d5;
  }

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    ${({ theme }) => theme.useTypography('p')}
    font-size: 10px;
    line-height: 10px;
  }
`

const ManualLabel = ({
  attributes,
}: {
  attributes: Omit<NodeType, 'children'>
}) => {
  return (
    <Container
      {...(attributes.hierarchies_user?.approval_count ||
      attributes.hierarchies_user?.manual
        ? {
            className: 'active',
          }
        : {})}
    >
      <span title={attributes.hierarchies_user?.manual_label}>
        {attributes.hierarchies_user?.manual_label[0].toLocaleUpperCase() ||
          'A'}
      </span>
    </Container>
  )
}

export default ManualLabel
