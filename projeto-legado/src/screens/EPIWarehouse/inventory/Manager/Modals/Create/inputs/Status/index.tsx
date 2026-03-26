import { MwInput } from "@mw-kit/mw-ui"
import { Controller } from "react-hook-form"
import useCreateContext from "../../context"

const Status = () => {
  const { form } = useCreateContext()

  // Opções do select
  const loader = async () => [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ]

  return (
    <>
      <Controller
        name="status"
        control={form.control}
        defaultValue="ativo"
        render={({ field }) => (
          <MwInput
            {...field}
            value={{
              value: field.value || "ativo",
              label:
                field.value === "inativo"
                  ? "Inativo"
                  : "Ativo",
            }}
            setValue={(value) =>
              form.setValue("status", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            style={{ width: "17rem",  }}
            type="select"
            label="Status"
            placeholder="Selecione"
            loader={loader}
            position="left bottom"
          />
        )}
      />

    </>
  )
}

export default Status
