import React, { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../utils/hooks'
import useContext from '../../../../context'

const Regions = (props: { id: number }) => {
  const { id } = props

  const {
    hierarchies: [hierarchies],
    setHierarchyValue,
    errors,
  } = useContext()

  const value = hierarchies[id].regions
  const setValue = (value: string[]) => {
    const parsed = value.reduce<number[]>((parsed, e) => {
      const id = numberOrDefault(e)
      return id ? [...parsed, id] : parsed
    }, [])

    setHierarchyValue(id, 'regions', parsed)
  }

  const loader = useCallback(
    useSelectLoader({
      request: {
        url: 'v1/tr/global-region-types',
      },
    }),
    [value],
  )

  return (
    <MwInput
      type='select-multiple'
      loader={loader}
      setValue={setValue}
      value={value.map((id) => id.toString())}
      placeholder='Selecione'
      invalid={id in errors && errors[id].includes('regions')}
      search
    />
  )
}

export default Regions
