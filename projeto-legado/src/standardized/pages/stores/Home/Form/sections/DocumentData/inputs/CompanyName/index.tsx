import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import labels from '../../../../labels'

const CompanyName = (props: { disabled: boolean }) => {
  const { disabled } = props
  const { form } = useFormContext()

  return (
    <MwGrid.Col width='4'>
      <Controller
        name='company_name'
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type='text'
            label={labels[props.name].label}
            placeholder={labels[props.name].placeholder}
            required={labels[props.name].required}
            value={props.value || ''}
            disabled={disabled}
          />
        )}
      />
    </MwGrid.Col>
  )
}

export default CompanyName
