import React from 'react'

import * as S from '../../../Modal/styles'
import useContext from '../../context'
import { Values, pdvProps } from '../../interfaces'

const KEY: keyof Values = 'LOJAS'

const PDV = (props: pdvProps) => {
  const { setValue, getValue } = useContext()

  const value = getValue(KEY) || {
    status: '',
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value as 'A' | 'I'
    setValue(KEY, {
      status: event.target.checked ? value : '',
    })
    props.setError(false)
  }

  return (
    <React.Fragment>
      <S.SpanPDV error={props.error}>Status do PDV</S.SpanPDV>
      <S.DivPDV>
        <S.CostumeMwInput
          type='radio'
          name='situacao_loja'
          label='Ativo'
          className='custome-input'
          value='A'
          onChange={onChange}
          checked={value.status === 'A'}
        />
        <S.CostumeMwInput
          type='radio'
          name='situacao_loja'
          label='Inativo'
          value='I'
          onChange={onChange}
          checked={value.status === 'I'}
        />
      </S.DivPDV>
    </React.Fragment>
  )
}

export default PDV
