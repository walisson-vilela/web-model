import React from 'react'

import Chips from 'react-chips'

import Chip from './Chip'
import * as S from './styles'

interface InputChipsProps {
  value: {
    value: string[]
    setValue: React.Dispatch<React.SetStateAction<string[]>>
  }
  placeholder?: string
  chipError?: (value: string) => any
}

export const InputChips = (props: InputChipsProps): JSX.Element => {
  const { placeholder, chipError } = props
  const { value, setValue } = props.value

  return (
    <S.ChipsContainer
      onClick={(e) => {
        const input: HTMLInputElement | undefined = (
          e.target as HTMLElement
        ).getElementsByTagName('input')[0]
        if (input) input.focus()
      }}
    >
      <Chips
        value={value}
        onChange={(e) => setValue(e)}
        placeholder={placeholder || 'Adicione'}
        fromSuggestionsOnly={false}
        createChipKeys={[
          9, // TAB
          13, // ENTER
          32, // SPACE
          188, // VÍRGULA
        ]}
        renderChip={(value) => (
          <Chip
            value={value}
            close={setValue}
            haveError={chipError ? chipError(value) : false}
          />
        )}
      />
    </S.ChipsContainer>
  )
}
