import { isArray } from 'lodash';
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { Form } from "semantic-ui-react";

export class InputSelect extends Component {

    render() {
        const {
          input,
          options,
          multiple,
          width,
          clearable,
          placeholder,
          label,
          fluid,
          required,
          disabled,
          className
        } = this.props;

        let value = input.value;

        if (multiple && !isArray(value)) {
            value = [];
        }

        return (
            <React.Fragment>
                <Form.Select
                    clearable={clearable}
                    fluid={fluid}
                    search
                    label={`${label} ${required ? "*" : ""}`}
                    width={width}
                    multiple={multiple}
                    options={options}
                    selectOnNavigation={false}
                    selectOnBlur={false}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={className}
                    onChange={
                        (e, {value}) => {
                            input.onChange(value)
                        }
                    }
                    value={value}
                />
            </React.Fragment>
        );
    }
}

InputSelect.propTypes = {
    clearable: PropTypes.bool,
    multiple: PropTypes.bool,
    fluid: PropTypes.bool,
    placeholder: PropTypes.string,
};

InputSelect.defaultProps = {
    clearable: false,
    multiple: false,
    fluid: true,
    placeholder: ''
};
