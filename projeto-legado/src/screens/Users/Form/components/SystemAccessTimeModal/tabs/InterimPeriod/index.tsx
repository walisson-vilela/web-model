import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import * as Components from './components'

const InterimPeriod = () => {
  return (
    <React.Fragment>
      <MwGrid
        spacing={{
          top: '0',
          left: '0',
          bottom: 's3',
          right: '0',
        }}
        rows={{
          borderless: true,
        }}
        borderless
      >
        <MwGrid.Row>
          <Components.StartDate />

          <Components.EndDate />
        </MwGrid.Row>

        <MwGrid.Row>
          <Components.StartTime />

          <Components.EndTime />

          <Components.Submit />
        </MwGrid.Row>
      </MwGrid>

      <Components.Grid />
    </React.Fragment>
  )
}

export default InterimPeriod
