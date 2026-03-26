import React, { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { Toaster } from 'react-hot-toast'

import GridSelector from '../../../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../../../components/GridSelector/interfaces'
import useContext from '../../../../context'

import { BodyInterface } from './interfaces'
import { getForms } from './services'
import * as S from './styled'

interface ManagerProps {
  checkeds: {
    checkeds: BodyInterface[]
    setCheckeds: React.Dispatch<React.SetStateAction<BodyInterface[]>>
  }
  onAlert: React.Dispatch<React.SetStateAction<boolean>>
}

const Manager = (props: ManagerProps) => {
  const {
    form: { watch },
  } = useContext()

  const {
    checkeds: { checkeds, setCheckeds },
    onAlert,
  } = props

  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [rows, setRows] = useState<Rows<BodyInterface>>([])

  useEffect(() => {
    const forms = watch('forms')
    setCheckeds(forms)
  }, [watch, setCheckeds])

  const loadRows = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getForms(search)
      setRows(
        data.map((data): Rows<BodyInterface>[number] => {
          const row: Rows<BodyInterface>[number] = {
            data,
            content: data.name_str,
          }
          return row
        }),
      )
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [search])

  useEffect(() => {
    loadRows()
  }, [loadRows])

  return (
    <S.Container>
      <S.SubHeader>
        <span>Lista de Formulários</span>
        <SearchFilter setSearch={setSearch} />
      </S.SubHeader>

      <GridSelector
        loading={loading}
        rows={rows}
        checked={[checkeds, setCheckeds]}
        getRowProps={(row, checkeds) => {
          return checkeds.length === 2 &&
            !checkeds.some((checked) => checked.id === row.data.id)
            ? { disabled: true, onClick: () => onAlert(true) }
            : { onClick: () => onAlert(false) }
        }}
        messages={{
          empty: search.length
            ? 'Nenhum formulário encontrado para a busca realizada'
            : 'Nenhum formulário encontrado',
        }}
      />
      <Toaster position='bottom-right' />
    </S.Container>
  )
}

export default Manager
