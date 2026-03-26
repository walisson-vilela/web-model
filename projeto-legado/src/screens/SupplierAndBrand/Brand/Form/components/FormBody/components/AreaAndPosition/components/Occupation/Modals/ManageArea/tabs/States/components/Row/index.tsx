import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../../../../../../../../components/GridSelector/interfaces'
import { State } from '../../../../interface'

const Row: RowComponent<State> = (props) => {
  const { data } = props
  return (
    <React.Fragment>
      <MwEllipsisContainer>
        {data.name} {data.name_short && `(${data.name_short})`}
      </MwEllipsisContainer>
    </React.Fragment>
  )
}

export default Row
