import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { MwButton, MwGrid, MwInput, MwLoader } from '@mw-kit/mw-ui'
import { Controller, Resolver, useForm } from 'react-hook-form'
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
import { add as formSchema } from './schemas'
import * as S from './styles'
import './styles.css'

import { useDispatch } from 'react-redux'

import { addEPIInventoryManualDecreaseAdd, fetchEPIFiscalNotes } from '../../../../../../redux/actions/EPIWarehouseActions'

const DownloadReasons = [
  { reason_type: "break", reason: "Quebras ou Danos" },
  { reason_type: "expired", reason: "EPI Vencido" },
  { reason_type: "loss", reason: "Perda, Furto ou Extravio" },
  { reason_type: "invoice_error", reason: "Erros de Lançamento (Nota Fiscal)" },
  { reason_type: "adjustment", reason: "Ajustes Operacionais" },
  { reason_type: "obsolescence", reason: "Obsolência" },
  { reason_type: "other", reason: "Outros" },
]

const reasonsOptions = DownloadReasons.map((reasons) => ({
  value: reasons.reason_type,
  label: reasons.reason,
}))

const ManualDownload = ({ close, data, reload }: CreateProps) => {
  const resolver = yupResolver(formSchema) as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const [invoicesOptions, setInvoicesOptions] = useState<{ value: string, label: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<ModalState | null>(null)
  const { watch } = form
  const reasonSelected = watch('reason')

  const dispatch = useDispatch()

  const onSubmit = async (formData: Form) => {
    setLoading(true)

    try {
      const reasonText = DownloadReasons.find(r => r.reason_type === formData.reason)?.reason || ""

      const payload = {
        inventory_decrease: formData.inventory_decrease,
        reason: reasonText,   // <- envia o texto
        obs: formData.obs,
        epi_fiscal_note_id: formData.epi_fiscal_note_id,
        epi_id: data?.id,
      }

      await dispatch(addEPIInventoryManualDecreaseAdd(payload))

      close()
      reload()
      toast(<ToasterContent color="normal" />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color="error" />, ErrorStyle)
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadFiscalNotes = async () => {
      if (reasonSelected === "invoice_error" && data?.id) {
        try {
          const res = await dispatch<any>(fetchEPIFiscalNotes({ epi_type_id: data.epi_type_id }))

          if (res?.data) {
            const options = res.data.map((item: any) => ({
              value: item.id,
              label: item.number,
            }))
            setInvoicesOptions(options)
          }
        } catch (error) {
          console.error("Erro ao buscar notas fiscais:", error)
        }
      }
    }

    loadFiscalNotes()
  }, [reasonSelected, data?.id, dispatch])

  const getButtonStyle = () => ({
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    border: "none",
    background: "#F6F6F6 0% 0% no-repeat padding-box",
    color: "#707070",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0px 2px 3px #DEDEDEF2",
    opacity: 1,
    flex: 1,
    marginLeft: '.5rem',
  })

  return (
    <>
      <Modal.Modal
        style={{ width: '837px', height: '567px', minHeight: '567px', display: 'flex' }}
        open
        size="small"
      >
        <Modal.Header color="blue">
          Baixa Manual de Estoque
        </Modal.Header>
        <Modal.Body
          $paddingBottom="0"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            paddingTop: '1.4rem',
            justifyContent: 'space-between',
          }}
        >
          <S.TitleContainer>
            <S.TitleContainer style={{ padding: 0 }}>
              <Modal.Subtitle>
                Utilize os campos abaixo para realizar a baixa de estoque para o item selecionado
              </Modal.Subtitle>
            </S.TitleContainer>
          </S.TitleContainer>

          <S.TabsContainer>
            <Provider value={{ data, form }}>
              <form id="add" onSubmit={form.handleSubmit(onSubmit)}>
                <MwGrid
                  borderless
                  spacing="0"
                  rows={{ borderless: true }}
                  style={{
                    position: 'relative',
                    gap: '1.8em',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <S.LabelRow>
                    EPI:{' '}
                    <S.Label>
                      {data?.name} {data?.size}
                    </S.Label>
                  </S.LabelRow>

                  <S.LabelRow>
                    Qtde. em Estoque:{' '}
                    <S.Label>
                      <button type="button" style={getButtonStyle()}>
                        {data?.inventory_count}
                      </button>
                    </S.Label>
                  </S.LabelRow>

                  <S.InfoRow style={{ gap: 24, marginBottom: '.6rem' }}>
                    <Inputs.Select
                      name="reason"
                      required
                      label="Motivo da Baixa"
                      placeholder="Digite aqui"
                      options={reasonsOptions}
                    />
                    <Controller
                      name="inventory_decrease"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => {
                        const max = data?.inventory_count || 0
                        const value = Number(field.value) || 0

                        const isAboveMax = value > max
                        const isNegative = value < 0

                        let errorMessage = ""
                        if (isAboveMax) {
                          errorMessage = "Só é possível baixar a quantidade em estoque."
                        } else if (isNegative) {
                          errorMessage = "Digite um valor válido"
                        }

                        return (
                          <div style={{ flex: 1 }}>
                            <MwInput
                              {...field}
                              className={errorMessage ? 'errorInput' : undefined}
                              type="number"
                              label="Quantidade a ser baixada"
                              placeholder="Digite aqui"
                              style={{
                                flex: 1,
                                width: '8.5rem',
                                border: errorMessage ? '1px solid #D64550' : undefined,
                                color: errorMessage ? '#D64550' : undefined,
                                backgroundColor: errorMessage ? '#FDEAEA' : 'white',
                              }}
                              value={field.value || ""}
                              onChange={(e) => {
                                const val = e.target.value
                                field.onChange(val)
                              }}

                            />
                            <div
                              style={{
                                position: "fixed",
                                minHeight: "1rem",
                                fontSize: "0.75rem",
                                marginTop: "0.25rem",
                                color: errorMessage ? "#D64550" : "transparent",
                              }}
                            >
                              {errorMessage}
                            </div>
                          </div>
                        )
                      }}
                    />
                    {reasonSelected === "invoice_error" && (
                      <Inputs.Select
                        name="epi_fiscal_note_id"
                        required
                        style={{ flex: 1, width: '12rem' }}
                        label="Selecione a Nota Fiscal"
                        options={invoicesOptions}
                      />
                    )}
                  </S.InfoRow>

                  <S.InfoRow style={{ gap: 24, marginBottom: '.6rem' }}>
                    <Inputs.TextField
                      name="obs"
                      required
                      label="Observação"
                      placeholder="Digite aqui"
                      multiline
                      maxLength={150}
                      style={{
                        width: "566px",
                        height: '125px',
                        alignContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginTop: '.6rem',
                      }}
                    />
                  </S.InfoRow>

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
            form="add"
            content="Salvar"
            size="large"
            disabled={
              !form.formState.isDirty ||
              loading ||
              Number(form.watch("inventory_decrease") || 0) > (data?.inventory_count || 0) ||
              Number(form.watch("inventory_decrease") || 0) < 0
            }
          />
        </Modal.Footer>
      </Modal.Modal>
    </>
  )
}

export default ManualDownload
