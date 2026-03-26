import React from 'react'

import ModalComponent from './Modal'
import { UserSideContextProvider } from './Modal/components/UserSide/context'
import { JustificationNonAttendanceContextProvider } from './context'
import { JustificationNonAttendanceProps } from './interfaces'

const JustificationNonAttendance = ({
  setOpenModal,
  tabId,
  registerId,
}: JustificationNonAttendanceProps) => {
  return (
    <JustificationNonAttendanceContextProvider id={registerId}>
      <UserSideContextProvider>
        <ModalComponent
          setOpenModal={setOpenModal}
          tabId={tabId}
          registerId={registerId}
        />
      </UserSideContextProvider>
    </JustificationNonAttendanceContextProvider>
  )
}

export default JustificationNonAttendance
