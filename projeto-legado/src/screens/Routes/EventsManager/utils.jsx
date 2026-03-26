
import arrayMove from 'array-move';
import { isArray, isEmpty, isUndefined } from 'lodash';
import reactMoment from 'moment';
import { extendMoment } from 'moment-range';
// TODO: react-sortable-hoc is deprecated
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { change } from 'redux-form';
import { List } from 'semantic-ui-react';
import { EventsItem } from './associated';

import {

  dateGetMinutes,
  isAfter,
  isBefore,
  isSameOrBefore,
  timePlusMinutes
} from '../../../utils/DateTime';

const moment = extendMoment(reactMoment);
const dateTimeInternal = 'YYYY-MM-DD HH:mm:ss';
const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

export const localeDate = () => moment.localeData().longDateFormat('L');

const SortableItem = SortableElement(props => {
    const {
        item,
        itemIndex,
        data,
        data_before,
        match,
        remove,
        move,
        duplicate,
        onSetInterval,
        intervalDates,
        onFetchRates,
        className,
        changeEndTime,
        multicontas,
        countItens,
        forceValidate,
    } = props;

    return (
        <EventsItem
            index={itemIndex}
            item={item}
            data={data}
            data_before={data_before}
            remove={remove}
            move={move}
            duplicate={duplicate}
            onSetInterval={onSetInterval}
            intervalDates={intervalDates}
            onFetchRates={onFetchRates}
            match={match}
            className={className}
            changeEndTime={(index) => changeEndTime(index)}
            multicontas={multicontas}
            countItens={countItens}
            forceValidate={forceValidate}
        />
    );
});

const SortableList = SortableContainer(props => {

    const {
        items,
        onSetInterval,
        intervalDates,
        match,
        onFetchRates,
        time_journey,
        form,
        multicontas,
    } = props;

    let old = [];

    try {
        if (!isEmpty(form.forms)) {
            old = isArray(form.forms.values.delete) ? [...form.forms.values.delete] : []
        }
    } catch (e) {
        console.error('erro ao iterar');
    }

    /**
     * Modifica os demais horários de acordo com o end_time modificado.
     *
     * @returns {Promise<void>}
     */
    const handleChangeEndTime = async () => {
        const events = items.getAll();
        if (events.length === 1) {
            return;
        }

        let last = false;
        let plus_time = 0;

        const rows = events.map((row) => {

            const minutes = dateGetMinutes(row.duration);
            if(last && isSameOrBefore(row.start_time, last)){
                row.start_time = timePlusMinutes(last, 1);
                row.end_time = timePlusMinutes(row.start_time, minutes + plus_time);
            }

            plus_time = dateGetMinutes(row.time_trip) + dateGetMinutes(row.extra_time);
            last = timePlusMinutes(row.end_time, plus_time);

            return row;
        });

        await form.dispatch(change(form.form, 'events', rows, null, null));
    };

    return (
        <List divided relaxed>
            {
                items.map((item, index) => {
                    let data = items.get(index);
                    let exceeded = false;
                    if (isBefore(data.start_time, time_journey.start) || isAfter(data.end_time, time_journey.end)) {
                        exceeded = true;
                    }

                    let data_before = index === 0 ? {} : items.get(index - 1);

                    return (
                        <SortableItem
                            key={`item-${index}`}
                            index={index}
                            itemIndex={index}
                            item={item}
                            data={data}
                            data_before={data_before}
                            remove={({id}) => {
                                !isUndefined(id) && form.dispatch(change(form.form, 'delete', [...old, id]));
                                items.remove(index);
                            }}
                            move={(a, b) => items.move(a, b)}
                            onSetInterval={onSetInterval}
                            intervalDates={intervalDates}
                            onFetchRates={onFetchRates}
                            match={match}
                            className={exceeded ? 'off-the-journey' : ''}
                            changeEndTime={handleChangeEndTime}
                            multicontas={multicontas}
                            countItens={items.length - 1}
                            forceValidate={() => {
                                const now = new Date()
                                form.dispatch(change(form.form, 'force-validate', now.toJSON()));
                            }}
                        />
                    );
                })
            }
        </List>
    );
});

export const getMinutes = value => {
    const duration = moment(value, 'HH:mm');

    let hours = duration.hours();
    if (hours > 0) {
        hours = hours * 60;
    }

    return hours + duration.minutes();
};

