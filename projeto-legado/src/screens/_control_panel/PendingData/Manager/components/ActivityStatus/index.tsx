import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { Loader, Popup } from 'semantic-ui-react'

import Bullet from '../../../../../../components/Bullet'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { connectionLevel } from '../../labels'

import { DataInterface } from './interfaces'
import { getFailsData } from './service'
import * as S from './styles'

interface Props {
  status: string
  id: number
}

const ActivityStatus = ({ status, id }: Props) => {
  const convertStatus = status === 'Ruim' ? 1 : status === 'Moderada' ? 2 : 3
  const [data, setData] = useState<DataInterface>()
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      const request = await getFailsData(id)
      setData(request)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  return convertStatus === 1 ? (
    <S.Content>
      <S.Text>{connectionLevel[convertStatus].name}</S.Text>
      <Popup
        pinned
        position='left center'
        className='popup-field'
        on='click'
        trigger={
          <S.Container
            onClick={() => {
              setLoading(true)
              getData()
            }}
          >
            <Bullet color={connectionLevel[convertStatus].color} content=' ' />
          </S.Container>
        }
        content={
          <S.PopupContent>
            {loading ? (
              <S.LoaderContainer>
                <Loader active inverted />
              </S.LoaderContainer>
            ) : (
              data && (
                <React.Fragment>
                  <span>
                    Data da analise:{' '}
                    {data.notification_date ? data.notification_date : ''}
                  </span>
                  <S.Fails>
                    <span>Percentual de falhas</span>
                    <S.Percentage>
                      <strong>
                        {data.fails_percentage
                          ? data.fails_percentage.toString().replace('.', ',') +
                            '%'
                          : '0%'}
                      </strong>
                      <span>
                        ({data.fails_count ? data.fails_count : '0'}/
                        {data.attempts_count ? data.attempts_count : ''})
                      </span>
                    </S.Percentage>
                  </S.Fails>
                </React.Fragment>
              )
            )}
          </S.PopupContent>
        }
      />
    </S.Content>
  ) : (
    <S.ContainerNonClickable>
      <S.Text>{connectionLevel[convertStatus].name}</S.Text>
      <Bullet color={connectionLevel[convertStatus].color} content=' ' />
    </S.ContainerNonClickable>
  )
}

export default ActivityStatus
