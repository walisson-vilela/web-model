import { useCallback } from 'react'

import { type InputProps, MwInput } from '@mw-kit/mw-ui'

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import type { ParserFunction } from '../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import useTeamsContext from '../../../../context'
import type { HierarchyType } from '../../../../types'

const parserH = (
  setHierarchy: React.Dispatch<React.SetStateAction<null | HierarchyType>>,
) =>
  ((data) => {
    const reduceData = data.reduce((prev, el) => {
      if (!isObject(el)) return prev
      const id = numberOrDefault(el.id)

      if (!id) return prev

      const data: HierarchyType = {
        id: id,
        name: notEmptyStringOrDefault(el.name, ''),
        user_count: numberOrDefault(el.user_count, 0),
      }

      prev.push({
        label: data.name,
        value: data.id.toString(),
        data: data,
      })
      return prev
    }, [])

    setHierarchy((prev) => {
      if (prev || reduceData.length === 0) return prev
      return reduceData[0].data
    })

    return reduceData
  }) as ParserFunction<HierarchyType>

export const HierarchiesSelectMenu: React.FC<
  Omit<InputProps, 'value' | 'setValue' | 'loader'> & {
    style?: React.CSSProperties
  }
> = (props, style) => {
  const {
    hierarchy: [hierarchy, setHierarchy],
    loading: [loading],
  } = useTeamsContext()

  const loader = useCallback(
    useSelectLoader({
      request: {
        url: '/v1/tr/hierarchies/options',
        aditionalParams: { by_person: '' },
      },
      parser: parserH(setHierarchy),
    }),
    [],
  )

  return (
    <MwInput
      style={style}
      type='select'
      value={
        hierarchy
          ? {
              label: hierarchy.name,
              value: hierarchy.id.toString(),
              data: hierarchy,
            }
          : ''
      }
      setValue={(e, data) => {
        if (!data) return
        setHierarchy(data as HierarchyType)
      }}
      loader={loader}
      disabled={loading}
      {...props}
    />
  )
}
