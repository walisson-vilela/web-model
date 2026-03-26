import React from 'react'

import { MwButton, MwGrid } from '@mw-kit/mw-ui'

const Submit = (props: {
  onCancel: () => void
  onSubmit: () => void
  disabled: boolean
}) => {
  const { onCancel, onSubmit, disabled } = props

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
            size='large'
            onClick={onCancel}
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <MwButton
            type='button'
            content='Confirmar'
            size='large'
            onClick={onSubmit}
            disabled={disabled}
          />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Submit
