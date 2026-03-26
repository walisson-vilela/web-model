import { MwButton, MwCalendar } from '@mw-kit/mw-ui'
import moment, { Moment as MomentProps } from 'moment'
import toast from 'react-hot-toast'
import { Dropdown, Menu } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import {
  getStartAndEndDayOfMonth,
  getStartAndEndDayOfWeek,
} from '../../../../../../utils/DateTime'
import { useOnClickOutside } from '../../../../../../utils/hooks'
import useAFDContext from '../../../../provider'
import { createFileProccess } from '../../services'
import * as MS from '../../styles'

import * as S from './styles'

const Process = () => {
  const {
    openedMenusState: {
      dropdownOpened,
      setDropdownOpened,
      rangeOpened,
      setRangeOpened,
    },
    rangeState: { range, setRange, processing, setProcessing, setDirtyRange },
    tempRangeState: { tempRange, setTempRange },
  } = useAFDContext()

  const dropdownRef = useOnClickOutside(() => setDropdownOpened(false))

  const getDatePlaceholder = (): string => {
    if (typeof range !== 'string') {
      const startDate: MomentProps = moment(range[0].startDate)
      const endDate: MomentProps = moment(range[0].endDate)

      return `${startDate.format('DD/MM/YY')} - ${endDate.format('DD/MM/YY')}`
    } else {
      if (range === 'current_day') return 'Hoje'
      else if (range === 'current_week') return 'Semana (Atual)'
      else return 'Mês (Atual)'
    }
  }

  const processRange = async () => {
    setProcessing(true)

    try {
      await createFileProccess(range)

      toast(<ToasterContent color='normal' />, SuccessStyle)

      setDirtyRange(false)

      setRange('current_day')
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      <MS.Title>Processar</MS.Title>

      <S.Row>
        <S.Popup
          wide
          open={rangeOpened}
          on='click'
          onClose={() => setRangeOpened(false)}
          position='left center'
          offset={[180, 0]}
          content={
            <div>
              <MwCalendar
                open
                type='interval'
                max={moment().toDate()}
                onSubmit={{
                  onClick: ([start, end]) => {
                    setRange([
                      {
                        startDate: start,
                        endDate: end,
                        key: 'selection',
                      },
                    ])

                    setDirtyRange(true)
                    setRangeOpened(false)

                    setTempRange([
                      {
                        startDate: start,
                        endDate: end,
                        key: 'selection',
                      },
                    ])
                  },
                }}
              />
            </div>
          }
          trigger={
            <label>
              <span>Período</span>

              <S.DropdownButton
                onClick={() => setDropdownOpened((prev) => !prev)}
              >
                <span>{getDatePlaceholder()}</span>

                <img src={`/assets/icons/icon_calendar.svg`} alt='calendar' />
              </S.DropdownButton>
            </label>
          }
        />

        <S.DropdownMenu active={dropdownOpened} ref={dropdownRef}>
          <Menu vertical>
            <S.DropdownItem
              onClick={() => {
                setRange('current_day')

                setDirtyRange(true)
                setDropdownOpened(false)
              }}
            >
              Hoje
            </S.DropdownItem>

            <S.DropdownItem
              onClick={() => {
                const [first, last] = getStartAndEndDayOfWeek()

                setRange('current_week')

                setDirtyRange(true)
                setDropdownOpened(false)
              }}
            >
              Semana (Atual)
            </S.DropdownItem>

            <S.DropdownItem
              onClick={() => {
                const [first, last] = getStartAndEndDayOfMonth()

                setRange('current_month')

                setDirtyRange(true)
                setDropdownOpened(false)
              }}
            >
              Mês (Atual)
            </S.DropdownItem>

            <Dropdown
              text='Personalizado'
              className='link item'
              onClick={() => {
                setRangeOpened(true)
              }}
            />
          </Menu>
        </S.DropdownMenu>
        <div>
          <MwButton
            type='button'
            appearance='solid'
            content='Processar'
            onClick={processRange}
            disabled={processing}
            loading={processing}
            size='small'
          />
        </div>
      </S.Row>
    </div>
  )
}

export default Process
