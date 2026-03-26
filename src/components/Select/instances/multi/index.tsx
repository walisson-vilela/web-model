import React, { useCallback, useMemo, useState } from 'react'

import { useDebouncedState } from '../../../../hooks'
import Apply from '../../components/Apply'
import Scroll from '../../components/Scroll'
import Search from '../../components/Search'
import { SEARCH_DEBOUNCE_MS } from '../../constants'
import {
  useAsyncOptions,
  useListNavigation,
  useRuleIndex,
  useVirtualizedOptions,
} from '../../hooks'
import * as S from '../styles'
import type { SelectKeyBuilder, SelectMultiProps, UseSelect } from '../types'

const buildMap: <Option>(
  values: readonly Option[],
  getKey: SelectKeyBuilder<Option>,
) => Map<string, Option> = (values, getKey) => {
  return new Map(values.map((option) => [getKey(option), option]))
}

type SelectMultiOptionsProps = SelectMultiProps<unknown> & {
  menuId: string
  onClose: () => void
}

const paginate = () => {}

const useDraftOptions = (
  draft: Map<string, unknown>,
  finder: SelectMultiOptionsProps['finder'],
): ReturnType<typeof useAsyncOptions> => {
  const {
    current: [searchInput, setSearchInput],
    debounced: [search],
  } = useDebouncedState('', () => {}, SEARCH_DEBOUNCE_MS)

  const options = useMemo(() => {
    const options = Array.from(draft.values())
    if (!search) return options
    return finder(search, options)
  }, [draft, search, finder])

  return {
    options,
    loading: false,
    paginate,
    searchInput: [searchInput, setSearchInput],
  }
}

const useDraft = (
  value: SelectMultiOptionsProps['value'],
  getKey: SelectMultiOptionsProps['getKey'],
) => {
  const [draft, setDraft] = useState(() => ({
    options: buildMap(value, getKey),
    on: false,
  }))

  const setOptions: React.Dispatch<
    React.SetStateAction<Map<string, unknown>>
  > = (value) => {
    setDraft((prev) => {
      const v = typeof value === 'function' ? value(prev.options) : value
      if (v === prev.options) return prev
      return {
        options: v,
        on: prev.on && v.size > 0,
      }
    })
  }

  const setOn: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    setDraft((prev) => {
      const v = typeof value === 'function' ? value(prev.on) : value
      if (v === prev.on) return prev
      return {
        options: prev.options,
        on: v && prev.options.size > 0,
      }
    })
  }

  return {
    draft: [draft.options, setOptions],
    switchDraft: [draft.on, setOn],
  } as const
}

const SelectMultiOptions = ({
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
  clearable = false,
  finder,
  applyRules = [],
}: SelectMultiOptionsProps) => {
  const {
    draft: [draft, setDraft],
    switchDraft: [switchDraft, setSwitchDraft],
  } = useDraft(value, getKey)

  const asyncOptions = useAsyncOptions(loader)
  const draftOptions = useDraftOptions(draft, finder)

  const {
    options,
    loading,
    paginate,
    searchInput: [searchInput, setSearchInput],
  } = switchDraft ? draftOptions : asyncOptions

  const { getFailedRuleByKey, enabledCount } = useRuleIndex({
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

    const key = getKey(option)

    setDraft((current) => {
      const next = new Map(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.set(key, option)
      }

      return next
    })
  }

  const navigation = useListNavigation({
    itemCount: options.length,
    isItemDisabled: isIndexDisabled,
    onSelect: onToggleByIndex,
    scrollToIndex: rowVirtualizer.scrollToIndex,
  })

  const onSelectAll = () => {
    setDraft((current) => {
      const next = new Map(current)

      options.forEach((option) => {
        const key = getKey(option)
        if (!getFailedRuleByKey(key)) {
          next.set(key, option)
        }
      })

      return next
    })
  }

  const onUnselectAll = () => {
    setDraft(new Map([]))
  }

  const getIsSelected = useCallback((key: string) => draft.has(key), [draft])

  return (
    <React.Fragment>
      <S.Header>
        <S.DraftSwitch
          type='button'
          role='switch'
          aria-checked={switchDraft}
          onClick={() => setSwitchDraft((prev) => !prev)}
          disabled={draft.size < 1}
        >
          <span />
          Selecionados ({draft.size})
        </S.DraftSwitch>

        <S.SelectAllButton
          type='button'
          {...(enabledCount > 0 && enabledCount === draft.size
            ? {
                onClick: onUnselectAll,
                children: 'Desselecionar tudo',
              }
            : {
                onClick: onSelectAll,
                children: 'Selecionar tudo',
                disabled: enabledCount < 1,
              })}
        />
      </S.Header>

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
        mode='multi'
        aria-multiselectable
      />

      <Apply
        setValue={setValue}
        onClose={onClose}
        draft={draft}
        clearable={clearable}
        applyRules={applyRules}
      />
    </React.Fragment>
  )
}

const useMultiSelect: UseSelect<SelectMultiProps<unknown>> = ({
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
  finder,
  applyRules,
  ...buttonProps
}) => {
  const closedLabel = useMemo(() => {
    if (value.length < 1) {
      return viewMode ? <React.Fragment>&nbsp;</React.Fragment> : placeholder
    }
    return `Há ${value.length} opções selecionadas`
  }, [placeholder, value.length, viewMode])

  return {
    isEmpty: value.length === 0,
    placeholder: closedLabel,
    onClear: () => setValue([]),
    Component: SelectMultiOptions,
    buttonProps,
  }
}

export default useMultiSelect
