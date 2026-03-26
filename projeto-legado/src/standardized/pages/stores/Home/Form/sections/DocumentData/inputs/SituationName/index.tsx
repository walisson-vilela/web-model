import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import labels from '../../../../labels'
import { situation_names } from '../../../../options'

const loader: SelectLoader = async () => {
  return situation_names.map((e) => ({
    value: e.value,
    label: e.text,
    data: {},
  }))
}

const SituationName = (props: { disabled: boolean }) => {
  const { disabled } = props
  const { form } = useFormContext()

  return (
    <MwGrid.Col width='2'>
      <Controller
        name='situation_name'
        control={form.control}
        render={({ field: props }) => {
          const { name } = props

          return (
            <MwInput
              {...props}
              type='select'
              label={labels[name].label}
              placeholder={labels[name].placeholder}
              required={labels[name].required}
              loader={loader}
              setValue={(v) => {
                form.setValue(name, v || null)
              }}
              value={props.value || ''}
              disabled={disabled}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default SituationName
