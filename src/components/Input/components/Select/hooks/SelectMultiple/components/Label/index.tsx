import Checkbox from '../../../../../Checkbox'
import { useContext } from '../../context'
import type { Option, SelectOptionLabelProps } from '../../interfaces'

const Label = (props: {
  option: SelectOptionLabelProps
  label: Option['label']
  value: Pick<Option, 'data' | 'value'>[]
}) => {
  const context = useContext()

  const {
    checked: [checked, setChecked],

    limits,
  } = context

  const { max, enabled } = limits
  const { disabled, value } = props.option
  const isChecked = checked.findIndex((e) => e.value === value) !== -1

  const disabledByLimit =
    enabled && typeof max === 'number' && checked.length >= max && !isChecked
  const finalDisabled = disabled || disabledByLimit || !!limits.error

  const LabelComponent = props.label

  return (
    <Checkbox
      type='checkbox'
      checked={isChecked}
      label={
        typeof LabelComponent !== 'function' ? (
          LabelComponent
        ) : (
          <LabelComponent {...props.option} />
        )
      }
      disabled={finalDisabled}
      onChange={(event) => {
        const isChecked = event.target.checked

        setChecked((prev) => {
          const newState = prev.filter((v) => v.value !== value)
          if (isChecked) {
            if (enabled && typeof max === 'number' && prev.length >= max) {
              return prev
            }

            const e = props.value.find((e) => e.value === value)
            newState.push(
              e || {
                data: props.option.data,
                value,
              },
            )
          }

          return newState
        })
      }}
      padding={{
        top: 's3',
        left: 's3',
        right: 's3',
        bottom: 's3',
      }}
      width='100%'
      tabIndex={-1}
    />
  )
}

export default Label
