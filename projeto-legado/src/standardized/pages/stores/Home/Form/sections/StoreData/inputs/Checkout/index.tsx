import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import labels from '../../../../labels'
import { checkouts } from '../../../../options'
import PopupDisabled from '../../../../popups/PopupDisabled'

const loader: SelectLoader = async () => {
  return checkouts
}

const Checkout = () => {
  const { form, isInvalid, mode } = useFormContext()

  return (
    <MwGrid.Col width='3'>
      <Controller
        name='checkout'
        control={form.control}
        render={({ field: props }) => {
          const { name } = props

          return (
            <PopupDisabled
              disabled={mode !== 'base-stores'}
              position='left center'
              trigger={
                <MwInput
                  {...props}
                  type='select'
                  label={labels[name].label}
                  placeholder={labels[name].placeholder}
                  invalid={isInvalid(name)}
                  loader={loader}
                  setValue={(v) => {
                    form.setValue(name, v || null)
                  }}
                  onClear={() => form.setValue(name, null)}
                  value={props.value || ''}
                  width='100%'
                  disabled={mode === 'base-stores'}
                />
              }
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Checkout
