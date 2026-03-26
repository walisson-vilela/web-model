import { useCallback, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwInput } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Grid } from '../../../../../components/FormFields'
import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { ValidationError } from '../../../../../standardized/components/form/modals'
import { useEndpointValidation } from '../../../../../utils/hooks'

import { CreateProps, FormInterface } from './interfaces'
import getSchema, { getDefaultValues } from './schema'
import { save } from './services'
import { ErrorMessage } from './styles'

const Create = ({ close, editData, reload }: CreateProps) => {
  const [validationErrors, setValidationErrors] = useState<GenericObject>()

  const resolver = yupResolver(getSchema()) as Resolver<FormInterface>
  const form = useForm<FormInterface>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultValues(editData),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const {
    formState: { isDirty, errors },
    handleSubmit,
    control,
  } = form

  const nameCheck = useEndpointValidation<FormInterface>({
    endpoint: '/v1/tr/suppliers/check-name',
    formKey: 'name',
    formInstance: form,
    exceptID: editData && editData.id,
    minLength: 3,
    messages: {
      invalid: 'O nome informado já está sendo utilizado.',
    },
  })

  const codeCheck = useEndpointValidation({
    endpoint: '/v1/tr/suppliers/check-code',
    key: 'code',
    formKey: 'code',
    formInstance: form,
    exceptID: editData && editData.id,
    messages: {
      invalid: 'O código informado já está sendo utilizado.',
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormInterface> = useCallback(
    async (data) => {
      if (!nameCheck.isValid || !codeCheck.isValid) return

      setLoading(true)

      try {
        const response = await save(data, editData ? editData.id : null)

        if (response.success === true) {
          toast(<ToasterContent color='normal' />, SuccessStyle)
          reload()
          close()
          return
        } else {
          setValidationErrors(response.errors)
        }
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
    },
    [editData?.id, nameCheck.isValid, codeCheck.isValid],
  )

  const isInvalid = useCallback(
    (field: keyof FormInterface) => {
      return field in form.formState.errors && form.formState.submitCount > 0
    },
    [form.formState.errors, form.formState.submitCount],
  )

  return (
    <Modal
      modal={{
        size: 'small',
        title: editData ? 'Editar Fabricante' : 'Criar Fabricante',
        titleColor: 'blue',
        content: (
          <form
            id='supplier-form'
            onSubmit={handleSubmit(onSubmit, console.error)}
          >
            <div style={{ height: 240 }}>
              <Grid.Row itemSpacing={28}>
                <Grid.Column size={6}>
                  <Controller
                    control={control}
                    name='name'
                    render={({ field: props }) => (
                      <MwInput
                        {...props}
                        type='text'
                        label='Atribua um nome para o Fabricante'
                        placeholder='Exemplo: Biscoitos ABC'
                        loading={nameCheck.loading}
                        invalid={
                          isInvalid('name') || nameCheck.isValid === false
                        }
                        required
                        autoFocus
                      />
                    )}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row itemSpacing={3.5}>
                <ErrorMessage>
                  {errors.name
                    ? errors.name.message
                    : nameCheck.isValid === false
                    ? nameCheck.message
                    : null}
                </ErrorMessage>
              </Grid.Row>

              <Grid.Row itemSpacing={14}>
                <Grid.Column size={3}>
                  <Controller
                    control={control}
                    name='code'
                    render={({ field: props }) => (
                      <MwInput
                        {...props}
                        type='text'
                        label='Código'
                        placeholder='Exemplo: 123456'
                        loading={codeCheck.loading}
                        invalid={
                          isInvalid('code') || codeCheck.isValid === false
                        }
                        mask={[/\D/g, '']}
                      />
                    )}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row itemSpacing={3.5}>
                <ErrorMessage>
                  {errors.code
                    ? errors.code.message
                    : codeCheck.isValid === false
                    ? codeCheck.message
                    : null}
                </ErrorMessage>
              </Grid.Row>
            </div>

            {validationErrors && (
              <ValidationError
                errors={validationErrors}
                onClose={() => setValidationErrors(null)}
                fields={{
                  name: {
                    label: 'Nome',
                    handler: () => {
                      form.setValue('name', editData ? editData.name : '')
                    },
                  },
                  code: {
                    label: 'Código',
                    handler: () => {
                      form.setValue('code', editData ? editData.code : null)
                    },
                  },
                }}
              />
            )}
          </form>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={close}
          />,

          <MwButton
            type='submit'
            form='supplier-form'
            content={editData ? 'Salvar' : 'Criar'}
            loading={loading}
            disabled={
              !isDirty || nameCheck.loading || codeCheck.loading || loading
            }
          />,
        ],
      }}
    />
  )
}

export default Create
