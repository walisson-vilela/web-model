import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import toast from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { JustificationNonAttendanceContext } from '../../../context'
import { EditData } from '../../../services'

import { PayloadData } from './interface'

interface UserSideContextProps {
  payloadData: PayloadData
  setPayloadData: React.Dispatch<React.SetStateAction<PayloadData>>
  disabledStatus: boolean
  handleEditData: (id: number) => Promise<void>
}

export const UserSideContext = createContext({} as UserSideContextProps)

interface UserSideContextProviderProps {
  children: ReactNode
}

export const UserSideContextProvider = ({
  children,
}: UserSideContextProviderProps) => {
  const firstRender = useRef(true)
  const { setDisabled, id, setLoading, userInfo } = useContext(
    JustificationNonAttendanceContext,
  )

  const [payloadData, setPayloadData] = useState<PayloadData>({
    file: null,
    justify_type_id: null,
    audit: {
      obs: '',
      status: '',
    },
  })
  const [initialPayloadData, setInitialPayloadData] = useState<PayloadData>({
    file: null,
    justify_type_id: null,
    audit: {
      obs: '',
      status: '',
    },
  })
  const [disabledStatus, setDisabledStatus] = useState<boolean>(false)

  const handleEditData = async (id: number) => {
    const payload = new FormData()

    payload.append('justify_type_id', payloadData.justify_type_id.id.toString())
    payload.append('audit[status]', payloadData.audit.status)
    payload.append('audit[obs]', payloadData.audit.obs)
    if (
      payloadData.audit.status === 'Aprovado' &&
      payloadData.file !== initialPayloadData.file
    ) {
      if (payloadData.file !== null) {
        payload.append('file[file]', payloadData.file)
        payload.append('file[container]', 'images')
      } else {
        payload.append('file', null)
      }
    }
    try {
      await EditData(id, payload)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      console.log(error)
      toast(<ToasterContent color='normal' />, ErrorStyle)
    }
  }

  useEffect(() => {
    if (userInfo) {
      setLoading(false)
      const file = userInfo.file ? userInfo.file : null
      const justify = {
        id: userInfo.justify_type ? userInfo.justify_type.id : 0,
        name: userInfo.justify_type ? userInfo.justify_type.name : '',
        type: userInfo.justify_type ? userInfo.justify_type.type : 0,
      }
      const auditNotes = userInfo.audit ? userInfo.audit.obs : ''
      setPayloadData((prev) => ({
        audit: { status: prev.audit.status, obs: auditNotes },
        justify_type_id: justify,
        file: file,
      }))
    }
  }, [userInfo])

  useEffect(() => {
    if (firstRender.current) {
      if (payloadData.justify_type_id !== null) {
        setInitialPayloadData(payloadData)
        firstRender.current = false
      }
    } else {
      const statusChanged = payloadData.audit.status === ''
      const fileChanged = initialPayloadData.file === payloadData.file
      const formChanged =
        JSON.stringify(initialPayloadData.justify_type_id) ===
        JSON.stringify(payloadData.justify_type_id)

      if (!formChanged || !fileChanged) {
        setDisabledStatus(true)
        if (payloadData.audit.status === 'Reprovado') {
          setPayloadData((prev) => ({
            audit: { obs: prev.audit.obs, status: '' },
            file: prev.file,
            justify_type_id: prev.justify_type_id,
          }))
        }
      } else {
        setDisabledStatus(false)
      }

      if (statusChanged) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }
  }, [payloadData])

  return (
    <UserSideContext.Provider
      value={{
        disabledStatus,
        payloadData,
        setPayloadData,
        handleEditData,
      }}
    >
      {children}
    </UserSideContext.Provider>
  )
}
