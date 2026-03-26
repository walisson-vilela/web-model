import React, { useCallback, useEffect, useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Checkbox, Loader } from 'semantic-ui-react'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { listClassificationsImage } from '../../../service'
import Observation from '../Observation'

import {
  ClassificationProps,
  PopUpSelectConfirmationProps,
  StatusData,
} from './interface'
import * as S from './style'

interface item {
  id: number
  name: string
}

const PopUpSelectConfirmation = (props: PopUpSelectConfirmationProps) => {
  const { type, closePopUp, image_id, handleConfirmation } = props

  const [loadingConfirmation, setLoadingConfirmation] = useState<boolean>(false)
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false)
  const [observation, setObservation] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [searchInput, setSearchInput] = useState('')
  const [statusData, setStatusData] = useState<StatusData>()
  const [checked, setChecked] = useState<item>({ id: -1, name: '' })
  const [optionsClassifications, setOptionsClassifications] = useState<
    ClassificationProps[]
  >([])

  const loadingOptionsData = useCallback(async () => {
    setLoadingOptions(true)
    const id = type === 2 ? 11 : 10
    try {
      const response = await listClassificationsImage(id, search)
      if (response) {
        setOptionsClassifications(response)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingOptions(false)
    }
  }, [search])

  useEffect(() => {
    loadingOptionsData()
  }, [loadingOptionsData])

  const handleSelectConfirmation = async () => {
    setLoadingConfirmation(true)
    if (observation) {
      const response = await handleConfirmation(image_id, statusData)
      if (!response) {
        setLoadingConfirmation(false)
      }
    }
    if (type !== 0) {
      setObservation(true)
      setLoadingConfirmation(false)
    }
  }

  const handleResetData = () => {
    setObservation(false)
  }

  useEffect(() => {
    setStatusData({
      ids: [image_id],
      notes: '',
      reason_id: checked.id,
      status: type,
    })
    if (checked.id !== -1) {
      setObservation(true)
    }
  }, [checked])

  const submit = () => setSearch(searchInput)
  const clear = () => {
    setSearch('')
    setSearchInput('')
  }

  return (
    <S.Container>
      <S.Title>
        {type === 1 ? (
          <strong>Status: Aprovado</strong>
        ) : (
          <strong>Status: Reprovar</strong>
        )}
      </S.Title>

      <S.Content>
        {loadingConfirmation && (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        )}
        {observation ? (
          <Observation
            name={checked.name}
            statusData={statusData}
            setStatusData={setStatusData}
            handleResetData={handleResetData}
          />
        ) : (
          <React.Fragment>
            <S.Header>
              <MwInput
                type='search'
                placeholder='Pesquisar'
                value={searchInput}
                setValue={setSearchInput}
                onPressEnter={submit}
                clearable={
                  search !== '' && searchInput === search ? clear : undefined
                }
                icon={{
                  icon: {
                    type: 'feather',
                    icon: 'search',
                    onClick: submit,
                  },
                }}
              />
            </S.Header>
            <S.List>
              {!loadingOptions ? (
                optionsClassifications.map((item) => (
                  <Checkbox
                    className='checkTransferRadio'
                    key={item.id}
                    radio
                    checked={checked.id === item.id}
                    label={item.name}
                    onClick={() => setChecked(item)}
                  />
                ))
              ) : (
                <Loader active />
              )}
            </S.List>
          </React.Fragment>
        )}
      </S.Content>
      <S.Footer>
        <MwButton
          appearance='borderless'
          content={'Cancelar'}
          onClick={() => closePopUp()}
        />
        <MwButton
          appearance='solid'
          content={'Aplicar'}
          loading={loadingConfirmation}
          disabled={checked.id === -1}
          onClick={
            checked.id === -1 && observation
              ? handleResetData
              : handleSelectConfirmation
          }
          style={{ width: '105px' }}
        />
      </S.Footer>
    </S.Container>
  )
}

export default PopUpSelectConfirmation
