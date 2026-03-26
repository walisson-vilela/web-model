import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import * as Components from './components'

const WeeklyRoutine = () => {
  return (
    <React.Fragment>
      <Components.Days />

      <MwGrid
        spacing={{
          top: 's3',
          left: '0',
          bottom: 's3',
          right: '0',
        }}
        borderless
      >
        <MwGrid.Row>
          <Components.StartTime />

          <Components.EndTime />

          <Components.Type />

          <Components.Label />

          <Components.TimeLimitLock />

          <Components.PreMarked />

          <Components.Submit />
        </MwGrid.Row>
      </MwGrid>

      <Components.Grid />
    </React.Fragment>
  )
}

export default WeeklyRoutine
