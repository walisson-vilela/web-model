import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { Region } from '../../interfaces'

import { getRegions } from './service'

const useRight: TUseContent<Region> = () => {
  const {
    right: [checked, setChecked],
    data,
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Region>>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const regions = await getRegions(search, data.id, data.hierarchy_id)
      const rows = regions.map((data): Rows<Region>[number] => {
        const row: Rows<Region>[number] = {
          data,
          content: data.name,
        }

        return row
      })

      setRows(rows)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, data.id])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: 'Transferir Usuários selecionado para:',
    gridSelector: {
      rows,
      type: 'radio',
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhuma Área encontrada na busca realizada'
          : 'Nenhuma Área encontrada',
      },
      toolbar: {
        checkAll: true,
        search: {
          submitted: [search, setSearch],
        },
      },
    },
  }
}

export default useRight
