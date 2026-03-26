import { useCallback, useEffect, useState } from 'react'

import { cloneDeep } from 'lodash'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { StepForm } from '../../components'
import type { SaveCallback } from '../../components/types'
import { useMainContext, useTabContext } from '../../contexts'

import { defaultValue } from './constants'
import { getCard, saveCard } from './services'
import type { FormProps, Value } from './types'

const Form = (props: FormProps) => {
  const { card_id, close } = props

  const {
    tab: [tab],
  } = useMainContext()

  const { reload } = useTabContext()

  const [value, setValue] = useState<Value>(
    cloneDeep({ ...defaultValue, type: tab }),
  )
  const [originals, setOriginals] = useState<Value>(cloneDeep({ ...value }))
  const [loading, setLoading] = useState<boolean>(true)

  const load = useCallback(async () => {
    if (!card_id) {
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const value = (await getCard(card_id, 'in', tab)) as Value

      setValue({ ...value })
      setOriginals({ ...value })

      setLoading(false)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      close()
    }
  }, [tab, card_id, close])

  const save: SaveCallback<Value> = useCallback(
    async ({ card_id, close, value, dirtyFields }) => {
      setLoading(true)

      try {
        const response = await saveCard(value, dirtyFields, card_id)
        if (response.success) {
          reload()
          close()
          toast(<ToasterContent color='normal' />, SuccessStyle)
        }

        setLoading(false)
        return response
      } catch (e) {
        setLoading(false)
        throw e
      }
    },
    [reload],
  )

  useEffect(() => {
    load()
  }, [load])

  return (
    <StepForm
      {...props}
      value={[value, setValue]}
      dirty={{
        comparators: {
          events: (v, o) => {
            return (
              v.length !== o.length ||
              v.some((x) => !o.some((y) => x.id === y.id))
            )
          },
          regions: (v, o) => {
            return (
              v.length !== o.length ||
              v.some((x) => !o.some((y) => x.id === y.id))
            )
          },
          cities: (v, o) => {
            return (
              v.length !== o.length ||
              v.some((x) => !o.some((y) => x.id === y.id))
            )
          },
          states: (v, o) => {
            return (
              v.length !== o.length ||
              v.some((x) => !o.some((y) => x.id === y.id))
            )
          },
          teams: (v, o) => {
            return (
              v.length !== o.length ||
              v.some((x) => !o.some((y) => x.id === y.id))
            )
          },
          users: (v, o) => {
            return (
              v.length !== o.length ||
              v.some((x) => !o.some((y) => x.id === y.id))
            )
          },
        },
        originals,
      }}
      loading={[loading, setLoading]}
      save={save}
    />
  )
}

export default Form
