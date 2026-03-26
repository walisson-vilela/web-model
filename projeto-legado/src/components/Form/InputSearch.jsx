import { debounce, findIndex, isArray, isEmpty, isFunction } from "lodash";
import * as PropTypes from "prop-types";
import React, { Component } from 'react';
import { change } from 'redux-form';
import { Form } from "semantic-ui-react";
import { Icomoon } from '..';

export class InputSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: []
        };

        this.search = debounce((value) => {
            this.props
                .getResults({q: value})
                .then((res) => {
                        this.setState({
                            isLoading: false,
                            results: this.props.handleMap(res.data)
                        });
                    }
                ).catch((e) => {
                this.setState({
                    isLoading: false,
                    results: []
                });
            });
        }, 250);

        this.handleSearchChange = (value) => {

            this.props.input.onChange(value);

            this.setState({
                isLoading: !isEmpty(value)
            }, () => this.search(value));
        };
    }

    clear = () => {
        const {input, meta, onClear} = this.props;
        if (typeof onClear === "function") {
          onClear();
          return;
        }
        input.onChange(null);
        meta.dispatch(change(meta.form, `${input.name}_id`, null));
        /*
        setTimeout(()=>{
            console.log(this.refs['dropdown'].open());
        },300);
        */
    };

    /**
     * Limpa resultado ao fechar dropdown.
     *
     * @returns {Promise<void>}
     */
    clearResults = async () => {
        await this.setState({results: []});
    };

    render() {
        const {isLoading, results} = this.state;
        const {input, meta, width, label, selected, multiple, required, disabled, onOpen, className} = this.props;
        const {touched, invalid} = meta;

        let value = input.value;
        let _label_ = required ? `${label} *` : label;

        if (multiple && !isArray(value)) {
            value = [];
        }

        if (selected && !multiple) {
            return (
                <Form.Input
                    value={input.value}
                    label={_label_}
                    width={width}
                    readOnly={true}
                    icon={
                        <Icomoon
                            name={'trash-2'}
                            link
                            onClick={this.clear}
                            style={{marginLeft: '-2rem'}}
                        />
                    }
                    disabled={disabled}
                />
            );
        }
        return (
            <React.Fragment>
                <Form.Dropdown
                    fluid
                    selection
                    search
                    label={_label_}
                    width={width}
                    error={touched && invalid}
                    selectOnBlur={false}
                    selectOnNavigation={false}
                    multiple={multiple}
                    options={results}
                    name={input.name}
                    value={value}
                    disabled={disabled}
                    className={className}
                    noResultsMessage={"Nenhum resultado encontrado"}
                    onChange={
                        (e, {options, value}) => {
                            let index = findIndex(options, {value});
                            if (index === -1) {
                                return;
                            }
                            input.onChange(options[index]['text']);
                            meta.dispatch(change(meta.form, `${input.name}_id`, value));
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
                    onOpen={() => onOpen()}
                    onClose={() => this.clearResults()}
                    onSearchChange={(e, {searchQuery}) => this.handleSearchChange(searchQuery)}
                    loading={isLoading}
                />
            </React.Fragment>
        );
    }
}

InputSearch.propTypes = {
    getResults: PropTypes.func,
    handleMap: PropTypes.func,
    label: PropTypes.string,
    selected: PropTypes.bool,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    onOpen: PropTypes.func
};

InputSearch.defaultProps = {
    getResults: (params) => {
        console.log(params);
    },
    handleMap: (data) => {
        return data.map((s) => ({
            value: s.enrollment_id || s.id,
            key: s.enrollment_id || s.id,
            text: s.name,
            description: s.description || undefined
        }));
    },
    selected: false,
    multiple: false,
    disabled: false,
    onOpen: (() => {
    })
};
