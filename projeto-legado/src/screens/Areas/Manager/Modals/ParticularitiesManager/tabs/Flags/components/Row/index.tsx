import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { Flags } from '../../../../interface'

const Row: RowComponent<Flags> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>

      <MwEllipsisContainer>
        {data.group} - {data.chain}
      </MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
