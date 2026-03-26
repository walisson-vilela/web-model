import React, { useEffect, useState } from 'react'

import type { Option as MenuOption } from '../../../../../Menu/interfaces'
import { HiddenInput } from '../../styles'
import useNavigation, { isAvailable } from '../Navigation'
import type * as Types from '../interfaces'

import Footer from './components/Footer'
import Header from './components/Header'
import Label from './components/Label'
import Provider from './context'
import type { Option, SelectProps } from './interfaces'
import { resolveLimits } from './utils'

const getOptions = (
  options: Option[],
  value: Pick<Option, 'data' | 'value'>[],
  checked: Pick<Option, 'data' | 'value'>[],
  limits: ReturnType<typeof resolveLimits>,
): MenuOption[] => {
  const limitReached =
    limits.enabled &&
    typeof limits.max === 'number' &&
    checked.length >= limits.max &&
    !limits.error

  return options.map((option) => {
    const { label, onClick } = option

    const data = { data: option.data, value: option.value }
    const isChecked = checked.some((c) => c.value === option.value)
    const disabled =
      option.disabled || (!!limits.error || (limitReached && !isChecked))

    const parsed: MenuOption = {
      label: (option) => (
        <Label
          option={{ ...data, disabled: disabled || option.disabled }}
          label={label}
          value={value}
        />
      ),
      onClick,
      data,
      disabled,
      rules: option.rules,
      keepOpen: true,
    }

    return parsed
  })
}

const getInputContent = (value: unknown[]): string => {
  if (value.length < 1) return ''
  return value.length > 1
    ? `Há ${value.length} seleções`
    : `Há ${value.length} seleção`
}

const parseValue = (
  value: SelectProps['value'],
): Pick<Option, 'value' | 'data'>[] => {
  const parsed = value.map((value) =>
    typeof value === 'string' ? { value, data: {} } : value,
  )
  return parsed
}

const useSelectMultiple: Types.useSelect<SelectProps> = (
  props,
  [highlight, setHighlight],
  [options, setOptions],
) => {
  const initial = parseValue(props.value)
  const [checked, setChecked] = useState<Pick<Option, 'value' | 'data'>[]>([
    ...initial,
  ])
  const limits = resolveLimits(props.minSelected, props.maxSelected)
  const { max, enabled } = limits

  useEffect(() => {
    if (limits.error) {
      console.error(`[SelectMultiple]: ${limits.error}`)
    }
  }, [limits.error])

  const parsedOptions = getOptions(options, initial, checked, limits)

  const inputContent = getInputContent(props.value)

  const onReset = () => {
    setChecked([...initial])
  }
  const onSelectHighlight = (index: number, option: Option) => {
    if (!isAvailable(index, option)) {
      return
    }

    setChecked((prev) => {
      const index = prev.findIndex((e) => e.value === option.value)
      if (index < 0) {
        if (enabled && typeof max === 'number' && prev.length >= max) {
          return prev
        }

        return [
          ...prev,
          {
            data: option.data,
            value: option.value,
          },
        ]
      }

      const news = [...prev]
      news.splice(index, 1)
      return news
    })
  }

  const returnData: Types.useSelectReturn = {
    parsedOptions: parsedOptions,
    options: [options, setOptions],
    inputContent,
    onReset,
    menu: {
      itemSpacing: undefined,
      before: (
        <React.Fragment>
          <Header />
          <HiddenInput
            {...useNavigation({
              highlight: [highlight, setHighlight],
              options,
              onSelectHighlight,
            })}
          />
        </React.Fragment>
      ),
      after: { fluid: true, children: <Footer /> },
      maxHeight: props.maxHeight || (props.selectAll ? '269px' : '224px'),
    },
    getContext: (base, children) => {
      return (
        <Provider.Provider
          value={{
            ...base,
            props,
            options,
            checked: [checked, setChecked],
            limits,
          }}
        >
          {children}
        </Provider.Provider>
      )
    },
    onClear: () => props.setValue([], []),
  }

  const { dirty } = props

  returnData.dirty = (() => {
    if (dirty === undefined || typeof dirty === 'function') return dirty

    const values = [initial, dirty].map((e) => e.map((e) => e.value).sort())

    if (values[0].join(',') === values[1].join(',')) {
      return undefined
    }

    const [value, data] = dirty.reduce(
      (r, e) => [
        [...r[0], e.value],
        [...r[1], e.data],
      ],
      [[], []] as Parameters<typeof props.setValue>,
    )

    return () => props.setValue(value, data)
  })()

  return returnData
}

export default useSelectMultiple
