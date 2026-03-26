import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { keys } from '../../../../../../../../../utils/Formatters'
import { cepFormatter } from '../../../../../../../../utils/formatters'
import { DEFAULT_RADIUS, DEFAULT_TOLERANCE } from '../../../../constants'
import useAddessContext from '../../../../context'
import type { IAddress } from '../../../../interfaces'

const PostalCode = () => {
  const {
    form,

    invalidCheck,
    setValueOptions,
    showTitle,

    cepIsDirty: [, setCepIsDirty],
    disabled,
  } = useAddessContext()
  const { control, setValue } = form

  return (
    <Controller
      control={control}
      name='postal_code'
      render={({ field: props }) => (
        <MwInput
          {...props}
          required
          style={{ maxWidth: 150 }}
          type='text'
          label={showTitle ? 'CEP' : ''}
          mask={cepFormatter}
          placeholder='00000-000'
          invalid={invalidCheck(props.name)}
          disabled={disabled}
          onChange={(e) => {
            props.onChange(e)
            setValue('postal_code', e.target.value, setValueOptions)

            const toClear: Required<Omit<IAddress, 'postal_code'>> = {
              street_type: '',
              street_address: '',
              street_number: '',
              sublocality: '',
              city: '',
              state: '',
              complement: '',
              lat: null,
              lng: null,
              radius: DEFAULT_RADIUS,
              geolocation_at: null,
              geolocation_by_id: null,
              geolocation_by_name: null,
              address_lat: null,
              address_lng: null,
              geolocation_status: null,
              geolocation_tolerance: DEFAULT_TOLERANCE,
            }

            for (const f of keys(toClear)) {
              setValue(f, toClear[f], setValueOptions)
            }

            setCepIsDirty(true)
          }}
        />
      )}
    />
  )
}

export default PostalCode
