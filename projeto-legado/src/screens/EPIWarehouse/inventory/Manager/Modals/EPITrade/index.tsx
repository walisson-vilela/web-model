import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal, { ModalState } from '../../../../../../components/MwModal'
import { ErrorStyle, SuccessStyle, ToasterContent } from '../../../../../../components/Toaster'
import { Provider } from './context'
import * as Inputs from "./inputs"
import { CreateProps, Form, OptionsProps } from './interfaces'
import { getDefaultData } from './schemas'
import * as S from './styles'

import { useDispatch } from 'react-redux'
import { addEPITrade, fetchEPIs } from '../../../../../../redux/actions/EPIWarehouseActions'

const EPITrade = ({ close, data, reload }: CreateProps) => {
  const form = useForm<Form>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getDefaultData(data),
    criteriaMode: "all",
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const reason = form.watch("reason")
  const reasonReturned = form.watch("reasonReturned")
  const quantity = form.watch("quantity_decrease")

  const [options, setOptions] = useState<OptionsProps[]>([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<ModalState | null>(null)
  const [hasInputError, setHasInputError] = useState(true)
  const [formReady, setFormReady] = useState(false)
  const dispatch = useDispatch()

  const handleErrorChange = (hasError: boolean) => {
    setHasInputError(hasError)
  }

  // Carrega EPIs
  useEffect(() => {
    const loadEPIs = async () => {
      setLoading(true)
      try {
        const params = { contain: 'EpiType', limit: 999999 }
        const response: any = await dispatch<any>(fetchEPIs(params))
        if (response?.success && Array.isArray(response.data)) {
          const formatted = response.data
            .map((epi: any) => ({
              value: epi.id,
              label: `${epi.epi_type?.name ?? ''}  ${epi.size ?? ''}`,
              size: epi.size,
              size_type: epi.epi_type?.size_type,
              epi_expiration_months: epi.epi_type?.epi_expiration_months,
              epi_type_id: epi.epi_type?.id,
              inventory_count: epi.inventory_count,
              inventory_min: epi.inventory_min,
              status: epi.status,
            }))
            .filter((epi) => epi.size?.toLowerCase() !== 'tamanho único')

          setOptions(formatted)
        } else {
          setOptions([])
        }
      } catch (error) {
        console.error('Erro ao carregar EPIs', error)
        setOptions([])
      } finally {
        setLoading(false)
      }
    }

    loadEPIs()
  }, [dispatch])

  const selectedReason = form.watch("reason")
  const selectedReturned = form.watch("reasonReturned")

  const selectedEPI = options.find((opt) => opt.value === selectedReason)
  const selectedReturnedEPI = options.find((opt) => opt.value === selectedReturned)

  const filteredOptions = selectedEPI
    ? options.filter(
        (opt) =>
          opt.epi_type_id === selectedEPI.epi_type_id &&
          opt.size !== selectedEPI.size &&
          opt.status === true
      )
    : []

  const onSubmit = async (formData: Form) => {
    setLoading(true)
    try {
      const payload = {
        decrease_epi_id: formData.reasonReturned,
        inventory_manual_decrease: formData.quantity_decrease,
        increase_epi_id: formData.reason,
        inventory_manual_increase: formData.quantity_decrease
      }

      const response = await dispatch<any>(addEPITrade(payload))
      if (response?.success) {
        toast(<ToasterContent color="normal" />, SuccessStyle)
        close()
        reload()
      } else {
        toast(<ToasterContent color="error" />, ErrorStyle)
      }
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color="error" />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
  !!reason &&
  !!reasonReturned &&
  !!quantity &&
  !hasInputError &&
  !loading

  useEffect(() => {
    const validateForm = async () => {
      await form.trigger()
      setFormReady(true)
    }
    validateForm()
  }, [form])

  return (
    <Modal.Modal
      style={{ width: '837px', height: '537px', minHeight: '537px', display: 'flex' }}
      open
      size="small"
    >
      <Modal.Header color="blue">Troca EPI's</Modal.Header>
      <Modal.Body
        $paddingBottom="0"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '.8rem',
          paddingTop: '1.2rem',
          justifyContent: 'space-between',
          flex: 1,
          overflow: "visible",
        }}
      >
        <S.TitleContainer>
          <Modal.Subtitle>
            Utilize os campos abaixo para realizar a troca dos epi's.
          </Modal.Subtitle>
        </S.TitleContainer>
        <S.TabsContainer>
          <Provider value={{ data, form, options }}>
            <form id="epiTrade" onSubmit={form.handleSubmit(onSubmit)}>
              <MwGrid
                borderless
                spacing="0"
                rows={{ borderless: true }}
                style={{ position: 'relative', gap: '.8em' }}
              >
                <S.LabelRow>
                  <Inputs.Select
                    style={{ width: 400 }}
                    name="reason"
                    required
                    label="EPI Devolvido"
                    placeholder="Selecione um EPI"
                    options={options}
                  />
                  <div style={{ marginTop: '22px' }} >
                    <Inputs.MinimumValue
                      name="quantity_decrease"
                      onErrorChange={handleErrorChange}
                    />
                  </div>
                </S.LabelRow>

                <S.LabelRow2>
                  <Inputs.SelectTest
                    style={{ width: 400 }}
                    name="reasonReturned"
                    required
                    label="EPI Retirado"
                    placeholder={
                      selectedEPI ? "Selecione um tamanho diferente" : "Selecione primeiro o EPI devolvido"
                    }
                    options={filteredOptions}
                  />
                  <div style={{ marginTop: '22px' }} >
                    <Inputs.MinimumValue
                      disabledCopy
                      name="quantity_decrease"
                      data={{ inventory_count: selectedReturnedEPI?.inventory_count }}
                      onErrorChange={handleErrorChange}
                    />
                  </div>
                </S.LabelRow2>

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
          form="epiTrade"
          content="Salvar"
          size="large"
          disabled={!isFormValid || loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default EPITrade
