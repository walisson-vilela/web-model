import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import {defineMessages, injectIntl} from 'react-intl';
import {toast} from 'react-semantic-toasts';

import {fetchUsers} from '../../../../../../redux/actions/UsersActions';
import {putRoutesVersions} from '../../../../../../redux/actions/RoutesVersionsActions';

import {Popup, Menu, Header, Divider, Segment, Table, Input} from 'semantic-ui-react';
import {Icomoon} from '../../../../../../components';
import Pagination from '../../../../../../components/Pagination';
import './index.css';

const messages = defineMessages({
    exchange: {
        id: 'executorExchange.exchange',
        defaultMessage: 'Trocar Executor'
    }
});

class ExecutorExchange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {},
            query: '',
            limit: 20,
            isLoading: true
        };
    }

    componentDidMount() {
        this.onChangeFetch();
    };

    onChangeFetch = options => {
        const {limit, query} = this.state;

        this.setState({isLoading: true});

        this.props.fetchUsers({...options, sort: 'name', limit: limit, q: query}).then((peoples) => {
            this.setState({
                data: peoples.data,
                pagination: peoples.pagination,
                isLoading: false
            })
        })
    };

    onChangeLimitfetch = limit => this.setState({limit});

    onRenderBody = () => {
        const {data} = this.state;

        return (
            <Table.Body>
                {
                    data.map((peoples, key) => {
                        return (
                            <Table.Row
                                key={key}
                                onClick={() => this.onSetNewExecutor(peoples.enrollment_id)}
                            >
                                <Table.Cell>
                                    <Header as={'h5'}>
                                        <Header.Content>{peoples.people.name}</Header.Content>
                                        <Header.Subheader>
                                            {peoples.enrollment_id}
                                            {
                                                !isEmpty(peoples.manager) &&
                                                    ` | ${peoples.manager.name}`
                                            }
                                            {
                                                !isEmpty(peoples.profiles) &&
                                                    peoples.profiles.map((profile, key) => {
                                                        return (
                                                            <span
                                                                key={key}
                                                                style={{display: 'block'}}
                                                            >
                                                                {profile.name}
                                                            </span>
                                                        );
                                                    })
                                            }
                                        </Header.Subheader>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        !isEmpty(peoples.route_versions) &&
                                            `Existe Rota`
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    <small style={{display: 'block'}}>
                                        <Icomoon
                                            name={'layers'}
                                            label={'1800/1800 - 100%'}
                                        />
                                    </small>

                                    <small style={{display: 'block'}}>
                                        <Icomoon
                                            name={'user'}
                                            label={'0%'}
                                        />
                                    </small>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>
        )
    };

    onSetQuery = (query, key) => {
        if (key === 'Enter')
            this.onChangeFetch();
    };

    onSetNewExecutor = enrollment_id => {
        const {route_id, route_version} = this.props;

        this.setState({isLoading: true});

        this.props.putRoutesVersions(route_id, route_version, {people_id: enrollment_id}).then(() => {
            this.setState({
                isLoading: false
            }, () => {
                toast({
                    type: 'success',
                    title: 'Sucesso!',
                    description: 'Executor alterado com sucesso!',
                    animation: 'bounce',
                    time: 5000
                });
            });
        })
    };

    render() {
        const {onOpen, onClose, intl: {formatMessage}} = this.props;
        const {isLoading, pagination, query} = this.state;

        return (
            <Popup
                basic
                flowing
                on={'click'}
                className={'popupExecutorExchange'}
                onOpen={() => onOpen()}
                onClose={() => onClose()}
                position={'right center'}
                trigger={
                    <Menu.Item
                        content={formatMessage(messages.exchange)}
                        icon={
                            <Icomoon name={'chevron-right'}/>
                        }
                    />
                }
            >
                <Header
                    as={'h3'}
                    content={'Trocar Executor'}
                    subheader={'Relação de Usuários'}
                />
                <Divider/>
                <Menu secondary attached={'top'}>
                    <Menu.Item name={'pesquisar'}>
                        <Input
                            iconPosition={'left'}
                            icon={
                                <Icomoon
                                    name={'search link'}
                                    onClick={() => this.onChangeFetch()}
                                />
                            }
                            ref={'search'}
                            value={query}
                            onChange={(e, data) => this.setState({query: data.value})}
                            onKeyPress={(e) => this.onSetQuery(e.target.value, e.key)}
                            placeholder='buscar...'
                            transparent
                        />
                    </Menu.Item>
                </Menu>
                <Segment attached className={'contentDataExchange'} loading={isLoading}>
                    <Table basic={'very'} celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan={'2'}>Usuário</Table.HeaderCell>
                                <Table.HeaderCell>Indicadores</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        {this.onRenderBody()}
                    </Table>
                </Segment>
                <Pagination
                    pagination={pagination}
                    onPageChange={(options) => this.onChangeFetch(options)}
                    onChangeLimit={(limit) => this.onChangeLimitfetch(limit)}
                />
            </Popup>
        );
    }
}

ExecutorExchange.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    route_id: PropTypes.number,
    route_version: PropTypes.number
};

ExecutorExchange.defaultProps = {
    onOpen: () => {
    },
    onClose: () => {
    },
    route_id: 0,
    route_version: 0
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: params => {
            return dispatch(fetchUsers(params))
        },
        putRoutesVersions: (id, version_id, params) => {
            return dispatch(putRoutesVersions(id, version_id, params))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExecutorExchange));
