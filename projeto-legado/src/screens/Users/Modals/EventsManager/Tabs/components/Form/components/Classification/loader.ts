import { useCallback } from 'react'

import { SelectOption } from '@mw-kit/mw-ui/types'

import { useSelectLoader } from '../../../../../../../../../utils/hooks'

import { classificationsParser } from './parser'

export const useClassificationsLoader = (temporary: 1 | 0) => {
  const loader = useCallback(
    useSelectLoader({
      parser: (data) => {
        const classifications = classificationsParser(data)
        return classifications.map((data) => {
          const option: SelectOption = {
            value: data.id.toString(),
            label: data.name,
            data,
          }

          return option
        })
      },
      request: {
        url: 'v1/classifications',
        aditionalParams: {
          scenery_id: 8,
          temporary,
        },
      },
    }),
    [temporary],
  )

  return loader
}
