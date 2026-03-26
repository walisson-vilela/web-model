import React from 'react'

import type { Option as MenuOption } from '../../../../../Menu/interfaces'
import { HiddenInput } from '../../styles'
import useNavigation, { isAvailable } from '../Navigation'
import type * as Types from '../interfaces'

import Header from './components/Header'
import Provider from './context'
import type { Option, SelectProps } from './interfaces'

const getOptions = (
  onSelect: (index: number, option: Option) => void,
  options: Option[],
  selected: Pick<Option, 'data' | 'value' | 'label'> | null,
): MenuOption[] => {
  return options.map((option, index) => {
    const { value, onClick, rules, disabled } = option

    const isSelected = option.value === selected?.value

    const data = {
      ...option.data,
      selected: isSelected,
      value,
    }

    const LabelComponent = option.label

    const parsed: MenuOption = {
      label:
        typeof LabelComponent !== 'function'
          ? LabelComponent
          : ({ disabled }) => <LabelComponent {...{ value, data, disabled }} />,
      onClick:
        onClick ||
        (() => {
          onSelect(index, option)
        }),
      disabled,
      rules,
      border: {
        left: {
          color: isSelected ? 'blue' : 'transparent',
        },
      },
      data,
      keepOpen: true,
    }

    return parsed
  })
}

const getSelected = (value: string, options: Option[]): Option | null => {
  const selectedIndex = options.findIndex((option) => option.value === value)
  if (selectedIndex === -1) return null
  const selected = options[selectedIndex]
  return selected
}

const getInputContent = (
  props: SelectProps,
  selectedOption: Pick<Option, 'data' | 'value' | 'label'>,
) => {
  if (typeof selectedOption.label !== 'function') return selectedOption.label
  const LabelComponent = selectedOption.label
  return (
    <LabelComponent
      data={{ ...selectedOption.data }}
      value={selectedOption.value}
      disabled={props.disabled || props.loading}
      mode='placeholder'
    />
  )
}

const useSelect: Types.useSelect<SelectProps> = (
  props,
  [highlight, setHighlight],
  [options, setOptions],
  setOpen,
) => {
  const [selectedOption, value] =
    typeof props.value === 'string'
      ? [getSelected(props.value, options), props.value]
      : [props.value, props.value.value]

  const onSelect = (index: number, option: Option) => {
    if (!isAvailable(index, option)) {
      return
    }

    const isSelected = option.value === selectedOption?.value
    props.setValue(isSelected ? '' : option.value, option.data)
    setOpen(false)
  }

  const parsedOptions = getOptions(onSelect, options, selectedOption)

  const onReset = () => {}

  const inputContent = selectedOption
    ? getInputContent(props, selectedOption)
    : (props.value as string)

  const parsed: Types.useSelectReturn = {
    parsedOptions: parsedOptions,
    options: [options, setOptions],
    inputContent,
    onReset,
    menu: {
      itemSpacing: 's3',
      before: (
        <React.Fragment>
          <Header />
          <HiddenInput
            {...useNavigation({
              highlight: [highlight, setHighlight],
              options,
              onSelectHighlight: onSelect,
            })}
          />
        </React.Fragment>
      ),
      maxHeight: props.maxHeight || props.search ? '238px' : '180px',
    },
    getContext: (base, children) => {
      return (
        <Provider.Provider value={{ ...base, props, options }}>
          {children}
        </Provider.Provider>
      )
    },
  }

  const { onClear, dirty } = props

  parsed.dirty = (() => {
    if (dirty === undefined || typeof dirty === 'function') return dirty

    if (value === dirty.value) return undefined

    return () => props.setValue(dirty.value, dirty.data)
  })()

  if (onClear) parsed.onClear = () => onClear('')

  return parsed
}

export default useSelect
