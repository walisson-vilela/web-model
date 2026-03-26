import styled from 'styled-components'

export const DragDropContainer = styled.div`
  display: flex;
  overflow: hidden;
  border: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  border-radius: 4px 4px 0px 0px;
  flex: 1;
`
export const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

export const ButtonContainer = styled.div<{ $isLastModifier: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${({ $isLastModifier }) =>
    $isLastModifier === false ? 'space-between' : 'right'};
  margin-top: 20px;
`

export const LastModify = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.greyishBlue};
`
