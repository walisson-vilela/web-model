import { Controller } from "react-hook-form";
import { Checkbox } from "semantic-ui-react";

export const CheckboxHook = (main) => {

  return <Controller
    name={main.name}
    control={main.controlHook}
    rules={main.rules ? main.rules : undefined}
    render={({ field: props }) => {
      return <Checkbox
        {...main}
        checked={!!props.value}
        onChange={async (e, { checked }) => {
          if (typeof main.onChange === "function") {
            await main.onChange(e);
          }
          await props.onChange(checked ? 1 : 0);
        }}
        onBlur={async (e) => {
          if (typeof main.onBlur === "function") {
            await main.onBlur(e);
          }
          await props.onBlur();
        }}
      />
    }}
  />
}
