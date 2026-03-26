import React, { useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { Loader } from 'semantic-ui-react'

import { Header } from '../../components/Header'
import Modal, { ModalState } from '../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../components/Toaster'
import useRouteTabContext, { createRouteTab } from '../../routes'
import { notEmptyString } from '../../utils/Validators'

import {
  Address,
  ComplementData,
  ContractInfo,
  FinancialContact,
  GeneralContact,
  MasterAccount,
  MasterAdministrator,
  People,
} from './components'
import useContext, { Provider } from './context'
import { ContactInterface } from './interfaces'
import { updateClient } from './services'
import * as S from './styled'

const ContractorClient = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const {
    form,
    data,
    loading: [loading, setLoading],
    contractInfo,
    masterAdmin,
    isDirty,
    load,
    onClickCancel,
  } = useContext()

  const { close: closeTab } = useRouteTabContext(route)

  const {
    getValues,
    formState: { isValid },
    handleSubmit,
  } = form

  const [modal, setModal] = useState<ModalState | null>(null)

  const onSubmit = async () => {
    setLoading(true)

    const contacts: { [key: number]: ContactInterface } = {}
    if (Array.isArray(data.client_contacts)) {
      data.client_contacts.forEach((value) => {
        contacts[value.client_contact_type_id] = value
      })
    }

    const toUpdate = {
      // general contact
      id: data.id,
      type: 'general',
      automatic_user_approval: data.automatic_user_approval,

      phone1: getValues('phone1'),
      phone2: getValues('phone2'),
      email: getValues('email'),

      // master administrator
      administrator_phone: getValues('administrator_phone'),

      client_contacts: [
        {
          client_id: data.id,
          client_contact_type_id: 4,
          type: 'Financeiro',
          name: getValues('client_contact_4_name'),
          phone1: getValues('client_contact_4_phone1'),
          phone2: getValues('client_contact_4_phone2'),
          email: getValues('client_contact_4_email'),
        },
        {
          client_id: data.id,
          client_contact_type_id: 6,
          type: 'Sponsor',
          name: getValues('client_contact_6_name'),
          phone1: getValues('client_contact_6_phone1'),
          phone2: getValues('client_contact_6_phone2'),
          email: getValues('client_contact_6_email'),
        },
        {
          client_id: data.id,
          client_contact_type_id: 8,
          type: 'Ponto Focal',
          name: getValues('client_contact_8_name'),
          phone1: getValues('client_contact_8_phone1'),
          phone2: getValues('client_contact_8_phone2'),
          email: getValues('client_contact_8_email'),
        },
        {
          client_id: data.id,
          client_contact_type_id: 10,
          type: 'TI',
          name: getValues('client_contact_10_name'),
          phone1: getValues('client_contact_10_phone1'),
          phone2: getValues('client_contact_10_phone2'),
          email: getValues('client_contact_10_email'),
        },
        {
          client_id: data.id,
          client_contact_type_id: 12,
          type: 'Compras',
          name: getValues('client_contact_12_name'),
          phone1: getValues('client_contact_12_phone1'),
          phone2: getValues('client_contact_12_phone2'),
          email: getValues('client_contact_12_email'),
        },
      ],
    }

    toUpdate.client_contacts = toUpdate.client_contacts.filter((contact) =>
      notEmptyString(contact.name),
    )

    try {
      const response = await updateClient(data.id, toUpdate)

      if (!response.success) throw new Error('Request returned no success')

      setModal({
        title: 'Confirmação',
        content: 'Seu cadastro foi realizado com sucesso.',
        actions: [
          {
            className: 'secondary',
            content: 'Ir para Home',
            onClick: async () => {
              closeTab(0)
            },
          },
          {
            content: 'Continuar Edição',
            onClick: () => {
              load()
              setModal(null)
            },
            primary: true,
            style: {
              width: '160px',
            },
          },
        ],
        size: 'small',
      })
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <Header description='Gerencie os dados do contratante' />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {loading && (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        )}

        <S.FormContainer>
          <S.Section>
            <People />

            <Address />

            <GeneralContact />
          </S.Section>

          <S.Section>
            <MasterAccount />
          </S.Section>

          <S.Section>
            <ContractInfo data={contractInfo} setModal={setModal} />
          </S.Section>

          <S.Section>
            <MasterAdministrator data={masterAdmin} />
          </S.Section>

          <S.Section>
            <FinancialContact />
          </S.Section>

          <S.Section>
            <ComplementData />
          </S.Section>

          <S.Footer
            buttons={[
              {
                type: 'button',
                appearance: 'bordered',
                onClick: onClickCancel,
                disabled: loading,
                content: 'Cancelar',
              },
              {
                type: 'submit',
                disabled: loading || !isDirty || !isValid,
                content: 'Salvar',
              },
            ]}
            {...(data
              ? {
                  lastModified: data.modifier,
                }
              : {})}
          />
        </S.FormContainer>
      </S.Form>

      <Modal modal={modal} />
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}, Provider)

export default ContractorClient
