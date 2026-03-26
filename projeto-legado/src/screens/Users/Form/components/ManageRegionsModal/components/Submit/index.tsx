import React from 'react'

import { MwButton, MwGrid } from '@mw-kit/mw-ui'

const Submit = (props: { close: () => void; save: () => void }) => {
  const { close, save } = props

  return (
    <MwGrid
      spacing={{
        top: 's1',
        right: 's4',
        bottom: 's3',
        left: 's4',
      }}
    >
      <MwGrid.Row
        horizontalAlign='right'
        cols={{
          width: 'auto',
        }}
      >
        <MwGrid.Col>
          <MwButton
            type='button'
            appearance='link'
            content='Cancelar'
            onClick={close}
            size='large'
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <MwButton
            type='button'
            content='Confirmar'
            onClick={save}
            size='large'
          />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Submit
