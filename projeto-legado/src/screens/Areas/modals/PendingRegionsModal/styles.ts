import styled from 'styled-components'

export { Header as ModalHeader } from '../../../../components/MwModal/components'

export const Content = styled.div`
  padding: ${({
    theme: {
      spacings: { s1, s3, s4 },
    },
  }) => `${s3} ${s4} ${s1} ${s4}`};
`

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('h1')};
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`

export const ListContainer = styled.div`
  padding: ${({
    theme: {
      spacings: { s3, s4 },
    },
  }) => `0 0 ${s3} ${s4}`};
  max-height: 131px;
  display: flex;
  position: relative;
`

export const ListItem = styled.div`
  :not(:first-child) {
    padding-top: ${({
      theme: {
        spacings: { s1 },
      },
    }) => s1};
  }
  :not(:last-child) {
    padding-bottom: ${({
      theme: {
        spacings: { s1 },
      },
    }) => s1};
  }
`

export const Footer = styled.div`
  padding: ${({
    theme: {
      spacings: { s3, s4 },
    },
  }) => `${s3} ${s4}`};
  border-top: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  display: flex;
  justify-content: end;
  gap: ${({ theme }) => theme.spacings.s3};
`
