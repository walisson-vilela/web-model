import useHomeContext from '../../../../standardized/pages/Home/context'
import useContext from '../../context'
import * as S from '../../styled'

const SystemData = (): JSX.Element => {
  const { data } = useContext()

  const {
    contractor: { account_id },
  } = useHomeContext()

  return (
    <S.SubSection>
      <S.Title>Dados do Sistema</S.Title>

      <S.ItemBasic>
        <b>ID da Conta:</b> <span>{account_id || '-'}</span>
      </S.ItemBasic>

      <S.ItemBasic>
        <b>Usuário:</b> <span>{data.username || '-'}</span>
      </S.ItemBasic>

      <S.ItemBasic style={{ marginBottom: 0 }}>
        <b>ID Giv:</b> <span>{data.id || '-'} </span>
      </S.ItemBasic>
    </S.SubSection>
  )
}

export default SystemData
