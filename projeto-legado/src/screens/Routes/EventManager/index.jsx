import React, {createContext, createRef, useCallback, useEffect, useMemo, useState} from "react";
import JWTDecode from "jwt-decode";
import {Cookies} from "react-cookie";
import {find, isEmpty, isFunction} from "lodash";
import moment from "moment";

import {applySubcontractors, buildRecurrentByInterval, intervalDates} from "../EventsManager/utils";

import ModalRepeat from "./ModalRepeat";
import ModalDetails from "./ModalDetails";
import ModalMulticontas from "./ModalMulticontas";

import {STORAGE} from "../../../constants/AppTypesConstants"

import {postRouteEvents} from "../../../redux/actions/RoutesVersionEventsActions";

const cookies = new Cookies();
const refModalRepeat = createRef();
const refModalDetails = createRef();
const refModalMulticontas = createRef();

const DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

const JOURNEY = {
    "sun": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    },
    "mon": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    },
    "tue": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    },
    "wed": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    },
    "thu": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    },
    "fri": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    },
    "sat": {
        "journey": {
            "start": "08:00",
            "end": "18:00",
            "duration_full": 600,
            "duration": 600,
            "interval": 0
        }
    }
};

export const EventManagerContext = createContext({
    item: undefined,
    setItem: undefined,
    dirt: undefined,
    setDirt: undefined,
    people: undefined,
    setPeople: undefined,
    journey: undefined,
    setJourney: undefined,
    storeFilterOptions: undefined,
    defaultvalues: undefined,
    handleInterval: undefined,
    setHandleInterval: undefined,
    refModalRepeat: undefined,
    refModalDetails: undefined,
    refModalMulticontas: undefined,
    handleSave: undefined,
    handleDelete: undefined,
    token: undefined,
  loading: undefined,
});

