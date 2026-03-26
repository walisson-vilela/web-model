import { EllipsisContainer } from '@mw-kit/mw-manager'
import { isArray } from 'lodash'
import { Table } from 'semantic-ui-react'

import { ModalState } from '../../../../components/MwModal'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { SetState } from '../../../interfaces'
import { ClientLicenses, ContractInfoInterface } from '../../interfaces'
import * as S from '../../styled'

import LicenseDistribution from './LicenseDistribution'

interface ContractInfoProps {
  data: ContractInfoInterface
  setModal: SetState<ModalState>
}

const ContractInfo = ({ data, setModal }: ContractInfoProps) => {
  const openLicensesDistribution = (data: ClientLicenses) => {
    const modalProps = {
      setOpen: () => setModal(null),
      dataBasics: {
        id: data.id,
        type: data.type,
        type_text: data.type_text,
        total: data.total,
        reserved: data.reserved,
        consumed: data.consumed,
      },
    }

    setModal(<LicenseDistribution {...modalProps} />)
  }
  return (
    <S.SubSection>
      <S.Title>Informações do objeto do contrato</S.Title>

      <S.Table $withBorder>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2} style={{ paddingRight: 14 }}>
              <S.Item style={{ marginTop: 50 }}>
                <EllipsisContainer>
                  <b>Total: </b>
                  <span>
                    {numberOrDefault(data.total_licences, 0)} Licenças
                  </span>
                </EllipsisContainer>
              </S.Item>

              <S.Item2>
                <EllipsisContainer>
                  <b>Mínimo Contratual: </b>
                  <span>
                    {numberOrDefault(data.minimum_licenses, 0)} Licenças
                  </span>
                </EllipsisContainer>
              </S.Item2>
            </Table.Cell>

            <Table.Cell width={3} style={{ padding: '0 14px' }}>
              <S.ContractTitle>Licenças por tipo de acesso</S.ContractTitle>

              <S.ContractItems withTitle style={{ margin: '7px 0 28px 0' }}>
                <span>
                  <b>Tipo de Acesso</b>
                </span>
                <span>
                  <b>Quantidade</b>
                </span>
              </S.ContractItems>

              {isArray(data.client_licenses) &&
                data.client_licenses.map((e, i) => (
                  <S.ContractItems key={i} withTitle>
                    <span>
                      <b>{notEmptyStringOrDefault(e.type_text, '-')}:</b>
                    </span>
                    <span>{numberOrDefault(e.total, 0)}</span>
                  </S.ContractItems>
                ))}
            </Table.Cell>

            <Table.Cell
              width={4}
              style={{ padding: '0 14px', borderRight: 'none' }}
            >
              <span>
                <b>Controle de distribuição e uso das licenças</b>
              </span>

              <S.ContractItems withTitle style={{ margin: '7px 0 28px 0' }}>
                <span style={{ textAlign: 'center' }}>
                  <b>Distribuídas</b>
                </span>
                <span>
                  <b>Utilizadas</b>
                </span>
                <span>
                  <b>% de Uso</b>
                </span>
              </S.ContractItems>

              {isArray(data.client_licenses) &&
                data.client_licenses.map((e, i) => (
                  <S.ContractItems key={i} withLink withTitle>
                    <span
                      style={{ textAlign: 'center' }}
                      onClick={() => openLicensesDistribution(e)}
                    >
                      {numberOrDefault(e.reserved, 0)}
                    </span>

                    <span>{numberOrDefault(e.consumed, 0)}</span>
                    <span>
                      {numberOrDefault(e.consumed_percent.toFixed(2), 0)}%
                    </span>
                  </S.ContractItems>
                ))}
            </Table.Cell>

            <Table.Cell width={4} />
          </Table.Row>
        </Table.Body>
      </S.Table>
    </S.SubSection>
  )
}

export default ContractInfo
