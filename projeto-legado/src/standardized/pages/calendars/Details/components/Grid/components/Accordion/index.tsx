import { MwInput } from '@mw-kit/mw-ui'

import { generateKey } from '../../../../../../../../utils/Generate'
import { filterObject } from '../../../../../../../utils/formatters'
import { useMainContext, useTabContext } from '../../../../contexts'
import AccordionCard from '../Card'
import CaretContainer from '../CaretContainer'

import * as S from './styles'
import type { AccordionProps } from './types'

const Accordion = (props: AccordionProps) => {
  const {
    data,
    open: [open, setOpen],
  } = props

  const {
    month: [, setMonth],
  } = useMainContext()

  const {
    checked: [checked, setChecked],
  } = useTabContext()

  const divProps = filterObject<AccordionProps, Omit<AccordionProps, 'data'>>(
    props,
    ['data'],
  )

  const checkedIndex = checked.find((e) => e.id === data.id)
  const disabled = !checkedIndex || data.cards.length === 0

  const translateMonthName = (month: string) => {
    const monthIndex = new Date(`${month} 1, 2025`).getMonth()
    const date = new Date(2025, monthIndex, 1)
    const name = new Intl.DateTimeFormat('pt', { month: 'long' }).format(date)

    return name
  }

  return (
    <S.Accordion {...divProps}>
      <div>
        <div>
          <MwInput
            type='checkbox'
            onChange={(e) => {
              const [newChecked, after] = e.target.checked
                ? [[...data.cards], () => setMonth(data.id - 1)]
                : [[], () => {}]

              setChecked((prev) => {
                const index = prev.findIndex((e) => e.id === data.id)
                if (
                  index < 0 ||
                  prev[index].cards.length === newChecked.length
                ) {
                  return prev
                }
                const newState = [...prev]
                newState[index] = { ...newState[index], cards: newChecked }
                return newState
              })
              after()
            }}
            disabled={disabled}
            checked={
              !disabled && checkedIndex.cards.length === data.cards.length
            }
          />
        </div>
        <CaretContainer
          onClick={() => {
            setOpen((prev) => {
              return !prev && data.cards.length > 0
            })
          }}
          open={open}
        >
          {translateMonthName(data.month_name)} ({data.cards_count} Cards |{' '}
          {data.events_count} Eventos)
        </CaretContainer>
      </div>

      <S.CardsContainer>
        {open &&
          data.cards.map((card, index) => {
            return (
              <AccordionCard
                key={generateKey(index)}
                month={data}
                data={card}
              />
            )
          })}
      </S.CardsContainer>
    </S.Accordion>
  )
}

export default Accordion
