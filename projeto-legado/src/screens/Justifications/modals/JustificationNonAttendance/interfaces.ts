export interface JustificationNonAttendanceProps {
  setOpenModal: React.Dispatch<React.SetStateAction<JSX.Element>>
  tabId: number
  registerId: number
}

export interface PopupReprovationProps {
  setOpenReprovationPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PopupJustificationProps {
  setOpenJustificationPopup: React.Dispatch<React.SetStateAction<boolean>>
}
