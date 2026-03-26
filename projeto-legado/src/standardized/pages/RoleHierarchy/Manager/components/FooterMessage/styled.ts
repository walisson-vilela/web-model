import styled from 'styled-components'

export const Container = styled.div<{ $type: 'valid' | 'invalid' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s3};
  color: ${({ theme, $type }) =>
    $type === 'valid' ? theme.colors.greyishBlue : theme.colors.red};
`
export const Message = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 24px;
`
export const PopupContent = styled.div`
  width: 328px;
  height: 62px;
  padding: ${({ theme }) => theme.spacings.s3};
`
