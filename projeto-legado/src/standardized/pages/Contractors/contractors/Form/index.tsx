import React, { useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import useRouteTabContext, { createRouteTab } from '../../../../../routes'
import { ContractInfo } from '../../../../../screens/ContractorClient/components'
import { booleanOrDefault, keys } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import { useHookFormsAsState } from '../../../../../utils/hooks'
import { ValidationError } from '../../../../components/form/modals'
import { Address } from '../../../../components/form/sections'
import useHomeContext from '../../../Home/context'

import * as Components from './components'
import useContext, { Provider } from './context'
import { formParser, saveParser } from './parsers'
import { createContractor, updateContractor } from './services'
import * as S from './styled'
import { Form as FormInterface } from './types'

const Form = createRouteTab<{ id?: string }>((props) => {
  const {
    data: { route },
  } = props
  const { close: closeTab } = useRouteTabContext(route)

  const { contractor: group, refreshContractor: handleGetGroup } =
    useHomeContext()

  const {
    data,
    viewMode,
    modal,
    setModal,
    loading: [loading, setLoading],
    loadData,
    form,
    originals,
    dirty: { isDirty, dirtyFields },
    isMaster,
    contractInfo,
  } = useContext()

  const {
    setValue,
    setValueOptions,
    getValues,
    handleSubmit,
    reset,
    watch,
    isInvalid,
  } = form

  const name = watch('name')

  const [validationErrors, setValidationErrors] =
    useState<GenericObject | null>()

  const onClickCancel = () => {
    closeTab('/main/accounts/contractors')
  }

  const createAfterSaveModal = (mode: 'create' | 'update', id: number) => {
    setModal({
      title: 'Confirmação!',
      content: (
        <React.Fragment>
          <p>
            {' '}
            Seu cadastro foi {mode === 'update' ? 'editado' : 'realizado'} com
            sucesso.{' '}
          </p>
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Ir para Home',
          secondary: true,
          onClick: () => {
            closeTab('/main/accounts/contractors')
          },
        },
        {
          content: 'Continuar edição',
          secondary: true,
          onClick: () => {
            if (mode === 'create') {
              closeTab(`/main/accounts/contractors/edit/${id}`)
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
              closeTab('/main/accounts/contractors/create')
            }
          },
        },
      ],
    })
  }

  const onSubmit: SubmitHandler<FormInterface> = async (values) => {
    setLoading(true)

    try {
      const payload = await saveParser(
        values,
        data,
        dirtyFields,
        originals,
        isMaster,
      )

      const handleValidationErrors = (errors: GenericObject) => {
        if ('licenses' in errors) {
          return setModal({
            title: 'Licenças Indisponíveis',
            content: (
              <S.LincensesErrorContainer>
                <div>
                  Não foi possível salvar os dados pois houveram atualizações no
                  controle de licenças. Outra(s) conta(s) podem ter adicionado
                  estas licenças antes de você, ou usuários já podem estar
                  consumindo as licenças que está tentando reduzir.
                </div>
                <div>
                  Você pode <b>Revisar dados</b> para reajustar a quantidade de
                  licenças e tentar salvar novamente ou <b>Ignorar e salvar</b>,
                  salvando todos os outros dados do formulário com exceção do
                  controle de licenças.
                </div>
              </S.LincensesErrorContainer>
            ),
            buttonType: 'MwButton',
            actions: [
              {
                type: 'button',
                appearance: 'bordered',
                children: 'Revisar dados',
                onClick: async () => {
                  setModal(null)
                  await loadData(data ? data.id : null)
                  const v = { ...values }

                  keys(v).forEach((field) => setValue(field, v[field]))
                },
              },
              {
                type: 'button',
                appearance: 'bordered',
                children: 'Ignorar e salvar',
                onClick: () => {
                  setModal(null)
                  const v = { ...values }

                  onSubmit(v)
                },
              },
            ],
          })
        }

        return setValidationErrors(errors)
      }

      if (!data.id) {
        const response = await createContractor(payload)

        if (response.success && !response.errors) {
          createAfterSaveModal('create', response.id)
        } else if (response.errors) {
          handleValidationErrors(response.errors)
        }
      } else {
        const response = await updateContractor(
          data.id,
          payload,
          async (id) => {
            if (!group || group.id !== id) return
            await handleGetGroup()
          },
        )
        response.success === true
          ? createAfterSaveModal('update', data.id)
          : handleValidationErrors(response.errors)
      }
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }

  const onSubmitFail: SubmitErrorHandler<FormInterface> = (errors) => {
    console.error(errors)
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

  const userAssociated = useHookFormsAsState('user_associated', {
    watch,
    setValue,
  })

  return (
    <React.Fragment>
      <Address.Provider
        value={{
          viewMode,
          form: {
            ...form,
            setValue: ((name, value, config) => {
              form.setValue(name, value as never, {
                ...setValueOptions,
                ...(config || {}),
              })
            }) as typeof form.setValue,
          },
        }}
      >
        <S.Form
          isViewMode={() => {
            return booleanOrDefault(viewMode)
          }}
          onSubmit={handleSubmit(onSubmit, onSubmitFail)}
        >
          {loading && <MwLoader zIndex={99} filled />}

          <S.FormContainer>
            <S.Section>
              <Components.Status />
            </S.Section>

            <S.Section>
              <Components.Avatar
                form={{ ...form, setValueOptions } as never}
                setModal={setModal}
                viewMode={viewMode}
              />
            </S.Section>

            <S.Section>
              <Components.BasicData />

              <Address textInformation='Avalie se a conta está devidamente geoposicionada.' />
            </S.Section>

            {isMaster ? (
              <S.Section>
                <Components.ResponsibleAdministrator />
              </S.Section>
            ) : (
              <React.Fragment>
                <S.Section>
                  <Components.ResponsibleTeam
                    value={userAssociated}
                    setModal={setModal}
                    viewMode={viewMode}
                    typeForm='conta'
                    name={name}
                  />
                </S.Section>

                <S.Section>
                  <Components.UserAllocation
                    control={form.control as never}
                    isInvalid={isInvalid}
                    type='contas'
                    viewMode={viewMode}
                  />
                </S.Section>
              </React.Fragment>
            )}

            {isMaster && contractInfo && (
              <S.Section>
                <ContractInfo data={contractInfo} setModal={setModal} />
              </S.Section>
            )}

            <S.Section>
              <Components.LicenseControl />
            </S.Section>

            <S.Section>
              <Components.FormDefinition />
            </S.Section>

            <S.Section>
              <Components.Terms mode='termsOfUse' />
            </S.Section>

            <S.Section>
              <Components.Terms mode='privacyPolicy' />
            </S.Section>

            <S.Section>
              <Components.PPTTemplate />
            </S.Section>

            <S.Footer
              buttons={[
                ...(viewMode
                  ? []
                  : [
                      {
                        type: 'button' as const,
                        onClick: onClickCancel,
                        disabled: loading,
                        appearance: 'bordered' as const,
                        children: 'Cancelar',
                      },
                    ]),
                {
                  type: 'submit',
                  disabled: loading || (!isDirty && dirtyFields.length === 0),

                  children: 'Salvar',
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
      </Address.Provider>

      <Modal modal={modal} />

      {validationErrors && (
        <ValidationError
          errors={validationErrors}
          onClose={() => setValidationErrors(null)}
          fields={{
            document: {
              label: 'CNPJ',
              handler: () => {
                form.setValue('document', data?.document || '')
              },
            },
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
            subdomain: {
              label: 'Nome do Subdomínio',
              handler: () => {
                form.setValue('subdomain', data?.subdomain || '')
              },
            },
            contractor_region_countries: {
              label: 'País de Atuação',
              handler: (error) => {
                if (isObject(error) || Array.isArray(error)) {
                  const indexes = Object.keys(error).map((e) =>
                    Number.parseInt(e),
                  )
                  if (!indexes.some((e) => e === null)) {
                    const occupationArea = getValues('occupationArea')
                    indexes
                      .sort((a, b) => b - a)
                      .forEach((i) => occupationArea.splice(i, 1))
                    form.setValue('occupationArea', occupationArea)
                  }
                }
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
                    const user_associated = getValues('user_associated')
                    indexes
                      .sort((a, b) => b - a)
                      .forEach((i) => user_associated.splice(i, 1))
                    form.setValue('user_associated', user_associated)
                  }
                }
              },
            },
            contractors_forms: {
              label: 'Definição dos formulários',
              handler: (error) => {
                if (isObject(error) || Array.isArray(error)) {
                  const indexes = Object.keys(error).map((e) =>
                    Number.parseInt(e),
                  )
                  if (!indexes.some((e) => e === null)) {
                    const forms = getValues('forms')
                    indexes
                      .sort((a, b) => b - a)
                      .forEach((i) => forms.splice(i, 1))
                    form.setValue('forms', forms)
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
