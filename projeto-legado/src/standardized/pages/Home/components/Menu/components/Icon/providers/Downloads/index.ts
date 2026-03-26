import { useEffect, useState } from 'react'

import { GenericObject } from '@mw-kit/mw-ui/types'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { useWebSocket } from '../../../../../../../../../utils/hooks'
import { notEmptyStringOrDefault } from '../../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../../utils/validators'
import { MenuProvider } from '../types'

import { getDone, getInProgress, visualize } from './services'

interface Data {
  id: number
  type_label: string
  fullname: string
}

const Downloads: MenuProvider = () => {
  const [done, setDone] = useState<Data[]>([])
  const [inProgress, setInProgress] = useState<Data[]>([])

  const { subscribe, unsubscribe } = useWebSocket()

  const parser = (data: unknown[]): Data[] => {
    return data.filter(isObject).map((item: GenericObject) => ({
      id: numberOrDefault(item.id),
      type_label: notEmptyStringOrDefault(item.type_label, '-'),
      fullname: notEmptyStringOrDefault(item.fullname, '-'),
    }))
  }

  const onDone = (data: unknown) => {
    if (!Array.isArray(data)) return

    const newState = parser(data)

    setDone(newState)

    // se ja esta na janela de downloads visualiza todos os itens finalizados
    if (
      window.location.pathname === '/main/downloads/home' &&
      newState.length > 0
    ) {
      visualize(newState.map((e) => e.id))
    }
  }

  const onProgress = (data: unknown) => {
    if (!Array.isArray(data)) return
    const newState = parser(data)
    setInProgress(newState)
  }

  const onLoad = async () => {
    const newDone = parser(await getDone())

    setDone((prev) => {
      if (prev.length > 0) return [...prev]

      return [...newDone]
    })

    const newInProgress = parser(await getInProgress())

    setInProgress((prev) => {
      if (prev.length > 0) return [...prev]

      return [...newInProgress]
    })
  }

  useEffect(() => {
    onLoad()

    subscribe('file_processes.done.$account.$contractor', {
      $people: onDone,
    })

    subscribe('file_processes.in_progress.$account.$contractor', {
      $people: onProgress,
    })

    return () => {
      unsubscribe('file_processes.done.$account.$contractor')
      unsubscribe('file_processes.in_progress.$account.$contractor')
    }
  }, [])

  return {
    loading: inProgress.length > 0,
    bullet: done.length < 10 ? done.length : '9+',
  }
}

export default Downloads
