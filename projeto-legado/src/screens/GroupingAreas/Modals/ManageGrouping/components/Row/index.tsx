import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../components/GridSelector/interfaces'
import { Selected } from '../../interface'

const Row: RowComponent<Selected[number]> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
