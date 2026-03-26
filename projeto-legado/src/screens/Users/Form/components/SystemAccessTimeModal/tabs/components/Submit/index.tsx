import React, { useContext } from 'react'

import { MwButton, MwGrid } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../context'

const Type = () => {
  const {
    workDate: {
      form: [{ validating }],
      onAdd,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    <MwGrid.Col width='auto' align={{ content: { vertical: 'bottom' } }}>
      <MwButton
        type='button'
        appearance='bordered'
        content='Adicionar'
        onClick={onAdd}
        disabled={validating}
      />
    </MwGrid.Col>
  )
}

export default Type
