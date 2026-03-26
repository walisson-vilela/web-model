import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton } from '@mw-kit/mw-ui'
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

  const [file, setFile] = useState<string>('')
  const [fileUploaded, setFileUploaded] = useState<boolean>(true)

  const grandparentId = form.watch('grandparent_id')

  const nameCheck = useEndpointValidation<formType>({
    endpoint: '/v1/tr/markets/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: {
      level: 3,
      id: editData && editData.id,
      parent_id: grandparentId,
    },
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  const onSubmit: SubmitHandler<formType> = useCallback(
    async (formData: formType) => {
      if (!nameCheck.isValid) return

      setLoadingForm(true)

      try {
        await submit(
          formData,
          editData ? editData.id : null,
          file,
          fileUploaded,
        )

        toast(<ToasterContent color='normal' />, SuccessStyle)
        loadData()
        setOpen(<React.Fragment />)
      } catch (e) {
        console.log(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      } finally {
        setLoadingForm(false)
      }
    },
    [nameCheck.isValid],
  )

  useEffect(() => {
    if (grandparentId) {
      nameCheck.trigger()
    } else {
      form.setValue('name', '', { shouldDirty: true, shouldValidate: true })
    }
  }, [grandparentId])

  useEffect(() => {
    if (editData) {
      form.register('id')
      if (editData.avatar) setFile(editData.avatar)
    }
  }, [])

  const isInvalid = useCallback(
    (field: keyof formType) =>
      form.formState.submitCount > 0 && field in form.formState.errors,
    [form.formState.submitCount, form.formState.errors],
  )

  return (
    <Modal.Modal
      style={{
        width: '642px',
        height: '438px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
      open
      size='small'
    >
      <Modal.Header color='blue'>
        {editData ? 'Editar Bandeira' : 'Criar Bandeira'}
      </Modal.Header>

      <Modal.Body style={{ padding: '0' }}>
        <Provider
          value={{
            file: [file, setFile],
            fileUploaded: [fileUploaded, setFileUploaded],
            isInvalid,

            form,
            loadData,
            nameCheck,
            setOpen,
            editData,
          }}
        >
          <S.Content>
            <form
              id='create'
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete='off'
            >
              <div>
                <Inputs.GranparentId />
              </div>

              <div>
                <Inputs.ParentId />
              </div>

              <div>
                <Inputs.Name />
              </div>
            </form>

            <Inputs.ImageUpload />
          </S.Content>
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
          disabled={
            !editData
              ? !form.formState.isDirty || loadingForm || nameCheck.loading
              : !form.formState.isDirty && fileUploaded
          }
          style={{ width: 105, height: 33 }}
          loading={loadingForm}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Create
