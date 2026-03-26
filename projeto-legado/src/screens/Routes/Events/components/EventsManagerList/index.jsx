import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {findIndex, isEmpty} from 'lodash';
import * as PropTypes from 'prop-types';

import {fetchStores} from '../../../../../redux/actions/StoresActions';


import {Button, Divider, Grid, Header, Label, List, Popup, Segment} from 'semantic-ui-react';
import {Empty, Icomoon, ModalBasic, PaginationMW} from '../../../../../components';
import Filter from '../Filter';
import './index.css';

class EventsManagerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            conflicts: false,
            query: {
                limit: 60,
                pagination: {},
                filters: {}
            },
            stores: {
                primary: [],
                secondary: [],
                filter: {},
                search: ''
            },
            popup: {
                filter: false
            }
        };
    }

    onFetchStores = params => {
        const {query, stores} = this.state;
        const paramDefault = {limit: query.limit, ...stores.filter};

        this.setState({
            loading: true
        }, () => this.props.fetchStores({...paramDefault, ...params})
            .then((store) => this.setState(prevState => {
                return {
                    loading: false,
                    query: {
                        ...prevState.query,
                        pagination: store.pagination
                    },
                    stores: {
                        ...prevState.stores,
                        primary: store.data
                    }
                }
            })))
    };


    onSetLimit = limit => this.setState(prevState => {
        return {
            query: {
                ...prevState.query,
                limit
            }
        }
    }, () => this.onFetchStores());

    onSetFilter = filter => this.setState(prevState => {
        return {
            stores: {
                ...prevState.stores,
                filter
            }
        }
    }, () => this.onFetchStores());


    onRenderElementsConflicts = () => {
        const {stores, conflicts} = this.state;

        if (conflicts) {
            const storesRows = stores.secondary.filter((store) => {
                return store.validated === 'N' && store.name.toLowerCase().includes(stores.search.toLowerCase())
            });

            if (storesRows.length !== 0) {
                return (
                    storesRows.map((store, key) => {
                        return (
                            <List.Item key={key}>
                                <Grid verticalAlign={'middle'} textAlign={'center'}>
                                    <Grid.Row columns={3}>
                                        <Grid.Column textAlign={'left'} width={10}>
                                            <Header as={'h5'}>
                                                <Header.Content>
                                                    {store.name}
                                                    <Header.Subheader>
                                                        {store.formatted_address}
                                                        <span style={{display: 'block'}}>ID GIV: {store.id} | Código Interno: {store.code}</span>
                                                    </Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <Label circular color={'yellow'} empty/>
                                            Grupo: SPO10101
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Button compact className={'p-0'} size={'mini'}
                                                    onClick={() => this.onToggleSecondaryConflicts(store)}>
                                                <Icomoon name={'trash-2'}/> Excluir
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </List.Item>
                        )
                    })
                );
            } else if (storesRows.length === 0 && isEmpty(stores.search)) {
                this.setState({
                    conflicts: false
                }, () => {
                    this.refs.ManageConflict.closeModal();
                    this.refs.ResolvedConflicts.openModal();
                })
            } else {
                return (<div className={'mt-2'}><Empty image={''}/></div>)
            }
        }
    };

    onRenderStructureBody = () => {
        const {stores, loading} = this.state;

        if (isEmpty(stores.filter)) {
            return (
                <div className={'empty-store-elements'}>
                    <Empty title={'Não há dados para exibição!'}
                           description={'Utilize os campos acima para encontrar e adicionar pontos de atendimento'}
                           image={''}/>
                </div>
            )
        } else {
            return (
                <Segment basic className={'loader-segment'} loading={loading}>
                    {
                        !loading &&
                        this.onRenderHeader()
                    }
                </Segment>
            )
        }
    };

    onRenderHeader = () => {
        const {stores} = this.state;

        return (
            <Fragment>
                <Grid className={'route-found mt-0'}>
                    <Grid.Row>
                        <Grid.Column width={5} verticalAlign={'middle'}>
                            <div>
                                <Icomoon name={this.onCheckElements() ? 'check-square link' : 'square link'}
                                         title={'Selecionar'} onClick={() => this.onSelectAllElements()}/>
                                <span onClick={() => this.onSelectAllElements()}>{this.onGetTextSelecteds()}</span>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            {
                                stores.secondary.length !== 0 &&
                                <Button fluid positive onClick={() => this.onSearchConflicts()} content={'Adicionar'}/>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {
                    this.onRenderBody()
                }
            </Fragment>
        )
    };

    onRenderBody = () => {
        let pagination = this.state.query.pagination;

        if (pagination.limit === null)
            pagination.limit = 20;

        return (
            <Segment basic className={'segment-result h-100'}>
                <div className={'returns-stores h-100'}>
                    <List divided>
                        {this.onRenderElements()}
                    </List>
                </div>
                <div className={'pagination'}>
                    <Divider/>
                    <PaginationMW
                        transparent
                        size={'tiny'}
                        pagination={pagination}
                        onPageChange={(page) => this.onFetchStores(page)}
                        onLimitChange={(limit) => this.onSetLimit(limit)}
                    />
                </div>
            </Segment>
        )
    };

    onRenderElements = () => {
        const {primary, secondary} = this.state.stores;

        if (primary.length === 0) {
            return (<div className={'empty-store-elements mt-5'}><Empty image={''}/></div>)
        } else {
            return (
                primary.map((store, key) => {
                    return (
                        <List.Item key={key} className={'list-itens-elements'}>
                            <Grid>
                                <Grid.Row columns={3} verticalAlign={'middle'} textAlign={'center'}>
                                    <Grid.Column width={1} className={'p-0'}>
                                        <Icomoon
                                            name={findIndex(secondary, {id: store.id}) === -1 ? 'square link' : 'check-square link'}
                                            onClick={() => this.onToggleSecondary(store)}/>
                                    </Grid.Column>
                                    <Grid.Column width={11} className={'p-0'} textAlign={'left'}>
                                        <Header as={'h5'}>
                                            <Header.Content>
                                                {store.name}
                                                <Popup
                                                    on={'click'}
                                                    horizontalOffset={13}
                                                    trigger={
                                                        <Icomoon name={'users link'}/>
                                                    }
                                                    content={'Add users to your feed'}
                                                />
                                                <Header.Subheader>
                                                    {store.formatted_address}
                                                    <span style={{display: 'block'}}>ID GIV: {store.id} | Código Interno: {store.code}</span>
                                                </Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width={4} className={'p-0'}>
                                        <Label circular empty color={'yellow'}/>
                                        Grupo: SPO10101
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </List.Item>
                    )
                })
            );
        }
    };


    onToggleSecondary = element => {
        const {secondary} = this.state.stores;

        if (findIndex(secondary, {id: element.id}) === -1) {
            if (secondary.length < 100) {
                secondary.push(element)
            } else {
                this.refs.MaximumNumberOfPoints.openModal()
            }
        } else {
            secondary.splice(findIndex(secondary, {id: element.id}), 1)
        }

        this.setState(prevState => {
            return {
                stores: {
                    ...prevState.stores,
                    secondary
                }
            }
        })
    };

    onToggleSecondaryConflicts = element => {
        const {secondary} = this.state.stores;

        secondary.splice(findIndex(secondary, {id: element.id}), 1);

        this.setState(prevState => {
            return {
                stores: {
                    ...prevState.stores,
                    secondary
                }
            }
        })
    };


    onSelectAllElements = () => {
        const {primary, secondary} = this.state.stores;

        primary.map((store) => {
            if (findIndex(secondary, {id: store.id}) === -1) {
                if (secondary.length < 100) {
                    secondary.push(store);
                } else {
                    this.refs.MaximumNumberOfPoints.openModal()
                }
            }

            return true;
        });

        this.setState(prevState => {
            return {
                stores: {
                    ...prevState.stores,
                    secondary
                }
            }
        })
    };

    onCheckElements = () => {
        const {primary, secondary} = this.state.stores;

        const numberItens = secondary.filter((store) => {
            return findIndex(primary, {id: store.id}) !== -1
        });

        return primary.length === numberItens.length
    };

    onGetTextSelecteds = () => {
        const {secondary} = this.state.stores;
        const totalSelecteds = secondary.length > 99 ? '+99' : secondary.length;

        return secondary.length === 0 ? 'Selecionar todos' : `Selecionados (${totalSelecteds})`
    };

    onSearchConflicts = () => {
        const {secondary} = this.state.stores;

        const conflicts = secondary.filter((store) => {
            return store.validated === 'N'
        });

        if (conflicts.length > 0) {
            this.setState({conflicts: true}, () => this.refs.ManageConflict.openModal())
        } else {
            this.setState({conflicts: false}, () => this.onSendStoreProps())
        }
    };

    onSendStoreProps = conflicts => {
        const {secondary} = this.state.stores;

        if (conflicts) {
            this.setState({
                conflicts: false
            }, () => this.refs.ManageConflict.closeModal())
        }

        this.props.onChangeEvents(secondary)
    };

    onSetSearchStores = (search) => this.setState(prevState => {
        return {
            stores: {
                ...prevState.stores,
                search
            }
        }
    });

    onNumberConflicts = () => {
        const {search, secondary} = this.state.stores;
        const storesRows = secondary.filter((store) => {
            return store.validated === 'N' && store.name.toLowerCase().includes(search.toLowerCase())
        });

        return storesRows.length;
    };

    render() {
        return (
            <Fragment>
                {/* Conflitos encontrados */}
                <ModalBasic ref={'ManageConflict'}
                            className={'manage-conflict-modal'}
                            title={`Gerenciar conflitos de pontos de atendimento (${this.onNumberConflicts()})`}
                            subheader={'Esses pontos não pertencem a esse grupo'}
                            search={(search) => this.onSetSearchStores(search)}
                            maxHeight={13}
                            onCancel={() => this.refs.ManageConflict.closeModal()}
                            onSuccess={() => this.onSendStoreProps(true)}
                            onCancelText={'Voltar'}
                            onSuccessText={'Processar'}
                            children={<List>{this.onRenderElementsConflicts()}</List>}/>
                {/* Número máximo atingido */}
                <ModalBasic ref={'MaximumNumberOfPoints'}
                            size={'mini'}
                            textAlign={'center'}
                            title={'Você atingiu o número máximo de pontos!'}
                            subheader={
                                <div className={'mt-1'}>
                                    Você não pode selecionar mais pontos! <br/>
                                    (Limite: 100 pontos)
                                </div>
                            }/>
                {/* Todos os conflitos resolvidos */}
                <ModalBasic ref={'ResolvedConflicts'}
                            children={<div style={{marginTop: '3rem', marginBottom: '5rem'}}>
                                <Empty
                                    title={'Não há nenhum conflito!'}
                                    description={'Todos os conflitos foram excluídos'}
                                    image={''}
                                    icon={'check'}
                                    position={'top'}
                                    className={'animated zoomIn'}
                                />
                            </div>}/>

                <Filter onChangeFilter={(filter) => this.onSetFilter(filter)}/>
                {this.onRenderStructureBody()}
            </Fragment>
        );
    }
}

EventsManagerList.propTypes = {
    onChangeEvents: PropTypes.func
};

EventsManagerList.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {
        fetchStores: params => {
            return dispatch(fetchStores(params))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsManagerList);
