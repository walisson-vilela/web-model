import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import Bullet from '../../../../../components/Bullet'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { BorderedCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'
import * as S from '../../styles'
import { PopupContent } from '../../styles'
import { isValidHeadlight } from '../../widgets/validators'

import { getData } from './services'
import { Content } from './styles'

const DisconnectedUsers = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { disconnected_users: data },
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
        setData((prev) => ({ ...prev, disconnected_users: responseData }))
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
        isValidHeadlight(
          data.attendance_not_started_percentage,
          item.starts_at,
          item.ends_at,
        ),
      )
      return findElement.color
    }
  }

  return (
    <BorderedCard
      color={getColorByPercentual()}
      action={() => history.push('/main/home/control-panel/disconnected-users')}
      popup={{
        title: 'Aderência no Atendimento',

        content: (
          <PopupContent direction='column'>
            {data &&
              data.headlights.length > 0 &&
              data.headlights.map((item) => (
                <Bullet
                  color={item.color}
                  content={
                    <S.Wrapper>
                      {item.starts_at}% - {item.ends_at}%
                    </S.Wrapper>
                  }
                />
              ))}
          </PopupContent>
        ),
      }}
      content={{
        top:
          !data || loading ? (
            <Placeholder header={1} paragraph={2} />
          ) : (
            <Content>
              <p>
                <b>Usuários ativos descontectados</b>
              </p>

              <p>
                Iniciou atendimento: {data.attendance_started}/
                {data.total_users} (
                {Number(data.attendance_started_percentage.toFixed(2))}%)
              </p>

              <p>
                Não iniciou atendimento: {data.attendance_not_started}/
                {data.total_users} (
                {Number(data.attendance_not_started_percentage.toFixed(2))}%)
              </p>
            </Content>
          ),
        bottom:
          !data || loading ? (
            <Placeholder.Footer />
          ) : (
            <span>
              + 2 horas ({data.two_hours}) | + 4 horas ({data.four_hours}) | + 1
              dia ({data.twenty_four_hours})
            </span>
          ),
      }}
    />
  )
}

export default DisconnectedUsers
