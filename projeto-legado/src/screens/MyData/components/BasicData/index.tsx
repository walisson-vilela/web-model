import moment from 'moment'

import { notEmptyStringOrDefault } from '../../../../standardized/utils/formatters'
import { cpf, pis } from '../../../../utils/Formatters'
import useContext from '../../context'
import * as S from '../../styled'

const BasicData = (): JSX.Element => {
  const { data } = useContext()

  return (
    <S.SubSection>
      <S.Title>Dados Pessoais</S.Title>

      <S.ItemBasic>
        <b>Nome:</b> <span> {notEmptyStringOrDefault(data.name, '-')} </span>
      </S.ItemBasic>

      <S.ItemBasic>
        <b>CPF:</b> <span> {data.document ? cpf(data.document) : '-'}</span>
      </S.ItemBasic>

      <S.ItemBasic>
        <b>PIS:</b> <span>{data.pis ? pis(data.pis) : '-'}</span>
      </S.ItemBasic>

      <S.ItemBasic>
        <b>Data de Nascimento:</b>
        <span>
          {' '}
          {data.birthday
            ? moment(data.birthday).add(3, 'hours').format('DD/MM/YYYY')
            : '-'}{' '}
        </span>
      </S.ItemBasic>

      <S.ItemBasic>
        <b>Matrícula:</b> <span>{notEmptyStringOrDefault(data.re, '-')}</span>
      </S.ItemBasic>

      <S.ItemBasic>
        <b>Data de Admissão:</b>
        <span>
          {' '}
          {data.admission
            ? moment(data.admission).add(3, 'hours').format('DD/MM/YYYY')
            : '-'}{' '}
        </span>
      </S.ItemBasic>
      <S.ItemBasic style={{ marginBottom: 0 }}>
        <b> Setor de Trabalho:</b>{' '}
        <span> {notEmptyStringOrDefault(data.sector, '-')}</span>
      </S.ItemBasic>
    </S.SubSection>
  )
}

export default BasicData
