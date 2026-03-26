import { isArray, isEmpty, isObject } from 'lodash';
import reactMoment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(reactMoment);

const localeData = () => {
    return moment.localeData().longDateFormat('L');
};

const now = moment();

export const isDate = (value = '') => {
    return !moment(value, localeData()).isValid() ? 'Invalid date' : undefined;
};

export const isDateLess = (value = '', values, redux, field) => {

    if (!isObject(redux._validDateLessOrGreater)) {
        return 'key _validDateLessOrGreater not found'
    }

    let maxDateField = isEmpty(redux._validDateLessOrGreater[field])
        ? false
        : redux._validDateLessOrGreater[field];

    let maxDate = moment(values[maxDateField], localeData());

    if (!maxDate.isValid()) {
        return undefined;
    }

    return moment(value, localeData()).isSameOrBefore(maxDate)
        ? undefined
        : `Must be less than or equal to ${maxDate.format('L')}`;
};

export const isDateGreater = (value = '', values, redux, field) => {

    if (!isObject(redux._validDateLessOrGreater)) {
        return 'key _validDateLessOrGreater not found'
    }

    let minDateField = isEmpty(redux._validDateLessOrGreater[field])
        ? false
        : redux._validDateLessOrGreater[field];

    let minDate = moment().add(1, 'day');

    if (minDateField !== 'tomorrow') {

        minDate = moment(values[minDateField], localeData());
    }

    if (!minDate.isValid()) {

        return undefined;
    }

    return moment(value, localeData()).isSameOrAfter(minDate.startOf('day'))
        ? undefined
        : `Must be greater than or equal to ${minDate.format('L')}`;
};

export const isTime = (value = '') => {
    let time = moment(`2019-01-01 ${value}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);
    return !time.isValid() ? 'Invalid time' : undefined;
};

export const checkDuration = (value = '', values, redux, field) => {
  const expected = redux.default_event_interval;
  const duration = dateGetMinutes(value);
  return duration < expected ? `O evento deve ter ao menos ${expected} minutos` : undefined;
}

export const isTimeLess = (value = '', values, redux, field) => {
  if (!isObject(redux._validDateLessOrGreater)) {
    return 'key _validDateLessOrGreater not found'
  }

  let exec = [
    field,
    field,
    0,
    field,
  ];

  const isSub = field.indexOf('.');

  if(isSub > -1){
    const re = new RegExp("^(\\w+)\\[(\\d+)].(\\w+)", "gm");
    exec = re.exec(field);

    if (!exec) {
      return 'invalid field'
    }
  }

  let maxTimeField = isEmpty(redux._validDateLessOrGreater[exec[3]])
    ? false
    : redux._validDateLessOrGreater[exec[3]];

  let maxTime = 0;
  if(isSub > -1) {
    maxTime = values[exec[1]][exec[2]][maxTimeField];
  }else{
    maxTime = values[maxTimeField];
  }

  if (isEmpty(maxTime)) {
    return undefined;
  }

  if (typeof (redux._checkAfter) != 'undefined' && exec[2] > 0) {
    let extraTime = 0;
    let checkAfter = isEmpty(redux._checkAfter[exec[3]])
      ? false
      : redux._checkAfter[exec[3]];

    if (isArray(checkAfter)) {
      extraTime = checkAfter[1];
      checkAfter = checkAfter[0];
    }

    let beforeTime = values[exec[1]][exec[2] - 1][checkAfter];
    if (isEmpty(beforeTime)) {
      return 'before time not found';
    }

    let _before = moment(`2019-01-01 ${beforeTime}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);
    if (extraTime) {
      let beforeExtraTime = values[exec[1]][exec[2] - 1][extraTime];
      let [extra_h, extra_m] = beforeExtraTime.split(':');
      if (extra_h > 0) {
        _before.add({hour: extra_h});
      }
      if (extra_m > 0) {
        _before.add({minute: extra_m});
      }
    }

    let _current = moment(`2019-01-01 ${value}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);

    if (_before.isAfter(_current)) {
      return `Must be greater than ${_before.utc(false).format('HH:mm')}`;
    }
  }

  let start = moment(`2019-01-01 ${value}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);
  let end = moment(`2019-01-01 ${maxTime}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);

  const expected = redux.default_event_interval;
  const diff = end.diff(start, "minutes");
  if(!diff || diff < expected) {
    return `O evento deve ter ao menos ${expected} minutos`;
  }

  return start.isAfter(end) ? `Must be less than ${maxTime}` : undefined;
};

export const isTimeGreater = (value = '', values, redux, field) => {
  if (!isObject(redux._validDateLessOrGreater)) {
    return 'key _validDateLessOrGreater not found'
  }
  let exec = [
    field,
    field,
    0,
    field,
  ];

  const isSub = field.indexOf('.');

  if(isSub > -1) {
    const re = new RegExp("^(\\w+)\\[(\\d+)].(\\w+)", "gm");
    exec = re.exec(field);

    if (!exec) {
      return 'invalid field'
    }
  }

  let minTimeField = isEmpty(redux._validDateLessOrGreater[exec[3]])
    ? false
    : redux._validDateLessOrGreater[exec[3]];

  let minTime;
  if(isSub > -1){
    minTime = values[exec[1]][exec[2]][minTimeField];
  }else{
    minTime = values[minTimeField];
  }

  if (isEmpty(minTime)) {
    return undefined;
  }

  let end = moment(`2019-01-01 ${value}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);
  let start = moment(`2019-01-01 ${minTime}:01 +0000`, 'YYYY-MM-DD HH:mm:ss Z', true);

  const expected = redux.default_event_interval;
  const diff = end.diff(start, "minutes");
  if(!diff || diff < expected) {
    return `O evento deve ter ao menos ${expected} minutos`;
  }

  return end.isBefore(start) ? `Must be greater than ${minTime}` : undefined;
};

export const required = (value = "") =>
    !value ? "Campo obrigatório." : undefined;

export const number = value =>
    value && isNaN(Number(value)) ? "Must be a number" : undefined;
