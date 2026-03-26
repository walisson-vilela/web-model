import { useCallback, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import type { AppliedFilter } from '@mw-kit/mw-ui/types'

import GridSelector from '../../../../../../../../../components/GridSelector'
import type { Rows } from '../../../../../../../../../components/GridSelector/interfaces'
import { isKeyOf } from '../../../../../../../../../utils/Validators'
import { formatInterval } from '../../../../../functions'
import useFormContext from '../../../context'
import { getPermission, isAllDay } from '../functions'
import type { FilterValues, Row } from '../types'

import { RowAfter, RowLabel } from './components/Row'
import { CopyEvents } from './components/popups'
import filters from './filters'
import { SelectorContainer } from './styles'

const Right = () => {
  const { useField } = useFormContext()

  const [events, setEvents] = useField('events')

  const [rows, setRows] = useState<Rows<Row>>([])
  const [checked, setChecked] = useState<Row[]>([])
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  useEffect(() => {
    const rows = events.reduce<Rows<Row>>((events, event, id) => {
      const label = formatInterval(event.start, event.end)

      const permission = getPermission(event)

      const filterValues: FilterValues = {
        permission: permission,
        entire_day: !isAllDay(event) ? 0 : 1,
      }

      if (
        appliedFilters.some(
          (f) =>
            isKeyOf(filterValues, f.name) && filterValues[f.name] !== f.value,
        )
      ) {
        return events
      }

      const parsed: Rows<Row>[number] = {
        data: { event, ...filterValues, id, label },
        content: RowLabel,
        after: RowAfter,
      }

      events.push(parsed)
      return events
    }, [])
    setRows(rows)
  }, [events, appliedFilters])

  const onRemove = useCallback(() => {
    if (checked.length < 1) return

    setEvents((prev) => {
      const newe = prev.filter((e, id) => {
        return !checked.some((e) => e.id === id)
      })
      return newe.length !== prev.length ? newe : prev
    })

    setChecked([])
  }, [checked, setEvents])

  return (
    <div>
      <div>
        <div>Lista de Períodos e Datas</div>
        <CopyEvents />
      </div>

      <SelectorContainer>
        <GridSelector
          toolbar={{
            checkAll: true,
            appliedFilters: {
              appliedFilters: [appliedFilters, setAppliedFilters],
            },
            filters: {
              items: filters,
              setAppliedFilters,
            },
          }}
          checked={[checked, setChecked]}
          rows={rows}
          messages={{
            empty: 'Ainda não há nenhuma data definida',
          }}
        />
      </SelectorContainer>

      <div>
        <MwButton
          type='button'
          color='warningRed'
          {...(checked.length < 1
            ? { disabled: true }
            : {
                onClick: onRemove,
              })}
        >
          Remover/Interromper
        </MwButton>
      </div>
    </div>
  )
}

export default Right
