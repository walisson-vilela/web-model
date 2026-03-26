import React from 'react';
import { Form } from 'semantic-ui-react';

export const InputRadio = props => {
    const {input, name, value, className} = props;
    return <Form.Radio
        {...input}
        name={name}
        className={className}
        value={value}
        label={props.label}
        onBlur={null}
        onChange={
            () => {
                input.onChange(input.value)
            }
        }
    />;
};