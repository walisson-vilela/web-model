import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 435px;
`
export const SubContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s3};
`

export const Content = styled.div<{ $bolder?: boolean }>`
  font-size: 14px;
  line-height: 17px;
  font-weight: ${({ $bolder }) => ($bolder ? 'bold' : 'normal')};
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`
