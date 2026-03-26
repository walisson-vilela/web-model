import { Component } from 'react';
import { InputMask } from ".";

export class InputTime extends Component {

    render() {

        const props = this.props;

        return (
            <InputMask
                {...props}
                mask={'99:99'}
            />
        );
    }
}
