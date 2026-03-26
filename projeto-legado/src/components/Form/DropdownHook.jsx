import { Controller } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";

export const DropdownHook = (main) => {

    return <Controller
        name={main.name}
        control={main.controlHook}
        rules={main.rules ? main.rules : undefined}
        render={({ field: props }) => {
            return <Dropdown
                {...main}
                value={props.value}
                options={main.options || []}
                onChange={async (e, {value}) => {
                    if(typeof main.onChange === "function"){
                        await main.onChange(e);
                    }
                    await props.onChange(value);
                }}
                onBlur={async (e) => {
                    if(typeof main.onBlur === "function"){
                        await main.onBlur(e);
                    }
                    await props.onBlur();
                }}
            />
        }}
    />
}
