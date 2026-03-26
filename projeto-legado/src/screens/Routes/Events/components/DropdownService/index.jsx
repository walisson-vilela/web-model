import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import StartingPoint from './components/StartingPoint';
import DropdownAnswering from './components/DropdownAnswering';

import {Menu, Header} from 'semantic-ui-react';
import {Icomoon} from '../../../../../components';
import './index.css';

class DropdownService extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <Menu className={'dropdown-service-menu'}>
                    <Menu.Item>
                        Ponto de atendimento associados ({this.props.AssociatedServicePoints})
                    </Menu.Item>
                    <Menu.Menu position={'right'}>
                        <Menu.Item link>
                            <Icomoon
                                name={'map-pin'}
                                title={'Mapa'}
                            />
                        </Menu.Item>
                        <DropdownAnswering onClearStores={() => this.props.onClearStores()} />
                    </Menu.Menu>
                </Menu>

                <Menu className={'place-of-departure'}>
                    <Menu.Item>
                        <Header as={'h5'}>
                            <Header.Content>
                                Ponto de partida: <span>Casa</span>
                                <Header.Subheader>
                                    Rua: Nico Maria de Freitas, 296 - Praia, Contagem - MG - CEP: 32044-390
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position={'right'}>
                        <StartingPoint/>
                    </Menu.Menu>
                </Menu>
            </Fragment>
        )
    }
}

DropdownService.propType = {
    AssociatedServicePoints: PropTypes.bool,
    onClearStores: PropTypes.func
};

DropdownService.defaultProps = {
    AssociatedServicePoints: 0
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownService);