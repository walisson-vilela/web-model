import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export class Radio extends Component {

    render() {
        const {input, name, className, label} = this.props;

        return <Form.Radio {...input} name={name} className={className} label={label}/>;
    }
}
