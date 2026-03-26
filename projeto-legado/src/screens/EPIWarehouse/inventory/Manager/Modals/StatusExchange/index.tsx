import { useState } from 'react'

import { MwButton, MwGrid, MwInput, MwLoader } from '@mw-kit/mw-ui'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Modal, { ModalState } from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent
} from '../../../../../../components/Toaster'
import { Provider } from './context'
import { CreateProps, Form } from './interfaces'
import { getDefaultData } from './schemas'
import * as S from './styles'

import { useDispatch } from 'react-redux'

import { updateEPI } from '../../../../../../redux/actions/EPIWarehouseActions'

const History = ({ close, data, reload }: CreateProps) => {

  const form = useForm<Form>({
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
    console.log('entrou', formData)
    setLoading(true)

    try {
      if (data) {
        await dispatch(updateEPI(data.id, { status: formData.status }))
      } else {
        const payload = {
          status: formData.status,
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

  console.log('Form state:', form.formState);
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
          Trocar Status
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
              Utilize os campos abaixo para mudar o status do EPI.
            </Modal.Subtitle>
          </S.TitleContainer>
          <S.TabsContainer>
            <Provider value={{ data, form }}>
            <form
              id="update"
              onSubmit={(e) => {
                form.handleSubmit(onSubmit, (errors) => {
                })(e);
              }}
            >
                <MwGrid
                  borderless
                  spacing="0"
                  rows={{ borderless: true }}
                  style={{ position: 'relative', gap: '.8em', flexDirection: 'column' }}
                >
                  <div>
                  EPI: <span style={{ fontWeight: 900 }}>{data?.name} {data?.size}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                  <MwInput
                    type="switch"
                    label={{ label: '', before: 'Inativo', after: 'Ativo' }}
                    checked={form.watch('status') === 1} // controlado pelo form
                    onChange={(e) => {
                      const newStatus = e.target.checked ? 1 : 0
                      form.setValue('status', newStatus, { shouldDirty: true })
                    }}
                  />
                  </div>
                  <S.ErrorBox style={{ marginTop: '1rem', paddingLeft: '2rem'  }}>
                    Ao inativar um EPI, ele ficará indisponível para distribuição.
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

export default History
