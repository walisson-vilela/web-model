import React from 'react'

import { notEmptyStringOrDefault } from '../../../../../../../utils/Formatters'
import { isKeyOf } from '../../../../../../../utils/Validators'
import { states } from '../../constants'
import { Form } from '../../interface'

export const formatAddress = (values: Form) => {
  const rows = [
    [
      notEmptyStringOrDefault(values.street_type, ''),
      notEmptyStringOrDefault(values.street_address, ''),
      notEmptyStringOrDefault(values.street_number, ''),
    ],
    [
      notEmptyStringOrDefault(values.sublocality, ''),
      notEmptyStringOrDefault(values.city, ''),
    ],
    [
      isKeyOf(states, values.state)
        ? states.indexed[values.state]
        : values.state,
      notEmptyStringOrDefault(values.postal_code, ''),
    ],
  ]

  const separators = [
    ['', ':', ','],
    ['', ' -'],
    ['', ' |'],
  ]

  return rows.map((row, i) => {
    if (!Array.isArray(row)) return null

    const str =
      row
        .reduce((prev, col, j) => {
          if (col === null) return prev
          if (prev === '') return col
          return [prev, col].join(`${separators[i][j]} `)
        }, '' as string | null)
        ?.trim() ?? ''

    return str === '' ? (
      <React.Fragment key={i}></React.Fragment>
    ) : (
      <div key={i}>{str}</div>
    )
  })
}
