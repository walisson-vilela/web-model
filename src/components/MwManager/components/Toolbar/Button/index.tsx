import React from 'react'

import * as GlobalStyles from '../../../styled'
import CaretDownIcon from '../../Icons/CaretDown'

import * as S from './styled'

interface ButtonProps extends GlobalStyles.TransparentButtonProps {
  /** funcao que altera o estado do indicador de menu aberto */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  /** conteudo do botao */
  children: JSX.Element | string
  /** indicador de botao desabilitado */
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  const { setOpen, children, disabled, appearance } = {
    ...props,
  }

  return (
    <GlobalStyles.ThemeContainer>
      <S.Button
        onClick={() => {
          setOpen((prev) => !prev)
        }}
        disabled={disabled}
        $appearance={appearance}
      >
        {children}
        <CaretDownIcon />
      </S.Button>
    </GlobalStyles.ThemeContainer>
  )
}

export default Button
