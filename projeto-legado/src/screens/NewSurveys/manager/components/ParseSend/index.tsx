import { useContext } from 'react'

import { MdSend } from 'react-icons/md'

import { SurveysContext } from '../../../context'

import { DeliveryModal } from './components/DeliveryModal'
import * as S from './styles'

interface Props {
  active?: boolean
  id?: number
  name?: string
}

const ParseSend = ({ active = false, id, name }: Props) => {
  const { setOpenSelectModal } = useContext(SurveysContext)

  return (
    <S.Container>
      <MdSend
        size={14}
        color={active ? '#E23851' : '#949494'}
        style={active && { cursor: 'pointer' }}
        onClick={() => {
          active && setOpenSelectModal(<DeliveryModal id={id} name={name} />)
        }}
      />
    </S.Container>
  )
}

export default ParseSend
