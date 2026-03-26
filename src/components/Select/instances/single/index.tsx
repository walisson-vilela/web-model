import React, { useCallback, useMemo } from 'react'

import Scroll from '../../components/Scroll'
import Search from '../../components/Search'
import {
  useAsyncOptions,
  useListNavigation,
  useRuleIndex,
  useVirtualizedOptions,
} from '../../hooks'
import type { SelectSingleProps, UseSelect } from '../types'

type SelectSingleOptionsProps = SelectSingleProps<unknown> & {
  menuId: string
  onClose: () => void
}

const SelectSingleOptions = ({
  loader,
  getKey,
  OptionComponent,
  rules,
  overscan,
  estimateSize,
  value,
  setValue,
  menuId,
  onClose,
  clearable,
}: SelectSingleOptionsProps) => {
  const {
    options,
    loading,
    paginate,
    searchInput: [searchInput, setSearchInput],
  } = useAsyncOptions(loader)

  const { getFailedRuleByKey } = useRuleIndex({
    options,
    getKey,
    rules,
  })

  const { listRef, searchRef, rowVirtualizer, virtualItems } =
    useVirtualizedOptions({
      optionsLength: options.length,
      loading,
      onPaginate: paginate,
      overscan,
      estimateSize,
    })

  const selectedKey = value ? getKey(value) : null

  const isIndexDisabled = (index: number) => {
    const option = options[index]
    if (!option) return true
    return Boolean(getFailedRuleByKey(getKey(option)))
  }

  const onToggleByIndex = (index: number) => {
    const option = options[index]
    if (!option) return
    if (isIndexDisabled(index)) {
      searchRef.current?.focus()
      return
    }

    const optionKey = getKey(option)
    if (selectedKey === optionKey) {
      if (!clearable) return
      setValue(null)
    } else {
      setValue(option)
    }

    onClose()
  }

  const navigation = useListNavigation({
    itemCount: options.length,
    isItemDisabled: isIndexDisabled,
    onSelect: onToggleByIndex,
    scrollToIndex: rowVirtualizer.scrollToIndex,
  })

  const getIsSelected = useCallback(
    (key: string) => selectedKey === key,
    [selectedKey],
  )

  return (
    <React.Fragment>
      <Search
        ref={searchRef}
        menuId={menuId}
        value={[searchInput, setSearchInput]}
        activeIndex={navigation.activeIndex}
        onKeyDown={navigation.onKeyDown}
      />

      <Scroll
        ref={listRef}
        menuId={menuId}
        options={options}
        virtualItems={virtualItems}
        totalSize={rowVirtualizer.getTotalSize()}
        measureElement={rowVirtualizer.measureElement}
        loading={loading}
        OptionComponent={OptionComponent}
        onClickOption={onToggleByIndex}
        onMouseEnterOption={navigation.onMouseEnter}
        activeIndex={navigation.activeIndex}
        getKey={getKey}
        getIsSelected={getIsSelected}
        getFailedRuleByKey={getFailedRuleByKey}
        mode='single'
        aria-multiselectable
      />
    </React.Fragment>
  )
}

const useSingleSelect: UseSelect<SelectSingleProps<unknown>> = ({
  label,
  loader,
  getKey,
  OptionComponent,
  rules,
  placeholder = 'Selecione',
  required,
  invalid,
  clearable,
  readOnly,
  viewMode,
  overscan,
  estimateSize,
  height,
  value,
  setValue,
  ValueComponent,
  ...buttonProps
}) => {
  const ClosedValueComponent = ValueComponent || OptionComponent

  const closedLabel = useMemo(() => {
    if (!value) {
      return viewMode ? <React.Fragment>&nbsp;</React.Fragment> : placeholder
    }

    return (
      <ClosedValueComponent
        option={value}
        isActive={false}
        isSelected
        isDisabled={false}
      />
    )
  }, [ClosedValueComponent, placeholder, value, viewMode])

  return {
    isEmpty: !value,
    placeholder: closedLabel,
    onClear: () => setValue(null),
    Component: SelectSingleOptions,
    buttonProps,
  }
}

export default useSingleSelect
