import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {defineMessages, injectIntl} from 'react-intl';
import {indexOf} from 'lodash';

import {fetchPeoples} from '../../../../redux/actions/PeoplesActions';
import {fetchStores} from '../../../../redux/actions/StoresActions';

import {Menu, Popup, Grid, Header, Input, Segment} from 'semantic-ui-react';
import {Icomoon, Empty} from '../../../../components';
import RangeInput from '../RangeInput';
import './index.css';

const messages = defineMessages({
    filterOptions: {
        id: 'filtersToolbar.filterOptions',
        defaultMessage: 'Opções de Filtros'
    }
});

class FiltersToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: {
                father: false,
                children: false
            },
            popup: {
                father: false,
                children: false
            },
            search: {
                father: '',
                children: ''
            },
            data: [],
            elements: []
        };
    }

    componentDidMount() {
        let elements = [];

        if (this.props.peoples)
        {
            elements.push({
                key: 'peoples',
                title: 'Pessoas / Usuários',
                func: (params) => this.onFetchPeoples(params)
            })
        }

        if (this.props.pointService)
        {
            elements.push({
                key: 'pointService',
                title: 'Pontos de Atendimentos',
                func: (params) => this.onFetchPointService(params)
            })
        }

        if (this.props.marketGroupings)
        {
            elements.push({
                key: 'marketGroupings',
                title: 'Agrupamentos de Mercado',
                func: (params) => this.onFetchMarketGroupings(params)
            })
        }

        if (this.props.serviceArea)
        {
            elements.push({
                key: 'serviceArea',
                title: 'Zonas de Atendimento',
                func: (params) => this.onFetchServiceArea(params)
            })
        }

        if (this.props.region)
        {
            elements.push({
                key: 'region',
                title: 'Região',
                func: (params) => this.onFetchRegion(params)
            })
        }

        if (this.props.revenues)
        {
            elements.push({
                key: 'revenues',
                title: 'Range de Faturamento',
                func: () => {}
            })
        }

        if (this.props.costCare)
        {
            elements.push({
                key: 'costCare',
                title: 'Range de Custo de Atendimento',
                func: () => {}
            })
        }

        if (this.props.tmo)
        {
            elements.push({
                key: 'tmo',
                title: 'Range de TMO',
                func: () => {}
            })
        }

        this.setState({elements})
    };

    onOpenPopupParent = () => this.setState({
        popup: {
            father: true,
            children: false
        }
    });

    onClosePopupParent = () => {
        const {children} = this.state.popup;

        if (!children)
        {
            this.setState({
                popup: {
                    father: false,
                    children: false
                }
            })
        }
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
            loading: {
                ...prevState.loading,
                children: false
            },
            popup: {
                ...prevState.popup,
                children: false
            },
            search: {
                ...prevState.search,
                children: ''
            },
            data: []
        }
    });

    onSerachElements = father => this.setState(prevState => {
        return {
            search: {
                ...prevState.search,
                father
            }
        }
    });

    onSerachChildrens = (children, key, callback) => this.setState(prevState => {
        return {
            search: {
                ...prevState.search,
                children
            }
        }
    }, () => {
        if (key === 'Enter')
        {
            callback({q: children})
        }
    });

    renderListElements = () => {
        const {search, elements, loading, data} = this.state;
        const filteredElements = elements.filter((element) => {
            return element.title.toLowerCase().includes(search.father.toLowerCase())
        });

        if (filteredElements.length === 0)
        {
            return (
                <Empty/>
            )
        }

        return (
            <Menu text vertical>
                {
                    filteredElements.map((element, key) => {
                        return (
                            <Popup
                                flowing
                                basic
                                on={'click'}
                                key={key}
                                horizontalOffset={17}
                                position={'left center'}
                                className={'popupChildrenToolbar'}
                                onOpen={() => this.onOpenPopupChildren()}
                                onClose={() => this.onClosePopupChildren()}
                                trigger={
                                    <Menu.Item
                                        key={key}
                                        onClick={() => element.func()}
                                    >
                                        {element.title}
                                    </Menu.Item>
                                }
                            >
                                <Segment
                                    basic
                                    loading={loading.children}
                                >
                                    <Header as={'h5'}>
                                        <Header.Content>
                                            {element.title}
                                        </Header.Content>
                                    </Header>
                                    <Grid>
                                        {
                                            (indexOf(['revenues', 'costCare', 'tmo'], element.key) === -1) &&
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Input
                                                            placeholder={'Pesquisar ...'}
                                                            value={search.children}
                                                            className={'w-100'}
                                                            icon={
                                                                <Icomoon
                                                                    name={'search link'}
                                                                    title={'Pesquisar'}
                                                                />
                                                            }
                                                            onChange={(event, result) => this.onSerachChildrens(result.value)}
                                                            onKeyPress={(e) => this.onSerachChildrens(e.target.value, e.key, element.func)}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                        }
                                        <Grid.Row>
                                            <Grid.Column>
                                                {[
                                                    (element.key === 'peoples') &&
                                                        this.onRenderListFetchPeoples(data, element.title),
                                                    (element.key === 'pointService') &&
                                                        this.onRenderListFetchPointService(data, element.title),
                                                    (indexOf(['revenues', 'costCare', 'tmo'], element.key) !== -1) &&
                                                        <RangeInput
                                                            key={key}
                                                            titleMin={'Valor Mínimo'}
                                                            placeholderMin={'Mínimo'}
                                                            titleMax={'Valor Maximo'}
                                                            placeholderMax={'maximo'}
                                                            onGetValue={(value) => this.props.onSelectElement({key: element.title, value: `min: ${value.min} | max: ${value.max}`})}
                                                        />
                                                ]}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Popup>
                        )
                    })
                }
            </Menu>
        )
    };

    onFetchPeoples = params => {
        this.setState(prevState => {
            return {
                loading: {
                    ...prevState.loading,
                    children: true
                }
            }
        }, () => this.props.fetchPeoples(params).then((peoples) => {
            this.setState(prevState => {
                return {
                    loading: {
                        ...prevState.loading,
                        children: false
                    },
                    data: peoples.data
                }
            })
        }))
    };

    onFetchPointService = params => {
        this.setState(prevState => {
            return {
                loading: {
                    ...prevState.loading,
                    children: true
                }
            }
        }, () => this.props.fetchStores(params).then((stores) => {
            this.setState(prevState => {
                return {
                    loading: {
                        ...prevState.loading,
                        children: false
                    },
                    data: stores.data
                }
            })
        }))
    };

    onFetchMarketGroupings = params => {
        console.log('Peoples')
    };

    onFetchServiceArea = params => {
        console.log('Peoples')
    };

    onFetchRegion = params => {
        console.log('Peoples')
    };

    onRenderListFetchPeoples = (data, title) => {
        if(data.length === 0)
        {
            return (
                <div key={'vazio'} style={{width: '16.5rem'}}>
                    <Empty/>
                </div>
            )
        }

        return (
            <Menu text vertical key={'menu'}>
                {
                    data.map((row, key) => {
                        return (
                            <Menu.Item
                                key={key}
                                onClick={() => this.props.onSelectElement({key: title, value: row.name})}
                            >
                                {row.name}
                                <small style={{display: 'block'}}>{row.document}</small>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    };

    onRenderListFetchPointService = (data, title) => {
        if(data.length === 0)
        {
            return (
                <div key={'vazio'} style={{width: '16.5rem'}}>
                    <Empty/>
                </div>
            )
        }

        return (
            <Menu text vertical key={'menu'}>
                {
                    data.map((row, key) => {
                        return (
                            <Menu.Item
                                key={key}
                                onClick={() => this.props.onSelectElement({key: title, value: row.name})}
                            >
                                {row.name}
                                <small style={{display: 'block'}}>{row.company_name}</small>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    };

    render() {
        const {intl: {formatMessage}} = this.props;
        const {popup, loading, search} = this.state;

        return (
            <Menu.Item>
                <Popup
                    flowing
                    position={'bottom right'}
                    on={'click'}
                    open={popup.father}
                    horizontalOffset={10}
                    verticalOffset={0}
                    onClose={() => this.onClosePopupParent()}
                    trigger={
                        <Icomoon
                            name={'filter link'}
                            title={formatMessage(messages.filterOptions)}
                            onClick={() => this.onOpenPopupParent()}
                        />
                    }
                >
                    <Segment
                        basic
                        loading={loading.father}
                        className={'filtersPopupParent'}
                    >
                        <Header as={'h5'}>
                            <Header.Content>
                                Opções de Filtros
                            </Header.Content>
                        </Header>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input
                                        placeholder={'Pesquisar ...'}
                                        value={search.father}
                                        className={'w-100'}
                                        icon={
                                            <Icomoon
                                                name={'search link'}
                                                title={'Pesquisar'}
                                            />
                                        }
                                        onChange={(event, result) => this.onSerachElements(result.value)}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    {this.renderListElements()}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Popup>
            </Menu.Item>
        );
    }
}

FiltersToolbar.propType = {
    peoples: PropTypes.bool,
    pointService: PropTypes.bool,
    marketGroupings: PropTypes.bool,
    serviceArea: PropTypes.bool,
    region: PropTypes.bool,
    revenues: PropTypes.bool,
    costCare: PropTypes.bool,
    tmo: PropTypes.bool,
    onSelectElement: PropTypes.func
};

FiltersToolbar.defaultProps = {
    peoples: false,
    pointService: false,
    marketGroupings: false,
    serviceArea: false,
    region: false,
    revenues: false,
    costCare: false,
    tmo: false
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPeoples: params => {
            return dispatch(fetchPeoples(params))
        },
        fetchStores: params => {
            return dispatch(fetchStores(params))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FiltersToolbar));
