import { cnpj, notEmptyStringOrDefault } from '../../../../utils/Formatters'
import { notEmptyString } from '../../../../utils/Validators'
import useContext from '../../context'
import * as S from '../../styled'

const People = () => {
  const { data } = useContext()

  return (
    <S.SubSection style={{ fontSize: 16, color: '#192338CC' }}>
      <S.Title>Dados Pessoa Jurídica</S.Title>

      <S.Item>
        <b>CNPJ:</b>{' '}
        <span style={{ color: '#19233880' }}>
          {notEmptyString(data.document) ? cnpj(data.document) : '-'}
        </span>
      </S.Item>

      <S.Item>
        <b>Razão social:</b>{' '}
        <span style={{ color: '#19233880' }}>{data.company_name}</span>
      </S.Item>

      <S.Item>
        <b>Nome fantasia:</b>{' '}
        <span style={{ color: '#19233880' }}>{data.name}</span>
      </S.Item>

      <S.Item>
        <b>Inscrição estadual:</b>{' '}
        <span style={{ color: '#19233880' }}>
          {notEmptyStringOrDefault(data.state_registration, '-')}
        </span>
      </S.Item>

      <S.Item>
        <b>Inscrição municipal:</b>{' '}
        <span style={{ color: '#19233880' }}>
          {notEmptyStringOrDefault(data.municipal_registration, 'N/A')}
        </span>
      </S.Item>

      <S.Item style={{ marginBottom: 0 }}>
        <b>Classificação:</b>{' '}
        <span style={{ color: '#19233880' }}>
          {notEmptyStringOrDefault(data.category && data.category.name, 'N/A')}
        </span>
      </S.Item>
    </S.SubSection>
  )
}

export default People
