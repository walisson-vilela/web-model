import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { Sublocality } from '../../../../interface'

const Row: RowComponent<Sublocality> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>

      <MwEllipsisContainer>
        {data.city_name} - {data.state_name}
      </MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
