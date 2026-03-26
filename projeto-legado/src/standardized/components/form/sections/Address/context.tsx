import React, { type ProviderProps, useCallback, useState } from 'react'

import type { UseFormReturn } from 'react-hook-form'

import Modal, { type ModalState } from '../../../../../components/MwModal'
import useHomeContext from '../../../../pages/Home/context'

import { useCoordinatesLoader } from './hooks'
import type { ComponentProps, IAddress } from './interfaces'

type Loading = {
  postalCode: boolean
  coordinates: boolean
}

export type ContextProps = ComponentProps & {
  loading: [Loading, React.Dispatch<React.SetStateAction<Loading>>]
  modal: [
    ModalState | null,
    React.Dispatch<React.SetStateAction<ModalState | null>>,
  ]
  cepIsDirty: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  loadCoordinates: (form: IAddress) => void
  invalidCheck: (key: keyof IAddress | string) => boolean
  setValueOptions: { shouldValidate: boolean; shouldDirty: boolean }
  fillGeolocationStatus: () => void
}

const Context = React.createContext<ContextProps>({} as ContextProps)

export const Provider = (props: ProviderProps<ComponentProps>) => {
  const { user } = useHomeContext()

  const { withAddressCoordinate, withGeolocationStatus } = props.value
  const form = props.value.form as UseFormReturn<IAddress>
  const { formState } = form

  const setValue: typeof form.setValue = (name, value, config) => {
    if (
      !withAddressCoordinate &&
      (
        [
          'address_lat',
          'address_lng',
          'geolocation_tolerance',
        ] as (keyof IAddress)[]
      ).includes(name)
    ) {
      return
    }

    if (
      !withGeolocationStatus &&
      (['geolocation_status'] as (keyof IAddress)[]).includes(name)
    ) {
      return
    }

    props.value.form.setValue(name, value as never, config)
  }

  const [modal, setModal] = useState<ModalState | null>(null)

  const [cepIsDirty, setCepIsDirty] = useState<boolean>(false)

  const [loading, setLoading] = useState({
    postalCode: false,
    coordinates: false,
  })

  const loadCoordinates = useCoordinatesLoader({ setLoading, form })

  const invalidCheck: ContextProps['invalidCheck'] = useCallback(
    (key) =>
      key in formState.errors &&
      (key in formState.dirtyFields || formState.isSubmitted),
    [formState],
  )

  const fillGeolocationStatus: ContextProps['fillGeolocationStatus'] =
    useCallback(() => {
      setValue('geolocation_status', true)
      setValue('geolocation_at', new Date().toISOString())
      setValue('geolocation_by_id', user.id)
      setValue('geolocation_by_name', user.name)
    }, [user])

  return (
    <React.Fragment>
      <Context.Provider
        {...props}
        value={{
          ...props.value,
          form: { ...props.value.form, setValue },
          showTitle:
            props.value.showTitle === undefined ? true : props.value.showTitle,
          modalMode: props.value.modalMode,
          loading: [loading, setLoading],
          modal: [modal, setModal],
          cepIsDirty: [cepIsDirty, setCepIsDirty],
          loadCoordinates,
          invalidCheck,
          setValueOptions: { shouldValidate: true, shouldDirty: true },
          fillGeolocationStatus,
        }}
      />
      <Modal modal={modal} />
    </React.Fragment>
  )
}

const useAddessContext = () =>
  React.useContext(Context) as ContextProps & { form: UseFormReturn<IAddress> }

export default useAddessContext
