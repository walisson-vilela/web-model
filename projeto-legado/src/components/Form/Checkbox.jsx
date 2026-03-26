import { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Icomoon } from "..";

import './Checkbox.css';

export class Checkbox extends Component {

    render() {
        const {input, hasIcon, toggle, label, disabled} = this.props;

        if (hasIcon)
        {
            let icon = input.checked ? 'active' : '';
            return (
                <Icomoon
                    name={`check toggle-icon ${icon} circular link`}
                    onClick={
                        () => {
                            input.onChange(!input.checked)
                        }
                    }
                />
            );
        }

        return (
            <Form.Checkbox
                checked={input.checked}
                name={input.name}
                label={label}
                toggle={toggle}
                onChange={
                    (e, data) => {
                        input.onChange(data.checked)
                    }
                }
                disabled={disabled}
            />
        );
    }
}
