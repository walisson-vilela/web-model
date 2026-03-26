import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Accordion, Icon, Loader } from 'semantic-ui-react'

import GoogleMap from '../../../../../../../../components/GoogleMap'
import { Context } from '../../context'
import * as Styled from '../styled'

import { AttempsData, ComponentProps } from './interfaces'
import { getAttempts as request } from './services'
import * as S from './styles'

export function Attempts({ id, provider }: ComponentProps) {
  const { setAttempts } = useContext(Context)
  const [data, setData] = useState<AttempsData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeAccordions, setActiveAccordions] = useState<number[]>([])

  const loadAttempts = useCallback(async () => {
    try {
      const responseData = await request(id, provider)
      setData(responseData)
      setAttempts(responseData.length)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAttempts()
  }, [])

  useEffect(() => {
    setActiveAccordions([])
  }, [data])

  const onClickAccordion = (event: React.MouseEvent, index: number) => {
    if (!(event.target instanceof HTMLElement)) return

    let element = event.target
    while (element) {
      if ('accordionContent' in element.dataset) return
      element = element.parentElement
    }

    setActiveAccordions((prev) => {
      const i = prev.indexOf(index)

      const r = [...prev]

      i === -1 ? r.push(index) : r.splice(i, 1)

      return r
    })
  }

  return (
    <S.Container>
      {loading ? (
        <Styled.LoaderContainer>
          <Loader active />
        </Styled.LoaderContainer>
      ) : (
        <S.Container>
          {data.length > 0 ? (
            <Accordion>
              {data.map((item, index) => {
                const active = activeAccordions.includes(index)

                return (
                  <React.Fragment key={index}>
                    <S.AccordionTitleContainer>
                      <Accordion.Title
                        active={active}
                        index={index}
                        onClick={(event: React.MouseEvent) =>
                          onClickAccordion(event, index)
                        }
                      >
                        <Icon name='dropdown' />
                        {item.data_attempt}
                      </Accordion.Title>

                      <Accordion.Content
                        active={active}
                        data-accordion-content=''
                      >
                        <GoogleMap
                          markers={[
                            {
                              lat: item.store_lat,
                              lng: item.store_lng,
                              circle: {
                                radius: item.store_radius,
                              },
                            },
                            {
                              lat: item.attempt_lat,
                              lng: item.attempt_lng,
                              icon: 'check-attempt',
                              circle: {
                                radius: item.attempt_radius,
                                options: {
                                  fillColor: '#BB6693',
                                  strokeColor: '#BB6691',
                                },
                              },
                            },
                          ]}
                          containerStyles={{
                            width: '100%',
                            height: '200px',
                          }}
                          loadingElement={<Styled.Map />}
                          hideUI
                        />
                      </Accordion.Content>

                      <p
                        onClick={(event: React.MouseEvent) =>
                          onClickAccordion(event, index)
                        }
                      >
                        Precisão da Coordenada {item.attempt_distance} m |
                        Distancia entre os pontos centrais do raios:{' '}
                        {item.attempt_distance} m
                      </p>
                    </S.AccordionTitleContainer>
                  </React.Fragment>
                )
              })}
            </Accordion>
          ) : (
            <S.EmptyMessage>
              <p>Nenhum registro encontrado.</p>
            </S.EmptyMessage>
          )}
        </S.Container>
      )}
    </S.Container>
  )
}
