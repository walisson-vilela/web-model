import { useCallback } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { notEmptyStringOrDefault } from '../../../../../../../standardized/utils/formatters'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import useContext from '../../../../context'

import { parseFunction } from './functions'

const CategoryAndSublevel = () => {
  const { form, isInvalid, setValueOptions } = useContext()

  const { setValue, control } = form

  return (
    <MwGrid.Col>
      <Controller
        control={control}
        name='product_line_id'
        render={({ field: props }) => {
          const loader = useCallback(
            useSelectLoader({
              request: {
                url: 'v1/tr/categories',
                aditionalParams: { level: 2 },
              },
              parser: parseFunction,
            }),
            [props.value],
          )

          return (
            <MwInput
              {...props}
              type='select'
              label='Categoria e Subnível'
              name='product_line_id'
              placeholder='Selecione'
              setValue={(e) => {
                setValue('product_line_id', numberOrDefault(e), setValueOptions)
              }}
              onClear={() => {
                setValue('product_line_id', null, setValueOptions)
              }}
              loader={loader}
              invalid={isInvalid('product_line_id')}
              value={notEmptyStringOrDefault(props.value, '')}
              width='100%'
              required
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default CategoryAndSublevel
