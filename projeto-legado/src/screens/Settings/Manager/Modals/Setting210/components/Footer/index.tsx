import React from 'react'

import { MwButton, MwGrid } from '@mw-kit/mw-ui'

import useContext from '../../context'

const Footer = () => {
  const { close, loading, isDirty, errors } = useContext()

  return (
    <MwGrid
      spacing={{
        top: 's3',
        right: 's4',
        bottom: 's3',
        left: 's4',
      }}
    >
      <MwGrid.Row horizontalAlign='right' cols={{ width: 'auto' }}>
        <MwGrid.Col>
          <MwButton
            type='button'
            onClick={close}
            content='Cancelar'
            size='large'
            appearance='borderless'
          />
        </MwGrid.Col>

        <MwGrid.Col>
          <MwButton
            type='submit'
            content='Processar'
            size='large'
            disabled={loading || !isDirty || Object.keys(errors).length > 0}
          />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Footer
