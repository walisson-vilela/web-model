import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import useContext from '../../../../context'
import * as S from '../../styled'
import { options } from '../MeansurementUnit'

const Meansurement = () => {
  const { form, isInvalid, setValueOptions } = useContext()

  const { control, watch, setValue } = form

  const measurement_unit = watch('measurement_unit')

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name='measurement'
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='number'
            label='Medida'
            placeholder='0,000'
            disabled={!measurement_unit}
            step='.001'
            value={props.value || ''}
            setValue={(e) => {
              setValue(props.name, numberOrDefault(e), setValueOptions)
            }}
            icon={{
              icon: {
                type: 'jsx',
                icon: (
                  <S.Icon
                    children={
                      options.find((e) => e.value === measurement_unit)?.data
                        .abreviation
                    }
                  />
                ),
                width: undefined,
              },
            }}
            invalid={isInvalid('measurement')}
          />
        )}
      />
    </MwGrid.Col>
  )
}

export default Meansurement
