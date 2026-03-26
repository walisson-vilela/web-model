import Alert from '../Alert'

const Invalid = () => {
  return (
    <Alert color='red' title='Incompatibilidade de Endereço'>
      O Endereço do CNPJ e do cadastro são divergentes. Inclua um CNPJ correto
      ou contate o Suporte.
    </Alert>
  )
}

export default Invalid
