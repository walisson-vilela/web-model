import { findIndex, isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { Component, createRef, Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Dimmer, Divider, Header, Input, List, Loader, Placeholder, Popup } from 'semantic-ui-react';

import { GroupCheckboxPopup, Icomoon } from '../../../components';
import { fetchPeoples } from '../../../redux/actions/PeoplesActions';
import { getRoutesWindowsProgress } from '../../../redux/actions/RoutesWindowsActions';
import { fetchStores } from '../../../redux/actions/StoresActions';
import { findZones } from '../../../redux/actions/ZonesActions';
import { EventManagerContext } from "../EventManager";
import { Container, Content, ItemStore, SearchArea } from './storesStyle';

const storesRef = createRef();
const inputRef = createRef();

const CoverageRoutes = ({from, ids}) => {
    const {handleInterval: {dispatch}} = useContext(EventManagerContext);

    const [loading, setLoading] = useState(true);
    const [peoples, setPeoples] = useState([]);

    const getPeoples = useCallback(async (ids) => {
        setLoading(true);
        try {
            if (from === "peoples") {
                const res = await dispatch(fetchPeoples({"q": ids}));
                if (res.success) {
                    setPeoples(res.data);
                }
            } else {
                let items = [];
                const res = await dispatch(findZones({"id": ids, "with_people": 1}));
                if (res.success) {
                    res.data.map((o) => {
                        o.links.map((p) => {
                            items[p.people.id.toString()] = p.people;
                        })
                    });
                }
                setPeoples(items);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getPeoples(ids);
    }, [ids]);

    if(loading) {
        return (
            <Placeholder inverted>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder>
        );
    }

    return (
        <React.Fragment>
            <Header inverted>
                {from === "peoples" ? "Na rota dos Executores" : "Na carteira dos Executores"}
            </Header>
            <Divider/>
            <div className={"store-coverage"}>
                <List bulleted inverted divided relaxed={"very"}>
                    {
                        peoples.map((o, i) => {
                            const {re, name} = o;
                            return <List.Item key={i}>
                                <small style={{color: "var(--white-50)"}}>Código: {re}</small>
                                <div>{name}</div>
                            </List.Item>;
                        })
                    }
                </List>
            </div>
            <Divider/>
        </React.Fragment>
    );
}

class Stores extends Component {
    constructor(props) {
        super(props);

        let params = props.logged.contractor.params || {};

        this.state = {
            params: params.filter(o => o.key === 'show_all_stores'),
            show_all_stores: 0,
            progress: false,
            loading: false,
            checkbox: {
                group: true,
                attendance: false,
                trade: false,
                all: false,
            },
            filter: 0,
            stores: {},
            check_all: {
                indeterminate: false,
                check: false
            },
            selected_items: [],
            search: ''
        };
    }

    componentDidMount() {
        if (this.state.params.length) {
            this.setState(prevState => ({
                show_all_stores: parseInt(this.state.params[0]["value"]),
                checkbox: {
                    ...prevState.checkbox,
                    group: parseInt(this.state.params[0]["value"]) !== 2,
                    all: parseInt(this.state.params[0]["value"]) === 2
                }
            }));
        }

        // noinspection JSIgnoredPromiseFromCall
        this.handleGetProgressWindow();
        inputRef.current.focus();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {selected_items} = this.state;
        const {excluded} = this.props;

        // check state object selected_items different prevState selected_items
        // check props object excluded different prevProps excluded
        if (
            JSON.stringify(selected_items) !== JSON.stringify(prevState.selected_items) ||
            JSON.stringify(excluded) !== JSON.stringify(prevProps.excluded)
        ) {
            // noinspection JSIgnoredPromiseFromCall
            this.handleRenderCheckAll();
        }
    }

    /**
     * Toggle checkbox grouped (group, attendance)
     *
     * @param key
     * @param value
     * @returns {Promise<void>}
     */
    handleCheckboxGrouped = async (key, value) => {
        // Check if value is true and disable trade.
        if (value === true) {
            await this.setState(prevState => ({
                checkbox: {
                    ...prevState.checkbox,
                    trade: false,
                    all: false,
                }
            }))
        }

        await this.setState(prevState => ({
            checkbox: {
                ...prevState.checkbox,
                [key]: Boolean(value)
            }
        }))
    };

    /**
     * Toggle checkbox trade
     *
     * @param value
     * @returns {Promise<void>}
     */
    handleCheckboxTrade = async value => {
        // Check if value is true and disable group and attendance
        if (value === true) {
            await this.setState(prevState => ({
                checkbox: {
                    ...prevState.checkbox,
                    group: false,
                    attendance: false,
                    all: false,
                }
            }))
        }

        await this.setState(prevState => ({
            checkbox: {
                ...prevState.checkbox,
                trade: value
            }
        }))
    };

    /**
     * Set value in filter
     *
     * @param value
     * @returns {Promise<void>}
     */
    handleFilterDropdown = async value => {
        await this.setState({filter: value});
    };

    /**
     * handleDefParams
     */
    handleDefParams = () => {
        const {storeFilterOptions, route} = this.props;
        const checked = storeFilterOptions.filter((o) => o.checked).map((o) => o.type);

        let params = {"q": this.state.search, "limit": 50, "active": 1, "group_by_store": 1, "with_coverage": 1};
        if (checked.includes("group")) {
            params.zone_id = route.data.route.zone_id;
        }

        if (checked.includes("attendance")) {
            params.unattended = 1;
        }

        if (checked.includes("trade")) {
            params.without_hierarchy = 1;
        }

        if (checked.includes("all")) {
            params.all = 1;
        }

        return params;
    };

    /**
     * set value searched in state
     * @param value
     * @returns {Promise<void>}
     */
    handleFetchChange = async (value) => {
        await this.setState({search: value});
    };

    /**
     * Search stores in API
     *
     * @returns {Promise<void>}
     */
    handleFetchStores = async () => {
        const {fetchStores} = this.props;

        const params = this.handleDefParams();
        try {
            await this.setState({loading: true});

            const request = await fetchStores(params);
            await this.setState({stores: request});
            await this.handleRenderCheckAll();

            // scroll to top
            if (storesRef.current) {
                storesRef.current.scrollTop = 0;
            }
        } catch (e) {
            console.error(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Check all items selecteds
     *
     * @returns {Promise<void>}
     */
    handleRenderCheckAll = async () => {
        const {selected_items, stores} = this.state;
        const {excluded} = this.props;

        const items = [...selected_items, ...excluded];

        let indeterminate = false;
        let check = false;

        // check for stores
        if (isEmpty(stores) || isEmpty(stores.data)) {
            this.setState({
                check_all: {
                    indeterminate,
                    check
                }
            })
        } else {
            let check = [];

            items.map((selected) => {
                const value = stores.data.filter((store) => parseInt(store.id) === selected.store_id);

                if (!isEmpty(value)) {
                    check.push(value)
                }

                return true;
            });

            if (check.length === stores.data.length) {
                this.setState({
                    check_all: {
                        indeterminate: false,
                        check: true
                    }
                })
            } else {
                if (check.length > 0) {
                    this.setState({
                        check_all: {
                            indeterminate: true,
                            check: false
                        }
                    })
                } else {
                    this.setState({
                        check_all: {
                            indeterminate: false,
                            check: false
                        }
                    })
                }
            }
        }
    };

    /**
     * Check all items
     *
     * @param value
     * @returns {Promise<void>}
     */
    handleCheckAllItems = async (value = false) => {
        const {stores, selected_items} = this.state;
        const {excluded} = this.props;

        const items = [...selected_items];

        // verify is not empty stores
        if (!isEmpty(stores) && !isEmpty(stores.data)) {
            // verify value is true
            if (value) {
                await stores.data.map(async (store) => {
                    const index = findIndex(selected_items, (selected) => selected.store_id === parseInt(store.id));

                    // verify not exists in array selected_items
                    if (index.toString() === '-1') {
                        const indexExcluded = findIndex(excluded, (ex) => parseInt(ex.store_id) === parseInt(store.id));

                        // verify not exists in array excluded
                        if (indexExcluded.toString() === '-1') {
                            const serialize = await this.handleSerializeData(store);
                            items.push(serialize);
                        }
                    }
                });

                await this.setState({
                    selected_items: items
                });
            } else {
                const ids = [];

                stores.data.map(async (store) => {
                    const index = findIndex(selected_items, (selected) => selected.store_id === parseInt(store.id));

                    // verify object exists in array selected_items
                    if (index.toString() !== '-1') {
                        ids.push(index);
                    }
                });

                // remove items in positions in array ids
                const newItems = items.filter((item, key) => findIndex(ids, (id) => key !== id).toString() === '-1');

                await this.setState({
                    selected_items: newItems
                });
            }
        }
    };

    /**
     * Verify checkbox checked
     *
     * @param value
     * @returns {boolean}
     */
    handleVerifyUniqueCheckItem = (value) => {
        const {selected_items} = this.state;

        const index = findIndex(selected_items, (selected) => selected.store_id === parseInt(value.id));

        return index.toString() !== '-1';
    };

    /**
     * Verify checkbox disabled
     *
     * @param value
     * @returns {boolean}
     */
    handleVerifyUniqueDisabledItem = (value) => {
        const {excluded} = this.props;

        const index = findIndex(excluded, (ex) => parseInt(ex.store_id) === parseInt(value.id));

        return index.toString() !== '-1';
    };

    /**
     * check unique item
     *
     * @param value
     * @param checked
     * @returns {Promise<void>}
     */
    handleCheckUniqueItem = async (value, checked = false) => {
        const items = [...this.state.selected_items];

        const index = findIndex(items, (item) => item.store_id === parseInt(value.id));

        // verify checked and not found value in array selected_items
        if (checked && index.toString() === '-1') {
            const serialize = await this.handleSerializeData(value);
            items.push(serialize);
        } else if (!checked && index.toString() !== '-1') {
            items.splice(index, 1);
        }

        await this.setState({selected_items: items})
    };

    handleSerializeData = async (value) => {

        const {
            id,
            code,
            company_name,
            name,
            formatted_address,
            lat,
            lng,
            coordinates,
            validated,
            document,
            time_attendance_avg
        } = value;

        return {
            "store_id": parseInt(id),
            "store_code": code,
            "company_name": company_name,
            "name": name,
            "formated_adrress": formatted_address,
            "lat": lat,
            "lng": lng,
            "coordinates": coordinates,
            "validated": validated,
            "document": document,
            "start_time": "0:00",
            "end_time": "00:00",
            "duration": "00:00",
            "extra_time": "00:00",
            "time_total": "00:00",
            "distance": 0.0,
            "time_trip": "00:00",
            "time_attendance_avg": time_attendance_avg,
            "zone_id": 0,
            "zone_name": "ND",
        };
    };

    /**
     * Added stores in redux form
     *
     * @returns {Promise<void>}
     */
    handleAdded = async () => {
        await this.setState({loading: true});
        await this.props.added(this.state.selected_items);

        await this.setState({
            loading: false,
            selected_items: []
        });
        await inputRef.current.select();
    };

    /**
     * Request API to status in-progress
     *
     * @returns {Promise<void>}
     */
    handleGetProgressWindow = async () => {
        const {getRoutesWindowsProgress} = this.props;
        try {
            await this.setState({loading: true});
            const request = await getRoutesWindowsProgress();
            await this.setState({
                progress: request.status
            });
        } catch (e) {
            console.error(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    render() {
        const {storeFilterOptions} = this.props;
        const {loading, stores, check_all, selected_items} = this.state;

        return (
            <Container>
                <Dimmer inverted active={loading}>
                    <Loader inverted/>
                </Dimmer>

                <SearchArea>
                    <div className={"__check-all"}>
                        <Checkbox
                            label={`Selecionados (${selected_items.length})`}
                            indeterminate={check_all.indeterminate}
                            checked={check_all.check}
                            onChange={(e, {checked}) => this.handleCheckAllItems(checked)}
                            disabled={isEmpty(stores) || isEmpty(stores.data)}
                        />
                    </div>
                    <Input
                        transparent
                        ref={inputRef}
                        className={'__search'}
                        icon={<Icomoon name={'search'} link onClick={() => this.handleFetchStores()}/>}
                        placeholder={'Pesquisar'}
                        onChange={(e, {value}) => this.handleFetchChange(value)}
                        onKeyPress={(e) => e.key.toString() === 'Enter' && this.handleFetchStores()}
                    />
                    <div>
                        <GroupCheckboxPopup
                            basic
                            options={storeFilterOptions}
                        />
                    </div>
                    <div>
                        <Button
                            // basic={selected_items.length === 0}
                            disabled={selected_items.length === 0}
                            content={'Adicionar'}
                            // color={'green'}
                            onClick={() => this.handleAdded()}
                        />
                    </div>
                </SearchArea>

                <Content>
                    {
                        (isEmpty(stores) || isEmpty(stores.data)) ?
                            (
                                <hgroup className="empty__stores">
                                    <h3>Não existem pontos para serem exibidos!</h3>
                                    <h5>Utilize os campos acima para fazer uma busca.</h5>
                                </hgroup>
                            ) :
                            (
                                <Fragment>
                                    <section className="area__scroll" ref={storesRef}>
                                        {
                                            stores.data.map((store, index) => {
                                                const disabled = this.handleVerifyUniqueDisabledItem(store);
                                                const position = findIndex(selected_items, (item) => item.store_id === parseInt(store.id));
                                                const {
                                                    coverage_routes,
                                                    coverage_peoples,
                                                    coverage_elements,
                                                    coverage_zones,
                                                } = store;

                                                return (
                                                    <ItemStore key={index} disabled={disabled}>
                                                        <Checkbox
                                                            onChange={(e, {checked}) => this.handleCheckUniqueItem(store, checked)}
                                                            checked={this.handleVerifyUniqueCheckItem(store) || disabled}
                                                            disabled={disabled}
                                                        />
                                                        <div className="item__content" onClick={() => !disabled && this.handleCheckUniqueItem(store, Boolean(position.toString() === '-1'))}>
                                                            <small>Código: {store.code}</small>
                                                            <hgroup>
                                                                <h1>{store.name}</h1>
                                                                <p>{store.formatted_address}</p>
                                                            </hgroup>
                                                        </div>
                                                        <div>
                                                            <Popup
                                                                basic
                                                                inverted
                                                                content={<CoverageRoutes from="peoples"  ids={coverage_peoples} />}
                                                                trigger={<Button
                                                                    basic
                                                                    circular
                                                                    inverted
                                                                    icon={"calendar alternate outline"}
                                                                    disabled={!coverage_routes}
                                                                />}
                                                                on={"click"}
                                                                position={"left center"}
                                                                style={{ minWidth: '320px'}}
                                                            />
                                                            <Popup
                                                                basic
                                                                inverted
                                                                content={<CoverageRoutes from="zones" ids={coverage_zones} />}
                                                                trigger={<Button
                                                                    basic
                                                                    circular
                                                                    inverted
                                                                    icon={"address book outline"}
                                                                    disabled={!coverage_elements}
                                                                />}
                                                                on={"click"}
                                                                position={"left center"}
                                                                style={{ minWidth: '320px'}}
                                                            />
                                                        </div>
                                                    </ItemStore>
                                                )
                                            })
                                        }
                                    </section>
                                    {
                                        stores.pagination && <div>
                                            Total de PDVs: {stores.pagination.count}
                                        </div>
                                    }
                                    {/*<PaginationMW*/}
                                    {/*    transparent*/}
                                    {/*    size={'mini'}*/}
                                    {/*    pagination={stores.pagination}*/}
                                    {/*    onPageChange={page => this.handleFetchStores({...page})}*/}
                                    {/*    onLimitChange={limit => this.handleFetchStores({limit})}*/}
                                    {/*/>*/}
                                </Fragment>
                            )
                    }
                </Content>
            </Container>
        )
    }
}

Stores.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    start: PropTypes.string.isRequired,
    added: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({fetchStores, getRoutesWindowsProgress}, dispatch);
const mapStateToProps = (state) => {
    return {
        logged: state.Users.content.result.data.user,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
