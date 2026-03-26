import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

import { ToleranceFieldWrapper } from './style'

const ToleranceController = ({
  name,
}: {
  name: 'tolerance_before' | 'tolerance_after'
}) => {
  const { form, isInvalid } = useFormContext()
  const { control, setValue } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: props }) => {
        const { required, placeholder } = labels[props.name]

        return (
          <InputLabel>
            <MwInput
              {...props}
              inputWidth='140px'
              type='text'
              placeholder={placeholder}
              value={props.value ? props.value.toString() : ''}
              invalid={isInvalid(props.name)}
              required={required}
              onKeyDown={(event) => {
                const value = Number((event.target as HTMLInputElement).value)
                if (event.key === 'ArrowUp') {
                  if (value < 120) setValue(props.name, value + 1)
                } else if (event.key === 'ArrowDown') {
                  if (value > 0) setValue(props.name, value - 1)
                }
              }}
              setValue={(value) => {
                let result = Number(value)
                if (result > 120) {
                  result = 120
                } else if (result < 0) {
                  result = 0
                }
                setValue(props.name, result)
              }}
              mask={(v) => v.replace(/\D/g, '')}
              icon={{
                icon: {
                  type: 'jsx',
                  icon: (
                    <span>
                      {name === 'tolerance_before' ? 'Antes:' : 'Após:'}
                    </span>
                  ),
                  width: '5ch',
                },
                position: 'left',
              }}
            />
          </InputLabel>
        )
      }}
    />
  )
}

const Tolerances = () => {
  return (
    <MwGrid.Col width='6' style={{ display: 'grid' }}>
      <label htmlFor='' style={{ marginBottom: 7 }}>
        Flexibilidade de acesso ao sistema antes e após a jornada (minutos)
      </label>
      <ToleranceFieldWrapper>
        <MwGrid.Col
          style={{
            padding: 0,
            flexWrap: 'nowrap',
            justifyContent: 'start',
            gap: 14,
          }}
        >
          <ToleranceController name='tolerance_before' />
          <ToleranceController name='tolerance_after' />
        </MwGrid.Col>
      </ToleranceFieldWrapper>
    </MwGrid.Col>
  )
}

export default Tolerances
