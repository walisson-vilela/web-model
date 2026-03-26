import { Controller } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { Input } from 'semantic-ui-react';

export const InputMaskHook = (main) => {

    return <Controller
        name={main.name}
        control={main.controlHook}
        rules={main.rules ? main.rules : undefined}
        render={({ field: props }) => {
            return <ReactInputMask
                {...main}
                maskChar={main.maskChar || null}
                alwaysShowMask={main.alwaysShowMask || false}
                value={props.value}
                onChange={async (e) => {
                    if (typeof main.onChange === "function") {
                        await main.onChange(e);
                    }
                    await props.onChange(e.target.value);
                }}
                onBlur={async (e) => {
                    if (typeof main.onBlur === "function") {
                        await main.onBlur(e);
                    }
                    await props.onBlur();
                }}
            >
                {(inputProps) => <Input {...inputProps} />}
            </ReactInputMask>
        }}
    />
}
