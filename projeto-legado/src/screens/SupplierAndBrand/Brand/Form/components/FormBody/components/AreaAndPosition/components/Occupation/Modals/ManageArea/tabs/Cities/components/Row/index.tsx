import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import { City } from '../../../../interface'

const Row: RowComponent<City> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>

      <MwEllipsisContainer>{data.state_name}</MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