export const renderEvents = props => {
    const {
        fields,
        onSetInterval,
        intervalDates,
        starting,
        onChangeMarkers,
        match,
        onChangeMatch,
        destiny,
        onChangeDestiny,
        changeFieldValue,
        onFetchRates,
        startingPoint,
        endPoint,
        time_journey,
        form,
        multicontas,
        route_start,
        route_end
    } = props;

    return (
        <SortableList
            pressDelay={200}
            items={fields}
            onSetInterval={onSetInterval}
            intervalDates={intervalDates}
            starting={starting}
            match={match}
            destiny={destiny}
            onChangeMatch={onChangeMatch}
            onChangeDestiny={onChangeDestiny}
            changeFieldValue={changeFieldValue}
            onFetchRates={onFetchRates}
            onSortEnd={
                ({oldIndex, newIndex}) => {
                    fields.move(oldIndex, newIndex);
                    onChangeMarkers();
                }
            }
            startingPoint={startingPoint}
            endPoint={endPoint}
            time_journey={time_journey}
            form={form}
            multicontas={multicontas}
            route_start={route_start}
            route_end={route_end}
        />
    )
};

export const addEvents = (props, rows) => {
    let form = props.form;
    let values = {...props.forms.values};
    let old = values.events ? values.events : [];

    props.dispatch(change(form, 'events', [...old, ...rows]));
};

export const clearEvents = (props) => {
    let form = props.form;

    return props.dispatch(change(form, 'events', []));
};

export const reorderEvents = (props, from, to) => {
    let form = props.form;
    let values = {...props.forms.values};
    let events = values.events;

    --from;
    --to;

    if (events.length <= 1 || isEmpty(events[from])) {
        return;
    }

    events = arrayMove(events, from, to);

    return props.dispatch(change(form, 'events', events));
};

export const applySubcontractors = (props, index, subcontractors) => {
    let form = props.form;
    if (index === -1) {
        const {events} = props;
        events.map((o) => o.subcontractors._ids = subcontractors);

        props.dispatch(change(form, 'events', events, false, false));

    }else{
        props.dispatch(change(form, `events[${index}].subcontractors._ids`, subcontractors, false, false));
    }
}

export const intervalDates = (
    props,
    item,
    index,
    mode,
    type,
    days = [],
    start = undefined,
    endBy = 'occorrs',
    end = undefined,
    every = 1,
    overwrite = false,
    strict = false,
    reorder = false
) => {
    let form = props.form;
    let values = props.forms ? {...props.forms.values} : {};
    let value = [];

    if (type === 'save') {
        values.interval = {...values._interval};
        values.events = values.events.map((event) => {
            event.interval = {...event._interval};

            return event;
        });

        props.dispatch(change(form, 'interval', values.interval));
        props.dispatch(change(form, 'events', values.events));

        return true;
    } else if (type === 'cancel') {
        values._interval = {...values.interval};
        values.events = values.events.map((event) => {
            event._interval = {...event.interval};

            return event;
        });

        props.dispatch(change(form, '_interval', values.interval));
        props.dispatch(change(form, 'events', values.events));

        return true;
    } else if (mode === "week") {
        const interval = {
            type,
            days,
            endBy,
            endDate: endBy === "date" ? end : "",
            endEvents: endBy === "events" ? end : "",
            every,
            overwrite,
            strict,
            reorder,
        };

        try {
            if (index === -1) {
                const {events} = props;
                events.map((o) => o.interval = interval);

                props.dispatch(change(form, 'interval', interval, false, false));
                props.dispatch(change(form, 'events', events, false, false));
            } else {
                props.dispatch(change(form, `events[${index}].interval`, interval, false, false));
            }
        } catch (e) {
            console.error(e);
        }

        return;
    } else {
        let nextOccorrs;
        let origin = moment(start, localeDate());
        let recur = origin.recur();
        let occorrs = recur;

        if (type === 'daily') {
            occorrs = recur.every(every).days();
        } else if (type === 'week') {
            occorrs = recur.every(every).weeks();
        }

        if (endBy === 'date') {
            nextOccorrs = occorrs.all();
        } else {
            nextOccorrs = occorrs.next(end);
        }

        // add first occorr
        nextOccorrs.unshift(origin.clone());

        // get occorrs
        for (let nextOccorr of nextOccorrs) {

            if (type === 'daily') {
                if (nextOccorr.isSameOrAfter(origin)) {
                    value.push(nextOccorr);
                }
            } else if (type === 'week') {
                days.forEach((day) => {
                    let weekDay = nextOccorr.clone().day(day);
                    if (weekDay.isSameOrAfter(origin)) {
                        value.push(weekDay);
                    }
                });
            }
        }

    }

    if (index > -1) {
        props.dispatch(change(form, `${item}._interval.dates`, value));

        return true;
    }

    values.events = values.events.map((event) => {
        event._interval.dates = value;

        return event;
    });

    props.dispatch(change(form, 'time', new Date()));
    props.dispatch(change(form, 'events', values.events));
};

export const deleteEventsAfterJourney = (props, journey) => {
    let form = props.form;
    let values = {...props.forms.values};

    let events = values.events.filter(detail => {

        let exceeded = false;
        if (isBefore(detail.start_time, journey.start) || isAfter(detail.end_time, journey.end)) {
            exceeded = true;
        }

        return !exceeded;
    });

    props.dispatch(change(form, 'events', events, null));
};

