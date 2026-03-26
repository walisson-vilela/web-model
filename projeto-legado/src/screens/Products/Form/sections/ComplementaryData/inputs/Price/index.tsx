import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import useContext from '../../../../context'
import * as S from '../../styled'

interface IPrice {
  typePrice: 'min' | 'max'
}

const Price = (props: IPrice) => {
  const { typePrice } = props
  const {
    form: { control, getValues, trigger, watch },
    isInvalid,
  } = useContext()

  const priceName = typePrice === 'min' ? 'price_min' : 'price_max'
  const priceLabel = typePrice === 'min' ? 'Preço Mínimo' : 'Preço Máximo'
  const notifyPrice = watch('notify_price')

  return (
    <MwGrid.Col width='2'>
      <Controller
        control={control}
        name={priceName}
        render={({ field: { onChange, ...props } }) => (
          <MwInput
            {...props}
            type='number'
            label={priceLabel}
            placeholder='0,00'
            required={notifyPrice !== null}
            disabled={notifyPrice === null}
            step='.01'
            invalid={isInvalid(priceName)}
            icon={{
              position: 'left',
              icon: {
                type: 'jsx',
                icon: <S.Icon children='R$' />,
                width: undefined,
              },
            }}
            onChange={(e) => {
              onChange(e)
              trigger(priceName)
            }}
            value={numberOrDefault(props.value, '')}
          />
        )}
      />
    </MwGrid.Col>
  )
}

export default Price
