import { useCallback, useState } from 'react'

import { SortState } from '@mw-kit/mw-manager'
import { MwButton, MwTabs } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { tabsFormatterValue } from '../functions'

import tabs from './tabs'
import { ParticularitiesProps } from './types'

type TabState<T> = [T, T]

const useTabState = <T,>(
  state: [TabState<T>, React.Dispatch<React.SetStateAction<TabState<T>>>],
  index: number,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [_state, _setState] = state

  const setState: React.Dispatch<React.SetStateAction<T>> = (value) => {
    _setState((prev) => {
      const newv =
        typeof value === 'function'
          ? (value as (prevState: T) => T)(prev[index])
          : value
      if (newv === prev[index]) return prev
      const newstates: TabState<T> = [...prev]
      newstates[index] = newv
      return newstates
    })
  }

  return [_state[index], setState]
}

const Particularities = ({ close, data }: ParticularitiesProps) => {
  // estado controlador do valor do input de pesquisa
  const searchTabs = useState<TabState<string>>(['', ''])
  // estado controlador da ordenação
  const sortTabs = useState<TabState<SortState | null>>([null, null])
  // estado controlador do loading
  const loadingTabs = useState<TabState<boolean>>([true, true])
  // estado que salva o total de registros da api
  const totalRegistriesTabs = useState<TabState<number>>([
    data.segment_count,
    data.flag_count,
  ])
  const [tab, setTab] = useState<number>(0)

  const [search, setSearch] = useTabState(searchTabs, tab)
  const [sort, setSort] = useTabState(sortTabs, tab)
  const [loading, setLoading] = useTabState(loadingTabs, tab)
  const [totalRegistries, setTotalRegistries] = useTabState(
    totalRegistriesTabs,
    tab,
  )

  const Component = tabs[tab]

  const onClickExtractData = useCallback(async () => {
    setLoading(true)

    try {
      await Component.extractor(data.id, search, sort)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, search, sort, Component])

  return (
    <Modal.Modal open style={{ width: 1095, maxWidth: '90vw' }}>
      <Modal.Header color='blue'>Particularidades</Modal.Header>

      <Modal.Body
        $paddingBottom='0'
        $paddingLeft='s3'
        $paddingTop='s3'
        $paddingRight='s3'
      >
        <Modal.Toolbar
          search={{
            submitted: [search, setSearch],
          }}
          dropdown={{
            loading,
            items: [
              {
                content: 'Extrair dados',
                onClick: onClickExtractData,
                rules: [],
              },
            ],
          }}
        >
          Área: <b>{data.name || '-'}</b> - País:{' '}
          <b>{data.country_name || '-'}</b>
        </Modal.Toolbar>

        <MwTabs
          active={[tab, setTab]}
          options={[
            tabs.map((Component, index) => ({
              label: `${Component.label} (${tabsFormatterValue(
                totalRegistriesTabs[0][index],
              )})`,
              data: {},
            })),
            () => {},
          ]}
          alwaysOpen
        />

        <Modal.Toolbar.ManagerContainer>
          <Component
            search={[search, setSearch]}
            sort={[sort, setSort]}
            loading={[loading, setLoading]}
            totalRegistries={[totalRegistries, setTotalRegistries]}
            data={data}
          />
        </Modal.Toolbar.ManagerContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton type='button' color='blue' children='OK' onClick={close} />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default Particularities
