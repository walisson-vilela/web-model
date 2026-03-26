import React, { useContext } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import SystemAccessTimeContext from '../../context'

import * as S from './styles'

const Tolerance = () => {
  const {
    systemAccessTime: {
      state: [systemAccessTime, setSystemAccessTime],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    systemAccessTime.electronic_point === true && (
      <S.ToleranceContainer>
        <div children='Tempo de tolerância para marcação em minutos' />

        <div>
          <MwInput
            type='number'
            placeholder='Ex.: 05'
            setValue={(v) =>
              setSystemAccessTime((prev) => {
                if (prev.electronic_point !== true) return prev
                return { ...prev, tolerance_min: numberOrDefault(v, '') }
              })
            }
            value={systemAccessTime.tolerance_min}
            invalid={isInvalid('tolerance_min')}
            icon={{
              icon: {
                type: 'jsx',
                icon: <React.Fragment children='Mínimo:' />,
                width: '50px',
              },
              position: 'left',
            }}
            min='0'
            max={systemAccessTime.tolerance_max || undefined}
            inputWidth='140px'
          />

          <MwInput
            type='number'
            placeholder='Ex.: 05'
            setValue={(v) =>
              setSystemAccessTime((prev) => {
                if (prev.electronic_point !== true) return prev
                return { ...prev, tolerance_max: numberOrDefault(v, '') }
              })
            }
            value={systemAccessTime.tolerance_max}
            invalid={isInvalid('tolerance_max')}
            icon={{
              icon: {
                type: 'jsx',
                icon: <React.Fragment children='Máximo:' />,
                width: '50px',
              },
              position: 'left',
            }}
            min={systemAccessTime.tolerance_min || 0}
            inputWidth='140px'
          />
        </div>
      </S.ToleranceContainer>
    )
  )
}

export default Tolerance
