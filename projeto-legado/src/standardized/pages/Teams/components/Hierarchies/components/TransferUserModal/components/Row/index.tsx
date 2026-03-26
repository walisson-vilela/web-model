import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { HierarchyUser } from '../../types'

import { RowCard, RowName } from './styles'

const Row: RowComponent<HierarchyUser> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <RowName>
        <MwEllipsisContainer>{data.user.name}</MwEllipsisContainer>
      </RowName>

      <RowCard>
        <span>Matrícula:</span>

        <MwEllipsisContainer>
          <span className='bolder'>{data.user.person.registration || '-'}</span>
        </MwEllipsisContainer>

        <span>| Área:</span>

        <span className='bolder'>
          {data.region_count.toString().padStart(2, '0')}
        </span>

        <span>| Função:</span>

        <MwEllipsisContainer>
          <span className='bolder'>{data.user.role.name}</span>
        </MwEllipsisContainer>
      </RowCard>
    </React.Fragment>
  )
}

export default Row
