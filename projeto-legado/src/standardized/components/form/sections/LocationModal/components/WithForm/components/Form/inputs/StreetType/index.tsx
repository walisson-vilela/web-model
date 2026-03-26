import { MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { strCmp } from '../../../../../../../../../../../utils/Validators'
import { street_types } from '../../../../../../constants'
import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const StreetType = () => {
  const {
    form,
    fieldIsInvalid,
    fieldsValidate,
    wasSearched: [, setWasSearched],
    setValue,
  } = useWithFormContext()

  const streetTypeLoader: SelectLoader = async (s) => {
    return street_types.options
      .filter((e) => strCmp(e.label, s, { contain: true }))
      .map((e) => ({ ...e, data: {} }))
  }

  return (
    <S.ColInputs>
      <Controller
        name='street_type'
        control={form.control}
        render={({ field: { onChange, ...props } }) => (
          <MwInput
            {...props}
            type='select'
            loader={streetTypeLoader}
            setValue={(v) => {
              setValue(props.name as 'street_type', v)
              setWasSearched(false)
            }}
            placeholder='Selecione'
            label='TP Logradouro'
            invalid={fieldIsInvalid(props.name as 'street_type')}
            search
            required={fieldsValidate(props.name as 'street_type')}
          />
        )}
      />
    </S.ColInputs>
  )
}

export default StreetType
