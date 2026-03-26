import React from 'react'

import Button from '../../../../../../../Button'
import { useContext } from '../../context'

const Footer = () => {
  const context = useContext()

  const {
    props: { value, setValue },
    checked: [checked],
    setOpen,
    limits,
  } = context

  const { min, max, enabled, error } = limits

  const isDirty =
    checked.length !== value.length ||
    checked.some((e) => !value.includes(e.value))

  const belowMin =
    enabled && typeof min === 'number' ? checked.length < min : false
  const aboveMax =
    enabled && typeof max === 'number' ? checked.length > max : false

  const disabled = !!error || !isDirty || belowMin || aboveMax

  const onClick = () => {
    if (disabled) return

    const [value, data] = checked.reduce(
      (r, e) => [
        [...r[0], e.value],
        [...r[1], e.data],
      ],
      [[], []] as Parameters<typeof setValue>,
    )

    setValue(value, data)
    setOpen(false)
  }

  return (
    <React.Fragment>
      {error && (
        <span
          style={{
            padding: '7px',
            color: '#d32f2f',
            fontSize: '12px',
            flex: 1,
          }}
        >
          {error}
        </span>
      )}
      <Button
        type='button'
        content='Aplicar'
        onClick={onClick}
        style={{ marginRight: '-3.5px' }}
        disabled={disabled}
      />
    </React.Fragment>
  )
}

export default Footer
