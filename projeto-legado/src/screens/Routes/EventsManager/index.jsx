import { find, findIndex, isEmpty, isEqual, isNull, isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component, createRef, Fragment } from 'react';
import { connect } from "react-redux";
import { change, FieldArray, formValueSelector, reduxForm } from 'redux-form';

import moment from 'moment';

import { Container, Dimmer, Form, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { Confirm, Empty, Icomoon, Modal, ModalBasic, Multiselect } from '../../../components';

import {
  addEvents, buildIntervalbyEvent,
  clearEvents,
  deleteEventsAfterJourney,
  getMinutes,
  handleSubmit,
  intervalDates,
  localeDate,
  renderEvents,
  reorderEvents
} from './utils';

import { getContractorGroup } from '../../../redux/actions/ContractorsActions';
import { optimizeRouteEvents } from '../../../redux/actions/RoutesActions';
import { postRouteMarkers } from '../../../redux/actions/RoutesMarkersActions';
import { fetchRouteEventsParents, postRouteEvents } from '../../../redux/actions/RoutesVersionEventsActions';
import { fetchStores } from '../../../redux/actions/StoresActions';

import { fetchLocalizations } from '../../../redux/actions/LocalizationsActions';
import { fetchRouteRates } from '../../../redux/actions/RoutesRatesActions';

import Stores from './stores';

import { dateDuration, dateGetMinutes } from '../../../utils/DateTime';
import { AssociatedAttendance } from './associated';

import { EventManagerContext } from "../EventManager";

import './index.css';

const refMulticontas = createRef();
const confirmRef = createRef();

class RoutesEventsManager extends Component {

    static contextType = EventManagerContext;

    constructor(props) {
        super(props);

        this.state = {
            optimizeRouteEventsLoading: false,
            isLoading: true,
            recovery: false,
            associated: {
                isLoading: true,
            },
            checked: [],
            filters: {
                dropdown: '',
                search: ''
            },
            stores: {},
            journey: 0,
            time_journey: {
                start: '',
                end: '',
                duration: '',
                default: false
            },
            start_time: '',
            starting_points: [],
            secret: 0,
            match: {},
            destiny: {},
            route_start: {
                distance: 9,
            },
            route_end: {},
            rates: [],
            multicontas: false
        };
    }

    componentDidMount() {
        const {isGroup, journey} = this.context;

        const day = moment(this.props.day).locale("en");

        // parents
        const {dispatch, fetchRouteEventsParents, route_version_id} = this.props
        fetchRouteEventsParents(route_version_id, day.format('YYYY-MM-DD'))
            .then(({data}) => {
                const events = data.map((row) => {
                    const start_time = moment.utc(row.start).format('HH:mm');
                    const end_time = moment.utc(row.end).format('HH:mm');
                    const duration = dateDuration(row.duration);
                    const extra_time = dateDuration(row.time_trip_extra);
                    const time_total = dateDuration(row.time_total);
                    const time_trip = dateDuration(row.time_trip);

                    const interval = buildIntervalbyEvent(row);

                    return {
                        id: row.id,
                        store_id: row.store.id,
                        store_code: row.store.code,
                        company_name: row.store.company_name,
                        name: row.store.name,
                        formated_adrress: row.store.formatted_address,
                        lat: row.store.lat,
                        lng: row.store.lng,
                        coordinates: row.store.coordinates,
                        validated: row.store.validated,
                        document: row.store.document,
                        origin_start: row.start.replace("T", " "),
                        start_time,
                        end_time,
                        duration,
                        extra_time,
                        time_total,
                        distance: row.distance,
                        time_trip,
                        time_attendance_avg: row.store.time_attendance_avg,
                        zone_id: row.zone_id && row.zone_id.toString(),
                        zone_name: 'ZONA NAME',
                        subcontractors: {
                            _ids: row.subcontractors
                        },
                        error: false,
                        interval,
                        rates: [{rate: 1}, {rate: 2}],
                        km: parseFloat((parseInt(row.distance) / 1000).toFixed(2)).toString()
                    };
                });
                if(events.length) {
                    dispatch(change('RoutesEventsManager', 'events', events, false, false))
                }
            });

        // jorney
        const key = day.format("dddd").substring(0, 3).toLowerCase();
        const j = journey[key] ? journey[key]['journey'] : false;
        const d = j.default || false;
        if (j) {
            this.setState({
                "isLoading": false,
                "associated": {
                    "isLoading": false,
                },
                "multicontas": isGroup,
                "journey": d ? 0 : j.duration,
                "start_time": j.start,
                "time_journey": {
                    "start": j.start,
                    "end": j.end,
                    "duration": j.duration,
                    "default": j.default || false
                }
            });
        }
    }

    deleteEventsAfterJourney = () => {
        deleteEventsAfterJourney(this.props, this.state.time_journey);
    };

    addEvents = async (items) => {
        // const {state} = this;
        // const c = [...state.checked];
        //
        // const conflicts = c.filter((store) => parseInt(store.zone_id) !== parseInt(this.props.route.data.route.zone_id));
        //
        // if (conflicts.length > 0) {
        //     this.refs.ConflictShops.openModal();
        // } else {
        //     this.setAddEvents();
        // }
        await this.setState({checked: items});
        await this.setAddEvents();
    };

    setAddEvents = () => {
        const {default_event_interval} = this.context;
        const {props} = this;
        const {interval} = props;
        const c = this.state.checked;

        const s = [...props.selected];

        let start_time = moment(this.state.start_time, 'HH:mm');

        // let params = props.logged.contractor.params.filter(o => o.key === 'default_event_interval')
        let default_time_attendance_avg = default_event_interval;
        // if (params.length) {
        //     default_time_attendance_avg = parseInt(params[0]["value"]);
        // }

        if (s.length > 0) {
            const base = s.pop();
            start_time = moment(moment(base.end_time, 'HH:mm')
                .add(getMinutes(base.extra_time), 'minutes')
                .add(getMinutes(base.time_trip), 'minutes'))
                .add('1', 'minutes');
        }

        c.forEach(function (part, index) {
            // let time_attendance_avg = isNull(part.time_attendance_avg) ? 30 : part.time_attendance_avg;
            // if (default_time_attendance_avg) {
            //     time_attendance_avg = default_time_attendance_avg;
            // }

            const duration = moment('00:00', 'HH:mm').add(default_time_attendance_avg, 'minutes');

            this[index].start_time = start_time.format('HH:mm');
            this[index].end_time = start_time.add(default_time_attendance_avg, 'minutes').format('HH:mm');
            this[index].distance = part.distance;
            this[index].time_trip = part.time_trip;
            this[index].error = false;
            this[index].duration = duration.format('HH:mm');
            this[index].time_total = duration.format('HH:mm');
            this[index].interval = interval;
            this[index].subcontractors = {
                "_ids": [],
            };
            this[index].rates = [{
                rate: 1
            }, {
                rate: 2
            }];
            start_time.add('1', 'minutes');
        }, c);

        this.setState({
            checked: []
        }, async () => {
            await addEvents(this.props, c);
            // setTimeout(() => this.onChangeMarkers(), 3000);
        });
    };

    isChecked = (store_id) => {
        const index = findIndex(this.state.checked, (o) => (o.store_id === store_id));
        const selected = findIndex(this.props.selected, (o) => (o.store_id === store_id));

        return {
            index,
            success: (index > -1 || selected > -1),
        };
    };

    checkItem = (item) => {
        const res = this.isChecked(item.store_id);
        let checked = [...this.state.checked];

        if (res.success) {
            checked.splice(res.index, 1);
        } else {
            checked = [...checked, item];
        }

        this.setState({checked});
    };

    clearEvents = () => {
        clearEvents(this.props);
    };

    reorderEvents = (first, second) => {
        reorderEvents(this.props, first, second);
    };

    callError = (message, code = 0) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'ABC',
            error: 'open',
            payload: {
                code,
                description: "",
                message
            }
        });
    }

    onOptimizeRouteEvents = async () => {
        const {form, forms, route, logged} = this.props;

        const route_start = find(logged.contractor.params, {"key": "route_start"}, 0) || {value: 0};
        const check_people = parseInt(route_start.value) === 2;

        const {values} = forms;
        const people_id = route.data.people_id || 0;
        const events = [...values.events];
        const data = {
            people_id,
            events,
            "route_version_id": route.data.id,
            "change": {
                "distance": true,
                "time": true,
                "extra_time": 60
            }
        };

        if (check_people && !people_id) {
            alert("Rota sem executor vinculado");
            return;
        }

        if (events.length <= 1) {
            alert("O dia deve conter ao menos 2 eventos");
            return;
        }

        if (events.length > 11) {
            alert("O dia deve conter no máximo 11 eventos");
            return;
        }

        try {
            this.setState({optimizeRouteEventsLoading: true});

            const {dispatch, optimizeRouteEvents} = this.props;

            const res = await optimizeRouteEvents(data);
            if (res.success) {
                await dispatch(change(form, "events", res.data.events));
                await this.onChangeMarkers();
                const origin_ignored = res.data.origin_ignored || false;
                if(origin_ignored) {
                    this.callError("A rota foi otimizada com sucesso porém o ponto de origem foi ignorado, a distância para o primeiro PDV é maior que o permitido.");
                }
            }
        } catch (e) {
            this.callError("Ocorreu um erro durante a otimização, tente novamente mais tarde.");
        } finally {
            this.setState({optimizeRouteEventsLoading: false});
        }
    }

    onHandleSubmit = async (force = 0, e = null) => {

        // if (e.target.id !== "events-main") {
        //     return;
        // }
        const {week, route_version_id, postRouteEvents, onCancel, handleSave} = this.props;
        const {isGroup} = this.context;
        const {group, multicontas} = this.state;

        let values = {...handleSubmit(this.props), ...group, week};

        if(!isGroup) {
            values.events.map((o) => {
                delete o.subcontractors;
                return o;
            });
        }

        let w1 = [];
        let w2 = [];

        if (week === 1) {
            w1 = values.events;
        } else if (week === 2) {
            values.events.map((item) => {
                const params = item.recurrent_params;
                const start = moment(item.start);
                const end = moment(item.end);
                const origin_start = moment(item.origin_start);

                let origin_week = params.week || week;
                let save_week = week;

                if (origin_week === 2) {
                    if (origin_start.isBefore(start, "day")) {
                        origin_week = 1;
                    }
                }

                if (origin_week === 1) {
                    save_week = 1;

                    start.subtract(1, "week");
                    end.subtract(1, "week");

                    item.start = start.format('YYYY-MM-DD HH:mm:ss');
                    item.end = end.format('YYYY-MM-DD HH:mm:ss');
                    item.recurrent_params.reorder = true;
                }

                delete item.origin_start;

                if (save_week === 1) {
                    w1.push(item);
                } else {
                    w2.push(item);
                }
            });
        }

        if (w1.length && !w2.length) {
            values.events = w1;
            values.week = 1;
        } else if (!w1.length && w2.length) {
            values.events = w2;
        } else if (w1.length && w2.length) {
            values.w1 = w1;
            values.w2 = w2;
            delete values.events;
        }

        // manter objeto, ainda em uso no modelo mensal
        // if(values.interval) {
        //     delete values.interval;
        // }

        if(!force && multicontas && !values.multicontas){
            confirmRef.current.openModal();
            return;
        }

        await this.setState({
            isLoading: true,
            associated: {
                isLoading: true
            }
        });

        try {
            await postRouteEvents(route_version_id, values).then(async () => {
                await onCancel();
                await handleSave();
            });
        } catch (e) {
            console.error(e);
        } finally {
            await this.setState({
                isLoading: false,
                associated: {
                    isLoading: false
                }
            });
        }
    };

    onSetFilter = (filters) => {
        this.setState({
            filters
        }, () => this.onFetchStores());
    };

    onFetchStores = params => {
        const {filters} = this.state;

        this.setState(prevState => {
            return {
                stores: {
                    ...prevState.stores,
                    isLoading: true
                }
            }
        }, () => this.props.fetchStores({...filters, ...params})
            .then((res) => this.setState(prevState => {
                // res.data = res.data.map(() => {});
                return {
                    stores: {
                        ...prevState.stores,
                        ...res,
                        isLoading: false
                    }
                }
            }))
            .catch(() => this.setState(prevState => {
                return {
                    stores: {
                        ...prevState.stores,
                        isLoading: false
                    }
                }
            })))
    };

    onFetchStartingPoints = () => {

        const {route, route_start, route_end, contractor_address} = this.props;

        if (route_start <= 0) {

            return;
        }

        const work = contractor_address;
        let home = '';
        if (!isNull(route.data.people) && !isNull(route.data.people.formatted_address)) {

            home = route.data.people.formatted_address;
        }

        let data = {
            route_start: {
                type: route_start === 1 ? 'Empresa' : 'Casa',
                formatted_address: route_start === 1 ? work : home,
                distance: 0,
            },
            route_end: {
                type: route_end === 1 ? 'Empresa' : 'Casa',
                formatted_address: route_end === 1 ? work : home,
            }
        };

        this.setState(data);
    };

    countTotalLength = () => {
        const {checked} = this.state;
        const {selected} = this.props;

        return {
            checked: checked.length,
            selected: selected.length
        }
    };

    occupancyRate = () => {
        const stores = [...this.props.selected];

        let journey = this.state.journey;
        let result = stores.length ? 100 : 0;

        if(journey) {
            const time_total = stores.reduce((prevVal, elem) => prevVal + dateGetMinutes(elem.time_total), 0);
            result = Math.floor(time_total <= 0 ? 0 : ((time_total * 100) / journey));
        }

        this.props.handleOccupation(result);

        return result;
    };

    onSetInterval = (item, index, mode, type, daysOfWeek, start, endBy, end, every, repetition) => {
        if (repetition === 'weekdays') {
            type = 'week';
            daysOfWeek = [1, 2, 3, 4, 5];
        }

        if (repetition === 'weekends') {
            type = 'week';
            daysOfWeek = [0, 6];
        }

        const dates = intervalDates(this.props, item, index, mode, type, daysOfWeek, start, endBy, end, every);

        this.setState({intervalDates: dates});
    };

    onChangeMarkers = async () => {

        return;

        // console.log('onChangeMarkers');

        const {route_start} = this.state;
        const {logged, forms, addDistance, route, contractor} = this.props;

        let params = logged.contractor.params.filter(o => o.key === 'change_markers')
        let change_markers = 1;
        if (params.length) {
            change_markers = parseInt(params[0]["value"]);
        }

        if(!change_markers){
            return;
        }

        const route_start_config = this.props.route_start;
        const route_end_config = this.props.route_end;

        const events = [...forms.values.events];
        const eventsMarkers = events.map((row) => (row.store_id));
        const codeSecret = Math.floor((Math.random() * 99999999));

        if (route_start_config > 0) {

            // add start
            eventsMarkers.unshift((route_start_config === 1) ? contractor : route.data.people_id);

            // add end
            eventsMarkers.push((route_end_config === 1) ? contractor : route.data.people_id);
        }

        if (eventsMarkers.length <= 1) {
            return;
        }

        await this.setState({secret: codeSecret});

        try {
            const res = await this.props.postRouteMarkers({id: codeSecret, mode: 'driving', markers: eventsMarkers});

            /* check if the request id is the same saved in state local. */
            if (parseInt(res.data.id) === this.state.secret) {

                let routes = res.data.routes;

                if (route_start_config > 0) {
                    const first = routes.splice(0, 1)[0];

                    const km = parseFloat((parseInt(first.data.distance) / 1000).toFixed(2));
                    const now = moment();
                    const end = now.clone().seconds(first.data.duration);
                    const diff = moment.duration(end.diff(now)).asMilliseconds();
                    const duration = moment.utc(diff).format('HH:mm');


                    this.setState({
                        route_start: {
                            ...route_start, distance: km, duration,
                        }
                    });
                }

                const start_time = moment(this.state.start_time, 'HH:mm').utc(true);

                let index, el = null;

                for ([index, el] of routes.entries()) {
                    /* km */
                    const km = parseFloat((parseInt(el.data.distance) / 1000).toFixed(2));
                    const distance = el.data.distance;
                    let duration = '00:00';
                    if(el.data.duration){
                        duration = moment('00:00', 'HH:mm').add(el.data.duration, 'seconds').format('HH:mm');
                    }

                    /* time start and end */
                    const time_total = moment(events[index].duration, 'HH:mm');

                    if (events[index].extra_time !== '00:00') {
                        time_total.add(getMinutes(events[index].extra_time), 'minutes');
                    }

                    if (duration === '00:00') {
                        time_total.add(1, 'minutes');
                    } else {
                        time_total.add(getMinutes(duration), 'minutes');
                    }

                    /* change data */
                    events[index].start_time = start_time.format('HH:mm');
                    events[index].end_time = start_time.add(getMinutes(events[index].duration), 'minutes').format('HH:mm');
                    events[index].time_total = time_total.format('HH:mm');
                    events[index].km = distance ? km : '0.0';
                    events[index].time_trip = el.data.duration ? duration : '00:00';
                    events[index].error = (!distance || !el.data.duration);
                    events[index].distance = distance;

                    /* update time start in local */
                    if (events[index].extra_time !== '00:00') {
                        start_time.add(getMinutes(events[index].extra_time), 'minutes');
                    }

                    if (duration === '00:00') {
                        start_time.add(1, 'minutes');
                    } else {
                        start_time.add(getMinutes(duration), 'minutes');
                    }
                }

                ++index;

                events[index].start_time = start_time.format('HH:mm');
                events[index].end_time = start_time.add(getMinutes(events[index].duration), 'minutes').format('HH:mm');

                await addDistance(events);
            }
        } catch (e) {
             console.error(e);
        }
    };

    onSelectElements = () => {
        const {checked, stores} = this.state;
        const {weekDay} = this.props;

        let newItens = [];

        if (!this.verifyChecked()) {

            const itensNotSelected = stores.data.filter((res) => {
                return (findIndex(checked, (o) => (o.store_id === res.id)) === -1)
            });

            let newItens = itensNotSelected.map((res) => ({
                store_id: res.id,
                store_code: res.code,
                company_name: res.company_name,
                name: res.name,
                formated_adrress: res.formatted_address,
                document: res.document,
                start_time: '00:00',
                end_time: '00:00',
                duration: '00:00',
                extra_time: '00:00',
                time_total: '00:00',
                distance: '0.0',
                time_trip: '00:00',
                time_attendance_avg: res.time_attendance_avg,
                zone_id: res.zone_id,
                zone_name: res.zone_name,
                _interval: {
                    type: 'unique',
                    every: 1,
                    days: [
                        0 === weekDay,
                        1 === weekDay,
                        2 === weekDay,
                        3 === weekDay,
                        4 === weekDay,
                        5 === weekDay,
                        6 === weekDay,
                    ],
                    start: moment(this.props.day).format('DD-MM-YYYY'),
                    endBy: 'occorrs',
                    endDate: '',
                    endEvents: 0,
                    dates: []
                }
            }));

            newItens.push(...checked);

            this.setState({checked: newItens});
        } else {
            newItens = checked.filter((res) => ((findIndex(stores.data, (o) => (o.id === res.store_id)) === -1)));
            this.setState({checked: newItens});
        }

    };

    verifyChecked = () => {
        const {checked, stores} = this.state;
        let inputCheck = true;

        if (stores.data && stores.data.length > 0) {
            stores.data.filter((res) => {
                if (findIndex(checked, (o) => (o.store_id === res.id)) === -1) {
                    inputCheck = false;
                }
                return false;
            });
        }

        return (checked.length > 0 && stores.data.length > 0) ? inputCheck : false;
    };

    onChangeMatch = save => {
        const origin = this.props.forms.values.origin;

        if (save) {
            this.setState({
                match: origin.obj
            }, () => {
                this.props.changeFieldValue('origin.mod', origin.def);
                this.onChangeMarkers().then();
            })
        } else {
            this.props.changeFieldValue('origin.def', origin.mod);
        }
    };

    onChangeDestiny = save => {
        const destiny = this.props.forms.values.destiny;

        if (save) {
            this.setState({
                destiny: destiny.obj
            }, () => {
                this.props.changeFieldValue('destiny.mod', destiny.def);
                this.onChangeMarkers();
            })
        } else {
            this.props.changeFieldValue('destiny.def', destiny.mod);
        }
    };

    handleRemoveConflict = id => {
        const {checked} = this.state;
        const newChecked = checked.filter((store) => parseInt(store.store_id) !== id);

        this.setState({
            checked: newChecked
        })
    };

    onFetchRates = (cityA, cityB) => {
        return this.props.fetchRouteRates(cityA, cityB);
    };

    handleSetStores = stores => this.setState({stores});

    /**
     * added multi acccounts in events
     *
     * @param accounts
     * @returns {Promise<void>}
     */
    handleAddedMultiAccounts = async (accounts) => {
        const {form, forms} = this.props;
        const {values} = forms;
        const events = [...values.events];

        const newEvents = events.map((event) => {
            event.subcontractors = {
                _ids: [...accounts]
            };

            return event;
        });

        await this.props.dispatch(change(form, 'events', []));
        await this.props.dispatch(change(form, 'events', newEvents));
    };

    /**
     * body modal multi account
     *
     * @param row
     * @returns {*}
     */
    multiAccountContent = (row) => {
        const {detail} = row;

        return <div>{detail.name}</div>
    };

    /**
     * fecth data params multi accounts
     *
     * @param params
     * @returns {Promise<{data: (*[]|(function(...[*]=)))}|{data: []}>}
     */
    handleFetchAccounts = async (params) => {
        if (isUndefined(params._ids) || isNull(params._ids)) {
            return {
                data: []
            };
        }

        return {
            data: params._ids
        };
    };

    /**
     * applied multi accounts
     *
     * @param params
     * @returns {Promise<void>}
     */
    handleAppliedMultiAccounts = async (params) => {
        const {news, removed, _ids, index} = params;
        const {form, forms} = this.props;
        const {values} = forms;
        const events = [...values.events];

        const newItems = [...news];

        if (!isUndefined(_ids)) {
            newItems.push(..._ids)
        }

        if (!isEmpty(removed)) {
            removed.map((r) => {
                const index = findIndex(newItems, (i) => i.id === r.id);

                if (index.toString() !== '-1') {
                    newItems.splice(index, 1)
                }
            })
        }

        events[index].subcontractors = {
            _ids: newItems
        };

        await this.props.dispatch(change(form, 'events', []));
        await this.props.dispatch(change(form, 'events', events));
    };

    /**
     * search accounts
     *
     * @param params
     * @returns {Promise<{data: []}>}
     */
    handleSearchAccounts = async (params) => {
        const {payload: group} = this.context.token;
        const {contractor, getContractorGroup} = this.props;
        const contractors = [];

        try {
            const request = await getContractorGroup(contractor, group.contractor);

            if (isEmpty(params.undefined)) {
                contractors.push(...request.data.subcontractors);
            } else {
                contractors.push(...request.data.subcontractors.filter((sub) => sub.detail.name.toLowerCase().includes(params.undefined.toLowerCase())));
            }
        } catch (e) {
            console.error(e)
        }

        return {
            data: contractors
        }
    };

    render() {
        const {storeFilterOptions, handleInterval, setHandleInterval} = this.context
        if (!isEqual(handleInterval.events, this.props.selected)) {
            setHandleInterval({
                dispatch: this.props.dispatch,
                events: this.props.selected,
                form: this.props.form,
            });
        }

        const {
            optimizeRouteEventsLoading,
            starting_points,
            match,
            destiny,
            route_start,
            route_end,
            checked,
            time_journey,
            associated,
            recovery
        } = this.state;

        const {
            forms,
            pristine,
            submitting,
            valid,
            route,
            day,
            _day,
            saveText
        } = this.props;

        const formValues = forms ? forms.values : {};

        const conflicts = checked.filter((store) => parseInt(store.zone_id) !== parseInt(route.data.route.zone_id));

        return (
            <Fragment>
                <Grid className={'h-100 mt-0'}>
                    <Grid.Row columns={'equal'} style={{padding: 0}} className={'h-100'}>
                        {
                            this.props.managed &&
                            <Grid.Column className={'h-100'}>
                                <Stores
                                    handleCancel={() => this.props.onCancel()}
                                    route={route}
                                    start={_day}
                                    excluded={formValues.events}
                                    added={(values) => this.addEvents(values)}
                                    storeFilterOptions={storeFilterOptions}
                                />
                            </Grid.Column>
                        }
                        <Grid.Column className={'h-100'}>
                            <Dimmer active={recovery} inverted>
                                <Loader inverted/>
                            </Dimmer>
                            <Modal ref={confirmRef} size={'mini'}>
                                <Confirm
                                    title={'Atenção'}
                                    description={'Nenhuma Multiconta foi selecionada!'}
                                    cancelButton={'Cancelar'}
                                    confirmButton={'Sim, continuar!'}
                                    onCancel={() => confirmRef.current.closeModal()}
                                    onConfirm={() => this.onHandleSubmit(1)}
                                    onSuccess={() => {}}
                                />
                            </Modal>
                            <Form id={"events-main"} onSubmit={(e) => this.onHandleSubmit(0, e)} className={'h-100'}>
                                <Segment basic className={'container-associated'} loading={associated.isLoading || optimizeRouteEventsLoading}>
                                    <AssociatedAttendance
                                        day={day}
                                        clear={this.clearEvents}
                                        points={this.props.selected.length}
                                        reorder={this.reorderEvents}
                                        jorney={this.occupancyRate()}
                                        starting={starting_points}
                                        formValues={formValues}
                                        onSetInterval={this.onSetInterval}
                                        deleteEventsAfterJourney={this.deleteEventsAfterJourney}
                                        performer={this.props.performer}
                                        group={(group) => this.handleAddedMultiAccounts(group)}
                                        optimizeRouteEvents={this.onOptimizeRouteEvents}
                                        logged={this.props.logged}
                                        time_journey={time_journey}
                                        route_start={route ? route.data.route_start : 0}
                                    />
                                    <Container>
                                        <FieldArray
                                            name="events"
                                            component={renderEvents}
                                            onSetInterval={this.onSetInterval}
                                            starting={starting_points}
                                            onChangeMarkers={this.onChangeMarkers}
                                            match={match}
                                            destiny={destiny}
                                            onChangeMatch={(save) => this.onChangeMatch(save)}
                                            onChangeDestiny={(save) => this.onChangeDestiny(save)}
                                            changeFieldValue={(field, value) => this.props.changeFieldValue(field, value)}
                                            onFetchRates={(cityA, cityB) => this.onFetchRates(cityA, cityB)}
                                            startingPoint={this.props.startingPoint}
                                            endPoint={this.props.endPoint}
                                            route_start={route_start}
                                            route_end={route_end}
                                            time_journey={time_journey}
                                            form={this.props}
                                            multicontas={(params) => refMulticontas.current.toggleModal(params)}
                                        />
                                        <Container className={'group-buttons'}>
                                            <Form.Button
                                                color={'facebook'}
                                                type={'submit'}
                                                disabled={pristine || submitting || !valid || associated.isLoading}
                                                content={saveText}
                                            />
                                            {
                                                this.props.cancellButton &&
                                                <Form.Button
                                                    type={'button'}
                                                    content={'Cancelar'}
                                                    onClick={() => this.props.onCancel()}
                                                />
                                            }
                                        </Container>
                                    </Container>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <ModalBasic ref={'AllConflictsResolved'}>
                    <div style={{marginTop: '3rem', marginBottom: '5rem'}}>
                        <Empty
                            title={'Não há nenhum conflito!'}
                            description={'Todos os conflitos foram excluídos'}
                            image={''}
                            icon={'check'}
                            position={'top'}
                            className={'animated zoomIn'}
                        />
                    </div>
                </ModalBasic>

                <ModalBasic
                    ref={'ConflictShops'}
                    title={`Gerenciar conflitos de pontos de atendimento (${conflicts.length})`}
                    subheader={'Esses pontos não pertencem a esse grupo'}
                    maxHeight={13}
                    onCancel={() => this.refs.ConflictShops.closeModal()}
                    onSuccess={() => {
                        this.setAddEvents();
                        this.refs.ConflictShops.closeModal();
                    }}
                    onCancelText={'Voltar'}
                    onSuccessText={'Processar'}
                >
                    {
                        conflicts.map((row, index) => (
                            <div className={'div-conflicts-shop'} key={index}>
                                <div>
                                    <Header as={'h5'}>
                                        <Header.Content>
                                            {row.name}
                                            <Header.Subheader>
                                                {row.formated_adrress}
                                                <span>ID GIV: {row.store_id} | Código Interno: {row.store_code}</span>
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </div>
                                <div>
                                    {row.zone_name}
                                </div>
                                <div>
                                    <Icomoon
                                        name={'trash-2 link'}
                                        onClick={() => this.handleRemoveConflict(row.store_id)}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </ModalBasic>

                <Multiselect
                    ref={refMulticontas}
                    searchTo={'q'}
                    searchFrom={['q']}
                    uniqueFrom={'id'}
                    uniqueTo={'id'}
                    header={[{
                        key: 0,
                        text: 'Multicontas',
                        data: (params) => this.handleSearchAccounts(params)
                    }]}
                    subtitle={'Gerenciar Multicontas'}
                    content={{
                        0: (row) => this.multiAccountContent(row)
                    }}
                    applied={{
                        0: (row) => this.handleAppliedMultiAccounts(row)
                    }}
                    getStarter={(param) => this.handleFetchAccounts(param)}
                />
            </Fragment>
        );
    }
}

RoutesEventsManager = reduxForm({
    form: 'RoutesEventsManager',
    enableReinitialize: true,
})(RoutesEventsManager);

const selector = formValueSelector('RoutesEventsManager');
RoutesEventsManager = connect(
    state => {
        return {
            routeType: selector(state, 'type'),
            isSelectedPeople: selector(state, 'versions[0].people_id')
        }
    }
)(RoutesEventsManager);

RoutesEventsManager.propTypes = {
    route: PropTypes.object,
    onCancel: PropTypes.func,
    day: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    managed: PropTypes.bool,
    stores: PropTypes.array,
    saveText: PropTypes.string,
    heading: PropTypes.bool,
    cancellButton: PropTypes.bool,
    startingPoint: PropTypes.bool,
    endPoint: PropTypes.bool,
    handleOccupation: PropTypes.func,
    performer: PropTypes.string,
    handleSave: PropTypes.func,
    markerStart: PropTypes.bool
};

RoutesEventsManager.defaultProps = {
    route: {},
    onCancel: (() => {
    }),
    day: '',
    managed: true,
    stores: [],
    saveText: 'Salvar',
    heading: true,
    cancellButton: true,
    startingPoint: true,
    endPoint: true,
    handleOccupation: (() => {
    }),
    performer: '',
    handleSave: (() => {
    }),
    markerStart: true
};

const mapStateToProps = (state, ownProps) => {

    const route = ownProps.route.data;
    const contractor = state.Contractors.content.result.data;
    const firstDate = moment(ownProps.day, localeDate());
    const weekDay = firstDate.weekday();

    const default_frequency = {"value": ownProps.default_frequency};
    const default_event_interval = ownProps.default_event_interval;

    const firstEvent = {
        type: default_frequency.value,
        every: 1,
        days: [
            moment(ownProps.day).locale("en").format("dddd").toLowerCase()
        ],
        start: firstDate.format('L'),
        endBy: 'infinite',
        repetition: 'occorrs',
        overwrite: true,
        endEvents: '',
        endDate: '',
        dates: [
            firstDate //first date
        ]
    };

    return {
        logged: state.Users.content.result.data.user,
        forms: state.form.RoutesEventsManager,
        selected: state.form.RoutesEventsManager ? state.form.RoutesEventsManager.values.events : [],
        interval: state.form.RoutesEventsManager ? state.form.RoutesEventsManager.values.interval : {},
        default_frequency,
        default_event_interval,
        route_version_id: ownProps.route_version_id,
        enrollment_id: state.Users.content.result.data.user.enrollment_id,
        contractor: contractor.id,
        contractor_address: contractor.formatted_address,
        route_start: route.route_start,
        route_end: route.route_end,
        firstEvent,
        weekDay,
        _day: firstDate.format('L'),
        _checkAfter: {
            start_time: ['start_time', 'time_total']
        },
        _validDateLessOrGreater: {
            start_time: 'end_time',
            end_time: 'start_time',
        },
        initialValues: {
            type: '1',
            date: firstDate.format('YYYY-MM-DD'),
            route: 'abc 123',
            zone_id: 102030,
            olam: 'B',
            _interval: firstEvent,
            interval: firstEvent,
            origin: {
                obj: {},
                def: 0,
                mod: 0
            },
            destiny: {
                obj: {},
                def: 0,
                mod: 0
            },
            events: ownProps.stores ? ownProps.stores : [],
            delete: []
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStores: options => {
            return dispatch(fetchStores(options))
        },
        postRouteEvents: (id, content) => {
            return dispatch(postRouteEvents(id, content))
        },
        fetchLocalizations: (from, to) => {
            return dispatch(fetchLocalizations(from, to))
        },
        postRouteMarkers: (params) => (
            dispatch(postRouteMarkers(params))
        ),
        addDistance: (events) => {
            dispatch(change('RoutesEventsManager', 'time', new Date()));
            dispatch(change('RoutesEventsManager', 'events', events));
        },
        changeFieldValue: (field, value) => {
            dispatch(change('RoutesEventsManager', field, value));
        },
        fetchRouteRates: (cityA, cityB, options) => {
            return dispatch(fetchRouteRates(cityA, cityB, options))
        },
        fetchRouteEventsParents: (id, params) => (
            dispatch(fetchRouteEventsParents(id, params))
        ),
        getContractorGroup: (contractor_id, id, params) => (
            dispatch(getContractorGroup(contractor_id, id, params))
        ),
        optimizeRouteEvents: (data) => {
            return dispatch(optimizeRouteEvents(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesEventsManager);
