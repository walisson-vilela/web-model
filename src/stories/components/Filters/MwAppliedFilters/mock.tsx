import React from 'react'

import Indicator from '../../../../components/Indicator'
import type { AppliedFilter } from '../../../../interfaces'

const mock: AppliedFilter[] = Array(30)
  .fill(1)
  .map((_v, index) => {
    const i = (index + 1).toString().padStart(2, '0')

    return {
      name: `filtro_${i}`,
      labels: {
        filter: {
          text: `Filtro ${i}`,
          element: `Filtro ${i}`,
        },
        option: {
          text: `Opção ${i}`,
          element: (
            <Indicator
              labelColor='black'
              size='small'
              type={index % 2 === 0 ? 'danger' : 'success'}
              children={`Opção ${i}`}
            />
          ),
        },
      },
      value: 1,
    }
  })

export default mock
