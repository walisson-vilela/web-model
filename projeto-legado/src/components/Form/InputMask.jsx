import React, { Component } from 'react';

import { isFunction } from "lodash";
import ReactInputMask from "react-input-mask";
import { Icon, Popup } from "semantic-ui-react";
import { Icomoon } from '..';
import { Input } from './Input';

export class InputMask extends Component {

    render() {
        const props = this.props;
        const {input, mask, meta, hideErrorMsg, placeholder, icon} = props;
        const {touched, invalid, error} = meta;

        const style = {
            position: "absolute",
            right: "5px",
            bottom: "13px"
        };

        return (
            <Input
                {...props}
                children={
                    <React.Fragment>
                        <ReactInputMask
                            {...input}
                            mask={mask}
                            maskChar={null}
                            placeholder={placeholder}
                            onClick={
                                (e) => {
                                    if (isFunction(input.onClick)) {

                                        input.onClick(e);
                                    }

                                    if (isFunction(this.props.onClick)) {

                                        this.props.onClick(e);
                                    }
                                }
                            }

                            onFocus={
                                (e) => {
                                    if (isFunction(input.onFocus)) {

                                        input.onFocus(e);
                                    }

                                    if (isFunction(this.props.onFocus)) {

                                        this.props.onFocus(e);
                                    }
                                }
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
                            onChange={e => input.onChange(e)}
                        />
                        {
                            !hideErrorMsg && (
                                (touched && invalid) ? (
                                    <Popup
                                        basic
                                        key="Popup"
                                        trigger={
                                            <Icon name="warning sign" size="small" link style={style}/>
                                        }
                                        content={error}
                                        position="top right"
                                        size="mini"
                                        on="click"
                                        // verticalOffset={13}
                                        // horizontalOffset={10}
                                        inverted
                                    />
                                ) : (
                                    icon && <Icomoon
                                        name="calendar"
                                        size="small"
                                        link
                                        style={style}
                                        onClick={
                                            (e) => {
                                                if (isFunction(input.onClick)) {
                                                    input.onClick(e);
                                                }

                                                if (isFunction(this.props.onClick)) {
                                                    this.props.onClick(e);
                                                }
                                            }
                                        }
                                        direct
                                    />
                                )
                            )
                        }
                    </React.Fragment>
                }
            />
        );
    }
}
