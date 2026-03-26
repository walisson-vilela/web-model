import { Icon, Popup } from 'semantic-ui-react'

import {
    notEmptyStringOrDefault,
    numberOrDefault
} from '../../../../../utils/Formatters'

import { Link } from '../../styles'

import * as P from '../StoreManager/styles'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const executorName = notEmptyStringOrDefault(e.name)
    const visitCount = notEmptyStringOrDefault(e.visit_count)

    return {
      id: numberOrDefault(e.id),
      name: executorName ? (
        <Popup
          on='click'
          style={{ padding: 0 }}
          position='left center'
          offset={[-12, 0]}
          trigger={<Link>{executorName}</Link>}
          content={
            <P.ExecutorPopup>
              <P.ExecutorTop>
                <P.ExecutorAvatar />

                <div>
                  <P.ExecutorName>{executorName}</P.ExecutorName>
                  <P.ExecutorMeta>Função: Promotor | Matricula: 150689</P.ExecutorMeta>
                  <P.ExecutorMeta>CPF: 014.681.685-70 | RE: 10457845</P.ExecutorMeta>
                </div>

                <P.ExecutorIpa>
                  <P.ExecutorIpaLabel>I.P.A</P.ExecutorIpaLabel>
                  <P.ExecutorIpaValue>53,2 %</P.ExecutorIpaValue>
                </P.ExecutorIpa>
              </P.ExecutorTop>

              <P.ExecutorRows>
                <P.ExecutorRow>
                  <P.ExecutorLabel>Endereço:</P.ExecutorLabel>
                  <P.ExecutorValue>
                    Avenida: João Cesar de Oliveira 2167 - Novo Eldorado
                    <br />
                    Contagem - Minas Gerais - Cep:32044-120
                  </P.ExecutorValue>
                </P.ExecutorRow>

                <P.ExecutorRow>
                  <P.ExecutorLabel>Telefone:</P.ExecutorLabel>
                  <P.ExecutorValue>
                    (31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050
                  </P.ExecutorValue>
                </P.ExecutorRow>

                <P.ExecutorRow>
                  <P.ExecutorLabel>Jornada do dia:</P.ExecutorLabel>
                  <P.ExecutorValue>
                    08:00 as 18:00  -  Pausa Total: 01h e 12 m
                  </P.ExecutorValue>
                </P.ExecutorRow>

                <P.ExecutorRow>
                  <P.ExecutorLabel>Líder direto:</P.ExecutorLabel>
                  <P.ExecutorValue>
                    Eder Feliciano da Silva
                    <br />
                    (31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050
                  </P.ExecutorValue>
                </P.ExecutorRow>

                <P.ExecutorRow>
                  <P.ExecutorLabel>Ultima Conexão:</P.ExecutorLabel>
                  <P.ExecutorValue>hoje (04/12/2020) as 15:00:25</P.ExecutorValue>
                </P.ExecutorRow>
              </P.ExecutorRows>
            </P.ExecutorPopup>
          }
        />
      ) : (
        <>-</>
      ),
      role_name: notEmptyStringOrDefault(e.role_name),
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      route_name: notEmptyStringOrDefault(e.route_name),
      region_name: notEmptyStringOrDefault(e.region_name),
      visit_count: visitCount ? (
        <Popup
          on='click'
          style={{ padding: 0 }}
          position='bottom center'
          trigger={<Link>{visitCount}</Link>}
          content={
            <P.VisitsPopup>
              <P.VisitsPopupHeader>
                <P.VisitsPopupHeaderTop>
                  <P.VisitsPopupTitle>Qtd. Visitas no ciclo</P.VisitsPopupTitle>

                  <P.VisitsPopupSearch>
                    <P.VisitsPopupSearchInput placeholder='Pesquisar' />
                    <P.VisitsPopupSearchIcon>
                      <Icon name='search' />
                    </P.VisitsPopupSearchIcon>
                  </P.VisitsPopupSearch>
                </P.VisitsPopupHeaderTop>

                <P.VisitsPopupSubtitle>
                  Executor: <strong>{executorName || '-'}</strong>
                </P.VisitsPopupSubtitle>
              </P.VisitsPopupHeader>

              <P.VisitsPopupList>
                <P.VisitsPopupItem>
                  <div>
                    <P.VisitsPopupDate>
                      <strong>Data Prevista:</strong> 23/11/22
                    </P.VisitsPopupDate>
                    <P.VisitsPopupTimes>
                      Check-in: 08:30 | Check-out: 12:00
                    </P.VisitsPopupTimes>
                  </div>
                  <P.VisitsPopupStatus>
                    <Icon name='check circle' color='green' />
                  </P.VisitsPopupStatus>
                </P.VisitsPopupItem>

                <P.VisitsPopupItem>
                  <div>
                    <P.VisitsPopupDate>
                      <strong>Data Prevista:</strong> 24/11/22
                    </P.VisitsPopupDate>
                    <P.VisitsPopupTimes>
                      Check-in: 13:30 | Check-out: 15:00
                    </P.VisitsPopupTimes>
                  </div>
                  <P.VisitsPopupStatus>
                    <Icon name='check circle' color='green' />
                  </P.VisitsPopupStatus>
                </P.VisitsPopupItem>

                <P.VisitsPopupItem>
                  <div>
                    <P.VisitsPopupDate>
                      <strong>Data Prevista:</strong> 27/11/22
                    </P.VisitsPopupDate>
                    <P.VisitsPopupTimes>
                      Check-in: --:-- | Check-out: --:--
                    </P.VisitsPopupTimes>
                  </div>
                  <P.VisitsPopupStatus>
                    <Icon name='circle outline' />
                  </P.VisitsPopupStatus>
                </P.VisitsPopupItem>
              </P.VisitsPopupList>
            </P.VisitsPopup>
          }
        />
      ) : (
        <>-</>
      ),
      check: numberOrDefault(e.check),
      task_percent:
        e.task_percent === null || e.task_percent === undefined
          ? null
          : `${e.task_percent}%`,
    }
  })
}

export default parser
