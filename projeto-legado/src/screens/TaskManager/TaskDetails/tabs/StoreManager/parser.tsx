import { Icon, Popup } from 'semantic-ui-react'

import {
    notEmptyStringOrDefault,
    numberOrDefault
} from '../../../../../utils/Formatters'
import { Link } from '../../styles'

import { BodyInterface, DataInterface } from './interfaces'
import * as S from './styles'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const storeName = notEmptyStringOrDefault(e.name)
    const executorName = notEmptyStringOrDefault(e.executor_name)
    const visitCount = notEmptyStringOrDefault(e.visit_count)
    const storeId = numberOrDefault(e.id)

    return {
      id: numberOrDefault(e.id),
      name: storeName ? (
        <Popup
          on='click'
          style={{ padding: 0 }}
          position='right center'
          offset={[12, 0]}
          trigger={<Link>{storeName}</Link>}
          content={
            <S.StorePopup>
              <S.StorePopupTop>
                <S.StorePopupId>
                  <strong>ID:</strong> {storeId || '-'}
                </S.StorePopupId>

                <div>
                  <S.StorePopupTitle>
                    Hipermercado Extra Contagem... (08.624.998/0001-07)
                  </S.StorePopupTitle>
                  <S.StorePopupSubtitle>
                    Cash & Carry &gt; GPA - Extra &gt; Hiper
                  </S.StorePopupSubtitle>
                </div>
              </S.StorePopupTop>

              <S.StorePopupRows>
                <S.StorePopupRow>
                  <S.StorePopupLabel>Endereço:</S.StorePopupLabel>
                  <S.StorePopupValue>
                    Avenida: João Cesar de Oliveira 2167 - Novo Eldorado
                    <br />
                    Contagem - Minas Gerais - Cep:32044-120
                  </S.StorePopupValue>
                </S.StorePopupRow>

                <S.StorePopupRow>
                  <S.StorePopupLabel>Telefone:</S.StorePopupLabel>
                  <S.StorePopupValue>(31) 2564-5971 | (31) 3396-0010</S.StorePopupValue>
                </S.StorePopupRow>

                <S.StorePopupRow>
                  <S.StorePopupLabel>Contato PDV:</S.StorePopupLabel>
                  <S.StorePopupValue>Carlos Eduardo Soares da Silva</S.StorePopupValue>
                </S.StorePopupRow>

                <S.StorePopupRow>
                  <S.StorePopupLabel>Historico de visita:</S.StorePopupLabel>
                  <S.StorePopupValue>
                    Total de visitas programadas 1000, sendo 430 realizadas <b>(43%)</b>
                    <br />
                    1° visita: 01/01/2010 as 10:20:00 - João Filho Neto Sampaio
                    <br />
                    Ultima visita: 04/12/2020 as 15:00:10 - Amanda Aparecida Lisb...
                  </S.StorePopupValue>
                </S.StorePopupRow>

                <S.StorePopupRow>
                  <S.StorePopupLabel>Permanência em loja:</S.StorePopupLabel>
                  <S.StorePopupValue>
                    Min: 00h:15 min &nbsp;&nbsp;&nbsp; Media: 00h:55 min &nbsp;&nbsp;&nbsp; Max: 02h:10min
                  </S.StorePopupValue>
                </S.StorePopupRow>
              </S.StorePopupRows>
            </S.StorePopup>
          }
        />
      ) : (
        <>-</>
      ),
      chain_name: notEmptyStringOrDefault(e.chain_name),
      route_name: notEmptyStringOrDefault(e.route_name),
      region_name: notEmptyStringOrDefault(e.region_name),
      executor_name: executorName ? (
        <Popup
          on='click'
          style={{ padding: 0 }}
          position='left center'
          offset={[-12, 0]}
          trigger={<Link>{executorName}</Link>}
          content={
            <S.ExecutorPopup>
              <S.ExecutorTop>
                <S.ExecutorAvatar />

                <div>
                  <S.ExecutorName>{executorName}</S.ExecutorName>
                  <S.ExecutorMeta>Função: Promotor | Matricula: 150689</S.ExecutorMeta>
                  <S.ExecutorMeta>CPF: 014.681.685-70 | RE: 10457845</S.ExecutorMeta>
                </div>

                <S.ExecutorIpa>
                  <S.ExecutorIpaLabel>I.P.A</S.ExecutorIpaLabel>
                  <S.ExecutorIpaValue>53,2 %</S.ExecutorIpaValue>
                </S.ExecutorIpa>
              </S.ExecutorTop>

              <S.ExecutorRows>
                <S.ExecutorRow>
                  <S.ExecutorLabel>Endereço:</S.ExecutorLabel>
                  <S.ExecutorValue>
                    Avenida: João Cesar de Oliveira 2167 - Novo Eldorado
                    <br />
                    Contagem - Minas Gerais - Cep:32044-120
                  </S.ExecutorValue>
                </S.ExecutorRow>

                <S.ExecutorRow>
                  <S.ExecutorLabel>Telefone:</S.ExecutorLabel>
                  <S.ExecutorValue>
                    (31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050
                  </S.ExecutorValue>
                </S.ExecutorRow>

                <S.ExecutorRow>
                  <S.ExecutorLabel>Jornada do dia:</S.ExecutorLabel>
                  <S.ExecutorValue>08:00 as 18:00  -  Pausa Total: 01h e 12 m</S.ExecutorValue>
                </S.ExecutorRow>

                <S.ExecutorRow>
                  <S.ExecutorLabel>Líder direto:</S.ExecutorLabel>
                  <S.ExecutorValue>
                    Eder Feliciano da Silva
                    <br />
                    (31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050
                  </S.ExecutorValue>
                </S.ExecutorRow>

                <S.ExecutorRow>
                  <S.ExecutorLabel>Ultima Conexão:</S.ExecutorLabel>
                  <S.ExecutorValue>hoje (04/12/2020) as 15:00:25</S.ExecutorValue>
                </S.ExecutorRow>
              </S.ExecutorRows>
            </S.ExecutorPopup>
          }
        />
      ) : (
        <>-</>
      ),
      role_name: notEmptyStringOrDefault(e.role_name),
      visit_count: visitCount ? (
        <Popup
          on='click'
          style={{ padding: 0 }}
          position='bottom center'
          trigger={<Link>{visitCount}</Link>}
          content={
            <S.VisitsPopup>
              <S.VisitsPopupHeader>
                <S.VisitsPopupHeaderTop>
                  <S.VisitsPopupTitle>Qtd. Visitas no ciclo</S.VisitsPopupTitle>

                  <S.VisitsPopupSearch>
                    <S.VisitsPopupSearchInput placeholder='Pesquisar' />
                    <S.VisitsPopupSearchIcon>
                      <Icon name='search' />
                    </S.VisitsPopupSearchIcon>
                  </S.VisitsPopupSearch>
                </S.VisitsPopupHeaderTop>

                <S.VisitsPopupSubtitle>
                  PDV: <strong>{storeName || '-'}</strong>
                </S.VisitsPopupSubtitle>
              </S.VisitsPopupHeader>

              <S.VisitsPopupList>
                <S.VisitsPopupItem>
                  <div>
                    <S.VisitsPopupDate>
                      <strong>Data Prevista:</strong> 23/11/22
                    </S.VisitsPopupDate>
                    <S.VisitsPopupTimes>Check-in: 08:30 | Check-out: 12:00</S.VisitsPopupTimes>
                  </div>
                  <S.VisitsPopupStatus>
                    <Icon name='check circle' color='green' />
                  </S.VisitsPopupStatus>
                </S.VisitsPopupItem>

                <S.VisitsPopupItem>
                  <div>
                    <S.VisitsPopupDate>
                      <strong>Data Prevista:</strong> 24/11/22
                    </S.VisitsPopupDate>
                    <S.VisitsPopupTimes>Check-in: 13:30 | Check-out: 15:00</S.VisitsPopupTimes>
                  </div>
                  <S.VisitsPopupStatus>
                    <Icon name='check circle' color='green' />
                  </S.VisitsPopupStatus>
                </S.VisitsPopupItem>

                <S.VisitsPopupItem>
                  <div>
                    <S.VisitsPopupDate>
                      <strong>Data Prevista:</strong> 27/11/22
                    </S.VisitsPopupDate>
                    <S.VisitsPopupTimes>Check-in: --:-- | Check-out: --:--</S.VisitsPopupTimes>
                  </div>
                  <S.VisitsPopupStatus>
                    <Icon name='circle outline' />
                  </S.VisitsPopupStatus>
                </S.VisitsPopupItem>
              </S.VisitsPopupList>
            </S.VisitsPopup>
          }
        />
      ) : (
        <>-</>
      ),
      task_percent: e.task_percent ? e.task_percent + '%' : null,
      reason_not_concluded: notEmptyStringOrDefault(e.reason_not_concluded),
    }
  })
}

export default parser
