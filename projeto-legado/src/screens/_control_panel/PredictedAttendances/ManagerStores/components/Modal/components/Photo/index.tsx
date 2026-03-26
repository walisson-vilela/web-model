import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Loader } from 'semantic-ui-react'

import { Context } from '../../context'

import { ComponentProps, DataInterface } from './interfaces'
import { getPhoto as request } from './services'
//import camera from "../icons/check_foto.svg";
import * as S from './styles'

export function Photo({ type, id }: ComponentProps) {
  const { attempts, setAttempts } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataInterface>({} as DataInterface)

  console.log(data)
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await request(id)
      setData(response)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [])

  return (
    <S.Wrapper>
      {loading ? (
        <S.Container>
          <Loader active />
        </S.Container>
      ) : (
        <S.ImgWrapper>
          {data[type] === null ? (
            <S.EmptyImage>
              <p> A imagem ainda não esta disponível.</p>{' '}
            </S.EmptyImage>
          ) : (
            <img src={data[type]} alt='imagem de check' />
          )}
        </S.ImgWrapper>
      )}

      {/**
       *  <span>
        Percentual reconhecimento entre as imagens do executor: <S.Bullet />
        10,3%
        <img src={camera} alt="camera" className="camera-icon" />
      </span>
       */}
    </S.Wrapper>
  )
}
