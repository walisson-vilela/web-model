import { isEmpty } from 'lodash';
import moment from 'moment';
import AppTypesConstants from '../../constants/AppTypesConstants';
import CalendarEventsConstants from '../../constants/CalendarEventsConstants';
import { getState, setState } from './utils';

const defaultState = AppTypesConstants.defaultState;
let _state = {};
let _key = null;

export default function reducer(state = {calendars: {}}, action) {

    if (!isEmpty(CalendarEventsConstants[action.type])) {
        _key = `calendar_${action.props.calendar_id}`;
        _state = getState(state, _key, defaultState);
    }

    switch (action.type) {
        case CalendarEventsConstants.FETCH_CALENDAR_EVENTS:
            return setState(state, _key, {
                ..._state, isLoading: true
            });

        case CalendarEventsConstants.FETCH_CALENDAR_EVENTS_SUCCESS:
            let events = renderEvents(action.payload.data);

            return setState(state, _key, {
                ...defaultState, result: action.payload, events
            });

        case CalendarEventsConstants.FETCH_CALENDAR_EVENTS_FAILURE:
            return setState(state, _key, {
                ...defaultState, error: action.payload
            });

        case CalendarEventsConstants.GET_CALENDAR_EVENTS:
            let result = {..._state.result.data[action.props.index]};
            let start = moment(result.start).utc();
            let end = moment(result.end).utc();

            result.year = start.format('YYYY') * 1;
            result.start = start.format('L');
            result.end = end.format('L');

            result.details = result.details.map((detail) => {
                let start = moment(detail.start).utc(true);

                return {
                    id: detail.id,
                    calendar_event_id: detail.calendar_event_id,
                    all_day: detail.all_day,
                    active: detail.active,
                    date: start,
                    start_time: start.format('HH:mm'),
                    end_time: moment(detail.end).utc(true).format('HH:mm'),
                    unique: start.format('L')
                }
            });

            return setState(state, _key, {
                ..._state, content: {
                    ...defaultState.content,
                    result
                }
            });

        case CalendarEventsConstants.POST_CALENDAR_EVENTS:
        case CalendarEventsConstants.PUT_CALENDAR_EVENTS:
            return setState(state, _key, {
                ..._state, content: {
                    ..._state.content,
                    save: {
                        ...defaultState.save,
                        isLoading: true
                    }
                }
            });

        case CalendarEventsConstants.POST_CALENDAR_EVENTS_SUCCESS:
        case CalendarEventsConstants.PUT_CALENDAR_EVENTS_SUCCESS:
            if (action.type === CalendarEventsConstants.POST_CALENDAR_EVENTS_SUCCESS) {
                _state.result.data.unshift({...action.payload.data, __className: 'animated flash'});
            } else {
                _state.result.data[action.props.index] = {...action.payload.data, __className: 'animated flash'};
            }
            _state.events = renderEvents(_state.result.data);
            _state.content = {
                ...defaultState.content,
                save: {
                    ...defaultState.save,
                    ...action.payload
                }
            };

            return setState(state, _key, _state);

        case CalendarEventsConstants.DELETE_CALENDAR_EVENTS_SUCCESS:
            _state.result.data.splice(action.props.index, 1);
            _state.events = renderEvents(_state.result.data);

            return setState(state, _key, _state);

        default:
            return {...state};
    }
}

function renderEvents(events = []) {

    let days = {};
    let mKey, eKey, dKey = '';

    events.map((event, index) => {
        event.details.map((detail) => {
            const start = moment(detail.start).utc();
            const row = {
                id: event.id,
                name: event.name,
                active: event.active ? detail.active : false,
                index
            };

            mKey = start.format('YYYYM');
            eKey = `${mKey}_events`;
            dKey = start.format('D');

            if (!days[mKey]) {
                days[mKey] = [dKey];
                days[eKey] = {
                    [dKey]: row
                };
            } else {
                days[mKey].push(dKey);
                days[eKey] = {
                    ...days[eKey],
                    [dKey]: row
                }
            }

            return false;
        });
        return false;
    });

    return days;
}
