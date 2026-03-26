import React from 'react'

import { filterObject } from '../../functions/formatters'

import useContext, { Provider } from './context'
import type { FormProps } from './types'

const Form = Object.assign(
  React.forwardRef(
    Object.assign(
      <Name extends string = string>(
        props: FormProps<Name>,
        ref: React.ForwardedRef<HTMLFormElement>,
      ) => {
        const formProps = filterObject<
          FormProps<Name>,
          React.HTMLAttributes<HTMLFormElement>
        >(props, ['isRequired', 'isInvalid', 'isViewMode', 'isDisabled'])

        return (
          <Provider
            value={{
              ...(props.isRequired ? { isRequired: props.isRequired } : {}),
              ...(props.isInvalid ? { isInvalid: props.isInvalid } : {}),
              ...(props.isViewMode ? { isViewMode: props.isViewMode } : {}),
              ...(props.isDisabled ? { isDisabled: props.isDisabled } : {}),
            }}
          >
            <form ref={ref} {...formProps} />
          </Provider>
        )
      },
      { displayName: 'Form' },
    ),
  ),
  { useContext },
)

export default Form
