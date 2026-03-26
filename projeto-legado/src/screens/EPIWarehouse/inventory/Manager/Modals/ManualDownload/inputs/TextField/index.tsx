import { MwTextArea } from "@mw-kit/mw-ui"
import { CSSProperties, useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import useCreateContext from "../../context"

interface GenericTextFieldProps {
  name: string
  label: string
  placeholder?: string
  defaultValue?: string
  width?: string
  style?: CSSProperties
  required?: boolean
  multiline?: boolean
  maxLength?: number
  rows?: number
}

const TextField = ({
  name,
  label,
  placeholder = "Digite aqui...",
  defaultValue,
  width = "100%",
  style = {},
  required = false,
  multiline = false,
  maxLength = 150,
  rows = 4,
}: GenericTextFieldProps) => {
  const { form } = useCreateContext()
  const initial =
    defaultValue ?? (form.getValues ? form.getValues()[name] : "") ?? ""
  const [count, setCount] = useState(initial.length)

  const watched = form.watch ? (form.watch(name) ?? "") : ""

  useEffect(() => {
    setCount((watched || "").length)
  }, [watched])

  return (
    <Controller
      name={name}
      control={form.control}
      defaultValue={defaultValue ?? ""}
      rules={{
        required: required ? `${label} é obrigatório` : false,
        maxLength: {
          value: maxLength,
          message: `Máximo de ${maxLength} caracteres`,
        },
      }}
      render={({ field, fieldState }) => {
        const handleChange = (e: any) => {
          const newValue = e?.target?.value ?? e?.value ?? e ?? ""
          if (newValue.length <= maxLength) {
            field.onChange(e) // atualiza o form
            setCount(newValue.length) // atualiza contador
          }
        }

        return (
          <div style={{ width, position: "relative", ...style }}>
            <label style={{ color: "#111" }}>{label}</label>
            <MwTextArea
              name={field.name}
              value={field.value ?? ""}
              onBlur={field.onBlur}
              onChange={handleChange}
              label={label}
              placeholder={placeholder}
              error={fieldState.error?.message}
              required={required}
              rows={multiline ? rows : undefined}
              style={{ ...style }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "-1rem",
                right: "0.75rem",
                fontSize: ".9rem",
                color: count >= maxLength ? "red" : "#999",
                pointerEvents: "none",
              }}
            >
              {count}/{maxLength}
            </div>
          </div>
        )
      }}
    />
  )
}

export default TextField
