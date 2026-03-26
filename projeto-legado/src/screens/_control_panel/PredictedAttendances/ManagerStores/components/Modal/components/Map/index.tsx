import React, { useCallback, useEffect, useState } from 'react'

import { Loader } from 'semantic-ui-react'

import GoogleMap from '../../../../../../../../components/GoogleMap'
import * as Styled from '../styled'

import { ComponentProps, DataInterface } from './interface'
import { getCoordinates } from './services'
import * as S from './styles'

export function Map({ static_attendences_id, type }: ComponentProps) {
  const [data, setData] = useState<DataInterface>({} as DataInterface)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getCoordinates(245)
      console.log(response)
      setData(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <React.Fragment>
      {loading || Object.keys(data).length === 0 ? (
        <Styled.LoaderContainer>
          <Loader active />
        </Styled.LoaderContainer>
      ) : (
        <S.Wrapper>
          <GoogleMap
            markers={[
              {
                lat: data.store_lat,
                lng: data.store_lng,
                circle: {
                  radius: data.store_radius,
                },
              },
              {
                lat:
                  type === 'check_in' ? data.check_in_lat : data.check_out_lat,
                lng:
                  type === 'check_in' ? data.check_in_lng : data.check_out_lng,
                icon: 'check-ok',
                circle: {
                  radius:
                    type === 'check_in'
                      ? data.check_in_radius
                      : data.check_out_radius,
                  options: {
                    fillColor: '#66BB6A',
                    strokeColor: '#66BB6A',
                  },
                },
              },
            ]}
            containerStyles={{
              width: '100%',
              height: '273px',
            }}
            loadingElement={<Styled.Map height='273px' />}
            hideUI
            defaultOptions={{ gestureHandling: 'none' }}
          />
        </S.Wrapper>
      )}
    </React.Fragment>
  )
}
