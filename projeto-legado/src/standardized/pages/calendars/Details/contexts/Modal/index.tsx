import React, { useState } from 'react'

import type * as Types from './types'

const Context = React.createContext({} as Types.Context<{}>)

const useContext = <T extends Types.ModalOptions>() => {
  return React.useContext<Types.Context<T>>(Context)
}

export const Provider = <T extends Types.ModalOptions>(
  props: Types.ModalProps<T>,
) => {
  const [active, setActive] = useState<{
    id: keyof T
    value: Parameters<T[keyof T]>[0]
  } | null>(null)

  const openModal = <Id extends keyof T>(
    id: Id,
    value: Parameters<T[Id]>[0],
  ) => {
    if (!(id in props.options)) throw new Error('invalid modal id')
    setActive({ id, value })
  }

  const closeModal = () => setActive(null)

  const [Component, value] = active
    ? [props.options[active.id], active.value]
    : [() => null, {}]

  return (
    <Context.Provider value={{ openModal, closeModal }}>
      {props.children}
      <Component {...value} />
    </Context.Provider>
  )
}

export default useContext
