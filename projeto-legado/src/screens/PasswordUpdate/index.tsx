import React, { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import Modal, { ModalState } from '../../components/MwModal'
import { createRouteTab } from '../../routes'

import Form from './Form'
import { isTmpPassword } from './functions'
import { Notice } from './modals'

const PasswordUpdate = createRouteTab(
  (props) => {
    const [modal, setModal] = useState<ModalState>(null)

    useEffect(() => {
      if (isTmpPassword()) {
        setModal(<Notice close={() => setModal(null)} />)
      }
    }, [])

    return (
      <MwManagerContainer style={{ position: 'relative' }}>
        <Header description='Utilize os Campos Abaixo para Efetuar a Troca da sua Senha.' />

        <Form {...props} />

        <Modal modal={modal} />
      </MwManagerContainer>
    )
  },
  (props) => <React.Fragment children={props.children} />,
)

export default PasswordUpdate
