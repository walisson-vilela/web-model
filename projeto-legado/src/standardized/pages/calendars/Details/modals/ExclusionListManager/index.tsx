import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import type { GenericObject } from '@mw-kit/mw-ui/types'
import { cloneDeep } from 'lodash'
import { toast } from 'react-hot-toast'

import Modal, { type ModalState } from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { generateKey } from '../../../../../../utils/Generate'
import { useMainContext, useTabContext } from '../../contexts'
import { getCard } from '../Form/services'
import type { Events } from '../Form/types'
import type { CardModal } from '../types'

import ExclusionListManagerBody from './components/Body'
import { ErrorModal } from './components/ErrorModal'
import { ExclusionManagerContext } from './context'
import { saveCard } from './services'

const ExclusionListManager: CardModal = (props) => {
  const { card, close } = props
  const { reload } = useTabContext()
  const {
    tab: [tab],
  } = useMainContext()

  const [modal, setModal] = useState<ModalState | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [active, setActive] = useState<number>(0)
  const [eventsList, setEventList] = useState<Events[]>([])
  const [originals, setOriginals] = useState<Events[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const selected = eventsList[selectedIndex] || null
  const setSelected: React.Dispatch<React.SetStateAction<Events>> = useCallback(
    (newState) => {
      setEventList((prev) => {
        if (!prev[selectedIndex]) return prev
        const n =
          typeof newState === 'function'
            ? newState(prev[selectedIndex])
            : newState
        if (n === prev[selectedIndex]) return prev

        const newList = [...prev]
        newList[selectedIndex] = n
        return newList
      })
    },
    [selectedIndex],
  )

  const original = originals[selectedIndex] || null

  const handleErrors = (e: GenericObject) => {
    const errorData = e.response.data

    toast(<ToasterContent color='error' />, ErrorStyle)

    switch (errorData.code) {
      case 404:
        setModal({
          size: 'tiny',
          title: 'Notificação',
          titleColor: 'white',
          content: 'Registro não encontrado.',
          actions: [
            <MwButton
              key={generateKey()}
              content='Ok'
              color='red'
              onClick={() => {
                setModal(null)
                close()
              }}
            />,
          ],
        })
        break
      case 422:
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        loadData()
        break
    }
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    if (!card.id) return
    try {
      const response = (await getCard(card.id, 'out', tab)) as Events[]
      setEventList(response)
      setOriginals(cloneDeep(response))
      setSelectedIndex(0)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }, [tab, card.id])

  const saveEvent = async () => {
    if (!selected) return
    if (eventsList.length === 0) return

    setLoading(true)
    try {
      await saveCard(card.id, eventsList)
      close()
      reload()
    } catch (e) {
      handleErrors(e as GenericObject)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  const dirty = eventsList.some((x, i) => {
    const y = originals[i]
    if (!y || x.id !== y.id) return true

    if (x.users.length !== y.users.length) return true
    if (x.users.some((u1) => !y.users.some((u2) => u1.id === u2.id))) {
      return true
    }

    if (x.teams.length !== y.teams.length) return true
    if (x.teams.some((t1) => !y.teams.some((t2) => t1.id === t2.id))) {
      return true
    }

    return false
  })

  return (
    <ExclusionManagerContext.Provider
      value={{
        card,
        loading: [loading, setLoading],
        getData: loadData,
        search: [search, setSearch],
        eventsList: [eventsList, setEventList],
        selected: [selected, setSelected],
        selectedIndex: [selectedIndex, setSelectedIndex],
        active: [active, setActive],
        originals: [originals, setOriginals],
        original,
      }}
    >
      <ErrorModal modal={modal} />

      <Modal
        modal={{
          titleColor: 'blue',
          title: 'Lista de Exclusão',
          buttonType: 'MwButton',

          modalStyles: {
            width: '1095px',
          },
          contentStyles: { justifyContent: 'normal', paddingBottom: '0' },

          content: <ExclusionListManagerBody />,

          actions: [
            {
              appearance: 'borderless',
              children: 'Cancelar',
              onClick: close,
            },
            {
              children: 'Salvar',
              onClick: saveEvent,
              disabled: !dirty || loading,
            },
          ],
        }}
      />
    </ExclusionManagerContext.Provider>
  )
}

export default ExclusionListManager
