import React, { useCallback, useEffect, useState } from 'react'

import { MwButton, MwIcon, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Loader } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { addListMultipleFavorite, favoriteImage } from '../../../service'

import { DataProps, FavoriteProps, LoginUserProps } from './interface'
import * as S from './style'

const Favorite = (props: FavoriteProps) => {
  const { closePopUp, image_id } = props
  const [selectedValue, setSelectedValue] = useState<number[]>([])
  const [search, setSearch] = useState<string>('')
  const [searchInput, setSearchInput] = useState('')
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [loadingConfirmation, setLoadingConfirmation] = useState<boolean>(false)
  const [data, setData] = useState<DataProps[]>([])
  const [storagedSelected, setStoragedSelected] = useState<number[]>([])

  const loadFavorite = useCallback(async () => {
    try {
      setLoadingData(true)
      const response = await favoriteImage(image_id, search)
      setData(response)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingData(false)
    }
  }, [search])

  useEffect(() => {
    loadFavorite()
  }, [loadFavorite])

  const handleApplyFavorite = async () => {
    setLoadingConfirmation(true)
    const selectedIds = selectedValue.map((item) => item)
    try {
      const parsedData = data.map((item) => {
        const valid = selectedIds.includes(item.id)
        if (valid) {
          return {
            id: item.id,
            in: [image_id],
            out: [],
          }
        } else {
          return {
            id: item.id,
            in: [],
            out: [image_id],
          }
        }
      })

      await addListMultipleFavorite(parsedData)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      //reloadData()
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingConfirmation(false)
      closePopUp()
    }
  }

  const handleChangeValue = (item: DataProps) => {
    if (selectedValue.includes(item.id)) {
      const updateArray = Array.from(selectedValue)
      const updateSelectValue = updateArray.filter((value) => value !== item.id)
      setSelectedValue(updateSelectValue)
    } else {
      setSelectedValue((prev) => [...prev, item.id])
    }
  }

  useEffect(() => {
    data.map((item) =>
      item.file_favorite_items.map((file) => {
        if (file.file_id === image_id) {
          setSelectedValue((prev) => [...prev, item.id])
          setStoragedSelected((prev) => [...prev, item.id])
        }
      }),
    )
  }, [data])

  const userId: LoginUserProps = JSON.parse(localStorage.getItem('_GIV_LOGIN'))

  const submit = () => setSearch(searchInput)
  const clear = () => {
    setSearch('')
    setSearchInput('')
  }

  return (
    <S.Container>
      <S.Title>
        <strong>Favoritos ({selectedValue.length})</strong>
      </S.Title>
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

      <S.Content>
        {loadingData ? (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        ) : (
          <React.Fragment>
            {loadingConfirmation && (
              <S.LoaderContainer>
                <Loader active />
              </S.LoaderContainer>
            )}
            <S.List>
              {data.map((item, index) => {
                return (
                  <MwInput
                    type='checkbox'
                    key={item.id}
                    label={
                      <div style={{ display: 'flex', gap: '7px' }}>
                        <span>{item.name}</span>
                        {!item.file_favorite_permissions.some((p) => {
                          return (
                            p.people_id === userId.id &&
                            ['owner'].includes(p.role)
                          )
                        }) && <MwIcon type='feather' icon='users' />}
                      </div>
                    }
                    value={item.id}
                    checked={selectedValue.includes(item.id)}
                    onChange={() => handleChangeValue(item)}
                    disabled={
                      !item.file_favorite_permissions.some((p) => {
                        return (
                          p.people_id === userId.id &&
                          ['owner', 'manager'].includes(p.role)
                        )
                      })
                    }
                  />
                )
              })}
            </S.List>
          </React.Fragment>
        )}
      </S.Content>
      <S.Footer>
        <MwButton
          appearance='borderless'
          content='Cancelar'
          onClick={() => closePopUp()}
        />
        <MwButton
          appearance='solid'
          content='Aplicar'
          loading={loadingConfirmation}
          disabled={
            JSON.stringify(selectedValue.sort()) ===
              JSON.stringify(storagedSelected.sort()) ||
            loadingConfirmation ||
            loadingData
          }
          onClick={() => handleApplyFavorite()}
          style={{ width: '105px' }}
        />
      </S.Footer>
    </S.Container>
  )
}

export default Favorite
