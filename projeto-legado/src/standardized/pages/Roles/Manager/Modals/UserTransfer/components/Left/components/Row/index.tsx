import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../../components/GridSelector/interfaces'
import { User } from '../../../../interfaces'

const Row: RowComponent<User> = (props) => {
  const {
    data: { name, id, registration },
  } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer children={name} />
      <MwEllipsisContainer
        children={
          <React.Fragment>
            ID: {id} | Matrícula: {registration || '-'}
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
}

export default Row
