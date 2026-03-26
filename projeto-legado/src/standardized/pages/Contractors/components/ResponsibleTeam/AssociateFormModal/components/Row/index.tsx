import React from 'react'

import { RowComponent } from '../../../../../../../../components/GridSelector/interfaces'
import { AssociatedUser } from '../../../types'

import * as S from './styles'

const Row: RowComponent<AssociatedUser> = (props) => {
  const {
    data: { name, person_id: id, role },
  } = props
  return (
    <React.Fragment>
      <S.Title>{name}</S.Title>
      <S.Description>
        Matrícula: {id || '-'} | Função: {role && role.name ? role.name : '-'}
      </S.Description>
    </React.Fragment>
  )
}

export default Row
