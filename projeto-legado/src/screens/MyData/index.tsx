import React, { useEffect, useState } from 'react'

import { SubmitHandler } from 'react-hook-form'
import { Loader } from 'semantic-ui-react'

import { Header } from '../../components/Header'
import Modal, { ModalState } from '../../components/MwModal'
import useRouteTabContext, { createRouteTab } from '../../routes'
import useHomeContext from '../../standardized/pages/Home/context'

import Address from './components/Address'
import Avatar from './components/Avatar'
import BasicData from './components/BasicData'
import GeneralContact from './components/GeneralContact'
import SystemData from './components/SystemData'
import useContext, { Provider } from './context'
import { Form as FormType } from './interfaces'
import { editUser } from './services'
import * as S from './styled'

const MyData = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const { close: closeTab } = useRouteTabContext(route)

  const { refreshUser, user } = useHomeContext()

  const [modal, setModal] = useState<ModalState>(null)

  const {
    data,
    form,
    registerFields,
    loading: [loading, setLoading],
  } = useContext()

  const {
    getValues,
    formState: { isDirty, errors, dirtyFields },
    handleSubmit,
    reset,
  } = form

  useEffect(() => {
    registerFields()
  }, [])

  const onClickCancel = () => {
    closeTab(0)
  }

  const onSubmitFail = () => {
    const values = getValues()
    console.error({ errors, values })

    setModal({
      title: 'Notificação',
      content: (
        <p>
          Para salvar é necessário preencher todos os campos obrigatórios deste
          formulário! Os campos obrigatórios estão sinalizados em vermelho.
        </p>
      ),
      actions: [
        {
          color: 'red',
          content: 'Entendi',
          onClick: () => setModal(null),
        },
      ],
    })
  }

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    setLoading(true)

    try {
      await editUser(formData, dirtyFields, user.id)

      refreshUser()

      setModal({
        title: 'Confirmação',
        content: 'Seu cadastro foi atualizado com sucesso.',
        actions: [
          {
            className: 'secondary',
            content: 'Ir para Home',
            onClick: () => {
              closeTab(0)
            },
          },
          {
            content: 'Continuar Edição',
            onClick: () => {
              reset({ ...formData })
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
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <React.Fragment>
      <Header description='Utilize as informações abaixo para visualizar os seus dados cadastrais' />

      <S.Form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
        {loading && (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        )}

        <S.FormContainer>
          <S.Section>
            <Avatar />
          </S.Section>

          <S.Section>
            <SystemData />
          </S.Section>

          <S.Section>
            <BasicData />
          </S.Section>

          <S.Section>
            <Address />
          </S.Section>

          <S.Section>
            <GeneralContact />
          </S.Section>

          <S.Footer
            buttons={[
              {
                children: 'Cancelar',
                onClick: onClickCancel,
                type: 'button',
                appearance: 'bordered',
                disabled: loading,
              },
              {
                children: 'Salvar',
                type: 'submit',

                disabled:
                  loading ||
                  (!isDirty && Object.keys(dirtyFields).length === 0),
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
    </React.Fragment>
  )
}, Provider)

export default MyData
