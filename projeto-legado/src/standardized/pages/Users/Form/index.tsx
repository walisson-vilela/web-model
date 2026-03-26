import React, { useCallback, useState } from 'react'

import { MwScrollContainer } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'
import { SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { createRouteTab } from '../../../../routes'
import { useHookFormsAsState } from '../../../../utils/hooks'
import { ValidationError } from '../../../components/form/modals'
import { isObject } from '../../../utils/validators'
import useHomeContext from '../../Home/context'

import UserProgramingActivate from './Modals/UserProgramingActivate'
import useFormContext, { Provider } from './context'
import { Form as FormInterface } from './interfaces'
import * as Sections from './sections'
import { saveUser } from './services'

const Form = createRouteTab<{ id: string }>((props) => {
  const {
    data: { route },
  } = props

  const { history } = route

  const {
    loadData,
    loadLicenses,
    loading: [loading, setLoading],
    modal: [modal, setModal],
    form,
    originals,
    dirtyFields,
    closeTab,
    data,
  } = useFormContext()

  const { hasMenu } = useHomeContext()

  const { getValues, handleSubmit } = form

  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>()

  const [, setHierarchies] = useHookFormsAsState('hierarchies', form)

  const createAfterSaveModal = () => {
    const { buttons } = hasMenu('/main/users/people')
      ? {
          buttons: [
            {
              type: 'button' as const,
              size: 'large' as const,
              onClick: () => {
                closeTab('/main/users/people')
                setTimeout(
                  () => history.push('/main/users/people/create'),
                  1000,
                )
              },
              children: 'Novo Cadastro',
            },
          ],
        }
      : {
          buttons: [],
        }

    setModal({
      size: 'small',
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          <p>Seu cadastro foi editado com sucesso.</p>
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
            closeTab('/main/users/home')
          },
        },
        {
          type: 'button',
          size: 'large',
          children: 'Continuar edição',
          appearance: 'bordered',
          onClick: () => {
            setModal(null)
            loadData()
          },
        },
        ...buttons,
      ],
    })
  }

  const onSave = useCallback(
    async (values: FormInterface, activation?: Date): Promise<boolean> => {
      setLoading(true)

      try {
        const response = await saveUser(
          values,
          dirtyFields,
          data.id,
          activation,
        )
        if (response.success === true) {
          createAfterSaveModal()
          return true
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
          return false
        }

        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
      return false
    },
    [data.id, dirtyFields],
  )

  const onSubmit: SubmitHandler<FormInterface> = useCallback(
    async (values) => {
      if (values.status === 'PC') {
        setModal(
          <UserProgramingActivate
            onSave={async (activation) => await onSave(values, activation)}
            onClose={() => setModal(null)}
          />,
        )
      } else {
        onSave(values)
      }
    },
    [onSave],
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
      <MwScrollContainer
        spacing={{ top: 's5' }}
        loading={loading && { zIndex: 4 }}
      >
        <form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
          <Sections.Status />

          <Sections.UserReplacement />

          <Sections.InitialData />

          <Sections.Hierarchies />

          <Sections.ComplementData />

          <Sections.WorkShift />

          <Sections.DisplacementParams />

          <Sections.Footer />
        </form>
      </MwScrollContainer>

      <Modal modal={modal} />

      {validationErrors && (
        <ValidationError
          errors={validationErrors}
          onClose={() => setValidationErrors(null)}
          fields={{
            replaced_by: {
              label: 'Usuário a ser substituído',
              handler: () => {
                const replace = form.getValues('replace')
                form.setValue('replace', {
                  ...(replace || { items: [] }),
                  user: null,
                })
                form.setValue('role', originals.role)
                form.setValue('hierarchies', originals.hierarchies)
                form.setValue('route_contractor', originals.route_contractor)
              },
            },
            role_id: {
              label: 'Função',
              handler: () => {
                form.setValue('role', originals.role)
                form.setValue('hierarchies', originals.hierarchies)
                form.setValue('route_contractor', originals.route_contractor)
              },
            },
            hierarchies_users: {
              label: 'Pilares',
              handler: (error) => {
                if (!isObject(error) && !Array.isArray(error)) return

                setHierarchies((prev) => {
                  const hierarchies = prev.reduce<typeof prev>(
                    (hierarchies, h, i) => {
                      if (!(i in error)) return [...hierarchies, h]

                      if (!isObject(error[i]) && !Array.isArray(error[i])) {
                        return hierarchies
                      }

                      if ('hierarchy_id' in error[i]) return hierarchies

                      return [
                        ...hierarchies,
                        {
                          ...h,

                          ...('superior_id' in error[i]
                            ? {
                                superior_id: null,
                              }
                            : {}),

                          ...('regions_users' in error[i]
                            ? {
                                regions: (() => {
                                  if (
                                    !isObject(error[i].regions_users) &&
                                    !Array.isArray(error[i].regions_users)
                                  ) {
                                    return []
                                  }

                                  return h.regions.filter((r, j) => {
                                    return !(j in error[i].regions_users)
                                  })
                                })(),
                              }
                            : {}),
                        },
                      ]
                    },
                    [],
                  )

                  return hierarchies
                })
              },
            },
            licenses: {
              label: 'Cotas Disponíveis',
              handler: () => {
                form.setValue('role', originals.role)
                form.setValue('hierarchies', originals.hierarchies)
                form.setValue('route_contractor', originals.route_contractor)
                loadLicenses()
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
