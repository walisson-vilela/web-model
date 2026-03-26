import styled from 'styled-components'

export { Option } from '../../../../styled'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  flex-direction: column;

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacings.s3};
    align-items: center;
  }
`