export const EventManager = (props) => {
    // console.clear();

    /**
     * State
     */
    const [item, setItem] = useState({});
    const [dirt, setDirt] = useState(false);
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState({});
    const [journey, setJourney] = useState(JOURNEY);
    const [storeFilters, setStoreFilters] = useState([]);
    const [defaultValues, setDefaultValues] = useState({"days":[]});
    const [handleInterval, setHandleInterval] = useState({
        dispatch: () => {
        },
        events: [],
        form: '',
    });

    /**
     * Callbacks
     */
    const handleSave = useCallback(async (values) => {
        try {
            const days = values.days.map((o) => (o.checked ? o.day : null)).filter(Boolean);
            const {recurrent, recurrent_end, recurrent_events} = values;

            let end = "";
            if (recurrent === "date") {
                end = recurrent_end;
            } else if (recurrent === "events") {
                end = recurrent_events;
            }

            const {modal, direct, index} = item;
            const {interval, every, overwrite, strict, reorder} = values;

            if (direct) {
                const {route_version_id} = item.event;
                const event = buildRecurrentByInterval(item.event.origin, values, direct);
                event.start = event.start.substring(0, 11) + values.start + ':00';
                event.end = event.end.substring(0, 11) + values.end + ':00';
                delete event.duration;
                const data = {
                    "overwrite": values.overwrite,
                    "strict": !values.strict,
                    "reorder": values.reorder,
                    "optimize": {
                        "active": false
                    },
                    "delete": [],
                    "events": [event],
                    "week": item.week || 0,
                };

                if (item.new) {
                    data.events[0].store_id = parseInt(values.store_id);
                }

                const res = await handleInterval.dispatch(postRouteEvents(route_version_id, data));
                if (res.success && isFunction(handleInterval.reloadEvents)) {
                    refModalDetails.current.closeModal();
                    handleInterval.reloadEvents().then();
                }
            } else {
                if (modal === "repeat") {
                    intervalDates(handleInterval, null, index, "week", interval, days, null, recurrent, end, every, overwrite, strict, reorder);
                    refModalRepeat.current.closeModal();
                } else if (modal === "multicontas") {
                    const subcontractors = values.subcontractors.destiny.map((o) => {
                        return {"detail": {"id": o.value, "name": o.label}};
                    });
                    applySubcontractors(handleInterval, index, subcontractors);
                    refModalMulticontas.current.closeModal();
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, [item, handleInterval]);

    const handleDelete = useCallback(async (all, items = []) => {
        const data = {
            "optimize": {
                "active": false,
            },
            "delete": items.length ? items : [],
            "events": [],
            "week": item.week || 0,
        };

        setLoading(true);

        if (items.length) {
            const route_version_id = data.delete[0]['route_version_id'];
            return handleInterval.dispatch(postRouteEvents(route_version_id, data));
        } else {
            try {
                const {parent_id, route_version_id, origin} = item.event;
                const start = moment(origin.start).locale("en");
                data.delete.push({
                    "event_id": parent_id || 0,
                    "store_id": origin.store_id,
                    "day": start.format("dddd").toLowerCase(),
                    "start": start.format('YYYY-MM-DD HH:mm:ss'),
                    "strict": !all,
                });

                const res = await handleInterval.dispatch(postRouteEvents(route_version_id, data));
                if (res.success) {
                    refModalDetails.current.closeModal();
                    handleInterval.reloadEvents().then();
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [item, handleInterval]);

    const toggleStoreFilter = useCallback((checked, item) => {
        let items = [];
        if (checked) {
            items.push(item.type);
        }

        switch (item.type) {
            case "group":
                if (storeFilters.includes("attendance")) {
                    items.push("attendance");
                }
                break;
            case "attendance":
                if (storeFilters.includes("group")) {
                    items.push("group");
                }
                break;
            case "trade":
            case "all":
                items = [item.type];
                break;
        }

        if (!items.length) {
            items.push(item.type);
        }

        setStoreFilters(items);
    }, [storeFilters]);

    const storeFilterOptions = useMemo(() => ([
        {
            "type": "group",
            "text": "Exibir somente pontos do grupo",
            "checked": storeFilters.includes("group"),
            "onChange": toggleStoreFilter
        },
        {
            "type": "attendance",
            "text": "Exibir somente pontos sem atendimento",
            "checked": storeFilters.includes("attendance"),
            "onChange": toggleStoreFilter
        },
        {
            "type": "trade",
            "text": "Loja sem vínculo de trade",
            "checked": storeFilters.includes("trade"),
            "onChange": toggleStoreFilter
        },
        {
            "type": "all",
            "text": "Exibir todas as lojas",
            "checked": storeFilters.includes("all"),
            "onChange": toggleStoreFilter
        }
    ]), [storeFilters]);

    /**
     * Memo
     */
    const token = useMemo(() => JWTDecode(cookies.get(STORAGE.USER).token), []);
    const providerValues = useMemo(() => {
        // console.log("EventManager Render value provider");
        // console.log(new Date());

        const params = JSON.parse(localStorage.getItem('PARAMS'));

        let default_mode = {"value": "month"};
        let default_frequency = {"value": "unique"};
        let optimize_events = {"value": false};
        let show_all_stores = {"value": false};
        let default_event_interval = {"value": 30};
        if (params) {
            default_mode = find(params, {"key": "default_mode"}, 0) || default_mode;
            default_frequency = find(params, {"key": "default_frequency"}, 0) || default_frequency;
            optimize_events = find(params, {"key": "optimize_events"}, 0) || optimize_events;
            show_all_stores = find(params, {"key": "show_all_stores"}, 0) || show_all_stores;
            default_event_interval = find(params, {"key": "default_event_interval"}, 0) || default_event_interval;
        }

        show_all_stores = show_all_stores.value;
        if (!storeFilters.length) {
            setStoreFilters([show_all_stores ? 'all' : 'group']);
        }

        return {
            item,
            setItem,
            dirt,
            setDirt,
            people,
            setPeople,
            journey,
            setJourney,
            storeFilterOptions: !show_all_stores ? storeFilterOptions.slice(0, -1) : storeFilterOptions,
            defaultValues,
            handleInterval,
            setHandleInterval,
            refModalRepeat,
            refModalDetails,
            refModalMulticontas,
            handleSave,
            handleDelete,
            token,
            loading,
            isGroup: (token.payload.type === "G"),
            default_mode: default_mode.value,
            default_frequency: default_frequency.value,
            optimize_events: optimize_events.value,
            default_event_interval: parseInt(default_event_interval.value),
        }
    }, [item, dirt, people, journey, storeFilters, defaultValues, handleInterval, loading]);

    /**
     * Effects
     */
    useEffect(() => {
        const interval = item.interval || false;
        if (interval) {
            let recurrent = "never";
            let recurrent_end = "";
            let recurrent_events = "";
            let days = interval.days || false

            if (interval.type !== "unique" && interval.endBy !== "never") {
                if (interval.endBy === "date") {
                    recurrent = "date";
                    recurrent_end = interval.endDate;
                } else if (interval.endBy === "events") {
                    recurrent = "events";
                    recurrent_events = interval.endEvents;
                }
            }

            let subcontractors = {
                "source": [],
                "destiny": [],
            }

            if (!isEmpty(item.event) && !isEmpty(item.event.subcontractors)) {
                subcontractors.destiny = item.event.subcontractors.map((o) => {
                    const {id: value, name: label} = o.detail;
                    return {value, label, checked: false};
                });
            }

            let start;
            if (item.start) {
                start = item.start.format("HH:mm");
            }

            let end;
            if (item.end) {
                end = item.end.format("HH:mm");
            }
            setLoading(false);
            setDefaultValues({
                store_id: null,
                interval: interval.type || "unique",
                recurrent,
                recurrent_end,
                recurrent_events,
                overwrite: interval.overwrite || false,
                strict: typeof interval.strict === "undefined" ? true : interval.strict,
                reorder: interval.reorder || true,
                every: interval.every || 1,
                days: days ? DAYS.map((day) => days.includes(day)) : [],
                start,
                end,
                subcontractors
            });
        }
    }, [item]);

    return (
        <EventManagerContext.Provider value={providerValues}>
            <ModalRepeat ref={refModalRepeat}/>
            <ModalDetails ref={refModalDetails}/>
            <ModalMulticontas ref={refModalMulticontas}/>
            {props.children}
        </EventManagerContext.Provider>
    );
}
