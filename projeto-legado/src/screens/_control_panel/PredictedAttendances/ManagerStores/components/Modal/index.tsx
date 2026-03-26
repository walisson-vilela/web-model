import React, { useCallback, useEffect, useState } from 'react'

import { Button, Loader } from 'semantic-ui-react'

import MwTabs from '../../../../../../components/Tabs'

import { Context } from './context'
import { ComponentProps, DataProps } from './interfaces'
import { getStoresDetails as request } from './services'
import * as S from './styles'

export function Modal(props: ComponentProps) {
  const { title, onClose, options } = props.data
  const [data, setData] = useState<DataProps>({} as DataProps)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [attempts, setAttempts] = useState(0)

  const loadData = useCallback(async () => {
    try {
      const response = await request(212051)
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
  }, [])

  options[1].label = `Tentativa${attempts > 1 ? 's' : ''} e erro${
    attempts > 1 ? 's' : ''
  } (${attempts})`

  return (
    <Context.Provider value={{ attempts, setAttempts }}>
      <S.Modal open size='large'>
        <S.ModalHeader> {title} </S.ModalHeader>
        <S.Main>
          {loading ? (
            <S.LoaderContainer>
              <Loader active />
            </S.LoaderContainer>
          ) : (
            <S.Wrapper>
              <strong>{data.company_name || ''} </strong>
              <p>{data.formatted_address || ''}</p>
              <MwTabs
                active={{
                  active: activeTab,
                  setActive: setActiveTab,
                }}
                options={options}
              />
              <S.MainContent> {options[activeTab].component} </S.MainContent>
            </S.Wrapper>
          )}
        </S.Main>
        <S.Footer>
          <Button primary onClick={() => onClose()} disabled={loading}>
            Ok
          </Button>
        </S.Footer>
      </S.Modal>
    </Context.Provider>
  )
}
