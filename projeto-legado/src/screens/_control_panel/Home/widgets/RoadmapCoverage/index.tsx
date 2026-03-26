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

const RoadmapCoverage = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { roadmap_coverage: data },
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
        setData((prev) => ({ ...prev, roadmap_coverage: responseData }))
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
      ? data.covered_routes_percentual === 100
        ? '#4CAF50'
        : '#E23851'
      : '#FFFFFF'

  const getColorByPercentual = () => {
    if (data) {
      const findElement = data.headlights.find((item) =>
        isValidHeadlight(
          data.covered_routes_percentual,
          item.starts_at,
          item.ends_at,
        ),
      )
      return findElement && findElement.color
    }
  }

  return (
    <BorderedCard
      color={getColorByPercentual()}
      action={() => history.push('/main/home/control-panel/roadmap-coverage')}
      popup={{
        title: 'Cobertura dos Roteiros',
        content: (
          <PopupContent direction='column'>
            {data &&
              data.headlights.length > 0 &&
              data.headlights.map((item) => (
                <Bullet
                  color={item.color}
                  content={
                    <S.Wrapper>{`${item.starts_at}% - ${item.ends_at}%`}</S.Wrapper>
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
                <b>
                  Usuários: Ativos: {data.actives} | Inativo: {data.inactives}{' '}
                  (Total: {data.total_users})
                </b>
              </p>

              <p>
                Roteiros: Cobertos: {data.covered_routes} | Descobertos:{' '}
                {data.uncovered_routes} (Total: {data.total_routes})
              </p>

              <p>Usuários ativos sem roteiro: {data.actives_without_route}</p>
            </Content>
          ),
        bottom:
          !data || loading ? (
            <Placeholder.Footer />
          ) : (
            <span>
              Cobertura dos roteiros:{' '}
              <Colored color={getColor()}>
                {data.covered_routes_percentual}%
              </Colored>{' '}
              ({data.covered_routes}/{data.total_routes})
            </span>
          ),
      }}
    />
  )
}

export default RoadmapCoverage
