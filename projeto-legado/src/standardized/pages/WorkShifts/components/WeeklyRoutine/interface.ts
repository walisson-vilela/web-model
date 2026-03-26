export enum TWeekDayNumber {
  Segunda = 1,
  Terça = 2,
  Quarta = 3,
  Quinta = 4,
  Sexta = 5,
  Sábado = 6,
  Domingo = 7,
}
export type TWeekDay = 'D' | 'S' | 'T' | 'Q'

export type TWeekDays = {
  [K in TWeekDayNumber]: { dayNumber: K; label: TWeekDay }
}

export const Week: TWeekDays = {
  [TWeekDayNumber.Segunda]: {
    dayNumber: TWeekDayNumber.Segunda,
    label: 'S',
  },
  [TWeekDayNumber.Terça]: {
    dayNumber: TWeekDayNumber.Terça,
    label: 'T',
  },
  [TWeekDayNumber.Quarta]: {
    dayNumber: TWeekDayNumber.Quarta,
    label: 'Q',
  },
  [TWeekDayNumber.Quinta]: {
    dayNumber: TWeekDayNumber.Quinta,
    label: 'Q',
  },
  [TWeekDayNumber.Sexta]: {
    dayNumber: TWeekDayNumber.Sexta,
    label: 'S',
  },
  [TWeekDayNumber.Sábado]: {
    dayNumber: TWeekDayNumber.Sábado,
    label: 'S',
  },
  [TWeekDayNumber.Domingo]: {
    dayNumber: TWeekDayNumber.Domingo,
    label: 'D',
  },
}
