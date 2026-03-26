import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwInput, MwLoader } from '@mw-kit/mw-ui'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Form } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { useEndpointValidation } from '../../../../../utils/hooks'

import { CreateProps, formType } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { submit } from './services'
import * as S from './styles'

const Create = ({ setOpen, editData, loadData }: CreateProps) => {
  const resolver = yupResolver(formSchema) as Resolver<formType>
  const form = useForm<formType>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(editData || {}),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })
  const [loadingForm, setLoadingForm] = useState<boolean>(false)

  const nameCheck = useEndpointValidation<formType>({
    endpoint: '/v1/tr/markets/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: { level: 1, id: editData && editData.id },
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  const isInvalid = useCallback(
    (field: keyof formType) =>
      form.formState.submitCount > 0 && field in form.formState.errors,
    [form.formState.submitCount, form.formState.errors],
  )

  const onSubmit: SubmitHandler<formType> = useCallback(
    async (formData: formType) => {
      if (!nameCheck.isValid) return

      setLoadingForm(true)
      formData.level = 1
      try {
        const { success } = await submit(
          formData,
          editData ? editData.id : null,
        )

        if (success) {
          toast(<ToasterContent color='normal' />, SuccessStyle)
          loadData()
          setOpen(<React.Fragment />)
        }
      } catch (e) {
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoadingForm(false)
    },
    [nameCheck.isValid],
  )

  useEffect(() => {
    if (editData) {
      form.register('id')
    } else {
      form.setValue('active', false)
    }
  }, [])

  return (
    <S.Container>
      <S.Header>{editData ? 'Editar Grupo' : 'Criar Grupo'}</S.Header>

      <S.Content>
        {loadingForm ? (
          <MwLoader />
        ) : (
          <form
            id='create'
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete='off'
            style={{ width: '100%' }}
          >
            <Form.Field error={form.formState.errors.name}>
              <S.FormContent>
                <Controller
                  control={form.control}
                  name='name'
                  render={({ field: props }) => {
                    return (
                      <MwInput
                        {...props}
                        label={
                          editData
                            ? 'Nome do Grupo'
                            : 'Atribua um nome para o grupo*'
                        }
                        placeholder='Exemplo: KA Nacional'
                        loading={nameCheck.loading}
                        invalid={
                          isInvalid('name') || nameCheck.isValid === false
                        }
                      />
                    )
                  }}
                />
                <S.ErrorMessage children={nameCheck.message} />
              </S.FormContent>
            </Form.Field>
          </form>
        )}
      </S.Content>

      <S.Footer>
        <div>
          <Button
            basic
            className='tertiary'
            type='button'
            content='Cancelar'
            onClick={() => setOpen(<React.Fragment />)}
          />

          <MwButton
            form='create'
            type='submit'
            color='blue'
            content={editData ? 'Salvar' : 'Criar'}
            disabled={
              !form.formState.isDirty || loadingForm || nameCheck.loading
            }
            style={{ width: 105, height: 33 }}
            loading={loadingForm}
          />
        </div>
      </S.Footer>
    </S.Container>
  )
}

export default Create
