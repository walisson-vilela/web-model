import React from 'react'

import Modal from '../../../../../../../components/MwModal'
import LocationModalFooter from '../Footer'

import * as Sections from './components'
import { useWithFormContext } from './context'
import { Container } from './styled'

const WithForm = () => {
  const {
    form,
    props,
    loading: [loading],
  } = useWithFormContext()

  const { close } = props

  const onSubmit = () => {
    const values = form.getValues()
    props.save(values)
    close()
  }

  return (
    <React.Fragment>
      <Modal.Body style={{ padding: '0' }}>
        <Container>
          <div>
            <Sections.Form />
            <Sections.RadiusParameters />
          </div>

          <Sections.MapForm />
        </Container>
      </Modal.Body>

      <LocationModalFooter
        close={close}
        loading={loading}
        onSubmit={() => onSubmit()}
      />
    </React.Fragment>
  )
}

export default WithForm
