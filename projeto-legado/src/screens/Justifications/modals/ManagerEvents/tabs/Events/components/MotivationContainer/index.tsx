import React, { useCallback, useContext } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { FiX } from 'react-icons/fi'
import { Checkbox, Dropdown } from 'semantic-ui-react'

import { ManagerEventContext } from '../../../../context'
import { OptionsProps } from '../../../../interface'

import { motivationDefinitive } from './labels'
import * as S from './styles'

export const MotivationContainer = () => {
  const {
    checked,
    setChecked,
    file,
    setFile,
    formDate,
    setFormDate,
    formDateInterval,
    setFormDateInterval,
    formMotivation,
    setFormMotivation,
    disabled,
  } = useContext(ManagerEventContext)

  const options: OptionsProps[] = [
    {
      id: 1,
      label: 'Temporário',
    },
    {
      id: 2,
      label: 'Definitivo',
    },
  ]

  const getMotivationDefinitiveOptions = useCallback(motivationDefinitive, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const handleAddEvent = () => {
    console.log({
      checked,
      formMotivation,
      formDateInterval,
      formDate,
      file,
    })
    setFormMotivation({ label: '' })
    setFormDateInterval(['', ''])
    setFile(null)
  }

  return (
    <S.MotivationContainer>
      <S.Motivation>
        <strong>Motivo de Inativação</strong>
        <S.TypeRadius>
          {options.map((item) => (
            <Checkbox
              className='checkTransferRadio'
              radio
              key={item.id}
              label={item.label}
              checked={checked.id === item.id}
              onClick={() => setChecked(item)}
            />
          ))}
        </S.TypeRadius>
        <S.InputList>
          <S.Input>
            <label htmlFor='motivation'>Defina o motivo</label>
            <Dropdown
              id='motivation'
              type='select'
              position='left bottom'
              placeholder='Selecione'
              value={formMotivation.label}
              setValue={(value) => setFormMotivation({ label: value })}
            />
          </S.Input>
          {checked.id === 1 ? (
            <S.Input>
              <label htmlFor='period'>Defina o Período</label>
              <MwInput
                id='period'
                type='date-interval-picker'
                value={formDateInterval}
                setValue={(value) => setFormDateInterval(value)}
              />
            </S.Input>
          ) : (
            <S.Input>
              <label htmlFor='period'>Defina a Data</label>
              <MwInput
                id='period'
                type='datepicker'
                picker
                value={formDate}
                setValue={(value) => setFormDate(value)}
                inputWidth='280px'
                width='280px'
              />
            </S.Input>
          )}
          <S.FileContainer>
            <S.File>
              <input type='file' onChange={(e) => handleImageUpload(e)} />
              <span>Incluir Anexo</span>
            </S.File>
            {file && (
              <span>
                {file.name}{' '}
                <FiX size={16} color='#192338' onClick={() => setFile(null)} />
              </span>
            )}
          </S.FileContainer>
        </S.InputList>
      </S.Motivation>
      <S.AddEvent>
        <button disabled={disabled} onClick={handleAddEvent}>
          <span>Incluir Evento</span>
        </button>
      </S.AddEvent>
    </S.MotivationContainer>
  )
}
