import { filter, isEmpty, isNull } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { createRef, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dimmer, Loader, Popup, Statistic } from 'semantic-ui-react';
import { dateTimeInternal } from "../../utils/DateTime";

import { Confirm, Icomoon, InputDate, Modal } from '../../components';
import { EventManagerContext } from './EventManager';
import EventsManager from './EventsManager';
import {
  BigCalendarContent,
  ButtonStyled,
  Content,
  ContentProduction,
  DayOfWeek,
  DayOfWeekActions,
  EventList,
  EventPopup,
  GroupButtonActionsDiv,
  Header,
  HeaderEventDay,
  HeaderWeek
} from './View/style';
// import CommitmentManager from './CommitmentManager';
// import TimeConflicts from './TimeConflicts';
import { dateDuration, dateGet, localeDate } from '../../utils/DateTime';
import { DropdownZone, EventDetails, GroupButtonActions, ReferenceWeek, ShowMore } from './components';
import { AlterParams, NavigationUser, OptimizeRoute } from './View/components';

import { change, Field, reduxForm } from "redux-form";
import { GroupButton } from "../../components/Confirm/style";
import { cloneRoute, deleteRoutes, removeDraftVersion } from '../../redux/actions/RoutesActions';
import { getRoutesStatisticsByVersion } from '../../redux/actions/RoutesStatisticsActions';
import { deleteRouteEventsByDates, fetchRouteEvents } from '../../redux/actions/RoutesVersionEventsActions';
import { clearRoutesVersions, discardRoutesVersions, getRoutesVersions, persistRoutesVersions } from '../../redux/actions/RoutesVersionsActions';
import { getRoutesWindowsProgress } from '../../redux/actions/RoutesWindowsActions';
import { getJourney } from '../../redux/actions/UsersActions';
import { isDate, isDateGreater, required } from "../../utils/Validate";

import { buildIntervalbyEvent } from "./EventsManager/utils";

const moreRef = createRef();
const detailRef = createRef();
const alterRef = createRef();
const deleteRef = createRef();
const clearRef = createRef();
const removeDraftRef = createRef();
const confirmDraftRef = createRef();
const saveDraftRef = createRef();
const discardRef = createRef();
const saveSubmitDraftRef = createRef();
const saveSubmitPublishedRef = createRef();
const routeProduction = createRef();
const deleteWeek = createRef();
const clearEventRef = createRef();
const scheduleRef = createRef();
const scheduleDelete = createRef();
const calendarRef = createRef();
const optimizeRef = createRef();

const ButtonsHeadersActions = ({date, route, setView, setDay}) => {
    const disabled = !route.data || (route.data && (route.data.published || parseInt(route.data.route.draft_id) === parseInt(route.data.id)));
    if(disabled) {
        return <Fragment/>;
    }
    return (
        <div>
            <ButtonStyled
                onClick={() => {
                    setView('add');
                    setDay(date);
                }}
                color={'var(--black)'}
            >
                <Icomoon
                    name={'plus link'}
                    title={'Adicionar'}
                    style={{border: 0, margin: 0, padding: 0, background: 'transparent'}}
                />
            </ButtonStyled>
            <ButtonStyled
                onClick={() => {
                    setDay(date);
                    clearEventRef.current.openModal();
                }}
                color={'var(--black)'}
            >
                <Icomoon
                    name={'trash-2 link'}
                    title={'Limpar'}
                    style={{border: 0, margin: 0, padding: 0, background: 'transparent'}}
                />
            </ButtonStyled>
        </div>
    )
};

const HeaderComponent = ({date, label, route}) => {
    const disabled = !route.data || (route.data && (route.data.published || parseInt(route.data.route.draft_id) === parseInt(route.data.id)));
    return (
        <DayOfWeek>
            <div>{label}</div>
            {
                !disabled && <div>
                    <ButtonStyled
                        marginLeft={'.5rem'}
                        onClick={() => deleteWeek.current.toggleModal({date})}
                    >
                        <Icomoon
                            name={'trash-2 link'}
                            title={'Remover'}
                        />
                    </ButtonStyled>
                </div>
            }
        </DayOfWeek>
    )
};

const EventComponentWeek = ({title}) => {
    return (
        <div>
            <p>{title}</p>
        </div>
    )
};

const EventWrapperComponent = props => {

    if (!props.children) {
        return <Fragment/>;
    }

    let every = 1;
    if (props.event && props.event.interval) {
        every = props.event.interval.every;
    }

    return (
        <Popup
            content={
                <EventPopup>
                    <h4>{props.label}</h4>
                    <h5>{!isEmpty(props.event.code) ? `${props.event.code} - ` : ''}{props.event.title}</h5>
                    <p>{props.event.formatted_address}</p>
                    {
                        props.event.code && <p>Repete a cada: {every} Semana{every > 1 && "s"}</p>
                    }
                </EventPopup>
            }
            trigger={props.children}
            inverted
            hideOnScroll
        />
    );
};

const EventComponent = ({id, event}) => {
    return (
        <EventList key={id}>
            <p>{event.code} - {event.title}</p>
            <small>
                {event.distance ? parseFloat((parseInt(event.distance) / 1000).toFixed(2)) : '0'}km |
                TMA {dateDuration(event.time_attendance_avg, 'HH:mm:ss')}
            </small>
        </EventList>
    )
};

