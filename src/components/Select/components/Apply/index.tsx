import { useMemo } from 'react'

import Popup from '../../../Popup'
import type { SelectMultiProps } from '../../types'

import * as S from './styles'

type ApplyProps = Pick<
  Required<SelectMultiProps<unknown>>,
  'setValue' | 'clearable' | 'applyRules'
> & {
  onClose: () => void
  draft: Map<string, unknown>
}

const Apply = ({
  setValue,
  clearable,
  applyRules,
  onClose,
  draft,
}: ApplyProps) => {
  const value = useMemo(() => Array.from(draft.values()), [draft])

  const failedApplyRule = useMemo(() => {
    const rule = applyRules.find((rule) => !rule.allow(value))
    return rule
  }, [value, applyRules])

  const ApplyRuleComponent = failedApplyRule?.Component

  const onApply = () => {
    if (!clearable && draft.size < 1) return
    if (failedApplyRule !== undefined) return

    setValue(Array.from(draft.values()))
    onClose()
  }

  return (
    <Popup
      {...(ApplyRuleComponent !== undefined
        ? {
            enabled: true,
            content: () => <ApplyRuleComponent value={value} />,
          }
        : {
            enabled: false,
            content: () => null,
          })}
      on='click'
      closeOnClip
      placement='right'
      triggerType='button'
      triggerProps={{
        onClick: onApply,
      }}
      renderTrigger={(props) => (
        <S.ApplyButton
          type='button'
          aria-disabled={
            (!clearable && draft.size < 1) || failedApplyRule !== undefined
          }
          {...props}
        >
          Aplicar
        </S.ApplyButton>
      )}
    />
  )
}

export default Apply
