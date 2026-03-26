import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import Bullet from '../../../../../components/Bullet'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { BorderedCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'
import { PopupContent, Wrapper } from '../../styles'
import { isValidHeadlight } from '../validators'

import { getData } from './services'
import { Content } from './styles'

const PendingData = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { pending_data: data },
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
        setData((prev) => ({ ...prev, pending_data: responseData }))
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
          data.impacted_users_percentage,
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
      action={() => history.push('/main/home/control-panel/pending-data')}
      popup={{
        title: 'Usuários Impactados',
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
                <b>Dados pendentes de transmissão</b>
              </p>

              <p>
                Pesquisa: {data.data_count} | Foto: {data.images_count}
              </p>
            </Content>
          ),
        bottom:
          !data || loading ? (
            <Placeholder.Footer />
          ) : (
            <span>Impactados: {data.impacted_users} usuários</span>
          ),
      }}
    />
  )
}

export default PendingData
