import React, { useContext } from 'react'

import Tooltip from '../../Tooltip'
import DropdownContext from '../context'
import type { Rule } from '../interfaces'

import * as S from './styled'

interface CheckRulesReturn {
  /** mensagem de erro */
  message: JSX.Element | string
  /** aparencia do botao */
  appearance?: 'disabled'
  /** estado do tooltip */
  disabled: boolean
  /** funcao que sera chamada ao clicar no botao */
  onClickFunc: React.MouseEventHandler<HTMLButtonElement>
}

const checkRules = (
  rules: Rule[],
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  closeOnClick = true,
): CheckRulesReturn => {
  for (let i = 0; i < rules.length; i++) {
    const { rule, message } = { ...rules[i] }
    if (!rule()) {
      return {
        message,
        appearance: 'disabled',
        disabled: false,
        onClickFunc: () => {},
      }
    }
  }

  return {
    message: '',
    disabled: true,
    onClickFunc: (event) => {
      onClick(event)

      if (closeOnClick) setOpen(false)
    },
  }
}

const List = () => {
  const context = useContext(DropdownContext)

  const { items, open, position, setOpen } = { ...context }

  return (
    <S.Container $open={open} $position={position}>
      <S.SubContainer>
        {items.map((item, index) => {
          const {
            content,
            onClick,
            rules,
            border,
            closeOnClick,
            tone,
          } = {
            ...item,
          }

          const { message, appearance, disabled, onClickFunc } = checkRules(
            rules,
            onClick,
            setOpen,
            closeOnClick,
          )

          return (
            <React.Fragment key={index}>
              {border && <S.Line />}
              <S.ItemWrapper>
                <Tooltip on='hover' message={message} disabled={disabled}>
                  <div>
                    <S.Item
                      type='button'
                      onClick={onClickFunc}
                      $appearance={appearance}
                      $tone={tone}
                    >
                      {content}
                    </S.Item>
                  </div>
                </Tooltip>
              </S.ItemWrapper>
            </React.Fragment>
          )
        })}
      </S.SubContainer>
    </S.Container>
  )
}

export default List
