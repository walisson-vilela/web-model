import React, { useCallback, useEffect, useRef, useState } from 'react'

import { AiOutlineFilePdf } from 'react-icons/ai'
import { useReactToPrint } from 'react-to-print'
import { Button, Loader } from 'semantic-ui-react'

import { ComponentProps } from './interfaces'
import { getData as request } from './services'
import * as S from './styles'

export function PrivacyPolicity(props: ComponentProps) {
  const modalRef = useRef(null)
  const { onClose, data: propsData, tabId } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [content, setContent] = useState('')
  const [data, setData] = useState([])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await request(propsData.id)
      setData(response.data)
    } catch (error) {
      console.log('Não foi possível carregar o termo')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      setContent(data[0].content)
    }
  }, [data])

  const makePDF = useReactToPrint({
    content: () => modalRef.current,
    documentTitle: 'Termos de Uso',
  })

  return (
    <S.Container>
      <S.Header>
        <strong>
          {tabId === 0 ? 'Termos de Uso' : 'Política de Privacidade'}
        </strong>
        <div>
          <span>
            Conta: <b> {propsData.accountName} </b> | Publicação:
            <b> {propsData.createdAt}</b>
          </span>
          <AiOutlineFilePdf
            size={20}
            color={loading ? '#ccc' : '#000'}
            onClick={loading ? () => {} : makePDF}
          />
        </div>
      </S.Header>
      <S.Main>
        {loading ? (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        ) : (
          <div ref={modalRef}>
            {content.length > 0 && (
              <React.Fragment>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <p> HASH: {data[0].hash}</p>
              </React.Fragment>
            )}
          </div>
        )}
      </S.Main>
      <S.Footer>
        <Button
          size='tiny'
          content='Ok'
          primary
          onClick={onClose}
          disabled={loading}
        />
      </S.Footer>
    </S.Container>
  )
}
