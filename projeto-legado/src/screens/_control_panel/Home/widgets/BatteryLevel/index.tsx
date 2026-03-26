import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import Bullet from '../../../../../components/Bullet'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { BorderedCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'
import { PopupContent, Wrapper } from '../../styles'
import { isValidHeadlight } from '../../widgets/validators'

import { getData } from './services'
import { Content } from './styles'

const BatteryLevel = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { battery_level: data },
      setData,
    },
  } = useControlPanelContext()

  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data: responseData } =
        !data || !firstRender
          ? await getData(hierarchy, regions, teams)
          : { data }

      if (isObject(responseData)) {
        setData((prev) => ({ ...prev, battery_level: responseData }))
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

  const getColorByPercentual = () => {
    if (data) {
      const findElement = data.headlights.find((item) =>
        isValidHeadlight(data.medium_percentage, item.starts_at, item.ends_at),
      )
      return findElement.color
    }
  }

  return (
    <BorderedCard
      color={getColorByPercentual()}
      action={() => history.push('/main/home/control-panel/battery-level')}
      popup={{
        title: 'Consumo Médio',
        content: (
          <PopupContent direction='column'>
            {data &&
              data.headlights.length > 0 &&
              data.headlights.map((item) => (
                <Bullet
                  key={String(item)}
                  color={item.color}
                  content={
                    <Wrapper>
                      {item.starts_at}% - {item.ends_at}%
                    </Wrapper>
                  }
                />
              ))}
          </PopupContent>
        ),
      }}
      content={{
        top:
          !data || loading ? (
            <Placeholder header={1} paragraph={1} />
          ) : (
            <Content>
              <p>
                <b>Nível da bateria</b>
              </p>

              <p>
                Alto: {data.high} ({data.high_percentage}%) | Médio:{' '}
                {data.medium} ({data.medium_percentage}%) | Baixo: {data.low} (
                {data.low_percentage}%)
              </p>
            </Content>
          ),
        bottom:
          !data || loading ? (
            <Placeholder.Footer />
          ) : (
            <span>
              Consumo médio atual: {data.average_consumption}% por hora
            </span>
          ),
      }}
    />
  )
}

export default BatteryLevel
