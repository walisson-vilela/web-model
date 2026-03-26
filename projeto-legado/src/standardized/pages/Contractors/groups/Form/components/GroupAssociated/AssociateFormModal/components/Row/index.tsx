import React from 'react'

import { RowComponent } from '../../../../../../../../../../components/GridSelector/interfaces'
import { AssociatedGroup } from '../../../../../types'

import * as S from './styles'

const Row: RowComponent<AssociatedGroup> = (props) => {
  const {
    data: { subcontractor_id: id, name },
  } = props
  return (
    <React.Fragment>
      <S.Title>{name}</S.Title>
      <S.Description>Id: {id || '-'}</S.Description>
    </React.Fragment>
  )
}

export default Row
