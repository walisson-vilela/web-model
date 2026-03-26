import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import Bullet from '../../../../../components/Bullet'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { BorderedCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'
import * as S from '../../styles'
import { Colored, PopupContent } from '../../styles'
import { isValidHeadlight } from '../../widgets/validators'

import { getData } from './services'
import { Content } from './styles'

const NotStartedAttendences = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { not_started_attendances: data },
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
        setData((prev) => ({ ...prev, not_started_attendances: responseData }))
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

  const getColor = () =>
    data
      ? data.adherence_percentage < 75
        ? '#E23851'
        : data.adherence_percentage < 95
        ? '#FBCB01'
        : '#4CAF50'
      : '#FFF'

  const getColorByPercentage = () => {
    if (data) {
      const findElement = data.headlights.find((item) =>
        isValidHeadlight(
          data.adherence_percentage,
          item.starts_at,
          item.starts_at,
        ),
      )
      return findElement.color
    }
  }

  return (
    <BorderedCard
      color={getColorByPercentage()}
      action={() =>
        history.push('/main/home/control-panel/attendances-not-started')
      }
      popup={{
        title: 'Aderência no Atendimento',
        content: (
          <PopupContent direction='column'>
            {data &&
              data.headlights &&
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
            <Placeholder header={1} paragraph={1} />
          ) : (
            <Content>
              <p>
                <b>Não iniciaram atendimento</b>
              </p>

              <p>
                Usuários: {data.without_attendances} / {data.actives}
              </p>
            </Content>
          ),
        bottom:
          !data || loading ? (
            <Placeholder.Footer />
          ) : (
            <span>
              Aderência ao atendimento:{' '}
              <Colored color={getColor()}>{data.adherence_percentage}%</Colored>
            </span>
          ),
      }}
    />
  )
}

export default NotStartedAttendences
