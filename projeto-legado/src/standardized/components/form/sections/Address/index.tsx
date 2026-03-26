import React, { useEffect } from 'react'

import { Section } from '../../components'

import { Fields, Geolocation } from './components'
import * as constants from './constants'
import useAddessContext, { Provider } from './context'

interface Props {
  withSection?: boolean

  textInformation: string
  disabled?: boolean
  resendToAudit?: 'disabled' | 'none'
  children?: React.ReactNode
}

const Address = Object.assign(
  (props: Props) => {
    const { form } = useAddessContext()

    useEffect(() => {
      form.register('geolocation_at')
      form.register('geolocation_by_id')
      form.register('geolocation_by_name')
    }, [form.register])

    const Container = props.withSection ? Section : React.Fragment

    return (
      <Container>
        <Fields>{props.children}</Fields>
        <Geolocation
          resendToAudit={props.resendToAudit}
          textInformation={props.textInformation}
          {...(props.disabled !== undefined
            ? { disabled: props.disabled }
            : {})}
        />
      </Container>
    )
  },
  { Provider, constants },
)

export default Address
