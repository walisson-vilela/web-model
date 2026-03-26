import React, { useEffect, useRef, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { BsSliders } from 'react-icons/bs'
import { Dropdown, Popup } from 'semantic-ui-react'

import { DropdownHook } from '../../../../../../../../../components'
import { useOnClickOutside } from '../../../../../../../../../utils/hooks'

import PopupContent from './components'
import * as S from './styled'

interface FrequencyProps {
  type: string
  ValidityOptions: any[]
  setValidityOptions: React.Dispatch<React.SetStateAction<any[]>>
}

const CalendarComponent = ({
  type,
  setValidityOptions,
  ValidityOptions,
}: FrequencyProps) => {
  const firstRender = useRef(true)
  const { control, getValues } = useFormContext()
  const [selectOption, setSelectOption] = useState({
    key: type ? type : '',
    title: '',
  })
  const [openPopup, setOpenPopup] = useState(false)
  const popupRef = useOnClickOutside(() => setOpenPopup(false))

  const selectOptions = [
    {
      key: 'uv',
      value: 'U',
      text: (
        <S.Option
          onClick={() => setSelectOption({ key: 'U', title: 'Uma vez' })}
        >
          <Dropdown.Item>Uma vez</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'di',
      value: 'D',
      text: (
        <S.Option
          onClick={() => setSelectOption({ key: 'D', title: 'Diário' })}
        >
          <Dropdown.Item>Diario</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'se',
      value: 'S',
      text: (
        <S.Option
          onClick={() => setSelectOption({ key: 'S', title: 'Semanal' })}
        >
          <Dropdown.Item>Semanal</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'qu',
      value: 'Q',
      text: (
        <S.Option
          onClick={() => setSelectOption({ key: 'Q', title: 'Quinzenal' })}
        >
          <Dropdown.Item>Quinzenal</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 'me',
      value: 'M',
      text: (
        <S.Option
          onClick={() => setSelectOption({ key: 'M', title: 'Mensal' })}
        >
          <Dropdown.Item>Mensal</Dropdown.Item>
        </S.Option>
      ),
    },
    {
      key: 're',
      value: 'R',
      text: (
        <S.Option
          onClick={() => setSelectOption({ key: 'R', title: 'Repetição' })}
        >
          <Dropdown.Item>Repetição</Dropdown.Item>
        </S.Option>
      ),
    },
  ]

  const openPopupFunction = () => {
    const key = getValues('frequency')
    return key === 'S' || key === 'Q' || key === 'R'
      ? setOpenPopup(true)
      : setOpenPopup(false)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      openPopupFunction()
      setValidityOptions([])
    }
  }, [selectOption])

  const validity =
    getValues('frequency') === '' ||
    getValues('frequency') === 'U' ||
    getValues('frequency') === 'M' ||
    getValues('frequency') === 'D'

  return (
    <S.Container>
      <S.Select>
        <DropdownHook
          name={'frequency'}
          selection
          controlHook={control}
          placeholder={'Selecione'}
          options={selectOptions}
          text={selectOption.title}
        />
      </S.Select>
      <Popup
        content={
          <div ref={popupRef}>
            <PopupContent
              selectOption={getValues('frequency')}
              setOpenPopup={setOpenPopup}
              setValidityOptions={setValidityOptions}
              validityOptions={ValidityOptions}
            />
          </div>
        }
        on='click'
        pinned
        position='right center'
        offset={[0, 12]}
        trigger={
          <S.Icon
            onClick={() => {
              setOpenPopup(true)
            }}
          >
            <BsSliders />
          </S.Icon>
        }
        open={openPopup}
        disabled={validity}
      />
    </S.Container>
  )
}

export default CalendarComponent
