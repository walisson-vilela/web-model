import React from 'react'

import { ModalState } from '../../components/MwModal'

type StateType<T> = React.Dispatch<React.SetStateAction<T>>

export interface AFDContextProps {
  schedulesState: {
    schedules: SchedulesProps
    loadingSchedules: boolean
    dirtySchedules: boolean
    setSchedules: StateType<SchedulesProps>
    setLoadingSchedules: StateType<boolean>
    setDirtySchedules: StateType<boolean>

    storageSchedules: SchedulesProps
    setStorageSchedules: React.Dispatch<React.SetStateAction<SchedulesProps>>
  }
  rangeState: {
    range: RangeProps | 'current_day' | 'current_week' | 'current_month'
    processing: boolean
    dirtyRange: boolean
    setRange: StateType<
      RangeProps | 'current_day' | 'current_week' | 'current_month'
    >
    setProcessing: StateType<boolean>
    setDirtyRange: StateType<boolean>
  }
  tempRangeState: {
    tempRange: RangeProps
    setTempRange: StateType<RangeProps>
  }
  openedMenusState: {
    dropdownOpened: boolean
    rangeOpened: boolean
    setDropdownOpened: StateType<boolean>
    setRangeOpened: StateType<boolean>
  }
  modalState: {
    modal: ModalState
    setModal: StateType<ModalState>
  }
}

export interface ConfigureScheduleProps {
  editData?: {
    index: number
    schedule: SingleScheduleProps
  }
}

export interface SingleScheduleProps {
  deliverySchedule: { label: string; value: string }
  frequency: { label: string; value: string }
  emails: string[]
}

interface SingleRangeProps {
  startDate: Date
  endDate: Date
  key: string
}

export interface SchedulesProps extends Array<SingleScheduleProps> {}

export interface RangeProps extends Array<SingleRangeProps> {}
