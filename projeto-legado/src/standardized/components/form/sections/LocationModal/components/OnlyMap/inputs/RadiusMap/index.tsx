import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { defaultCoordinates } from '../../../../constants'
import { Form } from '../../../../interface'

interface IRadiusMap {
  values: [Form, React.Dispatch<React.SetStateAction<Form>>]
}

const RadiusMap = (props: IRadiusMap) => {
  const [values, setValues] = props.values
  return (
    <div style={{ marginTop: 'auto' }}>
      <MwInput
        type='range'
        name='radius'
        value={numberOrDefault(values.radius, defaultCoordinates.radius)}
        setValue={(value) => {
          setValues((prev) => {
            const radius =
              typeof value === 'function'
                ? value(numberOrDefault(prev.radius, 25))
                : value
            return { ...prev, radius: Number(radius) }
          })
        }}
        markers={{
          markers: [10, 25, 50, 75, 100],
          strict: true,
          position: 'top',
        }}
        label='Limite em metros'
        width='100%'
        hideNavbar
      />
    </div>
  )
}

export default RadiusMap
