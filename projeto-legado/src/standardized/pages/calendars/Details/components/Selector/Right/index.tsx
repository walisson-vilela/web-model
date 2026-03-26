import { useCallback, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import GridSelector from '../../../../../../../components/GridSelector'
import type { Rows } from '../../../../../../../components/GridSelector/interfaces'
import { keys } from '../../../../../../../utils/Formatters'
import { Container } from '../styles'
import type { SelectorComponent } from '../types'

type Data = { id: number }

const Right: SelectorComponent = (props) => {
  const {
    rightLabel,
    search: filter,
    emptyMessage,
    RowComponent,
    selected: [selected, setSelected],
  } = props

  const [rows, setRows] = useState<Rows<Data>>([])
  const [checked, setChecked] = useState<Data[]>([])

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const parsed = selected
        .filter((e) => filter(search, e))
        .map((data) => {
          return {
            data,
            content: <RowComponent data={data} />,
          }
        })

      setRows(parsed)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [selected, search, RowComponent, filter])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        prev[e.id] = { ...e }
        return prev
      }, {} as { [key: Data['id']]: Data })

      for (const e of checked) {
        delete newState[e.id]
      }

      return keys(newState).map((k) => newState[k]) as typeof prev
    })

    setChecked([])
  }

  return (
    <Container>
      <div>
        <b>{rightLabel}</b>
      </div>

      <div>
        <GridSelector
          rows={rows}
          checked={[checked, setChecked]}
          loading={loading}
          messages={{
            empty: search.length
              ? `${emptyMessage} para a busca realizada`
              : emptyMessage,
          }}
          toolbar={{
            checkAll: true,
            search: {
              submitted: [search, setSearch],
            },
          }}
          scrollHeight='198px'
        />
      </div>

      <div>
        <div />

        <MwButton
          type='button'
          onClick={onSubmit}
          content='Remover'
          color='red'
          disabled={checked.length === 0}
        />
      </div>
    </Container>
  )
}

export default Right
