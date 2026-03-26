import { Controller } from "react-hook-form";

export const RangeHook = (main) => {

    return <Controller
        name={main.name}
        control={main.controlHook}
        rules={main.rules ? main.rules : undefined}
        render={({ field: props }) => {
            return <input
                {...main}
                type="range"
                value={props.value}
                list={props.list}
                min={props.min}
                max={props.max}
                step={props.step}
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
