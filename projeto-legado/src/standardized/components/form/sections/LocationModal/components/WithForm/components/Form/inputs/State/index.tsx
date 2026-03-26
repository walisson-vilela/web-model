import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { strCmp } from '../../../../../../../../../../../utils/Validators'
import { states } from '../../../../../../constants'
import { useWithFormContext } from '../../../../context'
import * as S from '../../styled'

const State = () => {
  const {
    form,
    fieldIsInvalid,
    setValue,
    fieldsValidate,
    wasSearched: [, setWasSearched],
  } = useWithFormContext()

  return (
    <S.ColInputs>
      <div style={{ width: '100%' }}>
        <Controller
          name='state'
          control={form.control}
          render={({ field: { onChange, ...props } }) => (
            <MwInput
              {...props}
              type='select'
              loader={async (s) =>
                states.options
                  .filter(
                    (e) =>
                      strCmp(e.label, s, { contain: true }) ||
                      strCmp(e.value, s, { contain: true }),
                  )
                  .map((e) => ({ ...e, data: e }))
              }
              setValue={(v) => {
                setValue(props.name as 'state', v)
                setWasSearched(false)
              }}
              placeholder='Selecione'
              label='Estado'
              invalid={fieldIsInvalid(props.name as 'state')}
              required={fieldsValidate(props.name as 'state')}
              search
            />
          )}
        />
      </div>
    </S.ColInputs>
  )
}

export default State
