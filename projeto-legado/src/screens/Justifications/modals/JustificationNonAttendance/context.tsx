import React, { ReactNode, createContext, useEffect, useState } from 'react'

import { UserProps } from './Modal/components/UserSide/interface'
import { GetUserInfo } from './services'

interface JustificationNonAttendanceContextProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  disabled: boolean
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  id: number
  userInfo: UserProps
}

export const JustificationNonAttendanceContext = createContext(
  {} as JustificationNonAttendanceContextProps,
)

interface UserSideProviderProps {
  children: ReactNode
  id: number
}

export const JustificationNonAttendanceContextProvider = ({
  children,
  id,
}: UserSideProviderProps) => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<UserProps | null>(null)

  const getUserInfo = async () => {
    try {
      const response = await GetUserInfo(id)
      setUserInfo(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <JustificationNonAttendanceContext.Provider
      value={{
        disabled,
        setDisabled,
        loading,
        setLoading,
        id,
        userInfo,
      }}
    >
      {children}
    </JustificationNonAttendanceContext.Provider>
  )
}
