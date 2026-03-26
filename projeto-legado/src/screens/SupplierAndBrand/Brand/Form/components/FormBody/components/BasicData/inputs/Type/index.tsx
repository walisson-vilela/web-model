import { MwInput, Popup } from '@mw-kit/mw-ui'

import { numberOrDefault } from '../../../../../../../../../../utils/Formatters'
import useContext from '../../../../../../context'
import { Form } from '../../../../../../interfaces'

interface IType {
  value: Form['type']
  label: string
}

const Type = (props: IType) => {
  const { label, value } = props
  const { form, data, isInvalid } = useContext()

  const { setValue, setValueOptions, watch } = form

  const type = watch('type')

  return (
    <Popup
      on='hover'
      wide
      disabled={!(data && numberOrDefault(data.products_count, 0) > 0)}
      trigger={
        <div>
          <MwInput
            type='radio'
            label={label}
            disabled={data && numberOrDefault(data.products_count, 0) > 0}
            checked={type === value}
            invalid={isInvalid('type')}
            onChange={(e) => {
              if (!e.target.checked) return
              setValue('type', value, setValueOptions)
              setValue('supplier_id', '', setValueOptions)
            }}
          />
        </div>
      }
      inverted
      position='right center'
      className='popup-field'
      content='Não é possível editar o tipo da marca que possui produtos asssociados.'
    />
  )
}

export default Type
