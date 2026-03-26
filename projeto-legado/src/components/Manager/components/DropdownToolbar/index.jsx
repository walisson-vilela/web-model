import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Dropdown, Menu, Popup } from 'semantic-ui-react';


export default class DropdownToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <Menu.Item
                content={
                    <Popup
                        inverted
                        position={'top center'}
                        content={this.props.title}
                        trigger={
                            <Dropdown
                                clearable
                                placeholder={this.props.title}
                                className={'wraperMW'}
                                pointing={'top'}
                                options={this.props.itens}
                                value={this.props.value || ""}
                                selectOnBlur={false}
                                onChange={
                                    (event, data) => this.props.onSelectItem(data.value)
                                }
                            />
                        }
                    />
                }
            />
        );
    }
}

DropdownToolbar.propType = {
    title: PropTypes.string,
    itens: PropTypes.array,
    onSelectItem: PropTypes.func
};

DropdownToolbar.defaultProps = {
    title: '',
    itens: [],
    onSelectItem: () => {}
};
