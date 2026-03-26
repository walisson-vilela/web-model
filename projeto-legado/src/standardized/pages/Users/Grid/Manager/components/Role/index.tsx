import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { BodyInterface } from '../../interfaces'

import * as S from './styled'

const Role = {
  Trigger: (
    props: React.HTMLAttributes<HTMLSpanElement> & { name: string | null },
  ) => {
    const { name, ...triggerProps } = props
    return <S.Trigger {...triggerProps} children={name || '-'} />
  },
  Content: (props: {
    name: string | null
    role: Exclude<BodyInterface['role'], null>
  }) => {
    const { name, role } = props

    return (
      <S.Container>
        <MwEllipsisContainer children={name || '-'} />

        <div>
          <div children='Função:' />

          <MwEllipsisContainer children={role.name || '-'} />

          <div children='|' />

          <div children='Nível de Acesso:' />

          <MwEllipsisContainer children={role.access_level_label || '-'} />
        </div>

        <div>
          <div children='Interna:' />

          <MwEllipsisContainer
            children={role.internal_access ? 'Sim' : 'Não'}
          />

          <div children='|' />

          <div children='Pilar:' />

          <MwEllipsisContainer
            children={role.hierarchies.map((e) => e.name || '-').join(' | ')}
          />
        </div>
      </S.Container>
    )
  },
}

export default Role
