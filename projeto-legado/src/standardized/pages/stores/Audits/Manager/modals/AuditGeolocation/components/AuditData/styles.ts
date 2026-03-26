import styled from 'styled-components'

export { Title } from '../../styles'

export const Container = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s4} ${theme.spacings.s6}`};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.darkBlue};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s1};
  }
`

export const TitleMarkerContainer = styled.div`
  margin-top: -3px;
  margin-bottom: -3px;
`
