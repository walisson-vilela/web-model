import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import { Segments } from '../../../../interface'

const Row: RowComponent<Segments> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
