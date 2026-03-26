import { EllipsisContainer } from '@mw-kit/mw-manager'

import { notEmptyStringOrDefault } from '../../../../standardized/utils/formatters'
import useContext from '../../context'
import * as S from '../../styled'

const Address = (): JSX.Element => {
  const { data } = useContext()

  return (
    <S.SubSection>
      <S.Title>Endereço</S.Title>

      <S.RowSection>
        <S.Item>
          <EllipsisContainer>
            <b>CEP</b>
          </EllipsisContainer>

          <EllipsisContainer>
            {/*
              <span>{notEmptyString(data.postal_code) ? cep(data.postal_code) : '-'}</span>
          */}
            <span> {notEmptyStringOrDefault(data.postal_code, '-')}</span>
          </EllipsisContainer>
        </S.Item>

        <S.Item>
          <EllipsisContainer>
            <b>Tipo Logradouro</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span> {notEmptyStringOrDefault(data.street_type, '-')}</span>
          </EllipsisContainer>
        </S.Item>

        <S.Item>
          <EllipsisContainer>
            <b>Endereço</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span> {notEmptyStringOrDefault(data.street_address, '-')} </span>
          </EllipsisContainer>
        </S.Item>

        <S.Item>
          <EllipsisContainer>
            <b>Número</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span> {notEmptyStringOrDefault(data.street_number, '-')} </span>
          </EllipsisContainer>
        </S.Item>

        <S.Item>
          <EllipsisContainer>
            <b>Complemento</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span> {data.complement || ' - '} </span>
          </EllipsisContainer>
        </S.Item>
      </S.RowSection>

      <S.RowSection>
        <S.Item style={{ marginBottom: 0 }}>
          <EllipsisContainer>
            <b>Bairro</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span> {notEmptyStringOrDefault(data.sublocality, '-')} </span>
          </EllipsisContainer>
        </S.Item>

        <S.Item style={{ marginBottom: 0 }}>
          <EllipsisContainer>
            <b>Cidade</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span>{notEmptyStringOrDefault(data.city, '-')}</span>
          </EllipsisContainer>
        </S.Item>

        <S.Item style={{ marginBottom: 0 }}>
          <EllipsisContainer>
            <b>UF</b>
          </EllipsisContainer>

          <EllipsisContainer>
            <span> {notEmptyStringOrDefault(data.state, '-')} </span>
          </EllipsisContainer>
        </S.Item>
      </S.RowSection>
    </S.SubSection>
  )
}

export default Address
