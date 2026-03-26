import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { UserAlocationProps } from '../../types'

import { Container } from './styles'

const name = 'allocated_users'

const mask = (value: string) => {
  // Remove todos os caracteres que não são números
  const numeric = value.replace(/\D/g, '')

  // Verifica se a string é vazia
  if (!numeric) return '0'

  if (numeric.length > 1) {
    // Remove o zero no início da string, se houver
    return numeric.replace(/^0+/, '')
  }

  return numeric
}

const label: { [k in 0 | 1]: string } = {
  0: 'Defina a quantidade de usuários',
  1: 'Quantidade de usuários',
}

const Count = (props: UserAlocationProps) => {
  const { control, isInvalid, viewMode } = props

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: props }) => (
        <Container>
          <MwInput
            {...props}
            type='text'
            label={<b children={label[viewMode ? 1 : 0]} />}
            placeholder='0'
            invalid={isInvalid(name)}
            mask={mask}
          />
        </Container>
      )}
    />
  )
}

export default Count
