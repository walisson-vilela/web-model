import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { Resolver, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { useEndpointValidation } from '../../../../utils/hooks'

import { Provider } from './context'
import * as Inputs from './inputs'
import { CreateProps, Form } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { save } from './services'

const Create = ({ close, reload, data, hierarchy_id }: CreateProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  // TODO: fix validation schema to remove type never
  const resolver = yupResolver(formSchema) as never as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(data),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const nameCheck = useEndpointValidation<Form>({
    endpoint: '/v1/tr/grouping-areas/check-name',
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

  const onSubmit = async (formData: Form) => {
    setLoading(true)

    try {
      const { success } = await save(
        formData,
        data ? data.id : undefined,
        hierarchy_id,
      )

      if (success) {
        close()
        reload()
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      modal={{
        size: 'small',
        title: `${data ? 'Editar' : 'Criar'} Agrupamento`,
        titleColor: 'blue',
        contentStyles: { height: 300, padding: '14px 21px' },
        content: (
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
            </form>
          </Provider>
        ),
        actions: [
          <MwButton
            content='Cancelar'
            appearance='borderless'
            size='large'
            onClick={close}
          />,

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
          />,
        ],
      }}
    />
  )
}

export default Create
