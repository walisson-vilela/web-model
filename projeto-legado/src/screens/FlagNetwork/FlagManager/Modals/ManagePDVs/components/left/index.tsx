import { useCallback, useContext, useEffect, useState } from 'react'

import { AppliedFilter } from '@mw-kit/mw-ui/types'

import {
  Rows,
  TUseContentSelected,
} from '../../../../../../../components/GridSelector/interfaces'
import Context from '../../context'
import { StoreProps } from '../interface'

import Row from './components/Row'
import filters from './filters'
import { getStores } from './service'

const useLeft: TUseContentSelected<StoreProps> = ({
  selected: [selected, setSelected],
}) => {
  const [rows, setRows] = useState<Rows<StoreProps>>([])
  const [checked, setChecked] = useState<StoreProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const {
    loading: [loadingContext],
  } = useContext(Context)

  const loadData = useCallback(async () => {
    if (loadingContext) return
    setLoading(true)
    try {
      const response = await getStores(search, appliedFilters)
      setRows(
        response.map((data): Rows<StoreProps>[number] => {
          const checked = selected.some((value) => value.id === data.id)

          const row: Rows<StoreProps>[number] = {
            data,
            content: Row,
            checked,
            disabled:
              checked || data.stores_contractor.market_flag !== undefined,
            popup:
              data.stores_contractor.market_flag !== undefined
                ? {
                    inverted: true,
                    on: 'click',
                    style: { width: 288, maxWidth: 288 },
                    position: 'right center',
                    className: 'popup-field',
                    offset: [0, -50],
                    content: (
                      <span>
                        O PDV já esta associado a{' '}
                        <b>
                          Bandeira {data.stores_contractor.market_flag.name}
                        </b>
                        , logo não pode ser selecionado.
                      </span>
                    ),
                  }
                : undefined,
          }
          return row
        }),
      )

      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }, [appliedFilters, search, selected, loadingContext])

  useEffect(() => {
    loadData()
  }, [loadData])

  const Submit = () => {
    setSelected((prev) => {
      const newState = [...prev, ...checked].reduce((prev, e) => {
        return { ...prev, [e.id]: e }
      }, {} as { [key: StoreProps['id']]: StoreProps })

      const data = Object.values(newState)

      return data
    })
    setChecked([])
  }

  return {
    title: <b>Relação de PDVs</b>,
    gridSelector: {
      type: 'checkbox',
      rows,
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum PDV encontrado para a busca realizada'
          : 'Nenhum PDV encontrado',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
          collapse: true,
        },
        filters: { ...filters, setAppliedFilters },
        appliedFilters: { appliedFilters: [appliedFilters, setAppliedFilters] },
      },
    },
    button: {
      type: 'button',
      onClick: Submit,
      content: 'Adicionar',
      disabled: checked.length === 0,
      size: 'small',
    },
  }
}

export default useLeft
