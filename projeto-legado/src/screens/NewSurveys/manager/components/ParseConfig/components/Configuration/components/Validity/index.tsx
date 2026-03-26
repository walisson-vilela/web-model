import React, { useEffect, useRef, useState } from 'react'

import moment from 'moment'
import { useFormContext } from 'react-hook-form'
import { Dropdown, Popup } from 'semantic-ui-react'

import { DropdownHook } from '../../../../../../../../../components'
import { useOnClickOutside } from '../../../../../../../../../utils/hooks'

import * as S from './style'

interface DateIntervalProps {
  inicial: string
  final: string
}
interface ValidityComponentProps {
  value: string
  setDateInterval: React.Dispatch<React.SetStateAction<DateIntervalProps>>
  dateInterval: DateIntervalProps
}

const ValidityComponent = ({
  value,
  dateInterval,
  setDateInterval,
}: ValidityComponentProps) => {
  const { control } = useFormContext()
  const firstRender = useRef(true)
  const [selectOption, setSelectOption] = useState('')
  const [text, setText] = useState(value ? value : 'Selecione')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openSelect, setOpenSelect] = useState(false)
  const selectRef = useOnClickOutside(() => setOpenSelect(false))
  const calendarRef = useOnClickOutside(() => {
    setOpenCalendar(false)
    setOpenSelect(false)
  })

  const actualDate = moment().toISOString()

  const options = [
    {
      key: '7d',
      value: '7d',
      text: (
        <S.Option
          onClick={() => {
            setSelectOption('7d')
            setOpenSelect(false)
          }}
        >
          <Dropdown.Item>7 Dias</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: '15',
      value: '15',
      text: (
        <S.Option
          onClick={() => {
            setSelectOption('15')
            setOpenSelect(false)
          }}
        >
          <Dropdown.Item>15 Dias</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: '30',
      value: '30',
      text: (
        <S.Option
          onClick={() => {
            setSelectOption('30')
            setOpenSelect(false)
          }}
        >
          <Dropdown.Item>30 Dias</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'em',
      value: 'em',
      text: (
        <S.Option
          onClick={() => {
            setSelectOption('em')
            setOpenSelect(false)
          }}
        >
          <Dropdown.Item>Este Mês</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'fi',
      value: 'fi',
      text: (
        <S.Option
          onClick={() => {
            setSelectOption('fi')
            setOpenSelect(false)
          }}
        >
          <Dropdown.Item>Fim Indeterminado</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'rc',
      value: 'rc',
      text: (
        <Popup
          pinned
          position='right center'
          offset={[-20, 0]}
          trigger={
            <S.Option
              onClick={() => {
                setSelectOption('rc')
                setOpenCalendar(true)
                setText('Selecione o intervalo')
                selectRef.current = null
              }}
            >
              <span>Range customizando</span>
            </S.Option>
          }
          content={
            <S.CalendarContainer ref={calendarRef}>
              <S.CalendarComponent
                type='interval'
                min={moment().toDate()}
                open
                onSubmit={{
                  onClick: ([inicialData, finalData]) => {
                    setDateInterval({
                      inicial: moment(inicialData).toISOString(),
                      final: moment(finalData).toISOString(),
                    })
                    setOpenCalendar(false)
                    setOpenSelect(false)
                  },
                }}
              />
            </S.CalendarContainer>
          }
          open={openCalendar}
        />
      ),
    },
  ]

  const textResult = () => {
    if (selectOption === '7d') {
      setDateInterval(() => ({
        inicial: actualDate,
        final: moment().add(7, 'days').toISOString(),
      }))
    } else if (selectOption === '15')
      setDateInterval(() => ({
        inicial: actualDate,
        final: moment().add(15, 'days').toISOString(),
      }))
    else if (selectOption === '30')
      setDateInterval(() => ({
        inicial: actualDate,
        final: moment().add(30, 'days').toISOString(),
      }))
    else if (selectOption === 'em')
      setDateInterval(() => ({
        inicial: actualDate,
        final: moment().endOf('month').toISOString(),
      }))
    else if (selectOption === 'fi')
      setDateInterval(() => ({
        inicial: actualDate,
        final: null,
      }))
  }

  useEffect(() => {
    textResult()
  }, [selectOption])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      const finalDate =
        selectOption === 'fi' || dateInterval.final === null
          ? 'indeterminado'
          : moment(dateInterval.final).format('DD/MM/YYYY')
      setText(
        moment(dateInterval.inicial).format('DD/MM/YYYY') + ' - ' + finalDate,
      )
    }
  }, [dateInterval.final])

  return (
    <S.Container>
      <S.Select ref={selectRef}>
        <DropdownHook
          name={'validity'}
          selection
          controlHook={control}
          options={options}
          text={text}
          value={text}
          placeholder='Selecione'
          open={openSelect || openCalendar}
          onClick={() => setOpenSelect((prev) => !prev)}
        />
      </S.Select>
    </S.Container>
  )
}

export default ValidityComponent
