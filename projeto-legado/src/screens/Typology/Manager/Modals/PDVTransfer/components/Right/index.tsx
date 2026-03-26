import { useCallback, useEffect, useState } from 'react'

import {
  Rows,
  TUseContent,
} from '../../../../../../../components/GridSelector/interfaces'
import useContext from '../../context'
import { Typology } from '../../interfaces'

import { getTypologies } from './service'
import * as S from './styled'

const useRight: TUseContent<Typology> = () => {
  const {
    right: [checked, setChecked],
    typology,
  } = useContext()

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Rows<Typology>>([])

  const onLoadRows = useCallback(async () => {
    setLoading(true)
    try {
      const typologies = await getTypologies(search, typology.id)

      setRows(
        typologies.map((data): Rows<Typology>[number] => {
          const row: Rows<Typology>[number] = {
            data,
            content: <S.RowContent>{data.name}</S.RowContent>,
          }
          return row
        }),
      )
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search, typology.id])

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return {
    title: 'Transferir PDVs selecionado para:',
    gridSelector: {
      rows,
      type: 'radio',
      checked: [checked, setChecked],
      loading,
      messages: {
        empty: search.length
          ? 'Nenhum Tipologia encontrado na busca realizada'
          : 'Nenhuma Tipologia encontrada',
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
