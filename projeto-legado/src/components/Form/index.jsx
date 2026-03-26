import React from 'react';
import { Form } from 'semantic-ui-react';

export { Checkbox } from './Checkbox';
export { CheckboxHook } from './CheckboxHook';
export { DropdownHook } from './DropdownHook';
export { Input } from './Input';
export { InputColor } from './InputColor';
export { InputDate } from './InputDate';
export { InputGroup } from './InputGroup';
export { InputHook } from './InputHook';
export { InputMask } from './InputMask';
export { InputMaskHook } from './InputMaskHook';
export { InputRadio } from './InputRadio';
export { InputSearch } from './InputSearch';
export { InputSelect } from './InputSelect';
export { InputTime } from './InputTime';
export { Radio } from './Radio';
export { RangeHook } from './RangeHook';

export const Select = props => {
    const {
        input,
        meta,
        hideErrorMsg,
        errorMsgText,
        id
    } = props;
    const {touched, invalid, error} = meta;
    return [
        <Form.Select
            key={`input-${input.name}`}
            {...input}
            clearable
            placeholder={props.placeholder}
            label={props.label}
            options={props.options}
            onChange={(e, data) => input.onChange(data.value)}
            search
            //width={width}
            id={id}
        />,
        !hideErrorMsg &&
        (touched &&
            (invalid &&
                (errorMsgText && (
                    <span
                        key={`input-${error.name}`}
                        style={{
                            position: "absolute",
                            bottom: "-25px",
                            fontSize: "14px",
                            color: "var(--danger)"
                        }}
                    >
              {error}
            </span>
                ))))
    ];
};
