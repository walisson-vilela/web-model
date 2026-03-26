import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {isEmpty} from 'lodash';

import {Grid, Dropdown, Input} from 'semantic-ui-react';
import {Icomoon} from '../../../../../components';
import './index.css';

const options = [
    {key: 'point of service', text: 'Ponto de Atendimento', value: 'name'},
    {key: 'group', text: 'Grupo', value: 'group'},
    {key: 'network', text: 'Rede', value: 'network'},
    {key: 'flag', text: 'Bandeira', value: 'flag'},
    {key: 'local', text: 'Local', value: 'local'},
    {key: 'map', text: 'Mapa', value: 'map'},
    {key: 'code', text: 'Código', value: 'code'}];

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: {
                q: '',
                dropdown: ''
            }
        };
    }

    onSetDropdown = dropdown => this.setState(prevState => {
        return {
            search: {
                ...prevState.search,
                dropdown
            }
        }
    });

    onSetSearch = (q, key) => {
        const {search} = this.state;

        this.setState(prevState => {
            return {
                search: {
                    ...prevState.search,
                    q
                }
            }
        }, () => {
            if (key === 'Enter' && !isEmpty(search.dropdown))
                this.props.onChangeFilter({[search.dropdown]: search.q})
        })
    };

    render() {
        const {search} = this.state;

        return (
            <Grid className={'screen-events-filters'}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Dropdown
                            clearable
                            selection
                            options={options}
                            className={'w-100'}
                            placeholder={'Pesquisar por...'}
                            defaultValue={search.dropdown}
                            onChange={(event, data) => this.onSetDropdown(data.value)}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            className={'w-100'}
                            value={search.q}
                            onChange={(e, data) => this.onSetSearch(data.value)}
                            onKeyPress={(e) => this.onSetSearch(e.target.value, e.key)}
                            placeholder={'Buscar...'}
                            icon={
                                <Icomoon
                                    name={'search link'}
                                    title={'Pesquisar'}
                                    onClick={() => this.onSetSearch(search.q, 'Enter')}
                                />
                            }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

Filter.propType = {
    onChangeFilter: PropTypes.func
};

Filter.defaultProps = {
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);