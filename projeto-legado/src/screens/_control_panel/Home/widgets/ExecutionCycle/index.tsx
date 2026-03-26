import { useCallback, useEffect, useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { ChartCard } from '../../components'
import { useControlPanelContext } from '../../context'

import { getData } from './services'
import { Content, PopupContent } from './styles'

const ExecutionCycle = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { execution_cycle: data },
      setData,
    },
  } = useControlPanelContext()

  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data: responseData } = await getData(hierarchy, regions, teams)

      if (isObject(responseData)) {
        setData((prev) => ({ ...prev, execution_cycle: responseData }))
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [lastRefresh])

  useEffect(() => {
    if (!data || !firstRender) loadData()
  }, [loadData])

  return (
    <ChartCard
      half
      title='Tarefas por Ciclo de Execuções'
      action={() => history.push('/main/dev/task-manager')}
      paddingless
      chart={
        data && (
          <Content>
            <div>
              <p>{data.realized}%</p>
              <p>Realizado</p>
            </div>

            <div>
              <p>
                <span>{data.planned}%</span>

                <Popup
                  on='click'
                  wide
                  inverted
                  className='popup-field'
                  trigger={
                    <MwIcon
                      type='semantic'
                      icon='chevron down'
                      width='12px'
                      color='#c3c3c3'
                    />
                  }
                  header='Tarefas por ciclo de execuções'
                  content={
                    <PopupContent>
                      <thead>
                        <tr>
                          <td></td>
                          <th>Realizada</th>
                          <th>Alcance</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <th>Diária</th>
                          <td>{data.planned}%</td>
                          <td>{data.planned}%</td>
                        </tr>

                        <tr>
                          <th>Semanal</th>
                          <td>{data.planned}%</td>
                          <td>{data.planned}%</td>
                        </tr>

                        <tr>
                          <th>Quinzenal</th>
                          <td>{data.planned}%</td>
                          <td>{data.planned}%</td>
                        </tr>

                        <tr>
                          <th>Mensal</th>
                          <td>{data.planned}%</td>
                          <td>{data.planned}%</td>
                        </tr>

                        <tr>
                          <th>Demais</th>
                          <td>{data.planned}%</td>
                          <td>{data.planned}%</td>
                        </tr>
                      </tbody>
                    </PopupContent>
                  }
                />
              </p>

              <p>Alcance sobre planejado</p>
            </div>
          </Content>
        )
      }
    />
  )
}

export default ExecutionCycle
