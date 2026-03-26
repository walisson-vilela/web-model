import React, { useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import toast, { Toaster } from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import useRouteTabContext, { createRouteTab } from '../../../../../routes'
import { useHookFormsAsState } from '../../../../../utils/hooks'
import { ValidationError } from '../../../../components/form/modals'
import { isBoolean, isObject } from '../../../../utils/validators'
import useHomeContext from '../../../Home/context'

import * as Components from './components'
import useContext, { Provider } from './context'
import { formParser, saveParser } from './parser'
import { createContractor, updateContractor } from './services'
import * as S from './styles'

const Form = createRouteTab<{ id?: string }>(({ data: { route } }) => {
  const { close: closeTab } = useRouteTabContext(route)

  const {
    modal,
    viewMode,
    loading,
    setModal,
    form,
    data,
    loadData,
    setLoading,
  } = useContext()

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    isInvalid,
    reset,
    formState: { errors },
  } = form

  const name = watch('name')

  const { contractor: group, refreshContractor: handleGetGroup } =
    useHomeContext()

  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>()

  const createAfterSaveModal = (mode: 'create' | 'update', id: number) => {
    setModal({
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          <p>
            Seu cadastro foi {mode === 'update' ? 'editado' : 'realizado'} com
            sucesso.
          </p>
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Ir para Home',
          secondary: true,
          onClick: () => {
            closeTab('/main/accounts/contractors/groups')
          },
        },
        {
          content: 'Continuar edição',
          secondary: true,
          onClick: () => {
            if (mode === 'create') {
              closeTab(`/main/accounts/contractors/groups/edit/${id}`)
            } else {
              setModal(null)
              loadData(id)
            }
          },
        },
        {
          primary: true,
          content: 'Novo Cadastro',
          onClick: () => {
            if (mode === 'create') {
              setModal(null)
              reset(formParser())
            } else {
              closeTab('/main/accounts/contractors/groups/create')
            }
          },
        },
      ],
    })
  }

  const onSubmit = async () => {
    setLoading(true)
    const formData = getValues()
    try {
      const payload = await saveParser(formData)
      if (data.id === null) {
        const response = await createContractor(payload)
        response.success === true
          ? createAfterSaveModal('create', response.id)
          : setValidationErrors(response.errors)
      } else {
        const response = await updateContractor(
          data.id,
          payload,
          async (id) => {
            if (!group || group.id !== id) return
            await handleGetGroup()
          },
        )
        if (response.success === true) {
          createAfterSaveModal('update', data.id)
          reset(formData)
        } else setValidationErrors(response.errors)
      }
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const onSubmitFail = () => {
    const values = getValues()
    console.error({ errors, values })

    setModal({
      title: 'Notificação',
      content: (
        <p>
          Para salvar é necessário preencher todos os campos obrigatórios deste
          formulário! Os campos obrigatórios estão sinalizados em vermelho.{' '}
          <br />
          {values.group_associated.length < 1 &&
            'É necessário selecionar ao menos uma conta associada'}
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

  const userAssociated = useHookFormsAsState('associated_users', {
    watch,
    setValue,
  })

  return (
    <React.Fragment>
      <S.Form
        isViewMode={() => {
          return isBoolean(viewMode)
        }}
        onSubmit={handleSubmit(onSubmit, onSubmitFail)}
      >
        {loading && <MwLoader zIndex={99} filled />}

        <S.FormContainer>
          <S.Section>
            <Components.Status />
          </S.Section>

          <S.Section>
            <Components.Avatar />
          </S.Section>

          <S.Section>
            <Components.BasicData />
          </S.Section>

          <S.Section>
            <Components.GroupAssociated />
          </S.Section>

          <S.Section>
            <Components.ResponsibleTeam
              typeForm='agrupamento'
              viewMode={viewMode}
              value={userAssociated}
              setModal={setModal}
              name={name}
            />
          </S.Section>

          <S.Section>
            <Components.UserAllocation
              control={form.control as never}
              isInvalid={isInvalid}
              type='agrupamento'
              viewMode={viewMode}
            />
          </S.Section>

          <Components.Footer closeTab={closeTab} />
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
                form.setValue('name', data?.name || '')
              },
            },
            pdv: {
              label: 'Nome',
              handler: () => {
                form.setValue('name', data?.name || '')
              },
            },
            contractor_peoples: {
              label: 'Equipe Responsável',
              handler: (error) => {
                if (isObject(error) || Array.isArray(error)) {
                  const indexes = Object.keys(error).map((e) =>
                    Number.parseInt(e),
                  )
                  if (!indexes.some((e) => e === null)) {
                    const associated_users = getValues('associated_users')
                    indexes
                      .sort((a, b) => b - a)
                      .forEach((i) => associated_users.splice(i, 1))
                    form.setValue('associated_users', associated_users)
                  }
                }
              },
            },
            contractors_subcontractors: {
              label: 'Contas Associadas',
              handler: (error) => {
                if (isObject(error) || Array.isArray(error)) {
                  const indexes = Object.keys(error).map((e) =>
                    Number.parseInt(e),
                  )
                  if (!indexes.some((e) => e === null)) {
                    const group_associated = getValues('group_associated')
                    indexes
                      .sort((a, b) => b - a)
                      .forEach((i) => group_associated.splice(i, 1))
                    form.setValue('group_associated', group_associated)
                  }
                }
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
