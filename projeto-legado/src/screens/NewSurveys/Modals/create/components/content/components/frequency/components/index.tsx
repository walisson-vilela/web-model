import React, { useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { Button, Checkbox } from 'semantic-ui-react'

import * as S from './styled'

interface popupProps {
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupContent = ({ setOpenPopup }: popupProps) => {
  const { getValues, setValue } = useFormContext()
  const selectOption = getValues('frequency')
  const [checkdItens, setcheckdItens] = useState(getValues('frequencyDays'))

  const items = {
    semanal: [
      {
        key: 1,
        value: 'D',
      },
      {
        key: 2,
        value: 'S',
      },
      {
        key: 3,
        value: 'T',
      },
      {
        key: 4,
        value: 'Q',
      },
      {
        key: 5,
        value: 'Q',
      },
      {
        key: 6,
        value: 'S',
      },
      {
        key: 7,
        value: 'S',
      },
    ],
    quinzenal: [
      {
        key: 1,
        value: '1ª Quinzena',
      },
      {
        key: 2,
        value: '2ª Quinzena',
      },
    ],
  }

  const getCheckedClick = (value) => {
    const storageCheckedItens = Array.from(checkdItens)
    const hasItem = storageCheckedItens.includes(value)
    if (hasItem) {
      setcheckdItens(storageCheckedItens.filter((item) => item != value))
    } else {
      setcheckdItens((prev) => [...prev, value])
    }
  }

  const checkedAll = () => {
    if (checkdItens.length === items.semanal.length) {
      setcheckdItens([])
    } else {
      setcheckdItens(items.semanal.map((item) => item.key))
    }
  }

  return (
    <S.ContainerPopup>
      <S.Title>
        <span>Opções de configuração</span>
      </S.Title>
      <S.ContainerCheckbox>
        {selectOption === 'S' ? (
          <>
            <S.AlldaysCheckbox>
              <Checkbox
                className='checkTransfer'
                label={'Selecionar todos os dias'}
                onClick={() => checkedAll()}
                checked={checkdItens.length === items.semanal.length}
              />
            </S.AlldaysCheckbox>
            <S.DaysCheckbox>
              {items.semanal.map((item) => (
                <Checkbox
                  key={item.key}
                  className='checkTransfer'
                  label={
                    <S.RowLabel>
                      <span>{item.value}</span>
                    </S.RowLabel>
                  }
                  onClick={() => getCheckedClick(item.key)}
                  checked={checkdItens.includes(item.key)}
                />
              ))}
            </S.DaysCheckbox>
          </>
        ) : selectOption === 'Q' ? (
          <S.FortnightCheckbox>
            {items.quinzenal.map((item) => (
              <Checkbox
                key={item.key}
                className='checkTransfer'
                label={
                  <S.RowLabel>
                    <span>{item.value}</span>
                  </S.RowLabel>
                }
                onClick={() => getCheckedClick(item.key)}
                checked={checkdItens.includes(item.key)}
              />
            ))}
          </S.FortnightCheckbox>
        ) : (
          <S.Repeat>
            <span>Informe o Cliclo de repetição da Tarefa</span>
            <S.RepeatInput>
              <input
                type='number'
                id='re'
                min='1'
                max='90'
                value={checkdItens[0]}
                onChange={(e) => setcheckdItens([Number(e.target.value)])}
              />{' '}
              <span>Dias</span>
            </S.RepeatInput>
          </S.Repeat>
        )}
      </S.ContainerCheckbox>
      <S.Button>
        <S.ButtonSize>
          <Button
            primary
            size='medium'
            fluid
            disabled={checkdItens.length < 1}
            onClick={() => {
              setValue('frequencyDays', checkdItens, {
                shouldDirty: true,
                shouldValidate: true,
              })
              setOpenPopup(false)
            }}
          >
            salvar
          </Button>
        </S.ButtonSize>
      </S.Button>
    </S.ContainerPopup>
  )
}

export default PopupContent
