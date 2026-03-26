import React from 'react'

import { isKeyOf } from '../../../../../../../../utils/Validators'
import { access_levels } from '../../../Create/Inputs/SelectAccessLevel'
import { Role, User } from '../../interfaces'

export const FirstMessage = (props: { data: Role; right: Role }) => {
  const { data, right } = props

  if (!data.internal_access) return null

  const messages = []
  if (!data.internal_access) {
    if (right.internal_access) {
      messages.push(
        <React.Fragment>
          remover as informações de <b>Área de atuação</b> e{' '}
          <b>Superior direto</b>
        </React.Fragment>,
      )
    }
  }

  const hierarchies = data.hierarchies.filter(
    (x) => !right.hierarchies.some((y) => x.hierarchy_id === y.hierarchy_id),
  )

  if (hierarchies.length > 0) {
    messages.push(
      <React.Fragment>
        remover {hierarchies.length > 1 ? 'os pilares' : 'o pilar'}{' '}
        {hierarchies.map(({ name }, i) => (
          <React.Fragment key={i}>
            <b>{name}</b>
            {(() => {
              if (i === hierarchies.length - 2) return ' e '
              return i < hierarchies.length - 2 ? ', ' : null
            })()}
          </React.Fragment>
        ))}
      </React.Fragment>,
    )
  }

  return (
    <React.Fragment>
      {messages.length > 0 && (
        <React.Fragment>
          A ação irá{' '}
          {messages.map((message, i) => (
            <React.Fragment key={i}>
              {message}
              {(() => {
                if (i === messages.length - 2) return ' e '
                return i < messages.length - 2 ? ', ' : null
              })()}
            </React.Fragment>
          ))}
          .
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export const SecondMessage = (props: { data: Role; right: Role }) => {
  const { data, right } = props

  const [x, y] = [right, data].map((e) => e.access_level_id)

  if (
    isKeyOf(access_levels, x) &&
    isKeyOf(access_levels, y) &&
    access_levels[x].data.weight >= access_levels[y].data.weight
  ) {
    return null
  }

  return (
    <React.Fragment>
      Haverá perda do Nível de Acesso de <b>{data.access_level_label}</b> para{' '}
      <b>{right.access_level_label}</b>.
    </React.Fragment>
  )
}

export const ThirdMessage = (props: {
  data: Role
  right: Role
  left: User[]
}) => {
  const { data, right, left } = props

  return (
    <React.Fragment>
      Deseja realmente transferir{' '}
      {left.length > 1 ? (
        <React.Fragment>
          os <b>{left.length}</b> usuários selecionados
        </React.Fragment>
      ) : (
        <React.Fragment>
          o usuário <b>{left[0].name}</b>
        </React.Fragment>
      )}{' '}
      da função <b>{data.name}</b> para <b>{right.name}</b>?
    </React.Fragment>
  )
}
