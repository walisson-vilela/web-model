import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchEPIWarehouse } from "../../../../../../../../redux/actions/EPIWarehouseActions"
import { getButtonStyle } from "./styles"

const SIZE_VALUES = {
  acronym: [
    { size: "P", type: "default" },
    { size: "M", type: "default" },
    { size: "G", type: "default" },
    { size: "GG", type: "default" },
    { size: "XGG", type: "default" },
    { size: "G1", type: "plus-size" },
    { size: "G2", type: "plus-size" },
    { size: "G3", type: "plus-size" },
    { size: "G4", type: "plus-size" },
    { size: "G5", type: "plus-size" },
    { size: "G6", type: "plus-size" },
    { size: "XG", type: "plus-size" },
    { size: "XXG", type: "plus-size" },
    { size: "3XG", type: "plus-size" },
    { size: "Tamanhos Especiais", type: "plus-size" },
  ],
  number: [
    { size: "34", type: "default" },
    { size: "35", type: "default" },
    { size: "36", type: "default" },
    { size: "37", type: "default" },
    { size: "38", type: "default" },
    { size: "39", type: "default" },
    { size: "40", type: "default" },
    { size: "41", type: "default" },
    { size: "42", type: "default" },
    { size: "43", type: "default" },
    { size: "44", type: "default" },
    { size: "45", type: "default" },
    { size: "46", type: "plus-size" },
    { size: "47", type: "plus-size" },
    { size: "48", type: "plus-size" },
    { size: "49", type: "plus-size" },
    { size: "50", type: "plus-size" },
    { size: "52", type: "plus-size" },
    { size: "54", type: "plus-size" },
    { size: "56", type: "plus-size" },
    { size: "58", type: "plus-size" },
    { size: "60", type: "plus-size" },
    { size: "Tamanhos Especiais", type: "plus-size" },
  ],
  unique_size: [{ size: "Tamanho Único", type: "default" }],
}

interface SizeTypesProps {
  epiTypeId?: number
  form: any
}

const SizeTypes = ({ epiTypeId, form }: SizeTypesProps) => {
  const dispatch = useDispatch()
  const [alreadyRegistered, setAlreadyRegistered] = useState<string[]>([])
  const [currentType, setCurrentType] = useState<string>("acronym")

  useEffect(() => {
    if (!epiTypeId) return

    const loadEpis = async () => {
      try {
        const response: any = await dispatch(fetchEPIWarehouse({ epi_type_id: epiTypeId }))
        if (response?.success) {
          const sizes = response.data.map((epi: any) => epi.size)
          setAlreadyRegistered(sizes)
          form.setValue("sizes", sizes, { shouldDirty: true })
          setAlreadyRegistered(sizes)
        }
      } catch (err) {
        console.error("Erro ao buscar EPIs cadastrados:", err)
      }
    }

    loadEpis()
  }, [dispatch, epiTypeId, form])

  const sizeType = form.watch("size_type")

  useEffect(() => {
    if (sizeType) {
      setCurrentType(sizeType)
    }
  }, [sizeType])

  const selectedSizes = form.watch("sizes") || []

  const sizeOptions = useMemo(() => {
    return (SIZE_VALUES[currentType] || []).map((item) => ({
      ...item,
      alreadyRegistered: alreadyRegistered.includes(item.size),
    }))
  }, [currentType, alreadyRegistered])

  const defaultSizes = sizeOptions.filter((item) => item.type === "default")
  const plusSizes = sizeOptions.filter((item) => item.type === "plus-size")

  const toggleSize = (size: string) => {
    const current = form.getValues("sizes") || []
    if (current.includes(size)) {
      form.setValue(
        "sizes",
        current.filter((s) => s !== size),
        { shouldDirty: true, shouldValidate: true }
      )
    } else {
      form.setValue("sizes", [...current, size], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  return (
    <>
      {currentType !== "unique_size" && (
        <div style={{ marginTop: "2rem" }}>
          <strong>Selecione os tamanhos:</strong>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1rem",
              flexDirection: "row",
              width: "70rem",
            }}
          >
            {defaultSizes.map((item, idx) => (
              <button
                key={idx}
                type="button"
                style={getButtonStyle(selectedSizes.includes(item.size), item.alreadyRegistered)}
                onClick={() => toggleSize(item.size)}
              >
                {item.size}
              </button>
            ))}
          </div>

          {plusSizes.length > 0 && (
            <>
              <div style={{ marginTop: "1rem" }}>
                <strong>Plus Size:</strong>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" }}>
                {plusSizes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    style={getButtonStyle(selectedSizes.includes(item.size), item.alreadyRegistered)}
                    onClick={() => toggleSize(item.size)}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default SizeTypes
