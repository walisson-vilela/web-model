import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { ChartCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'

import Humor3 from './assets/humor_icon_amarela.svg'
import Humor2 from './assets/humor_icon_laranja.svg'
import Humor4 from './assets/humor_icon_verde_claro.svg'
import Humor5 from './assets/humor_icon_verde_escuro.svg'
import Humor1 from './assets/humor_icon_vermelho.svg'
import { getData } from './services'
import { Content } from './styles'

const Humor = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { humor: data },
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
        setData((prev) => ({ ...prev, humor: responseData }))
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
      title='Humor'
      paddingless
      action={() => history.push('/main/home/control-panel/humor')}
      chart={
        data && (
          <Content>
            <div>
              <img src={Humor1} />

              {!data || loading ? (
                <Placeholder.Footer size={20} />
              ) : (
                <p>{data.classification_1}</p>
              )}
            </div>

            <div>
              <img src={Humor2} />

              {!data || loading ? (
                <Placeholder.Footer size={20} />
              ) : (
                <p>{data.classification_2}</p>
              )}
            </div>

            <div>
              <img src={Humor3} />

              {!data || loading ? (
                <Placeholder.Footer size={20} />
              ) : (
                <p>{data.classification_3}</p>
              )}
            </div>

            <div>
              <img src={Humor4} />

              {!data || loading ? (
                <Placeholder.Footer size={20} />
              ) : (
                <p>{data.classification_4}</p>
              )}
            </div>

            <div>
              <img src={Humor5} />

              {!data || loading ? (
                <Placeholder.Footer size={20} />
              ) : (
                <p>{data.classification_5}</p>
              )}
            </div>
          </Content>
        )
      }
    />
  )
}

export default Humor
