import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from 'semantic-ui-react'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { useEndpointValidation } from '../../../../../utils/hooks'

import { Provider } from './context'
import * as Inputs from './inputs'
import { CreateProps, formType } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { submit } from './services'

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

  const parentId = form.watch('parent_id')

  const nameCheck = useEndpointValidation<formType>({
    endpoint: '/v1/tr/markets/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: { level: 2, id: editData && editData.id, parent_id: parentId },
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  const onSubmit: SubmitHandler<formType> = useCallback(
    async (formData: formType) => {
      if (!nameCheck.isValid) return

      setLoadingForm(true)

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
  const isInvalid = useCallback(
    (field: keyof formType) =>
      form.formState.submitCount > 0 && field in form.formState.errors,
    [form.formState.submitCount, form.formState.errors],
  )

  useEffect(() => {
    parentId
      ? nameCheck.trigger()
      : form.setValue('name', '', { shouldDirty: true, shouldValidate: true })
  }, [parentId])

  return (
    <Modal.Modal
      style={{
        width: '642px',
        height: '356px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
      open
      size='small'
    >
      <Modal.Header color='blue'>
        {editData ? 'Editar Rede' : 'Criar Rede'}
      </Modal.Header>

      <Modal.Body>
        <Provider
          value={{ editData, form, nameCheck, loadData, setOpen, isInvalid }}
        >
          <form
            id='create'
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete='off'
            style={{ width: '100%' }}
          >
            <MwGrid
              borderless
              spacing='0'
              rows={{ borderless: true }}
              style={{ gap: '21px' }}
            >
              <MwGrid.Row>
                <MwGrid.Col width='6'>
                  <Inputs.NetworkId />
                </MwGrid.Col>
              </MwGrid.Row>

              <MwGrid.Row>
                <MwGrid.Col width='6'>
                  <Inputs.Name />
                </MwGrid.Col>
              </MwGrid.Row>

              {loadingForm && <MwLoader filled />}
            </MwGrid>
          </form>
        </Provider>
      </Modal.Body>

      <Modal.Footer>
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
          disabled={!form.formState.isDirty || loadingForm || nameCheck.loading}
          style={{ width: 105, height: 33 }}
          loading={loadingForm}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Create
