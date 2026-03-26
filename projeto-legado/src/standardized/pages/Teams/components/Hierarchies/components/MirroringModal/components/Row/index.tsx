import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { HierarchyUser } from '../../../../../../types'

const Row: RowComponent<HierarchyUser> = (props) => {
  const { data } = props

  return (
    <React.Fragment>
      <MwEllipsisContainer>{data.user.name}</MwEllipsisContainer>

      <MwEllipsisContainer>
        Matricula: {data.user.person.registration} | Função:{' '}
        {data.user.role.name}
      </MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
