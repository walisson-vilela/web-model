import { MwInput } from "@mw-kit/mw-ui"
import { useMemo } from "react"
import { Controller } from "react-hook-form"
import useCreateContext from "../../context"
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

const SizeTypes = () => {
  const { form } = useCreateContext() as {
    form: {
      watch: (field: string) => any
      getValues: (field: string) => any
      setValue: (field: string, value: any, options?: any) => void
      control: any
    }
  }

  const loader = async () => [
    { value: "acronym", label: "Sigla (Letra)" },
    { value: "number", label: "Numérico" },
    { value: "unique_size", label: "Tamanho Único" },
  ]

  const selectedType = form.watch("size_type") || "acronym"

  const selectedSizes = form.watch("sizes") || []

  const sizeOptions = useMemo(() => SIZE_VALUES[selectedType] || [], [selectedType])

  const defaultSizes = sizeOptions.filter((item) => item.type === "default")
  const plusSizes = sizeOptions.filter((item) => item.type === "plus-size")

  const toggleSize = (size) => {
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
      <Controller
        name="size_type"
        control={form.control}
        defaultValue="acronym"
        render={({ field }) => {
          const selectedOption =
            field.value === "number"
              ? { value: "number", label: "Numérico" }
              : field.value === "unique_size"
              ? { value: "unique_size", label: "Tamanho Único" }
              : { value: "acronym", label: "Sigla (Letra)" } // padrão

          return (
            <MwInput
              {...field}
              value={selectedOption}
              setValue={(option) => {
                console.log("Valor retornado pelo MwInput:", option)
                const value = option?.value || option
                field.onChange(value)
                form.setValue("size_type", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }}
              style={{ width: "17rem" }}
              type="select"
              label="Tipo Tamanho"
              placeholder="Selecione"
              loader={loader}
              position="left bottom"
              required
            />
          )
        }}
      />

      {selectedType !== "unique_size" && (
        <div style={{ marginTop: "4rem" }}>
          <strong>Selecione os tamanhos:</strong>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.4rem",
              marginTop: "1.5rem",
              width: "80vw",
            }}
          >
            {defaultSizes.map((item, idx) => (
              <button
                key={idx}
                type="button"
                style={getButtonStyle(selectedSizes.includes(item.size))}
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
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.4rem",
                  marginTop: "1.5rem",
                  width: "80vw",
                }}
              >
                {plusSizes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    style={getButtonStyle(selectedSizes.includes(item.size))}
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
