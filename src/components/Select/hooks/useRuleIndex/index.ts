import { useCallback, useMemo } from 'react'

import type { SelectKeyBuilder, SelectRule, SelectRules } from '../../types'

type UseRuleIndexParams<Option> = {
  options: readonly Option[]
  getKey: SelectKeyBuilder<Option>
  rules?: SelectRules<Option>
}

const useRuleIndex = <Option>({
  options,
  getKey,
  rules,
}: UseRuleIndexParams<Option>) => {
  const failedRuleByKey = useMemo(() => {
    const failedRuleByKey = new Map<string, SelectRule<Option>>()

    options.forEach((option) => {
      const key = getKey(option)
      const failedRule = rules?.find((rule) => !rule.allow(option))
      if (failedRule) {
        failedRuleByKey.set(key, failedRule)
      }
    })

    return failedRuleByKey
  }, [getKey, options, rules])

  const getFailedRuleByKey = useCallback(
    (key: string) => {
      return failedRuleByKey.get(key)
    },
    [failedRuleByKey],
  )

  return {
    getFailedRuleByKey,
    enabledCount: options.length - failedRuleByKey.size,
  }
}

export default useRuleIndex
