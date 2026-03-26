import React from 'react'

import { date } from '../../../../services/parsers'

import { Container } from './styles'
import { LastEditProps } from './types'

const LastEdit = (props: LastEditProps) => {
  const modifiedAt = date(
    props.date,
    '-',
    undefined,
    'dddd, DD/MM/YYYY [às] HH:mm:ss',
  )

  const modifiedByUser = props.user
    ? [props.user.id, props.user.name].filter(Boolean).join(' - ')
    : '-'

  return (
    <Container padding={props.padding}>
      <div>Última edição realizada:</div>
      <div>
        {modifiedAt}, por {modifiedByUser}
      </div>
    </Container>
  )
}

export default LastEdit
