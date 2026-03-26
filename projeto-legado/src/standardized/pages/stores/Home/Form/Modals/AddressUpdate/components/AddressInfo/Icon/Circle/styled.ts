import { MwIcon } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacings.s1};
  > div {
    ${({ theme }) => theme.useTypography('h4', { fontWeight: 'bold' })}
  }
`
export const CircleIcon = styled(MwIcon)<{
  $type: 'Receita Federal' | 'Cadastro'
}>`
  background-color: ${({ $type: type }) =>
    type === 'Receita Federal' ? '#FBCF3026' : '#3455AB26'};
  border-radius: 50%;
`
