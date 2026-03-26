import moment from "moment";

export const dateTimeInternal = 'YYYY-MM-DD HH:mm:ss';

export const localeDate = () => moment.localeData().longDateFormat("L");

export const toInternalDate = (date) =>
  moment(date, localeDate()).format(moment.HTML5_FMT.DATE);

export const timeToMoment = (value, format = "HH:mm") => {
  return moment(value, format);
}

export const timeDiff = (one, two, format = "HH:mm") => {
  const start = moment(one);
  const end = moment(two);

  return moment.utc(end.diff(start)).format(format);
};

export const dateDuration = (minutes, format = "HH:mm") => {
  if (parseInt(minutes) <= 0) {
    return "00:00:00";
  }

  const to = moment().utc().add(minutes, "minutes");
  const duration = moment.duration(to.diff(moment().utc()));

  return moment.utc(duration.asMilliseconds()).format(format);
};

export const dateCountdown = (startTime, length = 0) => {
  const final =
    length > 0
      ? moment(startTime).add(length, "hours").utc()
      : moment(startTime).utc();
  const duration = moment.duration(final.diff(moment().utc()));

  return {
    days: duration.days() > 0 ? duration.days() : 0,
    hours: duration.hours() > 0 ? duration.hours() : 0,
    minutes: duration.minutes() > 0 ? duration.minutes() : 0,
    seconds: duration.seconds() > 0 ? duration.seconds() : 0,
  };
};

export const dateGetMinutes = (value) => {
  const duration = moment(value, "HH:mm");

  let hours = duration.hours();
  if (hours > 0) {
    hours = hours * 60;
  }

  return hours + duration.minutes();
};

export const dateGet = (date, format = "DD-MM-YYYY HH:mm:ss") =>
  moment(date).utc().format(format);

export const timePlusMinutes = (time, minustes) => {
  return moment(time, "HH:mm").add(minustes, "minutes").format("HH:mm");
};

export const isBefore = (start, end, format = 'HH:mm') => {
  const times = {
    start: moment(start, format),
    end: moment(end, format)
  };

  return times.start.isBefore(times.end);
};

export const isSameOrBefore = (start, end, format = 'HH:mm') => {
  const times = {
    start: moment(start, format),
    end: moment(end, format)
  };

  return times.start.isSameOrBefore(times.end);
};

export const isAfter = (start, end, format = 'HH:mm', duration = 0) => {
  const times = {
    start: moment(start, format),
    end: moment(end, format)
  };

  if (times.start.isAfter(times.end)) {
    if (duration) {
      return times.start.diff(times.end, 'minutes') >= duration;
    }

    return true;
  }

  return false;
};

export const getStartEndDayOfWeek = (week = 0) => {
  const date = moment();
  if (week) {
    date.subtract(week, "week");
  }

  const start = date.startOf("week").format("YYYY-MM-DD");
  const end = date.endOf("week").format("YYYY-MM-DD");

  return { start, end };
};

export const getStartAndEndDayOfWeek = () => {
  let dt = new Date(); // current date of week
  let currentWeekDay = dt.getDay();
  let lessDays = currentWeekDay === 0 ? 6 : currentWeekDay;
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
  let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
  const [firstDayWeek] = wkStart.toISOString().split("T");
  const [lastDayWeek] = wkEnd.toISOString().split("T");
  return [firstDayWeek, lastDayWeek];
};

export const getStartAndEndDayOfMonth = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  const [firstDay] = new Date(year, month, 1).toISOString().split('T')
  const [lastDay] = new Date(year, month + 1, 0).toISOString().split('T')

  return [firstDay, lastDay]
}

export const getCurrentDay = () => {
  const date = new Date();
  const currentDate = date.toISOString().slice(0, 10);
  return currentDate;
};

export const getPreviousandCurrentWeek = () => {
  const s0 = getStartEndDayOfWeek(0);
  const s1 = getStartEndDayOfWeek(1);
  const data = [
    { name: "S1", ...s1 },
    { name: "S0", ...s0 },
  ];
  return data;
};

