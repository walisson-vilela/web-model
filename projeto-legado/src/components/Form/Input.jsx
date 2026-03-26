import { isEmpty, isFunction } from 'lodash';
import React, { Component } from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';

export class Input extends Component {

    render() {
        const {
            input,
            meta,
            type,
            label,
            placeholder,
            maxLength,
            className,
            action,
            width,
            disabled,
            loading,
            hideErrorMsg,
            errorMsgText,
            autoFocus,
            id,
            pattern,
            icon,
            children,
            required
        } = this.props;

        const {touched, invalid, error} = meta;

        let _icon_ = children
            ? {}
            : !hideErrorMsg && (
            (touched && invalid) ? (
                !errorMsgText && (
                    {
                        icon: <Popup
                            trigger={
                                <Icon
                                    name='warning sign'
                                    size='small'
                                    link
                                />
                            }
                            content={touched && invalid ? error : ''}
                            position='top right'
                            size='tiny'
                            on='click'
                            inverted
                        />
                    }
                )
            ) : (
                icon ? {icon} : null
            )
        );

        return [
            <Form.Input
                key={`input-${input.name}`}
                {...input}
                id={id}
                type={type}
                label={!isEmpty(label) ? (required ? `${label} *` : label) : undefined}
                placeholder={placeholder}
                error={touched && invalid}
                maxLength={maxLength}
                className={className}
                action={action}
                width={width}
                disabled={disabled}
                loading={loading}
                autoFocus={autoFocus}
                pattern={pattern}
                children={children}

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
                {..._icon_}
            />
        ];
    }
}