const DateHeaderComponent = ({date, label, to, route, setView, setDay}) => {
    const rate = to.filter(t => moment(t.start).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'));
    return (
        <DayOfWeekActions>
            <div>
                <span>{label}</span>
                <span>T.O. {!isEmpty(rate) ? rate[0].planned_tmo : 0}%</span>
            </div>
            <ButtonsHeadersActions
                date={date}
                route={route}
                setView={setView}
                setDay={setDay}
            />
        </DayOfWeekActions>
    )
};

const HeaderComponentWeek = ({date, label, route, setView, setDay, default_mode, journey}) => {
    const day = label.split(' ');
    let title = day[0];
    let cs = "";
    if (default_mode === 'week') {
        const key = moment(date).locale("en").format('dddd').substring(0, 3).toLowerCase();
        const j = journey[key] ? journey[key]['journey'] : false;
        const d = j.default || false;
        cs = "week";
        title = "-";
        if (j && !d) {
            title = `${j.start} - ${j.end}`
        }
    }

    return (
        <HeaderWeek>
            <div>
                <span>{day[1]}</span>
                <span className={cs}>{title}</span>
            </div>
            <ButtonsHeadersActions
                date={date}
                route={route}
                setView={setView}
                setDay={setDay}
            />
        </HeaderWeek>
    )
};

const HeaderComponentDay = ({date, route, setView, setDay}) => {
    return (
        <HeaderEventDay>
            <span>{moment(date).utc().format('dddd, DD \\d\\e MMMM')}</span>
            <ButtonsHeadersActions
                date={date}
                route={route}
                setView={setView}
                setDay={setDay}
            />
        </HeaderEventDay>
    )
};

const localizer = momentLocalizer(moment);
const now = moment().startOf('day');
let Routes = props => {
    const {
        // default_mode,
        route_id,
        route_version_id,
        setTitle,
        // beforeClose,
        // closeCurrent,
        location,
        history,
        getRoutesVersions,
        fetchRouteEvents,
        deleteRoutes,
        removeDraftVersion,
        clearRoutesVersions,
        persistRoutesVersions,
        discardRoutesVersions,
        cloneRoute,
        logged,
        // isChanged,
        getRoutesStatisticsByVersion,
        deleteRouteEventsByDates,
        getRoutesWindowsProgress,
        match,
        pristine,
        submitting,
        valid,
        forms,
        dispatch,
        closeTab
    } = props;

    const {
        // people,
        setPeople,
        journey,
        setJourney,
        setItem,
        default_mode,
        default_frequency,
        default_event_interval,
        refModalDetails,
        setHandleInterval,
        handleDelete,
    } = useContext(EventManagerContext);

    const [view, setView] = useState('calendar');
    const [route, setRoute] = useState({isLoading: false});
    const [events, setEvents] = useState([]);
    const [day, setDay] = useState(0);
    // const [localizer] = useState(BigCalendar.momentLocalizer(moment));
    const [date, setDate] = useState(now.toDate());
    const [loading, setLoading] = useState(false);
    const [clone, setClone] = useState(false);
    const [show, setShow] = useState({});
    const [viewCalendar, setViewCalendar] = useState(default_mode || "month");
    const [subcontractor, setSubcontractor] = useState(false);
    const [routeWindow, setRouteWindow] = useState(false);
    // const [active, setActive] = useState({});
    const [statistics, setStatistics] = useState({"loading": false, "tmo_count": 0, "tmd_count": 0, "tma_count": 0});
    const [to, setTo] = useState([]);
    const [in_progress, setInProgress] = useState(0);
    const [proposal_end, setProposalEnd] = useState('');
    const [week, setWeek] = useState(1);
    const [attempts, setAttempts] = useState(1);

    const closeCurrent = useCallback((path = "") => {
      closeTab();
      if (path !== "") {
        setTimeout(function () {
          history.push(path);
        }, 200);
      }
    }, [location]);

    const calendarMin = useMemo(() => {
        let start = 23;
        let start_h = 0;
        for (const day in journey) {
            start_h = parseInt(journey[day].journey.start.split(':')[0]);
            if (start_h < start) {
                start = start_h;
            }
        }

        // check events
        for (const event of events) {
            start_h = event.start.split('T')[1].split(':')[0];
            if (start_h < start) {
                start = start_h;
            }
        }

        // return data
        return now.clone().hour(start).toDate();
    }, [events, journey]);

    useEffect(() => {
        setHandleInterval({
            dispatch
        });
    }, [dispatch]);

    const backgroundEvents = useMemo(() => {
        let events = [];

        const now = moment(date).locale("en");
        for (const day in journey) {
            // change day
            now.day(day);

            // get journey
            const j = journey[day].journey;
            const d = j.default || false;
            if(d) {
                events.push({
                    start: now.clone().startOf('day').toDate(),
                    end: now.clone().endOf('day').toDate(),
                    title: "Sem Jornada"
                });
                continue;
            }

            // create before journey
            let [start_h, start_m] = j.start.split(':');
            events.push({
                start: now.clone().startOf('day').toDate(),
                end: now.clone().hour(start_h).minute(start_m).subtract(1, 'minute').toDate(),
                title: "Antes da Jornada"
            });

            // check intervals
            const intervals = journey[day].interval || [];
            for (let i in intervals) {
                let [start_h, start_m] = intervals[i].start.split(':');
                let [end_h, end_m] = intervals[i].end.split(':');
                events.push({
                    start: now.clone().hour(start_h).minute(start_m).toDate(),
                    end: now.clone().hour(end_h).minute(end_m).toDate(),
                    title: "Intervalo"
                });
            }

            // create after
            let [end_h, end_m] = j.end.split(':');
            events.push({
                start: now.clone().hour(end_h).minute(end_m).add(1, 'minute').toDate(),
                end: now.clone().endOf('day').toDate(),
                title: "Depois da Jornada"
            });
        }
        return events;
    }, [date, journey]);

    const calendarComponents = useMemo(() => ({
        header: ({date, label}) => <HeaderComponent date={date} label={label} route={route}/>,
        event: EventComponent,
        dateHeader: ({date, label}) => <DateHeaderComponent date={date} label={label} route={route} setView={setView}
                                                            setDay={setDay} to={to}/>,
        eventWrapper: EventWrapperComponent,
        week: {
            header: ({date, label}) => <HeaderComponentWeek
                date={date}
                label={label}
                route={route}
                setView={setView}
                setDay={setDay}
                default_mode={default_mode}
                journey={journey}
            />,
            event: EventComponentWeek
        },
        day: {
            header: ({date, label}) => <HeaderComponentDay date={date} label={label} route={route} setView={setView}
                                                           setDay={setDay}/>,
            event: EventComponentWeek
        }
    }), [route, journey]);

    const route_published = useMemo(async () => {
        if (!isEmpty(route.data)) {
            setStatistics({
                "loading": false,
                "tmo_count": route.data.tmo_count,
                "tmd_count": route.data.tmd_count,
                "tma_count": route.data.tma_count,
            });
            if (!isEmpty(route.data.people)) {
                setPeople(route.data.people);
                try {
                    const res = await dispatch(getJourney(route.data.people_id));
                    if (res.success) {
                        setJourney(res.data);
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                setPeople({});
            }

            return route.data.route.published || false;
        }
        return false;
    }, [route.data]);

    const draft_version = useMemo(() => {
        if (!isEmpty(route.data)) {
            return route.data.route.draft_version || {};
        }
        return false;
    }, [route]);

    // const published_version = useMemo(() => {
    //     if (!isEmpty(route.data)) {
    //         return route.data.route.published_version || {};
    //     }
    //     return false;
    // }, [route]);

    const route_is_loading = useMemo(() => {
        return route.isLoading;
    }, [route]);

    const route_version_temporary = useMemo(() => {
        if (!isEmpty(route.data)) {
            return route.data.temporary || false;
        }
        return false;
    }, [route]);

    const zone = useMemo(() => {
        if (!isEmpty(route.data)) {
            return parseInt(route.data.route.zone);
        }
        return {};
    }, [route]);

    const zone_id = useMemo(() => {
        if (!isEmpty(route.data)) {
            return parseInt(route.data.route.zone_id);
        }
        return null;
    }, [route]);

    const handleDeleteEvents = useCallback(() => {
        if (default_mode === "week") {
            let date = moment(day).locale("en");
            let _date = date.format('YYYY-MM-DD');
            let rows = filter(events, (o) => o.start.substring(0, 10) === _date);
            if (rows.length) {
                let items = rows.map((o) => {
                    const {id: store_id, route_version_id, parent_id, start} = o;
                    return {
                        "route_version_id": route_version_id,
                        "event_id": parent_id,
                        "store_id": store_id,
                        "day": date.format("dddd").toLowerCase(),
                        "start": start.replace("T", " "),
                        "strict": true,
                    };
                });

                return handleDelete(true, items);
            }

        } else {
            return deleteRouteEventsByDates(route_version_id, {dates: [moment(day).format('YYYY-MM-DD')]})
        }
    }, [day]);

    const handleGetData = useCallback(async () => {
        await setRoute({isLoading: true});
        // await setTitle(location.pathname, <Icomoon name={'rotate-cw'} rotate/>, 'map-pin');

        try {
            const getRoutes = await getRoutesVersions(route_id, route_version_id);
            const version = getRoutes.data;

            await setRoute({isLoading: false, data: version});
            await setTitle(location.pathname, version.route.name, 'map-pin');

            const publish_at = moment(version.route.publish_at);

            if (publish_at.isValid()) {
                await dispatch(change('Routes', 'publish_at', publish_at.format('DD/MM/YYYY'), false, false));
            }

        } catch (e) {
            await setRoute({isLoading: false});
            await setTitle(location.pathname, 'Error!', 'map-pin');
        }
    }, [route_id]);

    const getStatistics = useCallback(async () => {
        if (!route_version_temporary || view !== "calendar" || attempts >= 3) {
            return;
        }

        let inc = attempts;

        try {
            setStatistics({...statistics, "loading": true});

            const {modified_at: origin_modified_at} = route.data;

            const getRoutes = await getRoutesVersions(route_id, route_version_id, {"direct": 1});
            const version = getRoutes.data;
            const {modified_at} = version;

            if (origin_modified_at !== modified_at) {
                inc = inc + 3;
                await setRoute((prev) => {
                    if(!prev.data) {
                        return prev;
                    }
                    prev.data.modified_at = modified_at || "";
                    return prev;
                });
            }

            setStatistics({
                "loading": false,
                "tmo_count": version.tmo_count,
                "tmd_count": version.tmd_count,
                "tma_count": version.tma_count,
            });
        } catch (e) {
            console.error(e);
            setStatistics({...statistics, "loading": false});
        } finally {
            setAttempts(inc+1);
        }
    }, [route_id, route_version_temporary, view, attempts, route]);

    /**
     * Obter lista de eventos
     * @returns {Promise<void>}
     */
    const handleFetchEvents = useCallback(async () => {

        if (calendarRef.current) {
            calendarRef.current.scrollTop = 0;
        }

        await setView('calendar');
        await setLoading(true);
        await setEvents([]);

        const now = moment(date).utc();

        try {
            let start, end;

            switch (viewCalendar) {
                case 'week':
                    const week = now.weeks();
                    start = now.clone().week(week).startOf('week').format('YYYY-MM-DD');
                    end = now.clone().week(week).endOf('week').format('YYYY-MM-DD');
                    break;
                case 'day':
                    start = now.format('YYYY-MM-DD');
                    end = now.format('YYYY-MM-DD');
                    break;
                default:
                    start = now.clone().startOf('month').startOf('week').format('YYYY-MM-DD');
                    end = now.clone().add(40, 'days').format('YYYY-MM-DD');
            }

            let params = {start, end, mode: default_mode, strict: default_mode === "week", "ignore-invalid-dates": 0};
            if(default_mode === "week") {
                params['ignore-invalid-dates'] = 1;
            }

            // await handleStatistics(params, viewCalendar);
            const records = await fetchRouteEvents(route_version_id, {...params});
            // const tos = await getRoutesStatisticsByVersion(route_version_id, {
            //     ...params,
            //     period: 'D',
            //     fields: 'start,planned_tmo'
            // });

            let events = [];
            for (let event of records.data) {
                let interval = {};
                let parent = event.parent || {};
                if (!isEmpty(parent)) {
                    interval = buildIntervalbyEvent(event.parent);
                }

                // push event
                events.push({
                    id: event.store.id,
                    code: event.store.code,
                    event_id: event.id,
                    parent_id: event.parent_id,
                    title: event.store.name,
                    allDay: false,
                    start: event.start,
                    end: event.end,
                    description: "",
                    extra: "",
                    distance: event.distance,
                    time_total: event.time_total,
                    time_attendance_avg: event.store.time_attendance_avg,
                    formatted_address: event.store.formatted_address,
                    lat: event.store.lat,
                    lng: event.store.lng,
                    coordinates: event.store.coordinates,
                    validated: event.store.validated,
                    time_trip: event.time_trip,
                    subcontractors: event.subcontractors,
                    route_version_id: event.route_version_id,
                    origin: {
                        "store_id": event.store.id,
                        "order": event.order,
                        "start": event.start.replace("T", " "),
                        "end": event.end.replace("T", " "),
                        "duration": event.duration,
                        "distance": event.distance,
                        "time_trip": event.time_trip,
                        "time_trip_extra": event.time_trip_extra,
                        "time_total": event.time_total,
                        "subcontractors": {
                            "_ids": event.subcontractors.map((o) => o.id)
                        },
                        "p": event.parent || {},
                    },
                    interval
                });
            }

            // await setTo(tos.data);
            await setEvents(events);
            await setAttempts(1);
        } catch (e) {
            console.error(e);
        } finally {
            await setLoading(false);
        }
    }, [date, route_version_id, viewCalendar, route_version_temporary]);

    // const handleNavigation = date => handleFetchEvents().then(() => setDate(date));
    const handleNavigation = useCallback((date) => {
        console.log('handleNavigation');
        console.log(date);
    }, []);

    const handleViewAndRefresh = useCallback(async (data = false, events = false) => {
        await setView('calendar');
        if (data === true) {
            await handleGetData();
        }
        if (events === true) {
            await handleFetchEvents();
        }
    }, [date]);

    const prev = useCallback(async () => {
        let now = moment(date).utc();
        switch (viewCalendar) {
            case 'week':
                now.subtract(1, 'weeks');
                break;
            case 'day':
                now.subtract(1, 'days');
                break;
            default:
                now.subtract(1, 'months');
                break;
        }
        await setWeek(1);
        await setDate(now.toDate());
    }, [viewCalendar, date]);

    const next = useCallback(async () => {
        let now = moment(date).utc();
        switch (viewCalendar) {
            case 'week':
                now.add(1, 'weeks');
                break;
            case 'day':
                now.add(1, 'days');
                break;
            default:
                now.add(1, 'months');
                break;
        }
        await setWeek(2);
        await setDate(now.toDate())
    }, [viewCalendar, date]);

    const HandleButtonsActions = useCallback((action) => {
        switch (action) {
            case 0:
                confirmDraftRef.current.openModal();
                break;
            case 1:
                saveDraftRef.current.openModal();
                break;
            case 2:
                break;
            case 3:
                saveSubmitDraftRef.current.openModal();
                break;
            case 4:
                saveSubmitPublishedRef.current.openModal();
                break;
            case 5:
                discardRef.current.openModal();
                break;
            case 6:
                scheduleRef.current.openModal();
                break;
            case 7:
                scheduleDelete.current.openModal();
                break;
            default:
                break;
        }
    }, []);

    /**
     * Seta nova visualização e registra evento ativo no state local.
     * @param event
     * @returns {Promise<void>}
     */
    const handleChangeCommitment = useCallback(async (event) => {
        // await setActive(event);
        await setView('commitment');
    }, []);

    /**
     * Clona rota.
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleClone = useCallback(async (id) => {
        try {
            setClone(true);
            const clone = await cloneRoute(id);
            closeCurrent(`/main/routes/home/${route_id}/versions/${clone.data.id}`);
        } catch (e) {
            console.error(e);
        } finally {
            setClone(false);
        }
    }, []);

    /**
     * Atualiza lista de eventos e informações da rota.
     */
    useEffect(() => {
        handleFetchEvents();
    }, [date, viewCalendar, route_id, route_version_id]);

    /**
     * Busca dados da rota.
     */
    useEffect(() => {
        async function handleDidMount() {
            await handleGetData();
        }

        handleDidMount();
    }, [route_id, route_version_id]);

    useEffect(() => {
        const intervalId = setInterval(getStatistics, 4000);
        return () => {
            clearInterval(intervalId);
        };
    }, [getStatistics]);

    /**
     * busca informaçeõs de subcontratante nas informações do usuário logado.
     * Atualiza infdormações como subcontratantes e janelas.
     */
    useEffect(() => {
        /**
         * Verifica se o usuário esta em uma janela.
         *
         * @returns {Promise<*>}
         */
        const userWindow = async () => {
            try {
                const response = await getRoutesWindowsProgress();

                const inProgress = isEmpty(response.data[0]) ? 0 : parseInt(response.data[0].id);

                await setInProgress(inProgress);
                await setRouteWindow(response.status);

                if (inProgress) {
                    // console.log(approval_end);
                    await setProposalEnd(response.data[0].proposal_end.substr(0, 10));
                    // await setApprovalEnd(response.data[0].approval_end.substr(0, 10));
                }
            } catch (e) {
                console.error("erro ao consultar se a janela de manutenção esta em progresso.");
            }
        };

        if (!isEmpty(logged)) {
            const params = logged.contractor.params;

            // noinspection JSIgnoredPromiseFromCall
            userWindow();

            params.filter((row) => {

                // Subcontratantes.
                if (row.key === 'subcontractor') {
                    setSubcontractor(Boolean(parseInt(row.value)));
                }

                return false;
            });
        }
    }, [logged]);

    let draft = {route: 0, version: 0};
    let zoneName = '';
    let mwRoute = {};
    let proposed_by = 0;
    let publish_at = moment().format('YYYY-MM-DD');

    const logged_id = logged ? parseInt(logged.id) : 0;
    const formFields = forms ? forms.values : {};

    if (route.data) {
        mwRoute = route.data.route;

        draft.version = (mwRoute && mwRoute.draft_version) && mwRoute.draft_version.id;
        draft.route = route.data.route_id;

        zoneName = mwRoute.zone && mwRoute.zone.name;
        proposed_by = parseInt(mwRoute.proposed_by);
    }

    const navOptions = useMemo(() => {
        let options = [
            {name: 'Alterar configuração', onClick: () => alterRef.current.openModal()},
        ];

        if (route_version_temporary) {
            // desabilitado temporariamente
            // if(default_mode === "week") {
            //     options.push({name: 'Otimizar rota', onClick: () => optimizeRef.current.openModal({})});
            // }

            options.push({name: 'Limpar agenda', onClick: () => clearRef.current.openModal({})});
        }

        if (!isEmpty(draft_version)) {
            options.push({name: 'Remover cópia de rascunho', onClick: () => removeDraftRef.current.openModal({})});
        }

        if (!route_published) {
            options.push({name: 'divider', onClick: null});
            options.push({name: 'Excluir rota', onClick: () => deleteRef.current.openModal({})})
        }

        return options;
    }, [route_published, route_version_temporary, draft_version, default_mode]);

    const navUser = useMemo(() => {
        return (
            <NavigationUser
                people={route.data && route.data.people_id}
                route={{
                    temporary: route_version_temporary,
                    published: route_published,
                    route_id,
                    route_version_id,
                    zone_id: (route.data && route.data.route) ? route.data.route.zone_id : 0,
                    zone
                }}
                refresh={() => handleViewAndRefresh(true, false)}
                published={(route.data && (route.data.published || parseInt(route.data.route.draft_id) === parseInt(route.data.id)))}
                type={route.data ? route.data.route.type : 0}
            />
        )
    }, [route]);

    if (view === 'calendar') {
        const renderEvents = events.map((row) => {
            return ({
                ...row,
                start: moment(row.start, 'YYYY-MM-DD HH:mm').utc().toDate(),
                end: moment(row.end, 'YYYY-MM-DD HH:mm').utc().toDate()
            });
        });

        // const disabled = (route.data && (route.data.published || parseInt(route.data.route.draft_id) === parseInt(route.data.id)));

        let description = '';
        if (route.data) {
            description += route.data.published ? 'Produção' : 'Rascunho';
            if (route.data.route.type === 2) {
                const start = moment(route.data.route.start).format('DD/MM');
                const end = moment(route.data.route.end).format('DD/MM/YY');
                description += ` - Temporária (${start} à ${end})`;
            } else {
                description += ' - Fixa '
            }
        }

        const publishAt = () => {
            const publish_at = moment(formFields.publish_at, localeDate()).format('YYYY-MM-DD');
            persistRoutesVersions(route_id, route_version_id, {publish_at});
            closeCurrent();
        };

        const persistRoute = (clear = 0) => {

            return new Promise(function (resolve, reject) {

                const publish_at = moment(formFields.publish_at, localeDate());
                let publish_clear = 1;

                if (!clear && publish_at.isValid()) {
                    publish_clear = 0;
                }

                persistRoutesVersions(route_id, route_version_id, {
                    submit: 0,
                    publish_clear
                }).then((data) => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            });
        };

        const discardVersions = () => {
            return new Promise(function (resolve, reject) {
                discardRoutesVersions(route_id).then((data) => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            });
        };

        const clearPublishAt = async () => {
            try {
                const persist = await persistRoute(1);
                await closeCurrent(`/main/routes/home/${route_id}/versions/${persist.data.id}`);
            } catch (e) {
                console.error(e);
            }
        };

        return (
            <Fragment>
                <Content>
                    <Dimmer active={clone} inverted>
                        <Loader inverted/>
                    </Dimmer>

                    <Header>
                        <DropdownZone
                            name={mwRoute && mwRoute.name}
                            extendsName={zoneName}
                            description={route.data && description}
                            publish_at={route.data && !isEmpty(route.data.route.publish_at) ? moment(route.data.route.publish_at) : false}
                            options={navOptions}
                            loading={route_is_loading}
                            performer={{
                                name: (route.data && route.data.people) ? route.data.people.name : 'Sem executor',
                                profile: (route.data && route.data.people && !isEmpty(route.data.people.profiles)) ? route.data.people.profiles[0].name : '',
                                image: (route.data && route.data.people && !isNull(route.data.people.avatar)) ? route.data.people.avatar.avatar : '',
                                trigger: navUser
                            }}
                            popup
                        />
                        <div className={'action-zones'} onClick={() => setAttempts(1)}>
                            <Statistic.Group size={'mini'}>
                                <Dimmer inverted active={statistics.loading}>
                                    <Loader inverted/>
                                </Dimmer>
                                <Statistic title={"Taxa Média de Ocupação"}>
                                    <Statistic.Value>{statistics.tmo_count}%</Statistic.Value>
                                    <Statistic.Label>TMO</Statistic.Label>
                                </Statistic>
                                <Statistic title={"Tempo Médio de Deslocamento"}>
                                    <Statistic.Value>{dateDuration(statistics.tmd_count, 'HH:mm')}</Statistic.Value>
                                    <Statistic.Label>TMD</Statistic.Label>
                                </Statistic>
                                <Statistic title={"Tempo Médio de Atendimento"}>
                                    <Statistic.Value>{dateDuration(statistics.tma_count, 'HH:mm')}</Statistic.Value>
                                    <Statistic.Label>TMA</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <div className={"scheduling"}>
                                {
                                    mwRoute.publish_id && <Fragment>
                                        Publicação agendada para: {dateGet(mwRoute.publish_at, 'DD/MM/YY')}
                                    </Fragment>
                                }
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <div style={{position: "relative"}}>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-11px",
                                        textAlign: "center",
                                        width: "100%",
                                        zIndex: 1000,
                                    }}
                                >
                                    {default_mode === "week" ? `Semana ${week}` : moment(date).utc().format('MMMM YYYY')}
                                </div>
                                <Button.Group>
                                    {
                                        default_mode !== "week" && <Button
                                            basic
                                            onClick={() => {
                                                setDate(new Date());
                                                setWeek(1);
                                            }} disabled={loading}
                                            content={"Hoje"}
                                            icon={true}
                                            style={{backgroundColor: "transparent"}}
                                        />
                                    }
                                    <Button
                                        basic
                                        onClick={() => prev()}
                                        disabled={default_mode === "week" ? week === 1 : loading}
                                        icon={<Icomoon name={'chevron-left'}/>}
                                        title={"Voltar"}
                                    />
                                    <Button
                                        basic
                                        onClick={() => next()}
                                        disabled={default_mode === "week" ? week === 2 : loading}
                                        icon={<Icomoon name={'chevron-right'}/>}
                                        title={"Avançar"}
                                    />
                                </Button.Group>
                            </div>
                            {
                                !route_is_loading && <GroupButtonActionsDiv>
                                    <GroupButtonActions
                                        default_mode={default_mode}
                                        viewCalendar={viewCalendar}
                                        handleActions={action => HandleButtonsActions(action)}
                                        handleCalendar={calendar => setViewCalendar(calendar)}
                                        handleView={view => setView(view)}
                                        published={(route.data && (route.data.published || parseInt(route.data.route.draft_id) === parseInt(route.data.id)))}
                                        window={routeWindow}
                                        route={route}
                                        clone={() => handleClone(route_id)}
                                        enable={(logged_id === proposed_by)}
                                        window_route={0}
                                        window_id={parseInt(match.params.window_id)}
                                        progress={in_progress}
                                        proposal_end={proposal_end}
                                    />
                                </GroupButtonActionsDiv>
                            }
                        </div>
                    </Header>
                    <BigCalendarContent
                        loading={(route_is_loading || loading) ? 1 : 0}
                        ref={calendarRef}
                        temporary={default_mode === "week" && route_version_temporary}
                    >
                        <Dimmer active={route_is_loading || loading} inverted>
                            <Loader inverted/>
                        </Dimmer>

                        <BigCalendar
                            // popup={false}
                            backgroundEvents={backgroundEvents}
                            selectable={default_mode === "week" && route_version_temporary}
                            onSelectSlot={async ({start, end}) => {
                                let day = start.getDay();
                                let new_start = moment(start);
                                let new_end = moment(end);
                                let origin = {
                                    "zone_id": zone_id,
                                    "route_version_id": parseInt(route_version_id),
                                    "store_id": null,
                                    "order": 1,
                                };

                                const events = filter(renderEvents, (o) => o.start.getDay() === day);
                                if (events.length) {
                                    const events_before = filter(events, (o) => o.start <= start);
                                    if (events_before.length) {
                                        let last_item = events_before.slice(-1);
                                        let last_end = moment(last_item[0].end);
                                        if (last_end.isSameOrAfter(new_start)) {
                                            new_start = last_end.add(5, 'minutes');
                                            new_end = new_end.add(5, 'minutes');
                                        }
                                        let last = events_before.slice(-1);
                                        origin.order = last[0].origin.order + .6;
                                    }

                                    const events_after = filter(events, (o) => o.start >= start);
                                    if (events_after.length) {
                                        let next_start = moment(events_after[0].start);
                                        if (next_start.isSameOrBefore(new_end)) {
                                            new_end = next_start.subtract(5, 'minutes');
                                        }
                                    }
                                }

                                origin.start = new_start.format(dateTimeInternal);
                                origin.end = new_end.format(dateTimeInternal);

                                await setHandleInterval({
                                    "dispatch": dispatch,
                                    "reloadEvents": handleFetchEvents,
                                });

                                await setItem({
                                    "week": week,
                                    "temporary": route_version_temporary,
                                    "new": true,
                                    "direct": true,
                                    "index": -1,
                                    "interval": {
                                        "type": default_frequency,
                                        "days": [
                                            new_start.clone().locale("en").format('dddd').toLowerCase()
                                        ],
                                    },
                                    "start": new_start,
                                    "end": new_end,
                                    "event": {
                                        route_version_id,
                                        origin
                                    }
                                });

                                await refModalDetails.current.openModal();
                            }}
                            view={viewCalendar}
                            onView={() => console.log('on view?')}
                            date={date}
                            localizer={localizer}
                            events={renderEvents}
                            toolbar={false}
                            onNavigate={handleNavigation}
                            onShowMore={(events, date) => {
                                setShow({date, events});
                                moreRef.current.openModal();
                            }}
                            components={calendarComponents}
                            // selected={true}
                            onSelectEvent={async (event) => {
                                if(!event.id) {
                                    return;
                                }

                                const {p} = event.origin;
                                const start = moment(event.start);
                                const end = moment(event.end);

                                let origin_week = p.recurrent_params.week || 0;
                                let save_week = week;
                                let interval = p.recurrent_params.interval;

                                if(origin_week === 2 && week === 2 && interval === "1W") {
                                    if(moment(p.start).isBefore(start, "day")) {
                                        origin_week = 1;
                                    }
                                }

                                if (origin_week === 1 && week === 2) {
                                    save_week = 1;

                                    start.subtract(1, "week");
                                    end.subtract(1, "week");

                                    event.origin.start = start.format('YYYY-MM-DD HH:mm:ss');
                                    event.origin.end = end.format('YYYY-MM-DD HH:mm:ss');
                                }

                                await setHandleInterval({
                                    "dispatch": dispatch,
                                    "reloadEvents": handleFetchEvents,
                                });

                                await setItem({
                                    "week": save_week,
                                    "temporary": route_version_temporary,
                                    "direct": true,
                                    "index": -1,
                                    "interval": event.interval,
                                    "start": start,
                                    "end": end,
                                    "event": event,
                                    "events": renderEvents
                                });

                                refModalDetails.current.openModal();
                            }}
                            messages={{undefined: total => `ver mais(${total})`}}
                            drilldownView={null}
                            min={calendarMin}
                            scrollToTime={new Date(new Date().setHours(3))}
                            tooltipAccessor={null}
                        />
                    </BigCalendarContent>
                </Content>

                <ShowMore
                    ref={moreRef} {...show}
                    changeCommitment={event => handleChangeCommitment(event)}
                />

                <EventDetails ref={detailRef}/>

                <ReferenceWeek ref={deleteWeek} version_id={route_version_id} events={() => handleFetchEvents()}/>

                <OptimizeRoute
                    ref={optimizeRef}
                    route_version_id={route_version_id}
                    events={renderEvents}
                    reloadEvents={handleFetchEvents}
                    week={week}
                    prev={prev}
                    next={next}
                />

                <Modal ref={deleteRef} size={'mini'}>
                    <Confirm
                        title={'Tem certeza que deseja deletar a rota?'}
                        description={'Ao deletar os registros serão perdidos permanentemente e sua aba será fechada.'}
                        onCancel={() => deleteRef.current.closeModal()}
                        onConfirm={() => deleteRoutes(route_id)}
                        onSuccess={() => closeCurrent()}
                        confirmButton={'Sim, deletar'}
                    />
                </Modal>
                <Modal ref={removeDraftRef} size={'mini'}>
                    <Confirm
                        title={'Tem certeza que deseja remover a cópia de rascunho atual?'}
                        description={'Ao remover os registros serão perdidos permanentemente e sua aba será fechada.'}
                        onCancel={() => removeDraftRef.current.closeModal()}
                        onConfirm={() => removeDraftVersion(route_id)}
                        onSuccess={() => closeCurrent()}
                        confirmButton={'Sim, remover!'}
                    />
                </Modal>
                <Modal ref={clearRef} size={'mini'}>
                    <Confirm
                        title={'Limpar eventos da rota?'}
                        description={'Ao confirmar sua ação todos eventos agendados para essa rota serão permanentemente apagados.'}
                        onConfirm={() => clearRoutesVersions(route_id, route_version_id)}
                        onCancel={() => clearRef.current.closeModal()}
                        onSuccess={() => handleViewAndRefresh(true, true)}
                        confirmButton={'Sim, limpar'}
                    />
                </Modal>
                <Modal
                    menu
                    ref={alterRef}
                    title={"Alterar Configuração"}
                    size={"mini"}
                >
                    <AlterParams
                        onCancel={() => alterRef.current.closeModal()}
                        onRefresh={() => handleGetData()}
                        route={route.data && route.data}
                        subcontractor={subcontractor}
                        published={route.data ? route.data.published : false}
                        version={route_version_id}
                    />
                </Modal>
                <Modal ref={confirmDraftRef} size={'mini'}>
                    <Confirm
                        title={'Salvar como rascunho'}
                        description={'Precisamos da sua confirmação para realizar esta ação, você confirma?'}
                        onCancel={() => confirmDraftRef.current.closeModal()}
                        onConfirm={() => handleClone(route_id)}
                        confirmButton={'Sim, confirmo!'}
                    />
                </Modal>
                <Modal ref={saveDraftRef} size={'mini'}>
                    <Confirm
                        title={'Salvar rascunho'}
                        description={'Precisamos da sua confirmação para realizar esta ação, você confirma?'}
                        onCancel={() => saveDraftRef.current.closeModal()}
                        onConfirm={() => persistRoute()}
                        onSuccess={() => closeCurrent()}
                        confirmButton={'Sim, confirmo!'}
                    />
                </Modal>
                <Modal ref={discardRef} size={'mini'}>
                    <Confirm
                        title={'Descartar alterações'}
                        description={'Precisamos da sua confirmação para realizar esta ação, você confirma?'}
                        onCancel={() => discardRef.current.closeModal()}
                        onConfirm={() => discardVersions()}
                        onSuccess={() => closeCurrent()}
                        confirmButton={'Sim, confirmo!'}
                    />
                </Modal>
                <Modal ref={saveSubmitDraftRef} size={'mini'}>
                    <Confirm
                        title={'Salvar e submeter para aprovação?'}
                        description={'Precisamos da sua confirmação para realizar esta ação, você confirma?'}
                        onCancel={() => saveSubmitDraftRef.current.closeModal()}
                        onConfirm={() => persistRoutesVersions(route_id, route_version_id, {submit: 1})}
                        onSuccess={() => closeCurrent()}
                        confirmButton={'Sim, confirmo!'}
                    />
                </Modal>
                <Modal ref={saveSubmitPublishedRef} size={'mini'}>
                    <Confirm
                        title={'Salvar e publicar'}
                        description={'Precisamos da sua confirmação para realizar esta ação, você confirma?'}
                        onCancel={() => saveSubmitPublishedRef.current.closeModal()}
                        onConfirm={() => persistRoutesVersions(route_id, route_version_id, {publish_at, v: '1.72.3'})}
                        onSuccess={() => closeCurrent()}
                        confirmButton={'Sim, confirmo!'}
                    />
                </Modal>
                <Modal ref={routeProduction} size={'mini'}>
                    <ContentProduction>
                        <h5>Você esta em uma visualização de consulta de dados</h5>
                        <p>Para realizar a edição desta rota, lembre-se de clicar no botão "Editar",
                            que esta no canto direito da tela.</p>
                        <div className="group__buttons">
                            <Button
                                color={'green'}
                                size={'small'}
                                onClick={() => routeProduction.current.closeModal()}
                            >Ok</Button>
                        </div>
                    </ContentProduction>
                </Modal>
                <Modal ref={clearEventRef} size={'mini'}>
                    <Confirm
                        title={'Remover eventos do dia'}
                        description={'Tem certeza que deseja remover todos os eventos desse dia?'}
                        onCancel={() => clearEventRef.current.closeModal()}
                        onConfirm={() => handleDeleteEvents()}
                        onSuccess={() => handleFetchEvents()}
                        confirmButton={'Sim, limpar!'}
                    />
                </Modal>
                <Modal ref={scheduleDelete} size={'mini'}>
                    <Confirm
                        title={'Salvar e excluir agendamento'}
                        description={'Você esta excluindo o agendamento da rota. Tem certeza que deseja confirmar?'}
                        onCancel={() => scheduleDelete.current.closeModal()}
                        onConfirm={() => clearPublishAt()}
                        // onSuccess={() => handleFetchEvents()}
                        confirmButton={'Confirmar'}
                    />
                </Modal>
                <Modal ref={scheduleRef} size={'tiny'} closeIcon>
                    <ContentProduction>
                        <h3
                            style={{
                                textAlign: 'left',
                                marginBottom: '8px'
                            }}
                        >
                            {route.data && isEmpty(route.data.route.publish_at) ? 'Salvar e agendar publicação' : 'Editar agendamento'}
                        </h3>
                        <h4
                            style={{
                                textAlign: 'left',
                                color: '#CCC',
                                marginTop: 0,
                                marginBottom: '3rem',
                                fontSize: 16,
                                fontWeight: 'normal'
                            }}
                        >
                            Publicação agendada para o dia: {formFields.publish_at}
                        </h4>

                        <div className={'ui form'}>
                            <Field
                                label=''
                                name='publish_at'
                                component={InputDate}
                                type='text'
                                validate={[required, isDate, isDateGreater]}
                                tomorrow={true}
                                width={'six'}
                                required={true}
                            />
                        </div>
                        <div className="group__buttons">
                            <GroupButton>
                                <Button
                                    size={'small'}
                                    onClick={() => scheduleRef.current.closeModal()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    color={'green'}
                                    size={'small'}
                                    onClick={() => publishAt()}
                                    disabled={pristine || submitting || !valid}
                                >
                                    Confirmar
                                </Button>
                            </GroupButton>
                        </div>
                    </ContentProduction>
                </Modal>
            </Fragment>
        )
    }

    return (
        <EventsManager
            week={week}
            route={route}
            onCancel={() => handleViewAndRefresh(false, true)}
            day={day}
            performer={(route.data && route.data.people) ? route.data.people.name : 'Rota sem executor'}
            route_version_id={route_version_id}
            default_frequency={default_frequency}
            default_event_interval={default_event_interval}
        />
    )
};

Routes.propTypes = {
    route_id: PropTypes.string,
    route_version_id: PropTypes.string,
    setTitle: PropTypes.func,
    location: PropTypes.object,
    closeCurrent: PropTypes.func,
    addTab: PropTypes.func
};

Routes.defaultProps = {
    route_id: '',
    route_version_id: '',
    setTitle: (() => {
    }),
    location: {},
    closeCurrent: (() => {
    }),
    addTab: (() => {
    })
};

Routes = reduxForm({
    form: 'Routes',
    enableReinitialize: true,
})(Routes);

const mapStateToProps = (state, ownProps) => {

    const {Routes} = state.form;

    return {
        route_id: ownProps.match.params.route_id,
        route_version_id: ownProps.match.params.route_version_id,
        setTitle: ownProps.setTitle,
        logged: state.Users.content.result.data.user,
        isChanged: state.RoutesVersions.isChanged,
        forms: Routes,
        _validDateLessOrGreater: {
            publish_at: 'tomorrow',
        },
        initialValues: {
            publish_at: '',
        }
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRouteEvents,
    getRoutesVersions,
    deleteRoutes,
    removeDraftVersion,
    clearRoutesVersions,
    cloneRoute,
    persistRoutesVersions,
    discardRoutesVersions,
    getRoutesStatisticsByVersion,
    deleteRouteEventsByDates,
    getRoutesWindowsProgress
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
