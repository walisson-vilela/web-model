import React, { useEffect, useState } from 'react'

import moment from 'moment'
import toast from 'react-hot-toast'
import { Button, Loader, Modal } from 'semantic-ui-react'

import Bullet from '../../../../../../components/Bullet'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'

import Manager from './Manager'
import { activityLabels } from './Manager/labels'
import { DataInterface } from './interface'
import { getData } from './services'
import * as S from './styled'

interface HistoryProps {
  close: () => void
  deviceId: number
}

const History = ({ close, deviceId }: HistoryProps) => {
  /*  return (
    <Modal
      modal={{
        title: "Histórico Atividade Trade Result",
        titleColor: "blue",
        content: (
          <S.Container>
            <div>
              <b>Modelo Device: GAMP10 (Samsung)</b>
              <br />
              Display: 6.5 | Android Pie (9.0)
              <br />
              ICCID: AFDU45123561AP
              <br />
              <S.GrayText>Tempo em operação: 6 meses e 3 dias</S.GrayText>
              <br />
              <S.GrayText>Inicio: 01/06/2020 as 10:00:20</S.GrayText>
              <hr />
              <b>Bateria</b>
              <br />
              Tempo médio de duração: 6h e 32min
              <br />
              Consumo médio do App Trade Result.: 6,3%
              <hr />
              <b>Consolidado do dia</b>
              <br />
              <Bullet color={COLORS.red} content="Imagens Coletadas: 230" />
              <br />
              <Bullet color={COLORS.yellow} content="Pesquisa: 566 Report" />
              <br />
              <Bullet color={COLORS.green} content="Numero de Conexão: 150" />
              <br />
              <Bullet color={COLORS.green} content="Transmissão GPS: 120" />
              <br />
              <Bullet color={COLORS.yellow} content="Apps instalados: 3" />
            </div>
            <div>
              <Manager />
            </div>
          </S.Container>
        ),
        actions: [
          {
            type: "button",
            content: "OK",
            color: "blue",
            onClick: close,
            style: { marginRight: 0 },
          },
        ],
        size: "large",
      }}
    />
  ); */

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<DataInterface>()

  const loadData = async () => {
    try {
      const request = await getData(deviceId)
      setData(request)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  console.log(data)
  return (
    <Modal open size='large'>
      <S.HeaderContainer>
        <strong>Histórico Atividade Giv</strong>
      </S.HeaderContainer>
      <S.Container>
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <S.InformationContainer>
              <S.Information>
                <strong>Modelo Device: {data.model ? data.model : ''}</strong>
                <span>Display: {data.display ? data.display : ''}</span>
                <span>
                  ICCID: {data.device ? data.device.toLocaleUpperCase() : ''}
                </span>
                <S.OperationTime>
                  <span>
                    Tempo em operação:{' '}
                    {data.created_at ? (
                      <span>
                        {' '}
                        {moment(data.created_at).month() + 1} meses e{' '}
                        {moment(data.created_at).day()} dias
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                  <span>
                    Inicio:{' '}
                    {data.created_at ? (
                      <span>
                        {moment(data.created_at).format('DD/MM/YYYY')} as{' '}
                        {moment(data.created_at).format('HH:mm:ss')}
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                </S.OperationTime>
              </S.Information>

              <S.Information>
                <strong>Bateria</strong>
                <span>
                  Tempo médio de duração:{' '}
                  {data.battery_duration ? data.battery_duration : ''}
                </span>
                <span>
                  Consumo médio do App Giv:{' '}
                  {data.average_consumption ? data.average_consumption : ''}
                </span>
              </S.Information>

              <S.Day>
                <Bullet
                  color={activityLabels[0].color}
                  content={`Imagens Coletadas: ${
                    data.collected_registries[0].images || 0
                  }`}
                />
                <Bullet
                  color={activityLabels[1].color}
                  content={`Pesquisa: ${
                    data.collected_registries[0].registries || 0
                  } Report`}
                />
                <Bullet
                  color={activityLabels[2].color}
                  content={`Número de Conexões: ${
                    data.collected_registries[0].connections || 0
                  }`}
                />
                <Bullet
                  color={activityLabels[2].color}
                  content={`Transmissão GPS: ${
                    data.collected_registries[0].coordinates || 0
                  }`}
                />
                <Bullet
                  color={activityLabels[0].color}
                  content={`Apps instalados: ${data.applications_count || 0}`}
                />
              </S.Day>
            </S.InformationContainer>

            <S.ManagerContainer>
              <Manager data={data.battery_levels} />
            </S.ManagerContainer>
          </React.Fragment>
        )}
      </S.Container>
      <Modal.Actions>
        <Button primary content='Ok' onClick={() => close()} />
      </Modal.Actions>
    </Modal>
  )
}

export default History