export const handleSubmit = (props) => {
    let week = props.week;
    let form = props.forms;
    let values = {...form.values};

    let date = moment(values.date);

    let interval = values.interval;
    let multicontas = false;

    values.events = values.events.map((detail, order) => {

        let [start_h, start_m] = detail.start_time.split(':');
        let [end_h, end_m] = detail.end_time.split(':');
        let subcontractors = (detail.subcontractors && detail.subcontractors._ids) ? detail.subcontractors._ids : [];
        let _ids = subcontractors.map((subcontractor) => subcontractor.detail.id);

        if (_ids.length > 0) {
            multicontas = true;
        }

        let recurrent_end = "";
        let recurrent_events = 0;
        if (!isEmpty(detail.interval.endDate)) {
            if (detail.interval.endDate.indexOf("/") === -1) {
                recurrent_end = detail.interval.endDate
            } else {
                recurrent_end = moment(detail.interval.endDate, localeDate()).format('YYYY-MM-DD');
            }
        }

        if (!isEmpty(detail.interval.endEvents)) {
            recurrent_events = detail.interval.endEvents;
        }

        const start = date.hour(start_h).minute(parseInt(start_m)).format(dateTimeInternal);
        const end = date.hour(end_h).minute(parseInt(end_m)).format(dateTimeInternal);

        return {
            "store_id": detail.store_id,
            "order": parseInt(order + 1),
            "start": start,
            "end": end,
            "origin_start": detail.origin_start || start,
            "duration": getMinutes(detail.duration),
            "distance": detail.distance,
            "time_trip": getMinutes(detail.time_trip),
            "time_trip_extra": getMinutes(detail.extra_time),
            "time_total": getMinutes(detail.time_total),
            "recurrent": 1,
            "recurrent_params": {
                "days": detail.interval.days,
                "direct": false,
                "interval": (detail.interval.every.toString() + detail.interval.type[0]).toUpperCase(),
                "overwrite": detail.interval.overwrite,
                "reorder": detail.interval.reorder || true,
                "strict": !detail.interval.strict,
                "week": detail.interval.week || week,
            },
            recurrent_end,
            recurrent_events,
            "subcontractors": {
                _ids
            }
        }
    });

    return {
        overwrite: (values.interval && values.interval.overwrite) ? values.interval.overwrite : true,
        delete: values.delete,
        events: values.events,
        reference: date.format('YYYY-MM-DD'),
        interval,
        multicontas
    };
};

export const buildIntervalbyEvent = (event) => {

    const recurrent = event.recurrent_params;
    const interval = recurrent.interval.slice(-1);
    const every = parseInt(recurrent.interval.slice(0, -1));

    let endBy = "never"
    let recurrent_end = "";
    if (!isEmpty(event.recurrent_end)) {
        recurrent_end = event.recurrent_end.slice(0, 10);
        if (recurrent_end === "9999-12-31") {
            recurrent_end = "";
        } else {
            endBy = "date";
        }
    }

    let recurrent_events = "";
    if (event.recurrent_events > 0) {
        recurrent_events = event.recurrent_events;
        endBy = "events"
    }

    return {
        type: interval === "W" ? "week" : "unique",
        every,
        days: recurrent.all,
        endBy,
        endEvents: recurrent_events,
        endDate: recurrent_end,
        week: recurrent.week || undefined,
    }
}

export const buildRecurrentByInterval = (origin, values, direct = false) => {
    const {interval: type, every, days, recurrent_end, recurrent_events} = values;
    const recurrent = true;
    const interval = every + type.slice(0, 1).toUpperCase();

    let subcontractors = {
        "_ids": []
    };

    if (!isEmpty(values.subcontractors) && !isEmpty(values.subcontractors.destiny)) {
        subcontractors._ids = values.subcontractors.destiny.map((o) => o.value);
    }

    return {
        ...origin,
        recurrent,
        "recurrent_params": {
            "days": days.filter((o) => o.checked).map((o) => o.day),
            "direct": direct,
            "overwrite": values.overwrite,
            "reorder": values.reorder,
            "strict": !values.strict,
            interval,
        },
        "recurrent_end": recurrent_end.toString(),
        "recurrent_events": recurrent_events || 0,
        subcontractors,
    };
}

export const DAYS = [
    {
        index: 0,
        label: "Domingo",
        day: "sunday",
        checked: false
    }, {
        index: 1,
        label: "Segunda",
        day: "monday",
        checked: false
    }, {
        index: 2,
        label: "Terça",
        day: "tuesday",
        checked: false
    }, {
        index: 3,
        label: "Quarta",
        day: "wednesday",
        checked: false
    }, {
        index: 4,
        label: "Quinta",
        day: "thursday",
        checked: false
    }, {
        index: 5,
        label: "Sexta",
        day: "friday",
        checked: false
    }, {
        index: 6,
        label: "Sábado",
        day: "saturday",
        checked: false
    }
];
