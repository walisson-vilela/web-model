import { useCallback, useContext, useEffect, useState } from 'react'

import { MwButton, MwIcon, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Loader, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { GalleryViewContext } from '../../../../context'
import { addListMultipleFavorite, favoriteImage } from '../../../../service'
import { CardInterface } from '../../../Card/interface'
import {
  DataProps,
  LoginUserProps,
} from '../../../Popup/SelectConfirmation/interface'

import * as S from './styles'

interface FavoritesProps {
  images: CardInterface[]
}
const Favorites = ({ images }: FavoritesProps) => {
  const { handleUnCheckAll, setStatusModal } = useContext(GalleryViewContext)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingIndeterminate, setLoadingIndeterminate] = useState(false)
  const [loadingApply, setLoadingApply] = useState(false)
  const [options, setOptions] = useState<DataProps[]>([])
  const [imageCheckeds, setImageCheckeds] = useState<number[]>([])
  const [optionsCheckeds, setOptionsCheckeds] = useState<number[]>([])
  const [storageOptionsCheckeds, setStorageOptionsCheckeds] = useState<
    number[]
  >([])
  const [indeterminate, setIndeterminate] = useState<number[]>([])
  const [storageIndeterminate, setStorageIndeterminate] = useState<number[]>([])
  const [imagesIndeterminate, setImagesIndeterminate] = useState<number[]>([])
  const [disabled, setDisabled] = useState<boolean>(true)

  const loadFavorite = useCallback(async () => {
    setLoading(true)
    try {
      const response = await favoriteImage(null, search)
      setOptions(response)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [search])

  const isThisCheckIndeterminate = () => {
    setLoadingIndeterminate(true)

    options.map((item) => {
      if (item.file_favorite_items.length >= 1) {
        let ids: number[] = []
        item.file_favorite_items.map((i) => {
          ids.push(i.file_id)
        })
        imageCheckeds.map((element) => {
          if (imageCheckeds.some((item) => !ids.includes(item))) {
            ids.map((id) => {
              if (id === element) {
                setIndeterminate((prev) => [...prev, item.id])
                setImagesIndeterminate((prev) => [...prev, element])
              }
            })
          }
        })
        setLoadingIndeterminate(false)
      }
    })
  }

  const isThisCheckMarcker = () => {
    let optionsChecked = []
    options.map((item) => {
      item.file_favorite_items.map((i) => {
        if (imageCheckeds.includes(i.file_id)) {
          if (!indeterminate.includes(item.id)) {
            if (!optionsChecked.includes(item.id)) optionsChecked.push(item.id)
          }
        }
      })
    })
    setOptionsCheckeds(optionsChecked)
    setStorageOptionsCheckeds(optionsChecked)
  }

  const handleOnChangeChecked = (item) => {
    if (indeterminate.includes(item.id)) {
      const storageIndeterminates = Array.from(indeterminate)
      const updateIndeterminates = storageIndeterminates.filter(
        (i) => i !== item.id,
      )
      setIndeterminate(updateIndeterminates)
    }

    if (optionsCheckeds.includes(item.id)) {
      const storageOptionsCheckeds = Array.from(optionsCheckeds)
      const updatedOptionsCheckeds = storageOptionsCheckeds.filter(
        (i) => i !== item.id,
      )
      setOptionsCheckeds(updatedOptionsCheckeds)
    } else {
      setOptionsCheckeds((prev) => [...prev, item.id])
    }
  }

  const handleApplyFavorites = async () => {
    setLoadingApply(true)
    setDisabled(true)
    const isSelectedOption = options.map((item) => {
      if (optionsCheckeds.includes(item.id)) {
        return {
          id: item.id,
          in: imageCheckeds,
          out: [],
        }
      } else {
        if (indeterminate.includes(item.id)) {
          return {
            id: item.id,
            in: imagesIndeterminate,
            out: [],
          }
        } else {
          return {
            id: item.id,
            in: [],
            out: imageCheckeds,
          }
        }
      }
    })

    try {
      const response = await addListMultipleFavorite(isSelectedOption)

      if (response) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        setStatusModal(null)
        handleUnCheckAll()
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoadingApply(false)
      setDisabled(false)
    }
  }

  useEffect(() => {
    isThisCheckIndeterminate()
  }, [options])

  useEffect(() => {
    !loadingIndeterminate && isThisCheckMarcker()
  }, [loadingIndeterminate])

  useEffect(() => {
    const uniqueIndeterminate = [...new Set(indeterminate)]
    setIndeterminate(uniqueIndeterminate)
    setStorageIndeterminate(uniqueIndeterminate)
    const uniqueImageIndeterminate = [...new Set(imagesIndeterminate)]
    setImagesIndeterminate(uniqueImageIndeterminate)
  }, [loadingIndeterminate])

  useEffect(() => {
    if (
      JSON.stringify(storageOptionsCheckeds.sort()) !==
        JSON.stringify(optionsCheckeds.sort()) ||
      JSON.stringify(storageIndeterminate.sort()) !==
        JSON.stringify(indeterminate.sort())
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [optionsCheckeds])

  useEffect(() => {
    loadFavorite()
  }, [loadFavorite])

  useEffect(() => {
    const allSelecteds = images.map((item) => item.card.id)
    const arraySelecteds = allSelecteds.flat(1)
    setImageCheckeds(arraySelecteds)
  }, [])

  const submit = () => setSearch(searchInput)
  const clear = () => {
    setSearch('')
    setSearchInput('')
  }

  const userId: LoginUserProps = JSON.parse(localStorage.getItem('_GIV_LOGIN'))

  return (
    <Modal open size='small' style={{ overflow: 'hidden' }}>
      <S.Header>Lista de Favoritos</S.Header>
      <S.Main>
        <S.Content>
          <S.ContentHeader>
            <strong>
              {optionsCheckeds
                ? `Favoritos (${optionsCheckeds.length + indeterminate.length})`
                : ``}
            </strong>
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
          </S.ContentHeader>
          <S.Options>
            {loading ? (
              <S.LoaderContainer>
                <Loader active />
              </S.LoaderContainer>
            ) : (
              options.map((item) => (
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
                  checked={
                    optionsCheckeds.includes(item.id) &&
                    !indeterminate.includes(item.id)
                  }
                  onChange={() => handleOnChangeChecked(item)}
                  disabled={
                    !item.file_favorite_permissions.some((p) => {
                      return (
                        p.people_id === userId.id &&
                        ['owner', 'manager'].includes(p.role)
                      )
                    })
                  }
                />
              ))
            )}
          </S.Options>
          <S.Footer>
            <div>
              <p>
                <strong>
                  {images.length >= 1 && images.length <= 9
                    ? `0${images.length}`
                    : images.length}
                </strong>{' '}
                image
                {images.length > 1 ? 'ns selecionadas' : 'm selecionada'}
              </p>
            </div>
            <div>
              <MwButton
                appearance='borderless'
                content='Cancelar'
                onClick={() => setStatusModal(null)}
              />
              <MwButton
                appearance='solid'
                content='Aplicar'
                loading={loadingApply}
                disabled={disabled}
                onClick={handleApplyFavorites}
              />
            </div>
          </S.Footer>
        </S.Content>
      </S.Main>
    </Modal>
  )
}

export default Favorites
