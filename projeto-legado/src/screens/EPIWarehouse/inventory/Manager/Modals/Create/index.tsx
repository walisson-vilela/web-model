import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { Controller, Resolver, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent
} from '../../../../../../components/Toaster'
import { useEndpointValidation } from '../../../../../../utils/hooks'

import { Provider } from './context'
import * as Inputs from './inputs'
import { CreateProps, Form } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import { submit } from './services'
import * as S from './styles'

import { useDispatch } from 'react-redux'
import { addEPIType } from '../../../../../../redux/actions/EPIWarehouseActions'

const Create = ({ close, data, reload }: CreateProps) => {
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

  const dispatch = useDispatch()

  const nameCheck = useEndpointValidation<Form>({
    endpoint: '/v1/epi-types/check-name',
    key: 'name',
    formKey: 'name',
    formInstance: form,
    properties: {
      name: form.watch('name'),
      ...(data ? { id: data.id } : {}),
    },
    messages: {
      invalid: 'O nome já está sendo utilizado',
    },
  })

const onSubmit = async (formData: Form) => {
  setLoading(true)

  try {
    if (data) {
      await submit(formData, data.id)
    } else {
      const payload = {
        name: formData.name,
        size_type: formData.size_type,
        epi_expiration_months: formData.epi_expiration_months,
        epis:
          formData.size_type === 'unique_size'
            ? [
                {
                  size: 'Tamanho Único',
                  status: true,
                },
              ]
            : (formData.sizes || []).map((s) => ({
                size: s,
                status: true,
              })),
      }

      await dispatch(addEPIType(payload))
    }

    close()
    reload()
    toast(<ToasterContent color="normal" />, SuccessStyle)
  } catch (error) {
    console.error(error)
    toast(<ToasterContent color="error" />, ErrorStyle)
    setLoading(false)
  }
}


  return (
    <>
    <Modal.Modal
      style={{
        width: '80vw',
        height: '80vh',
        maxWidth: '1600px',
        maxHeight: '900px',
      }}
      open
      size="small"
    >
      <Modal.Header color="blue">
        {data ? 'Editar' : 'Cadastrar'} EPI's
      </Modal.Header>

      <Modal.Body $paddingBottom="0">
        <S.TitleContainer>
          <Modal.Subtitle>
            Utilize os campos abaixo para realizar o cadastro de EPI
          </Modal.Subtitle>
        </S.TitleContainer>
        <S.TabsContainer>
          <Provider value={{ data, form, nameCheck }}>
            <form id="create" onSubmit={form.handleSubmit(onSubmit)}>
              <MwGrid
                borderless
                spacing="0"
                rows={{ borderless: true }}
                style={{ position: 'relative' }}
              >
                <MwGrid.Row style={{ gap: '1rem' }}>
                  <MwGrid.Col width="2" >
                    <Inputs.Status />
                  </MwGrid.Col>
                  <MwGrid.Col width="4" >
                    <Inputs.EpiName />
                  </MwGrid.Col>
                  <MwGrid.Col width="3" >
                        <Controller
                          name="epi_expiration_months"
                          control={form.control}
                          render={({ field }) => (
                            <Inputs.Select
                              {...field}
                              label="Período de Reposição"
                              placeholder="Selecione"
                              options={Array.from({ length: 24 }, (_, i) => ({
                                value: String(i + 1),
                                label: `${i + 1} ${i + 1 === 1 ? 'mês' : 'meses'}`,
                              }))}
                            />
                          )}
                        />
                      </MwGrid.Col>
                </MwGrid.Row>
                <MwGrid.Row>
                  <MwGrid.Col width="3">
                    <Inputs.SizeTypes />
                  </MwGrid.Col>
                </MwGrid.Row>

                {loading && <MwLoader filled />}
              </MwGrid>
              <Modal modal={modal} />
            </form>
          </Provider>
        </S.TabsContainer>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          content="Cancelar"
          appearance="borderless"
          size="large"
          onClick={close}
        />
        <MwButton
          style={{ minWidth: '12rem' }}
          type="submit"
          form="create"
          content="Salvar"
          size="large"
          disabled={
            !form.formState.isDirty ||
            loading ||
            nameCheck.loading ||
            !nameCheck.isValid
          }
        />
      </Modal.Footer>
    </Modal.Modal>
    </>
  )
}

export default Create
