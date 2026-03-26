import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

const PreMarked = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    workDate.type === 'I' && (
      <MwGrid.Col width='auto'>
        <MwInput
          type='select'
          label='Pré-Assinalado'
          loader={async () => [
            { label: 'Sim', value: '1', data: {} },
            { label: 'Não', value: '0', data: {} },
          ]}
          setValue={(v) =>
            setWorkDate((prev) => {
              const pre_marked = v === '1'
              if (
                prev.type !== 'I' ||
                v === '' ||
                pre_marked === prev.pre_marked
              )
                return prev
              return { ...prev, pre_marked }
            })
          }
          value={workDate.pre_marked ? '1' : '0'}
          invalid={isInvalid('pre_marked')}
          inputWidth='130px'
        />
      </MwGrid.Col>
    )
  )
}

export default PreMarked
