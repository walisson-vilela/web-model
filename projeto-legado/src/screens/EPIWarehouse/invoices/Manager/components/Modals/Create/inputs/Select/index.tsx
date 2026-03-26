import { MwInput } from "@mw-kit/mw-ui"
import { CSSProperties } from "react"
import { Controller } from "react-hook-form"
import useCreateContext from "../../context"

interface GenericSelectProps {
  name: string
  label: string
  placeholder?: string
  options: { value: string; label: string; size_type?: string }[]
  defaultValue?: string
  width?: string
  style?: CSSProperties
  required?: boolean
  disabled?: boolean
}

const GenericSelect = ({
  name,
  label,
  placeholder = "Selecione",
  options,
  defaultValue,
  width,
  style = {},
  required = false,
  disabled = false,
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
        required: required ? `${label} é obrigatório` : false,
      }}
      render={({ field, fieldState }) => (
        <MwInput
          value={{
            value: field.value || defaultValue,
            label: getOptionLabel(field.value || defaultValue),
          }}
          setValue={(value) => {
            const primitive =
              value && typeof value === "object" && "value" in value
                ? value.value
                : value

            form.setValue(name, primitive, {
              shouldDirty: true,
              shouldValidate: true,
            })

            const opt = options.find((o) => o.value === primitive)
            if (opt?.size_type) {
              form.setValue("size_type", opt.size_type, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          }}
          style={{ width, ...style }}
          type="select"
          label={label}
          placeholder={placeholder}
          loader={loader}
          position="left bottom"
          error={fieldState.error?.message}
          required={required}
          disabled={disabled}
        />
      )}
    />
  )
}

export default GenericSelect
