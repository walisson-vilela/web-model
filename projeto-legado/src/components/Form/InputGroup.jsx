import React from 'react';
import { Form } from "semantic-ui-react";

export const InputGroup = props => {
    const {input} = props;

    return (
        <Form.Group
            grouped
            className={props.className}
            {...input}
            onFocus={input.onChange}
            onChange={props.onChange}
        >
            {props.children}
        </Form.Group>
    );
};
