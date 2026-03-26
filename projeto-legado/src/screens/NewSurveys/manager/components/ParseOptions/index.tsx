import { useContext } from 'react'

import { AiOutlineBell } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { Popup } from 'semantic-ui-react'

import { ChannelModal } from '../../../Modals/SelectModal/Channel'
import { FormModal } from '../../../Modals/SelectModal/Form'
import { LocalModal } from '../../../Modals/SelectModal/Local'
import { PDVModal } from '../../../Modals/SelectModal/PDV'
import { ProductModal } from '../../../Modals/SelectModal/Products'
import { UserModal } from '../../../Modals/SelectModal/Users'
import { SurveysContext } from '../../../context'
import { DataInterface } from '../../interface'

import { ErrosPopup } from './components/ErrosPopup'
import { ModalsNames } from './interfaces'
import * as S from './styles'

interface Props {
  type: ModalsNames
  quantity: number
  errors: number
  item: DataInterface
  code?: number[]
  reload: () => void
}

const ParseOptions = ({
  type,
  quantity,
  errors,
  item,
  code,
  reload,
}: Props) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  const modal: { [key: string]: { element: JSX.Element } } = {
    Form: { element: <FormModal edit item={item} reload={reload} /> },
    Local: { element: <LocalModal edit item={item} reload={reload} /> },
    Channel: { element: <ChannelModal edit item={item} reload={reload} /> },
    PDVHierarchy: { element: <PDVModal edit item={item} reload={reload} /> },
    Products: { element: <ProductModal edit item={item} reload={reload} /> },
    User: { element: <UserModal edit item={item} reload={reload} /> },
  }

  return (
    <S.Container>
      <span>{quantity}</span>
      <FaRegEdit
        size={14}
        color={'#949494'}
        style={{ cursor: 'pointer' }}
        onClick={() => setOpenSelectModal(modal[type].element)}
      />
      {errors > 0 && (
        <Popup
          pinned
          position='top right'
          closeOnPortalMouseLeave
          inverted
          className='popup-field'
          on='click'
          offset={[10, 0]}
          trigger={
            <AiOutlineBell
              size={14}
              color={'#E23851'}
              style={{ cursor: 'pointer' }}
            />
          }
          content={
            <ErrosPopup
              code={code}
              errors={errors}
              item={item}
              key={item.id}
              type={type}
            />
          }
        />
      )}
    </S.Container>
  )
}

export default ParseOptions
