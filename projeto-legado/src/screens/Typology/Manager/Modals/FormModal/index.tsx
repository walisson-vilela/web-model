import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton } from '@mw-kit/mw-ui'
import {
  Resolver,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { useEndpointValidation } from '../../../../../utils/hooks'

import * as Inputs from './inputs'
import { IFormModal, IFormType } from './interfaces'
import { formSchema, getDefaultData } from './schemas'
import { submit } from './services'

const FormModal = (props: IFormModal) => {
  const [loadingForm, setLoadingForm] = useState<boolean>(false)

  const { setOpen, editData, reload } = props

  const form = useForm<IFormType>({
    resolver: yupResolver(formSchema) as Resolver<IFormType>,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(editData),
  })

  const nameCheck = useEndpointValidation<IFormType>({
    endpoint: '/v1/tr/typologies/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: { id: editData && editData.id },
    messages: {
      invalid: 'O nome informado já esta sendo utilizado.',
    },
  })

  const onSubmit: SubmitHandler<IFormType> = async (formData: IFormType) => {
    setLoadingForm(true)

    try {
      const { success } = await submit(formData, editData ? editData.id : null)

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        reload()
        setOpen(<React.Fragment />)
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoadingForm(false)
  }

  const onSubmitFail: SubmitErrorHandler<IFormType> = (errors) => {
    console.error(errors, form.getValues())
  }

  return (
    <Modal.Modal
      open
      size='small'
      forwardedAs='form'
      onSubmit={form.handleSubmit(onSubmit, onSubmitFail)}
      autoComplete='off'
      style={{
        width: '642px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        height: '356px',
      }}
    >
      <Modal.Header color='blue'>
        {editData ? 'Editar tipologia' : 'Criar nova tipologia'}
      </Modal.Header>

      <Modal.Body>
        <div style={{ flex: 1 }}>
          <Inputs.Name form={form} nameCheck={nameCheck} editData={editData} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='link'
          content='Cancelar'
          onClick={() => setOpen(<React.Fragment />)}
        />

        <MwButton
          type='submit'
          color='blue'
          content={editData ? 'Salvar' : 'Criar'}
          loading={loadingForm}
          disabled={
            !form.formState.isDirty ||
            loadingForm ||
            nameCheck.loading ||
            !nameCheck.isValid
          }
          style={{ width: 105, height: 33 }}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}
export default FormModal
