import React, { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { keys } from '../../../../../utils/Formatters'
import { useDirty } from '../../../../../utils/hooks'

import comparators from './comparators'
import * as Components from './components'
import { mock } from './constants'
import { Context } from './context'
import { getValues, saveSetting } from './services'
import * as Styles from './styles'
import * as Types from './types'

const useErrors = (hierarchies: Types.Hierarchies) => {
  const [errors, setErrors] = useState<Types.Errors>({})

  useEffect(() => {
    const errors = keys(hierarchies).reduce<Types.Errors>((errors, key) => {
      const hierarchy = hierarchies[key]

      if (hierarchy.states.length > 0 && hierarchy.regions.length < 1) {
        return { ...errors, [hierarchy.id]: ['regions'] }
      }

      return errors
    }, {})

    setErrors(errors)
  }, [hierarchies])

  return errors
}

const Setting210: Types.SettingComponent = ({ setModal }) => {
  const [hierarchies, setHierarchies] = useState<Types.Hierarchies>({ ...mock })
  const [originals, setOriginals] = useState<Types.Hierarchies>({ ...mock })
  const [loading, setLoading] = useState<boolean>(true)

  const errors = useErrors(hierarchies)

  const { dirty: isDirty } = useDirty(
    { hierarchies },
    { hierarchies: originals },
    comparators,
  )

  const loader = async () => {
    setLoading(true)

    try {
      const hierarchies = await getValues()
      setHierarchies(hierarchies)
      setOriginals(hierarchies)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    loader()
  }, [])

  const setHierarchy = (
    id: number,
    hierarchy: React.SetStateAction<Types.Hierarchy>,
  ) => {
    setHierarchies((prev) => {
      if (!(id in prev)) return prev

      if (typeof hierarchy !== 'function') {
        return { ...prev, [id]: hierarchy }
      }

      const h = prev[id]
      const value = hierarchy(h)

      return h === value ? prev : { ...prev, [id]: value }
    })
  }

  const setHierarchyValue = <T extends keyof Types.Hierarchy>(
    id: number,
    field: T,
    value: React.SetStateAction<Types.Hierarchy[T]>,
  ) => {
    setHierarchies((prev) => {
      if (!(id in prev)) return prev

      if (typeof value !== 'function') {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            [field]: value,
          },
        }
      }

      const prevValue = prev[id][field]
      const nextValue = value(prevValue)

      return prevValue === nextValue
        ? prev
        : {
            ...prev,
            [id]: {
              ...prev[id],
              [field]: nextValue,
            },
          }
    })
  }

  const close = () => setModal(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault()

      setLoading(true)

      try {
        await saveSetting(hierarchies)

        toast(<ToasterContent color='normal' />, SuccessStyle)
        close()
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
        setLoading(false)
      }
    },
    [hierarchies],
  )

  return (
    <Modal open>
      <Styles.ModalHeader color='blue' children='Configurações Gerais' />

      <Context.Provider
        value={{
          hierarchies: [hierarchies, setHierarchies],
          setHierarchy,
          setHierarchyValue,
          close,
          loading,
          isDirty,
          errors,
        }}
      >
        <Styles.Form onSubmit={onSubmit}>
          <Components.Body />

          <Components.Footer />
        </Styles.Form>
      </Context.Provider>
    </Modal>
  )
}

export default Setting210
