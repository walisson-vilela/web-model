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

const ExceptedAttendances = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { excepted_attendances: data },
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
        setData((prev) => ({ ...prev, excepted_attendances: responseData }))
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

  const getColorByPercentage = () => {
    if (data) {
      const findElement = data.headlights.find((item) =>
        isValidHeadlight(
          data.realized_percentage,
          item.starts_at,
          item.ends_at,
        ),
      )
      return findElement.color
    }
  }
  return (
    <BorderedCard
      color={getColorByPercentage()}
      action={() =>
        history.push('/main/home/control-panel/predicted-attendances')
      }
      popup={{
        title: 'Pontualidade',
        content: (
          <PopupContent direction='column'>
            {data &&
              data.headlights.length > 0 &&
              data.headlights.map((item) => (
                <Bullet
                  key={String(item)}
                  color={item.color}
                  content={
                    <S.Wrapper>
                      {item.starts_at}% - {item.ends_at}%{' '}
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
                <b>Atendimentos: {data.attendances} PDVs</b>
              </p>

              <p>
                Previsto: {data.planned} | Adicionado: {data.added}
              </p>

              <p>
                Em andamento: {data.in_progress} | Justificados:{' '}
                {data.justified}
              </p>
            </Content>
          ),
        bottom:
          !data || loading ? (
            <Placeholder.Footer paragraph={2} />
          ) : (
            <>
              <span>
                Previsto realizado: {data.realized} (
                {data.realized_percentage.toFixed(2)}%)
              </span>

              <span>
                Pontualidade: {data.punctuality_in} (
                {data.punctuality_percentage.toFixed(2)}
                %)
              </span>
            </>
          ),
      }}
    />
  )
}

export default ExceptedAttendances
