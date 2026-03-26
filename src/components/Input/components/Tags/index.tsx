import React, { useState } from 'react'

import { strCmp } from '../../../../functions/validators'

import { Input, Label, Tag } from './components'
import type { TagsProps } from './interfaces'
import * as S from './styles'

const Tags = React.forwardRef(
  (props: TagsProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { value, setValue } = props

    const [inputValue, setInputValue] = props.input?.value
      ? props.input.value
      : useState<string>('')

    const paddingless = props.paddingless || false
    const borderless = props.borderless || false
    const maxTags = props.maxTags || Number.POSITIVE_INFINITY
    const validate = props.validate || (() => true)
    const onBlur = props.onBlur || (() => {})
    const onBeforeAdd = props.onBeforeAdd || ((v: string) => v)

    const validateUnique = props.unique
      ? (v: string) => (value.some((e) => strCmp(e, v)) ? '' : v)
      : (v: string) => v

    const add = (v: string) => {
      if (v === '') return

      let newV = validateUnique(v)
      if (newV === '') return

      newV = onBeforeAdd(newV)
      if (newV === '') return

      const content = [...value, newV]
      if (content.length > maxTags) return

      setValue(content)
      setInputValue('')
    }

    const remove = (index: number) => {
      const prev = [...value]
      prev.splice(index, 1)
      setValue([...prev])
    }

    return (
      <S.Label $disabled={props.disabled} $width={props.width}>
        <Label required={props.required}>{props.label}</Label>

        <S.TagContainer
          $invalid={props.invalid}
          $borderless={borderless}
          $paddingless={paddingless}
        >
          {value.map((v, index) => (
            <Tag
              key={index}
              onClose={() => remove(index)}
              invalid={!validate(v)}
            >
              {v}
            </Tag>
          ))}

          <Input
            onBlur={onBlur}
            ref={ref}
            disabled={
              props.disabled || props.loading || value.length === maxTags
            }
            invalid={props.invalid}
            placeholder={value.length === 0 ? props.placeholder : ''}
            {...props.input}
            value={[inputValue, setInputValue]}
            onPressEnter={(e) => add((e.target as HTMLInputElement).value)}
            style={
              value.length === maxTags
                ? { width: 0, minWidth: 0, maxWidth: 0, border: 'none' }
                : {}
            }
          />
        </S.TagContainer>
      </S.Label>
    )
  },
)

Tags.displayName = 'Tags'

export default Tags
