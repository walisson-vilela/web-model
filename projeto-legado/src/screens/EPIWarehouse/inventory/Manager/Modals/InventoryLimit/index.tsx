import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { Resolver, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent
} from '../../../../../../components/Toaster'
import { Provider } from './context'
import * as Inputs from './inputs'
import { CreateProps, Form } from './interfaces'
import { create as formSchema, getDefaultData } from './schemas'
import * as S from './styles'

import { useDispatch } from 'react-redux'

import { addEPIType, updateEPI } from '../../../../../../redux/actions/EPIWarehouseActions'

const InventoryLimit = ({ close, data, reload }: CreateProps) => {
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

  const onSubmit = async (formData: Form) => {
    setLoading(true)

    try {
      if (data) {
        await dispatch(updateEPI(data.id, { inventory_min: formData.name }))
      } else {
        const payload = {
          name: formData.name,
          size_type: formData.size_type,
          epis: (formData.sizes || []).map((s) => ({
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
          width: '680px',
          height: '376px',
          minHeight: '376px',
          display: 'flex',
        }}
        open
        size="small"
      >
        <Modal.Header color="blue">
          Configurar Estoque Mínimo
        </Modal.Header>

        <Modal.Body
          $paddingBottom="0"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '.8rem',
            paddingTop: '1.2rem',
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <S.TitleContainer>
            <Modal.Subtitle>
              Utilize os campos abaixo para adicionar a quantidade mínima de estoque.
            </Modal.Subtitle>
          </S.TitleContainer>
          <S.TabsContainer>
            <Provider value={{ data, form }}>
              <form id="update" onSubmit={form.handleSubmit(onSubmit)}>
                <MwGrid
                  borderless
                  spacing="0"
                  rows={{ borderless: true }}
                  style={{ position: 'relative', gap: '.8em' }}
                >
                  EPI: <span style={{ fontWeight: 900 }}>{data?.name} {data?.size}</span>
                  <Inputs.MinimumValue />

                  <S.ErrorBox style={{ marginTop: '1rem', paddingLeft: '2rem'  }}>
                    Ao atingir o estoque mínimo, um e-mail de alerta será enviado automaticamente
                  </S.ErrorBox>

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
            style={{ width: '6rem' }}
            type="submit"
            form="update"
            content="Salvar"
            size="large"
            disabled={
              !form.formState.isDirty || loading
            }
          />
        </Modal.Footer>
      </Modal.Modal>
    </>
  )
}

export default InventoryLimit
