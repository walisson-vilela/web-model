import { MwButton, MwGrid, MwLoader } from "@mw-kit/mw-ui"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import Modal, { ModalState } from "../../../../../../components/MwModal"
import { ErrorStyle, SuccessStyle, ToasterContent } from "../../../../../../components/Toaster"
import { updateEPITypeSizes } from "../../../../../../redux/actions/EPIWarehouseActions"
import { Provider } from "./context"
import * as Inputs from "./inputs"
import { CreateProps, Form, UpdateEPIPayload } from "./interfaces"
import { getDefaultData } from "./schemas"
import * as S from "./styles"

import { fetchEPITypes } from "./services"

// Tipagem do item de EPI
interface EpiItem {
  id?: number
  epi_type_id?: number
  size: string
  status: boolean
}

// Função para buscar os itens de tamanho de um EPI específico
const fetchEpiItemsById = async (id: number): Promise<EpiItem[]> => {
  const epiTypes = await fetchEPITypes()
  const epi = epiTypes.find((e: any) => e.id === id)
  return epi?.epis || []
}

const AddSize = ({ close, data, reload }: CreateProps) => {
  const form = useForm<Form>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getDefaultData(data),
    criteriaMode: "all",
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<ModalState | null>(null)
  const [options, setOptions] = useState<
    { value: string | number; label: string; size_type?: string }[]
  >([])

  const dispatch = useDispatch()

  // Carrega tipos de EPI
  useEffect(() => {
    const load = async () => {
      try {
        const epiTypes = await fetchEPITypes()
        const mapped = epiTypes.map((item) => ({
          value: String(item.id),
          label: item.name,
          size_type: item.size_type,
        }))
        setOptions(mapped)
      } catch (err) {
        console.error("Erro ao carregar tipos de EPI:", err)
      }
    }
    load()
  }, [])

  const onSubmit = async (formData: Form) => {
    setLoading(true)
    try {
      const epiTypeId = formData.reason ? Number(formData.reason) : data?.id
      if (!epiTypeId) throw new Error("EPI inválido")

      const sizeType = formData.size_type || (data as any)?.size_type || "acronym"

      const sizes = (formData.sizes || [])
        .filter((s) => s !== undefined && s !== null && String(s).trim() !== "")
        .map((s) => String(s).trim())

      const existingEpis: EpiItem[] = await fetchEpiItemsById(epiTypeId)

      const epis: EpiItem[] = sizes.map((size) => {
        const existing = existingEpis.find(
          (item) => item.size.toLowerCase() === size.toLowerCase()
        )
        return existing
          ? { id: existing.id, epi_type_id: existing.epi_type_id, size: existing.size, status: true }
          : { size, status: true }
      })

      const payload: UpdateEPIPayload = {
        id: epiTypeId,
        size_type: sizeType,
        epis,
      }

      const response: any = await dispatch(updateEPITypeSizes(epiTypeId, payload))

      if (response?.success) {
       toast(<ToasterContent color="normal" />, SuccessStyle)
        reload?.()
        close()
      } else {
        throw new Error(response?.data?.message || "Erro ao atualizar tamanhos")
      }

    } catch (err: any) {
      console.error("Erro ao salvar:", err)
      const server = err?.response?.data ?? err?.data ?? err
      const message =
        server?.data?.errors ?? server?.errors ?? server?.message ?? "Erro ao atualizar tamanhos"
        toast(<ToasterContent color="error" />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const sizeTypeOptions = [
    { value: "acronym", label: "Sigla (Letra)" },
    { value: "number", label: "Número" },
    { value: "unique", label: "Tamanho Único" },
  ]

  return (
    <Modal.Modal
      style={{ width: "970px", height: "567px", minHeight: "567px", display: "flex" }}
      open
      size="small"
    >
      <Modal.Header color="blue">Adicionar Tamanho</Modal.Header>

      <Modal.Body
        $paddingBottom="0"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: ".8rem",
          paddingTop: "1.2rem",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <S.TitleContainer>
          <Modal.Subtitle>
            Utilize os campos abaixo para adicionar tamanhos para o EPI selecionado
          </Modal.Subtitle>
        </S.TitleContainer>
        <S.TabsContainer>
          <Provider value={{ data, form }}>
            <form id="update" onSubmit={form.handleSubmit(onSubmit)}>
              <MwGrid
                borderless
                spacing="0"
                rows={{ borderless: true }}
                style={{ position: "relative", gap: "2em" }}
              >
                <Inputs.Select
                  style={{ width: 400 }}
                  name="reason"
                  required
                  label="Selecione um EPI"
                  placeholder="Digite aqui"
                  options={options}
                />
                <Inputs.Select
                  style={{ width: 150 }}
                  name="size_type"
                  required
                  label="Tipo de Tamanho"
                  placeholder="Selecione"
                  options={sizeTypeOptions}
                  defaultValue={form.watch("size_type")}
                />

                {loading && <MwLoader filled />}
              </MwGrid>

              <MwGrid.Col width="2">
                <Inputs.SizeTypes
                  epiTypeId={Number(form.watch("reason") || data?.id)}
                  form={form}
                />
              </MwGrid.Col>

              <Modal modal={modal} />
            </form>
          </Provider>
        </S.TabsContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton content="Cancelar" appearance="borderless" size="large" onClick={close} />
        <MwButton
          style={{ width: "6rem" }}
          type="submit"
          form="update"
          content="Salvar"
          size="large"
          disabled={!form.formState.isDirty || loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AddSize
