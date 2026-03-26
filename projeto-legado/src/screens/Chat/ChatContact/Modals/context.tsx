import React, { createContext, useContext, useState } from 'react'

import ManagerGroup from './ManagerGroup'
import NotificationModal, {
  NotificationModalProps,
} from './NotificationModal/Index'

interface ModalContextProps {
  handleOpenModal: () => void
  handleCloseModal: () => void
  handleOpenNotificationModal: (notification: NotificationModalProps) => void
  handlecloseNotificationModal: () => void
  handleImageNotificationModal: () => void
  imageNotification: boolean
}

export const ModalContextProvider = createContext({} as ModalContextProps)

const ModalContext = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openNotificationModal, setOpenNotificationModal] =
    useState<boolean>(false)
  const [notificationProps, setNotificationProps] =
    useState<NotificationModalProps>()
  const [imageNotification, setImageNotification] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenNotificationModal = (
    notification: NotificationModalProps,
  ) => {
    setNotificationProps(notification)
    setOpenNotificationModal(true)
  }

  const handlecloseNotificationModal = () => {
    setOpenNotificationModal(false)
  }

  const handleImageNotificationModal = () => {
    setImageNotification(true)
    setTimeout(() => {
      setImageNotification(false)
    }, 4000)
  }

  return (
    <ModalContextProvider.Provider
      value={{
        handleCloseModal,
        handlecloseNotificationModal,
        handleOpenModal,
        handleOpenNotificationModal,
        handleImageNotificationModal,
        imageNotification,
      }}
    >
      {children}
      {openModal && <ManagerGroup />}
      {openNotificationModal && (
        <NotificationModal props={notificationProps.props} />
      )}
    </ModalContextProvider.Provider>
  )
}

export function useModalContext(): ModalContextProps {
  const context = useContext(ModalContextProvider)
  if (!context) throw new Error('useModalContext must be used')

  return context
}

export default ModalContext
