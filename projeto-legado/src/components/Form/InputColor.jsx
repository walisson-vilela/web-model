import { Component } from 'react';
import { CirclePicker } from "react-color";
import { Popup } from "semantic-ui-react";

import { isFunction } from "lodash";
import { Icomoon } from '..';
import { Input } from './Input';

export class InputColor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open = () => {
        this.setState({
            open: true
        });
    };

    close = () => {
        this.setState({
            open: false
        });
    };

    render() {

        const {open} = this.state;
        const {input} = this.props;

        return (
            <Popup
                trigger={
                    <Input
                        {...this.props}
                        icon={
                            <Icomoon
                                name={`false circular`}
                                style={{
                                    opacity: 1,
                                    backgroundColor: `${input.value}`
                                }}
                                color={input.value}
                                direct
                            />
                        }
                        onBlur={
                            (e) => {
                                if (isFunction(input.onBlur)) {
                                    input.onBlur(e);
                                }

                                if (isFunction(this.props.onBlur)) {
                                    this.props.onBlur(e);
                                }
                            }
                        }
                    />
                }
                on={'focus'}
                open={open}
                onOpen={this.open}
                onClose={this.close}
                content={
                    <CirclePicker
                        triangle={'hide'}
                        color={input.value}
                        onChange={
                            (color) => {
                                input.onChange(color.hex);
                                this.close();
                            }
                        }
                    />
                }
            />
        );
    }
}
