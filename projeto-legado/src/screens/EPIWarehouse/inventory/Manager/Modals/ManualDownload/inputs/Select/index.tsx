import { MwInput } from "@mw-kit/mw-ui"
import { CSSProperties } from "react"
import { Controller } from "react-hook-form"
import useCreateContext from "../../context"

interface GenericSelectProps {
  name: string
  label: string
  placeholder?: string
  options: { value: string; label: string }[]
  defaultValue?: string
  width?: string
  style?: CSSProperties
  required?: boolean // 🔹 nova prop
}

const GenericSelect = ({
  name,
  label,
  placeholder = "Selecione",
  options,
  defaultValue,
  width = "20rem",
  style = {},
  required = false,
}: GenericSelectProps) => {
  const { form } = useCreateContext()

  const loader = async () => options

  const getOptionLabel = (value: string) =>
    options.find((opt) => opt.value === value)?.label || ""

  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={defaultValue}
      rules={{
        required: required ? `${label} é obrigatório` : false, // 🔹 validação
      }}
      render={({ field, fieldState }) => (
        <MwInput
          {...field}
          value={{
            value: field.value || defaultValue,
            label: getOptionLabel(field.value || defaultValue),
          }}
          setValue={(value) =>
            form.setValue(name, value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          style={{ width, ...style }}
          type="select"
          label={label}
          placeholder={placeholder}
          loader={loader}
          position="left bottom"
          error={fieldState.error?.message}
          required={required}
        />
      )}
    />
  )
}

export default GenericSelect
