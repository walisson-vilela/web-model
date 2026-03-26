import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Loader, MwButton, MwInput } from '@mw-kit/mw-ui'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { useEndpointValidation } from '../../../../utils/hooks'

import { CreateProps, formType } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { createSegment, editSegment } from './services'
import * as S from './styled'

const Create = ({ loadData, setOpen, editData }: CreateProps) => {
  const form = useForm<formType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(editData || {}),
  })

  const [loading, setLoading] = useState<boolean>(false)

  const nameCheck = useEndpointValidation<formType>({
    endpoint: '/v1/tr/segments/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: { id: editData && editData.id },
    messages: {
      invalid: 'O nome informado já está sendo utilizado.',
    },
  })

  const onSubmit = async () => {
    setLoading(true)
    const name = form.getValues('name')
    try {
      editData
        ? await editSegment(editData.id, name)
        : await createSegment(name)

      toast(<ToasterContent color='normal' />, SuccessStyle)

      setOpen(null)
      loadData()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
    setLoading(false)
  }

  return (
    <Modal.Modal
      open
      size='tiny'
      style={{
        width: '642px',
        height: '356px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>
        {editData ? 'Editar canal' : 'Criar novo canal'}
      </Modal.Header>
      <Modal.Body $paddingBottom='0'>
        {loading ? (
          <Loader />
        ) : (
          <div style={{ flex: 1 }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Field error={form.formState.errors.name}>
                <Controller
                  control={form.control}
                  name='name'
                  render={({ field: props }) => {
                    return (
                      <MwInput
                        {...props}
                        label={
                          editData
                            ? 'Nome do Canal'
                            : 'Atribua um nome ao Canal'
                        }
                        width='428px'
                        placeholder='Exemplo: KA Nacional'
                        loading={nameCheck.loading}
                        invalid={nameCheck.isValid === false}
                        required
                      />
                    )
                  }}
                />

                <S.ErrorMessage children={nameCheck.message} />
              </Form.Field>
            </form>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          appearance='borderless'
          type='button'
          content='Cancelar'
          onClick={() => setOpen(null)}
        />

        <MwButton
          type='submit'
          size='tiny'
          color='blue'
          onClick={onSubmit}
          content={editData && editData.id ? 'Salvar' : 'Criar'}
          disabled={
            !form.formState.isDirty ||
            loading ||
            nameCheck.loading ||
            !nameCheck.isValid
          }
          loading={loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Create
