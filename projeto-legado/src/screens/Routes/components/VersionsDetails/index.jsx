import React, {Component} from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl} from 'react-intl';

import {putRoutesVersions} from '../../../../redux/actions/RoutesVersionsActions';

import {Segment, Grid, Popup, Menu} from 'semantic-ui-react';
import {HeaderMW, Confirm, Modal, Icomoon} from '../../../../components';
import Route from './route';

import InfoUser from './components/InfoUser';
import ExecutorExchange from './components/ExecutorExchange';

const messages = defineMessages({
    occupancyRate: {
        id: 'details.occupancyRate',
        defaultMessage: 'Taxa de ocupação'
    },
    monthlyCost: {
        id: 'datails.monthlyCost',
        defaultMessage: 'Custo mensal da rota'
    },
    timeMiddleDisplacement: {
        id: 'details.timeMiddleDisplacement',
        defaultMessage: 'Tempo med. desloc.'
    },
    timeMiddleAttendance: {
        id: 'details.timeMiddleAttendance',
        defaultMessage: 'Tempo med. atend.'
    }
});

class VersionDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popup: {
                father: false,
                children: false
            }
        };
    }

    getItensIndicators = () => {
        const {intl: {formatMessage}} = this.props;

        return [{title: '120%', description: formatMessage(messages.occupancyRate)},
            {title: 'R$1.205,25', description: formatMessage(messages.monthlyCost)},
            {title: '02:30:10', description: formatMessage(messages.timeMiddleDisplacement)},
            {title: '00:30:10', description: formatMessage(messages.timeMiddleAttendance)}];
    };

    onOpenPopupFather = () => this.setState(prevState => {
        return {
            popup: {
                ...prevState.popup,
                father: true
            }
        }
    });

    onClosePopupFather = () => {
        const {children} = this.state.popup;

        if (!children)
            this.setState(prevState => {
                return {
                    popup: {
                        ...prevState.popup,
                        father: false
                    }
                }
            })
    };

    onOpenPopupChildren = () => this.setState(prevState => {
        return {
            popup: {
                ...prevState.popup,
                children: true
            }
        }
    });

    onClosePopupChildren = () => this.setState(prevState => {
        return {
            popup: {
                ...prevState.popup,
                children: false
            }
        }
    });

    render() {

        const {isLoading, name} = this.props.route;
        const {father} = this.state.popup;

        return (
            <React.Fragment>
                <Modal ref={'ExecutorDelete'} size={'tiny'}>
                    <Confirm
                        onCancel={
                            () => {
                                this.refs['ExecutorDelete'].closeModal();
                            }
                        }
                        onConfirm={
                            () => {
                                let modal = this.refs['ExecutorDelete'].state.props;
                                return this.props.putRoutesVersions(modal.id, modal.version_id, modal.params);
                            }
                        }
                    />
                </Modal>

                <Segment
                    basic
                    className={'mb-0'}
                >
                    <Grid
                        columns={'2'}
                    >
                        <Grid.Row>
                            <Grid.Column>
                                <Grid
                                    columns={2}
                                >
                                    <Grid.Row>
                                        <Grid.Column>
                                            <HeaderMW
                                                loading={isLoading}
                                                header={name}
                                                subheader={'Zona: 123'}
                                                icon={
                                                    <Icomoon
                                                        name={'file-plus circular'}
                                                        style={{
                                                            backgroundColor: '#FFBC38',
                                                            color: '#FFF',
                                                        }}
                                                    />
                                                }
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <HeaderMW
                                                loading={isLoading}
                                                header={'Dr. Laura Antonieta Gusmão'}
                                                subheader={'Promotor de vendas'}
                                                image={'https://react.semantic-ui.com/images/avatar/large/patrick.png'}
                                                actions={
                                                    <Popup
                                                        flowing
                                                        open={father}
                                                        position={'bottom left'}
                                                        horizontalOffset={13}
                                                        onOpen={() => this.onOpenPopupFather()}
                                                        onClose={() => this.onClosePopupFather()}
                                                        trigger={
                                                            <Icomoon
                                                                name={'more-vertical link'}
                                                                title={'Opções de navegação'}
                                                            />
                                                        }
                                                    >
                                                        <Menu secondary vertical>
                                                            <Menu.Item header content={'Usuário'}/>
                                                            <InfoUser
                                                                onOpen={() => this.onOpenPopupChildren()}
                                                                onClose={() => this.onClosePopupChildren()}
                                                            />
                                                            <Menu.Item
                                                                content={'Dados de hierarquia'}
                                                                onClick={() => console.log('Informações do usuário')}
                                                            />
                                                            <Menu.Item
                                                                content={'Informações da equipe'}
                                                                onClick={() => console.log('Informações do usuário')}
                                                            />
                                                            <Menu.Item header content={'Rota'}/>
                                                            <ExecutorExchange
                                                                onOpen={() => this.onOpenPopupChildren()}
                                                                onClose={() => this.onClosePopupChildren()}
                                                                route_id={this.props.route_info.id}
                                                                route_version={this.props.route_info.version}
                                                            />
                                                            <Menu.Item
                                                                content={'Remover Executor'}
                                                                onClick={() => {
                                                                    this.onClosePopupFather();
                                                                    this.refs['ExecutorDelete'].openModal({
                                                                        id: this.props.route_info.id,
                                                                        version_id: this.props.route_info.version,
                                                                        params: {people_id: ''}
                                                                    })
                                                                }}
                                                            />
                                                        </Menu>
                                                    </Popup>
                                                }
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column>
                                <Route
                                    getItens={this.getItensIndicators()}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        putRoutesVersions: (id, version_id, params) => {
            return dispatch(putRoutesVersions(id, version_id, params))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VersionDetails));