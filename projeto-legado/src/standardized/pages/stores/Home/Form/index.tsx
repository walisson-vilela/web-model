import React, { useCallback, useState } from 'react'

import { MwLoader, MwScrollContainer } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { createRouteTab } from '../../../../../routes'

import * as Modals from './Modals'
import useFormContext, { Provider } from './context'
import { Form as FormInterface } from './interfaces'
import * as Sections from './sections'
import { saveStore } from './services'
import * as S from './styled'

const Form = createRouteTab<{ id?: string }>(() => {
  const {
    mode,
    closeTab,
    loading: [loading, setLoading],

    form,
    modal: [modal, setModal],

    dirtyFields,
    data,
    loadData,
    createNotFoundModal,
  } = useFormContext()

  const { getValues, watch, handleSubmit, reset } = form

  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>(null)

  Modals.useLocatedStoresModal({ form, setModal, loading, mode, closeTab })

  const createAfterSaveModal = (modeModal: 'create' | 'update', id: number) => {
    setModal({
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          <p>
            Seu cadastro foi {modeModal === 'update' ? 'editado' : 'realizado'}{' '}
            com sucesso.
          </p>
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Ir para Home',
          secondary: true,
          onClick: () => {
            closeTab(
              mode === 'base-stores'
                ? '/main/stores/base'
                : '/main/stores/home',
            )
          },
        },
        {
          content: 'Continuar edição',
          secondary: true,
          onClick: () => {
            if (modeModal === 'create') {
              closeTab(`/main/stores/home/edit/${id}`)
            } else {
              setModal(null)
              loadData(id)
            }
          },
        },
        ...(mode === 'base-stores'
          ? []
          : [
              {
                primary: true,
                content: 'Novo Cadastro',
                onClick: () => {
                  if (modeModal === 'create') {
                    setModal(null)
                    reset()
                    setLoading(false)
                  } else {
                    closeTab('/main/stores/home/create')
                  }
                },
              },
            ]),
      ],
    })
  }

  const onSubmit: SubmitHandler<FormInterface> = useCallback(
    async (form) => {
      setLoading(true)

      try {
        if (!data) {
          const response = await saveStore(form, dirtyFields, null, mode)
          if (response.success === true) {
            createAfterSaveModal('create', response.id)
          } else {
            setValidationErrors(response.errors)
            setLoading(false)
          }
        } else {
          const response = await saveStore(form, dirtyFields, data.id, mode)
          if (response.success === true) {
            reset(getValues())
            createAfterSaveModal('update', data.id)
          } else {
            setValidationErrors(response.errors)
            setLoading(false)
          }
        }
      } catch (e) {
        if (data?.id && isAxiosError(e) && e.response?.status === 404) {
          createNotFoundModal()
        } else {
          console.error(e)
          toast(<ToasterContent color='error' />, ErrorStyle)
        }

        setLoading(false)
      }
    },
    [dirtyFields, data, mode],
  )

  const source_address = watch('source_address')
  const onSubmitFail: SubmitErrorHandler<FormInterface> = useCallback(
    (error) => {
      if (error.source_status?.type === 'IS_INVALID') {
        setModal(
          <Modals.NotificateInvalidAddress
            data={source_address}
            close={() => setModal(null)}
            mode='save'
          />,
        )
        return
      }

      console.error({ error, values: getValues() })
      setModal({
        size: 'tiny',
        title: 'Notificação',
        titleColor: 'white',
        content:
          'Para salvar, é necessário preencher todos os campos obrigatórios deste formulário! Os campos obrigatórios estão sinalizados em vermelho.',
        buttonType: 'MwButton',
        actions: [
          {
            content: 'Entendi',
            color: 'red',
            onClick: () => setModal(null),
          },
        ],
      })
    },
    [source_address],
  )

  return (
    <React.Fragment>
      <S.Form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
        {loading && <MwLoader filled zIndex={4} />}

        <MwScrollContainer style={{ display: 'unset ' }}>
          {mode === 'stores' && (
            <S.Section>
              <Sections.Status />
            </S.Section>
          )}

          <S.Section>
            <Sections.DocumentData />
          </S.Section>

          <S.Section>
            <Sections.StoreData />
          </S.Section>

          <S.Section>
            <Sections.Address />
          </S.Section>

          {mode === 'stores' && (
            <S.Section>
              <Sections.Contacts />
            </S.Section>
          )}

          <Sections.Footer />
        </MwScrollContainer>
      </S.Form>

      <Modal modal={modal} />

      <Modals.ValidationErrors
        validationErrors={[validationErrors, setValidationErrors]}
      />

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}, Provider)

export default Form
