import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { isKeyOf } from '../../../../../../../../utils/Validators'
import { PERSON_STATUS } from '../../../../../labels'
import { labels } from '../../../../constants'
import useFormContext from '../../../../context'

const config = {
  [PERSON_STATUS.PC.value]: { required: true },
  [PERSON_STATUS.P.value]: { disabled: true },
}

const Password = () => {
  const { form, disabled } = useFormContext()
  const { watch, isInvalid } = form
  const status = watch('status')

  return (
    <Controller
      name='password'
      control={form.control}
      render={({ field: props }) => {
        const invalid = isInvalid(props.name)

        return (
          <React.Fragment>
            <input
              type='password'
              name='fake-password'
              autoComplete='current-password'
              style={{ display: 'none' }}
            />

            <MwInput
              {...props}
              {...labels[props.name]}
              {...(isKeyOf(config, status) ? config[status] : {})}
              invalid={invalid}
              disabled={disabled}
              type='password'
              autoComplete='new-password'
            />
          </React.Fragment>
        )
      }}
    />
  )
}

export default Password
