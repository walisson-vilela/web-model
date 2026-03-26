import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { useEndpointValidation } from '../../../../../utils/hooks'

import { Provider } from './context'
import * as Inputs from './inputs'
import { CreateProps, Form } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { submit } from './services'

const Create = ({ close, data, reload, hierarchy_id }: CreateProps) => {
  const resolver = yupResolver(formSchema) as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(data),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const [loading, setLoading] = useState(false)

  const [modal, setModal] = useState<ModalState | null>(null)

  const nameCheck = useEndpointValidation<Form>({
    endpoint: '/v1/tr/regions/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: {
      hierarchy_id,
      country_id: form.watch('country_id'),
      ...(data ? { id: data.id } : {}),
    },
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

  const onSave: SubmitHandler<Form> = async (formData: Form) => {
    setLoading(true)

    try {
      await submit(formData, data ? data.id : null, hierarchy_id)

      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      close()
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }

  const onSubmit = async (formData: Form) => {
    if (data && data.system) {
      setModal({
        title: 'Notificação',
        content:
          'Ao editar uma área do tipo padrão, as modificações a tornará personalizada. Áreas personalizadas não receberão atualizações do sistema automaticamente. Você deseja realizar a edição?',
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            onClick={() => setModal(null)}
          />,
          <MwButton
            content='Sim'
            onClick={() => {
              onSave(formData)
              setModal(null)
            }}
          />,
        ],
      })

      return
    }

    setModal(null)
    onSave(formData)
  }

  return (
    <Modal.Modal
      style={{
        width: '669px',
        height: '438px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
      open
      size='small'
    >
      <Modal.Header color='blue'>
        {data ? 'Editar' : 'Criar'} Área de Atuação
      </Modal.Header>
      <Modal.Body $paddingBottom='0'>
        <div style={{ flex: 1 }}>
          <Provider value={{ hierarchy_id, data, form, nameCheck }}>
            <form id='create-area' onSubmit={form.handleSubmit(onSubmit)}>
              <MwGrid
                borderless
                spacing='0'
                rows={{ borderless: true }}
                style={{ position: 'relative' }}
              >
                <MwGrid.Row>
                  <MwGrid.Col width='5'>
                    <Inputs.CountryId />
                  </MwGrid.Col>
                </MwGrid.Row>

                <MwGrid.Row>
                  <MwGrid.Col width='5'>
                    <Inputs.Name />
                  </MwGrid.Col>
                </MwGrid.Row>

                {loading && <MwLoader filled />}
              </MwGrid>

              <Modal modal={modal} />
            </form>
          </Provider>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={close}
        />
        <MwButton
          type='submit'
          form='create-area'
          content='Confirmar'
          size='large'
          disabled={
            !form.formState.isDirty ||
            loading ||
            nameCheck.loading ||
            !nameCheck.isValid
          }
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Create
