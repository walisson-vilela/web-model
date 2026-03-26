import Alert from '../Alert'
import * as S from '../Alert/styled'

interface IAddressUpdateAlert {
  setModal: () => void
  mode: 'stores' | 'base-stores'
}

const AddressUpdate = (props: IAddressUpdateAlert) => {
  const { mode, setModal } = props

  return (
    <Alert color='yellow' title='Atualização de Endereço'>
      O Endereço deste PDV foi alterado na Receita Federal.
      {mode === 'base-stores'
        ? ' Verifique a mudaça para fazer a alteração.'
        : ' Contacte o Administrador.'}
      {mode === 'base-stores' && (
        <S.Link onClick={setModal}>Verificar Mudança</S.Link>
      )}
    </Alert>
  )
}

export default AddressUpdate
