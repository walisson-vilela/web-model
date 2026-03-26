import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { isEmpty } from 'lodash';

import { NavLink } from 'react-router-dom';
import { Button, Divider, Header, Segment, Tab, Table } from 'semantic-ui-react';
import { Confirm, Icomoon, Modal, ModalGrid } from '../../../components';

import './index.css';

import moment from "moment";
import { getRoutes } from '../../../redux/actions/RoutesActions';
import { deleteRoutesVersions, getRoutesVersions } from '../../../redux/actions/RoutesVersionsActions';

const messages = defineMessages({
    header: {
        id: 'version.header',
        defaultMessage: 'Gerenciador de versão'
    },
    description: {
        id: 'version.description',
        defaultMessage: 'Seja bem vindo ao módulo de análise e gerenciamento de versões, rascunho e histórico.'
    },
    key: {
        id: 'version.key',
        defaultMessage: 'Chave'
    },
    inProduction: {
        id: 'version.inProduction',
        defaultMessage: 'Em Produção'
    },
    inDraft: {
        id: 'version.inDraft',
        defaultMessage: 'Rascunho'
    },
    disable: {
        id: 'version.disable',
        defaultMessage: 'Desativar'
    },
    view: {
        id: 'version.view',
        defaultMessage: 'Visualizar'
    },
    draft: {
        id: 'version.draft',
        defaultMessage: 'Rascunhos Salvos'
    },
    version: {
        id: 'version.version',
        defaultMessage: 'Versão'
    },
    disabled: {
        id: 'version.disabled',
        defaultMessage: 'Desativada em'
    },
    reactivate: {
        id: 'version.reactivate',
        defaultMessage: 'Reativar'
    },
    discontinued: {
        id: 'version.discontinued',
        defaultMessage: 'Descontinuada'
    },
    executor: {
        id: 'version.executor',
        defaultMessage: 'Executor'
    },
    creation: {
        id: 'version.creation',
        defaultMessage: 'Criação'
    },
    deactivation: {
        id: 'version.deactivation',
        defaultMessage: 'Desativação'
    },
});

class VersionManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getRoutes(this.props.route_id).then(() => {
            this.props.getRoutesVersions(this.props.route_id);
        });
    };

    renderDraft = (id) => {
        const {versions, intl: {formatMessage}} = this.props;

        if (!isEmpty(versions.result.data))
            versions.result.data.filter((row) => {
                return row.id !== id;
            }).map((field, index) => {
                return (
                    <Table.Row key={`detaild-row-${index}`}>
                        <Table.Cell
                            content={
                                <Header
                                    as={'h4'}
                                    content={field.version}
                                    textAlign={'center'}
                                />
                            }
                        />
                        <Table.Cell content={'Mundo Wap'}/>
                        <Table.Cell content={field.created_by_user.name}/>
                        <Table.Cell content={'-'}/>
                        <Table.Cell
                            textAlign={'center'}
                            content={
                                <Icomoon
                                    name={'x link'}
                                    title={'Remover versão'}
                                    onClick={
                                        () => this.refs['VersionsDelete'].openModal({
                                            route: field.id,
                                            id: id
                                        })
                                    }
                                />
                            }
                        />
                        <Table.Cell
                            textAlign={'center'}
                            content={
                                <NavLink to={`/main/routes/home/${field.version}`} className={'btnView'}>
                                    {formatMessage(messages.view)}
                                </NavLink>
                            }
                        />
                    </Table.Row>
                );
            });
        else
            return false;
    };

    renderTabs = (rows) => {
        return (
            <Tab
                className={'tabsVersions'}
                menu={{secondary: true, pointing: true}}
                panes={
                    rows.map((row) => {
                        return ({
                            menuItem: row.title,
                            render: () => <Tab.Pane>{row.content}</Tab.Pane>
                        });
                    })
                }/>
        );
    };

    render() {
        const {route, versions, intl: {formatMessage}} = this.props;
        const {data} = this.props.route.result;
        const {published_version} = this.props.route.result.data;
        const {last_version_published} = this.props.route.result.data;

        return (
            <React.Fragment>
                <Modal ref={'VersionsDelete'} size={'tiny'}>
                    <Confirm
                        onCancel={
                            () => {
                                this.refs['VersionsDelete'].closeModal();
                            }
                        }
                        onConfirm={
                            () => {
                                let modal = this.refs['VersionsDelete'];
                                return this.props
                                    .deleteRoutesVersions(modal.state.props);
                            }
                        }
                        onSuccess={this.props.fetchRoutes}
                    />
                </Modal>

                <ModalGrid
                    header={formatMessage(messages.header)}
                    description={formatMessage(messages.description)}
                    image={'/assets/images/startup.svg'}
                    onClose={() => this.props.modal.closeModal()}
                    isLoading={route.isLoading}
                >
                    {
                        this.renderTabs([
                            {
                                title: 'Produção',
                                content: <React.Fragment>
                                    <Table basic className={'tableVersionMW'}>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell width={5} verticalAlign={'top'}>
                                                    <span>{data.name}</span>
                                                    {
                                                        !isEmpty(published_version) &&
                                                        published_version.published_by_user.name
                                                    }
                                                </Table.Cell>
                                                <Table.Cell width={3} verticalAlign={'top'}>
                                                    <span>Chave</span>
                                                    {data.id}
                                                </Table.Cell>
                                                <Table.Cell className={'tdVersionMW'} width={6}>
                                                    {
                                                        !isEmpty(published_version) &&
                                                        <React.Fragment>
                                                            <Header
                                                                as={'h4'}
                                                                content={published_version.published ? formatMessage(messages.inProduction) : formatMessage(messages.inDraft)}
                                                                subheader={moment(published_version.created_at).format('DD \\d\\e MMMM \\d\\e YYYY \\à\\s H:mm')}
                                                                className={'headerProduction'}
                                                            />

                                                            <small>{`${published_version.modified} - ${published_version.modified_user}`}</small>
                                                        </React.Fragment>
                                                    }
                                                </Table.Cell>
                                                <Table.Cell
                                                    className={'tdVersionMW'}
                                                    width={2}
                                                    content={
                                                        <Button
                                                            primary
                                                            size={'mini'}
                                                            content={'Desativar'}
                                                            onClick={() => console.log('Desativar versão')}
                                                        />
                                                    }
                                                />
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>

                                    <Divider/>

                                    <Table basic className={'tableFooterMW'}>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell
                                                    content={
                                                        <Header
                                                            as={'h4'}
                                                        >
                                                            {`${formatMessage(messages.version)} ${formatMessage(messages.discontinued)}`}
                                                            <Header.Subheader
                                                                content={
                                                                    !isEmpty(last_version_published) ?
                                                                        `${formatMessage(messages.key)}: ${last_version_published.version}`
                                                                        : 'No momento não há versão descontinuada'
                                                                }
                                                            />
                                                        </Header>
                                                    }
                                                />
                                                {
                                                    !isEmpty(last_version_published) &&
                                                    <React.Fragment>
                                                        <Table.Cell>
                                                            <Header
                                                                as={'h4'}
                                                                content={formatMessage(messages.disabled)}
                                                                subheader={moment(last_version_published.modified_at).format('DD \\d\\e MMMM \\d\\e YYYY \\à\\s H:mm')}
                                                            />
                                                            <small>{`${last_version_published.modified} - ${last_version_published.modified_user}`}</small>
                                                        </Table.Cell>
                                                        <Table.Cell
                                                            textAlign={'right'}
                                                            content={
                                                                <Button
                                                                    size={'tiny'}
                                                                    content={'Reativar'}
                                                                    onClick={
                                                                        () => console.log('Reativar versão de rota')
                                                                    }
                                                                />
                                                            }
                                                        />
                                                    </React.Fragment>
                                                }
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </React.Fragment>
                            },
                            {
                                title: 'Rascunho',
                                content: <div style={{
                                    minHeight: 100,
                                    maxHeight: 159,
                                    overflowY: 'auto'
                                }} className={'field'}>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell textAlign={'center'} content={formatMessage(messages.version)}/>
                                                <Table.HeaderCell content={formatMessage(messages.executor)}/>
                                                <Table.HeaderCell content={formatMessage(messages.creation)}/>
                                                <Table.HeaderCell content={formatMessage(messages.deactivation)}/>
                                                <Table.HeaderCell style={{width: 48}} colSpan={2}/>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                versions.isLoading &&
                                                <Table.Row key={'detaild-row-loading'}>
                                                    <Table.Cell
                                                        textAlign={'center'}
                                                        colSpan={6}
                                                        content={<Segment basic loading={versions.isLoading}/>}
                                                    />
                                                </Table.Row>
                                            }

                                            {
                                                this.renderDraft(data.id) === false ?
                                                    this.renderDraft(data.id) :
                                                    <Table.Row>
                                                        <Table.Cell colSpan={6} content={'No momento não há rascunhos salvos.'}/>
                                                    </Table.Row>

                                            }
                                        </Table.Body>
                                    </Table>
                                </div>
                            }
                        ])
                    }
                </ModalGrid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        route: state.Routes.content,
        route_id: ownProps.modal.state.props.id,
        versions: state.RoutesVersions.content
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoutes: id => {
            return dispatch(getRoutes(id));
        },
        getRoutesVersions: route => {
            return dispatch(getRoutesVersions(route));
        },
        deleteRoutesVersions: (route, id) => {
            return dispatch(deleteRoutesVersions(route, id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VersionManagement));
