import { Circle } from './Icon'
import * as S from './styled'

interface IAddressInfo {
  type: 'Cadastro' | 'Receita Federal'
  address: string
}

const AddressInfo = (props: IAddressInfo) => {
  const { type, address } = props
  if (!address) return null
  return (
    <S.Container>
      <S.Title>
        <Circle type={type}>
          Endereço d{props.type === 'Receita Federal' ? 'a' : 'o'} {type}
        </Circle>
      </S.Title>
      <S.Address>{address}</S.Address>
    </S.Container>
  )
}

export default AddressInfo
