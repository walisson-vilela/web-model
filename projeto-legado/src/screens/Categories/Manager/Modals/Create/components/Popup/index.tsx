import { MwGrid, Popup } from '@mw-kit/mw-ui'

import { useCategoriesContext } from '../../context'

import SelectParent from './components/SelectParent'

const PopupSelected = () => {
  const {
    editData,
    form: { watch },
  } = useCategoriesContext()

  const category = watch('category')

  return (
    category !== 'category' && (
      <MwGrid.Col width='auto'>
        <Popup
          inverted
          wide
          className='popup-field'
          disabled={!editData}
          position='right center'
          content='Uma vez criado, não é permitido alterar o nível associado.'
          trigger={<SelectParent />}
        />
      </MwGrid.Col>
    )
  )
}

export default PopupSelected
