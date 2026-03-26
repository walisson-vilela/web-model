import { useState } from 'react'

import { MwEllipsisContainer, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'

import { GenericMenu } from '../../../../../../../components/global/GenericMenu'
import { filterObject } from '../../../../../../../utils/formatters'
import { useMainContext, useTabContext } from '../../../../contexts'
import { checkEventTime, formatInterval } from '../../../../functions'
import useGridContext from '../../context'

import { DateField } from './components/DateField'
import { DateUl } from './components/DateField/styles'
import { InpactedUsersPopup } from './components/InpactedUsersPopup'
import { StatusField } from './components/StatusField'
import * as S from './styles'
import type { CardProps } from './types'

const AccordionCard = (props: CardProps) => {
  const { data, month } = props

  const {
    month: [, setMonth],
  } = useMainContext()

  const {
    checked: [checked, setChecked],
  } = useTabContext()

  const { getCardMenu } = useGridContext()
  const menu = getCardMenu(data)

  const [showChildData, setShowChildData] = useState(false)

  const checkedIndex = checked.find((e) => e.id === month.id)
  const disabled = !checkedIndex
  const isFuture = new Date(data.ends_at).getTime() > new Date().getTime()

  const divProps = filterObject<CardProps, Omit<CardProps, 'data'>>(props, [
    'data',
  ])

  const formatCount = (count: number) => {
    return count > 0 ? count.toString().padStart(2, '0') : count.toString()
  }

  const status = (() => {
    const now = moment()
    if (now.isAfter(data.ends_at)) {
      return true
    }

    if (now.isAfter(data.starts_at)) {
      return true
    }

    if (now.subtract(1, 'hours').isAfter(data.starts_at)) {
      return true
    }

    return false
  })()

  return (
    <S.Card
      {...divProps}
      $disabled={false}
      $bgColor={status ? 'iceWhite' : 'white'}
      $past={!isFuture}
    >
      <StatusField data={data} />

      <div>
        <div>
          <MwInput
            type='checkbox'
            onChange={(e) => {
              setChecked((prev) => {
                const index = prev.findIndex((e) => e.id === month.id)
                if (index < 0) {
                  return prev
                }

                const newChecked = [...prev]
                newChecked[index] = {
                  ...newChecked[index],
                  cards: [
                    ...newChecked[index].cards.filter((e) => e.id !== data.id),
                    ...(e.target.checked ? [{ ...data }] : []),
                  ],
                }

                return prev[index].cards.length ===
                  newChecked[index].cards.length
                  ? prev
                  : newChecked
              })

              setMonth((prev) => (e.target.checked ? month.id - 1 : prev))
            }}
            disabled={disabled}
            checked={
              !disabled && checkedIndex.cards.some((e) => e.id === data.id)
            }
          />
        </div>

        <div>
          <div>
            <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
          </div>

          <div>
            <span>
              Qtd. de Eventos: {formatCount(1 + data.children.length || 0)}
            </span>
            <span> | </span>
            <InpactedUsersPopup
              subordinateCount={formatCount(data.subordinate_count || 0)}
              userCount={formatCount(data.user_count || 0)}
              data={data}
            />
          </div>

          <div>
            <span>Criado por:</span>
            <MwEllipsisContainer>
              {data.creator.name || '-'}
            </MwEllipsisContainer>
          </div>

          <DateField
            data={data}
            showChildData={[showChildData, setShowChildData]}
          />
        </div>

        {menu.options.length > 0 && (
          <div>
            <GenericMenu
              axis='x'
              center={{ x: 0, y: 75 }}
              containerSpacing='s1'
              transition={{ properties: { 'max-height': {} } }}
              {...menu}
            />
          </div>
        )}
      </div>

      <div>
        <div style={{ width: 17 }} />

        {showChildData && (
          <DateUl>
            {data.children.map((child) => {
              return (
                <li key={child.id} data-event={checkEventTime(child.starts_at)}>
                  {formatInterval(
                    child.starts_at.toString(),
                    child.ends_at.toString(),
                  )}
                  {checkEventTime(child.starts_at) === -1 ? '- Concluído' : ''}
                </li>
              )
            })}
          </DateUl>
        )}
      </div>
    </S.Card>
  )
}

export default AccordionCard
