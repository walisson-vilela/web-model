import { createContext, useContext, useState } from 'react'

import moment from 'moment'

import { ModalState } from '../../components/MwModal'
import { RouteTabProvider } from '../../routes/types'

import { AFDContextProps, RangeProps, SchedulesProps } from './interfaces'

type Persist = Pick<AFDContextProps['rangeState'], 'range'> &
  Pick<AFDContextProps['schedulesState'], 'schedules'> &
  Pick<AFDContextProps['schedulesState'], 'dirtySchedules'>

const AFDContext = createContext<AFDContextProps>({
  modalState: { modal: null, setModal: () => {} },
  rangeState: {
    range: 'current_day',
    setRange: () => {},
    processing: false,
    setProcessing: () => {},
    dirtyRange: false,
    setDirtyRange: () => {},
  },
  openedMenusState: {
    dropdownOpened: false,
    rangeOpened: false,
    setDropdownOpened: () => {},
    setRangeOpened: () => {},
  },
  schedulesState: {
    schedules: null,
    loadingSchedules: false,
    dirtySchedules: false,
    setSchedules: () => {},
    setLoadingSchedules: () => {},
    setDirtySchedules: () => {},
    storageSchedules: null,
    setStorageSchedules: () => {},
  },
  tempRangeState: {
    tempRange: null,
    setTempRange: () => {},
  },
})

export const AFDProvider: RouteTabProvider = (props) => {
  const defaults: Persist = {
    schedules: [],
    range: 'current_day',
    dirtySchedules: false,
  }

  const [modal, setModal] = useState<ModalState>(null)

  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false)
  const [rangeOpened, setRangeOpened] = useState<boolean>(false)

  const [schedules, setSchedules] = useState<SchedulesProps>([
    ...defaults.schedules,
  ])

  const [storageSchedules, setStorageSchedules] = useState<SchedulesProps>([])

  const [loadingSchedules, setLoadingSchedules] = useState<boolean>(false)
  const [dirtySchedules, setDirtySchedules] = useState<boolean>(
    defaults && defaults.dirtySchedules ? defaults.dirtySchedules : false,
  )

  const [range, setRange] = useState<
    RangeProps | 'current_day' | 'current_week' | 'current_month'
  >(defaults.range)

  const [tempRange, setTempRange] = useState<RangeProps>([
    {
      startDate: moment().toDate(),
      endDate: moment().toDate(),
      key: 'selection',
    },
  ])

  const [processing, setProcessing] = useState<boolean>(false)
  const [dirtyRange, setDirtyRange] = useState<boolean>(false)

  const providerValues: AFDContextProps = {
    modalState: { modal, setModal },
    rangeState: {
      range,
      setRange,
      processing,
      setProcessing,
      dirtyRange,
      setDirtyRange,
    },
    tempRangeState: { tempRange, setTempRange },
    openedMenusState: {
      dropdownOpened,
      setDropdownOpened,
      rangeOpened,
      setRangeOpened,
    },
    schedulesState: {
      setStorageSchedules,
      storageSchedules,
      schedules,
      setSchedules,
      loadingSchedules,
      setLoadingSchedules,
      dirtySchedules,
      setDirtySchedules,
    },
  }

  return (
    <AFDContext.Provider
      value={{ ...providerValues }}
      children={props.children}
    />
  )
}

const useAFDContext = () => useContext(AFDContext)

export default useAFDContext
