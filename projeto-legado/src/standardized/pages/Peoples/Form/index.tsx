import React, { useCallback, useState } from 'react'

import type { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'
import type { SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from 'semantic-ui-react'

import Modal from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { createRouteTab } from '../../../../routes'
import { Footer } from '../../../components/form/components'
import { ValidationError } from '../../../components/form/modals'
import { Address } from '../../../components/form/sections'
import { isObject } from '../../../utils/validators'
import useHomeContext from '../../Home/context'

import { Avatar, BasicData, ComplementData, Contact } from './components'
import useFormContext, { Provider, setValueOptions } from './context'
import type { Form as FormInterface } from './interfaces'
import { savePerson } from './services'
import * as S from './styled'

const Form = createRouteTab<{ id: string }>((props) => {
  const {
    data: { route },
  } = props

  const { history } = route

  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>()

  const {
    form,
    data,
    modal: [modal, setModal],
    loading: [loading, setLoading],
    closeTab,
    loadData,
    validations: [validations],

    originals,

    dirtyFields,
    isDirty,

    id,
    loadRegistrationRequired,
  } = useFormContext()

  const { hasMenu } = useHomeContext()

  const { getValues, reset, handleSubmit } = form

  const createAfterSaveModal = (id: number, mode: 'create' | 'update') => {
    const { sufix, buttons } = hasMenu('/main/users/home')
      ? {
          sufix: 'Para criar o Usuário é necessário completar o cadastro.',
          buttons: [
            {
              type: 'button' as const,
              size: 'large' as const,
              onClick: () => {
                closeTab('/main/users/home')
                setTimeout(
                  () => history.push(`/main/users/home/edit/${id}`),
                  1000,
                )
              },
              children: 'Completar Cadastro',
            },
          ],
        }
      : {
          sufix: '',
          buttons: [],
        }

    setModal({
      size: 'small',
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          <p>
            Seu cadastro foi {mode === 'update' ? 'editado' : 'realizado'} com
            sucesso. {sufix}
          </p>
        </React.Fragment>
      ),
      buttonType: 'MwButton',
      actions: [
        {
          type: 'button',
          size: 'large',
          children: 'Ir para Home',
          appearance: 'bordered',
          onClick: () => {
            closeTab('/main/users/people')
          },
        },
        {
          type: 'button',
          size: 'large',
          children: 'Continuar edição',
          appearance: 'bordered',
          onClick: () => {
            if (mode === 'create') {
              closeTab(`/main/users/people/edit/${id}`)
            } else {
              setModal(null)
              loadData(id)
            }
          },
        },
        {
          type: 'button',
          size: 'large',
          children: 'Novo Cadastro',
          appearance: 'bordered',
          onClick: () => {
            if (mode === 'create') {
              setModal(null)
              reset()
              setLoading(false)
            } else {
              closeTab('/main/users/people/create')
            }
          },
        },
        ...buttons,
      ],
    })
  }

  const onSubmit: SubmitHandler<FormInterface> = useCallback(
    async (values) => {
      if (Object.values(validations).some((item) => item !== true)) {
        console.error(validations)
        return
      }

      setLoading(true)

      try {
        const response = await savePerson(values, dirtyFields, id)
        if (response.success === true) {
          createAfterSaveModal(response.id, id ? 'update' : 'create')
          return
        }

        setValidationErrors(response.errors)
      } catch (e) {
        if (
          isAxiosError(e) &&
          isObject(e.response) &&
          e.response.status === 404
        ) {
          setModal({
            title: 'Notificação',
            content: 'Registro não encontrado',
            buttonType: 'MwButton',
            actions: [
              {
                content: 'Ir para Home',
                onClick: () => closeTab('/main/users/people'),
              },
            ],
          })
          return
        }

        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
    },
    [id, dirtyFields, validations],
  )

  const onSubmitFail = (
    errors: Partial<{ [key in keyof FormInterface]: unknown }>,
  ) => {
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
      buttonType: 'MwButton',
      actions: [
        {
          color: 'warningRed',
          content: 'Entendi',
          onClick: () => setModal(null),
        },
      ],
    })
  }

  return (
    <React.Fragment>
      <S.Form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
        {loading && (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        )}

        <S.FormContainer>
          <S.Section>
            <Avatar
              form={{ ...form, setValueOptions } as never}
              setModal={setModal}
            />
          </S.Section>

          <S.Section>
            <BasicData />
          </S.Section>

          <S.Section>
            <Address.Provider
              value={{
                form: form,
              }}
            >
              <Address textInformation='Avalie se a pessoa está devidamente geoposicionada.' />
            </Address.Provider>
          </S.Section>

          <S.Section>
            <Contact />
          </S.Section>

          <S.Section>
            <ComplementData />
          </S.Section>

          <Footer
            buttons={[
              {
                type: 'button',
                appearance: 'bordered',
                children: 'Cancelar',
                onClick: () => {
                  if (!isDirty) {
                    closeTab('/main/users/people')
                    return
                  }

                  setModal({
                    title: 'Notificação',
                    content:
                      'Existem dados que ainda não foram salvos, vocês deseja realmente sair da tela?',
                    buttonType: 'MwButton',
                    actions: [
                      {
                        appearance: 'borderless',
                        type: 'button',
                        onClick: () => setModal(null),
                        children: 'Cancelar',
                      },
                      {
                        type: 'button',
                        onClick: () => {
                          closeTab('/main/users/people')
                          setModal(null)
                        },
                        children: 'Sim',
                      },
                    ],
                  })
                },
              },

              {
                type: 'submit',
                children: 'Salvar',
                disabled:
                  loading ||
                  dirtyFields.length < 1 ||
                  Object.values(validations).some((item) => item !== true),
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
      {validationErrors && (
        <ValidationError
          errors={validationErrors}
          onClose={() => setValidationErrors(null)}
          fields={{
            name: {
              label: 'Nome',
              handler: () => {
                form.setValue('name', originals.name)
              },
            },
            document: {
              label: 'CPF',
              handler: () => {
                form.setValue('document', originals.document)
              },
            },
            registration: {
              label: 'Matrícula',
              handler: () => {
                form.setValue('registration', originals.registration)
                loadRegistrationRequired()
              },
            },
            pis: {
              label: 'PIS',
              handler: () => {
                form.setValue('pis', originals.pis)
              },
            },
          }}
        />
      )}
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}, Provider)

export default Form
