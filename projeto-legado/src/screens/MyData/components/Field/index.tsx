import React from 'react'

import { EllipsisContainer } from '@mw-kit/mw-manager'
import { Form } from 'semantic-ui-react'

import useContext from '../../context'
import labels, { Labels } from '../../labels'
import * as S from '../../styled'

interface FieldProps {
  id?: string
  name: keyof Labels
  children?: string | JSX.Element | (string | JSX.Element)[]
  disabled?: boolean
}

const Field = (props: FieldProps) => {
  const {
    form: {
      formState: { errors, touchedFields, submitCount },
    },
  } = useContext()

  const { id, name, children, disabled } = { ...props }

  const { label, required } = labels[name]

  const getContent = () => {
    if (id)
      return (
        <React.Fragment>
          <S.Label required={required} disabled={disabled} htmlFor={id}>
            <EllipsisContainer>{label}</EllipsisContainer>
          </S.Label>

          {children}
        </React.Fragment>
      )

    return (
      <S.Label required={required} disabled={disabled}>
        <EllipsisContainer>{label}</EllipsisContainer>

        {children}
      </S.Label>
    )
  }

  return (
    <Form.Field
      error={name in errors && (name in touchedFields || submitCount > 0)}
    >
      {getContent()}
    </Form.Field>
  )
}

export default Field
