import { MwInput } from '@mw-kit/mw-ui'

import { useCategoriesContext } from '../../../context'
import { formType } from '../../../interfaces'

type CheckLevel = Pick<formType, 'category'>

const label: { [k in formType['category']]: string } = {
  category: 'Categoria',
  sublevel: 'Subnível',
}

const Category = (props: CheckLevel) => {
  const { form } = useCategoriesContext()
  const { setValue, clearErrors, watch } = form
  const { category } = props

  const value = watch('category')

  return (
    <MwInput
      label={label[category]}
      type='radio'
      checked={value === category}
      onChange={() => {
        setValue('category', category, {
          shouldDirty: true,
          shouldValidate: true,
        })

        setValue('name', '')
        setValue('parent_id', null)

        clearErrors()
      }}
    />
  )
}

export default Category
