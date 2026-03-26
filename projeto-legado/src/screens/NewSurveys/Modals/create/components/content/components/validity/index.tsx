import { useEffect, useRef, useState } from 'react'

import moment from 'moment'
import { useFormContext } from 'react-hook-form'
import { Dropdown, Popup } from 'semantic-ui-react'

import { DropdownHook } from '../../../../../../../../components'
import { useOnClickOutside } from '../../../../../../../../utils/hooks'

import * as S from './style'

export const ValiditySelect = () => {
  const { control, watch, setValue } = useFormContext()
  const firstRender = useRef(true)
  const [selectOption, setSelectOption] = useState('')
  const [text, setText] = useState('Selecione')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openSelectDate, setOpenSelectDate] = useState(false)
  const [openSelect, setOpenSelect] = useState(false)
  const selectRef = useOnClickOutside(() => setOpenSelect(false))
  const calendarRef = useOnClickOutside(() => {
    setOpenCalendar(false)
    setOpenSelectDate(false)
    setOpenSelect(false)
    setSelectOption('')
  })
  const selectDateRef = useOnClickOutside(() => {
    setOpenCalendar(false)
    setOpenSelectDate(false)
    setOpenSelect(false)
    setSelectOption('')
  })

  const dateInterval = {
    inicial: watch('validityStart'),
    final: watch('validityEnd'),
  }

  const options = [
    {
      key: '7d',
      value: '7d',
      text: (
        <S.Option
          onClick={() => {
            setSelectOption('7d')
            setOpenSelect(false)
            setOpenCalendar(false)
            setOpenSelectDate(false)
            setValue('validityStart', moment())
            setValue('validityEnd', moment().add(6, 'days'))
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
            setOpenCalendar(false)
            setOpenSelectDate(false)
            setValue('validityStart', moment())
            setValue('validityEnd', moment().add(14, 'days'))
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
            setOpenCalendar(false)
            setOpenSelectDate(false)
            setValue('validityStart', moment())
            setValue('validityEnd', moment().add(29, 'days'))
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
            setOpenCalendar(false)
            setOpenSelectDate(false)
            setValue('validityStart', moment())
            setValue('validityEnd', moment().endOf('month'))
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
        <Popup
          pinned
          position='left center'
          offset={[-185, 0]}
          trigger={
            <S.Option
              onClick={() => {
                setSelectOption('fi')
                setOpenSelectDate(true)
                setOpenCalendar(false)
                setValue('validityStart', null)
                setValue('validityEnd', null)
                setText('Selecione')
                selectRef.current = null
              }}
            >
              <Dropdown.Item>Fim Indeterminado</Dropdown.Item>
            </S.Option>
          }
          content={
            <S.SelectDate ref={selectDateRef}>
              <span>Deseja alterar a data de início?</span>
              <S.CalendarComponent
                type='single'
                open
                min={moment().startOf('D').toDate()}
                onSubmit={{
                  onClick: (inicialData) => {
                    setValue('validityStart', inicialData, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                    setValue('validityEnd', 'indeterminado', {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                    setOpenSelectDate(false)
                    setOpenCalendar(false)
                    setOpenSelect(false)
                  },
                }}
              />
            </S.SelectDate>
          }
          open={openSelectDate}
        />
      ),
    },
    {
      key: 'rc',
      value: 'rc',
      text: (
        <Popup
          pinned
          position='left center'
          offset={[-220, 0]}
          trigger={
            <S.Option
              onClick={() => {
                setSelectOption('rc')
                setOpenCalendar(true)
                setOpenSelectDate(false)
                setValue('validityStart', null)
                setValue('validityEnd', null)
                setText('Selecione')
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
                open
                min={moment().startOf('D').toDate()}
                onSubmit={{
                  onClick: ([inicialData, finalData]) => {
                    setValue('validityStart', inicialData, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                    setValue('validityEnd', finalData, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                    setOpenCalendar(false)
                    setOpenSelectDate(false)
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      if (
        dateInterval.inicial !== null &&
        dateInterval.final !== null &&
        dateInterval.final !== 'indeterminado'
      ) {
        setText(
          moment(dateInterval.inicial).format('DD/MM/YYYY') +
            ' - ' +
            moment(dateInterval.final).format('DD/MM/YYYY'),
        )
      } else if (
        dateInterval.inicial !== null &&
        (dateInterval.final === 'indeterminado' || dateInterval.final === null)
      ) {
        setText(
          moment(dateInterval.inicial).format('DD/MM/YYYY') +
            ' - ' +
            'indeterminado',
        )
      } else if (dateInterval.inicial === null && dateInterval.final === null) {
        setText(null)
      }
    }
  }, [watch('validityStart'), watch('validityEnd')])

  return (
    <S.Container>
      <S.Select ref={selectRef} isDisabled={!watch('pilar')}>
        <label>Vigência *</label>
        <DropdownHook
          name={'validity'}
          selection
          controlhook={control}
          disabled={!watch('pilar')}
          options={options}
          text={text || 'Selecione'}
          value={text || 'Selecione'}
          placeholder='Selecione'
          open={openSelect || openCalendar}
          onClick={() => setOpenSelect((prev) => !prev)}
        />
      </S.Select>
    </S.Container>
  )
}
