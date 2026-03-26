import { MwGrid } from '@mw-kit/mw-ui'

import * as Inputs from './inputs'
import * as S from './styles'
import { UserAlocationProps } from './types'

const title: { [k in UserAlocationProps['type']]: string } = {
  agrupamento: 'Alocação de usuários para a operação do agrupamento',
  contas: 'Alocação de usuários para a operação da conta',
}

const label: { [k in 0 | 1]: string } = {
  0: 'Defina a quantidade de usuários alocados da Conta Master para operação dos roteiros.',
  1: 'Quantidade de usuários alocados da Conta Master para operação dos roteiros.',
}

const UserAllocation = (props: UserAlocationProps) => {
  const { viewMode, type } = props
  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's1',
          right: 's3',
        },
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col spacing='0'>
          <S.Title children={title[type]} />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row spacing={{ left: '0', right: '0', top: '0' }}>
        <MwGrid.Col spacing='0' children={label[viewMode ? 1 : 0]} />
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='2' spacing={{ bottom: '0' }}>
          <Inputs.Count {...props} />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default UserAllocation
