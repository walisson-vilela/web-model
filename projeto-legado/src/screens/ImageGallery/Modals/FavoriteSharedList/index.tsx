import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  SearchFilter,
  SortState,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { download } from '../../../../utils/DownloadFile'

import { favoriteSharedListHeader } from './header'
import { BodyInterface, FavoriteSharedListProps } from './interface'
import { parser } from './parser'
import { getSharedList } from './service'
import * as S from './styles'

export const FavoriteSharedList = ({
  setModal,
  code,
  item,
}: FavoriteSharedListProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<BodyInterface[]>([])
  const [sort, setSort] = useState<SortState | null>(null)

  const onExtract = async () => {
    setLoading(true)
    try {
      const { success, data } = await getSharedList(search, sort, code, true)
      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        download(data.url)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Extrair Dados',
      onClick: onExtract,
      rules: [],
    },
  ]

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getSharedList(search, sort, code)
      setData(parser(response.data))
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [search, sort])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Modal
      modal={{
        size: 'large',
        title: 'Lista de Compartilhamento',
        titleColor: 'blue',
        contentStyles: { padding: '14px' },
        content: (
          <S.Container>
            <S.Header>
              <S.Title>
                Meus Favoritos: <b>{item.name}</b> | {item.file_count} image
                {item.file_count > 1 ? 'ns' : 'm'}
              </S.Title>
              <S.Search>
                <SearchFilter setSearch={setSearch} />
                <S.DropDown>
                  <Dropdown
                    items={dropdownItems}
                    loading={loading}
                    axis='y'
                    centerCoodinates={{ y: 100 }}
                  />
                </S.DropDown>
              </S.Search>
            </S.Header>
            <S.Main>
              <MwManager
                list
                columns={favoriteSharedListHeader}
                rows={data}
                sort={{ sort, setSort }}
                hasFilters={false}
                loading={loading}
              />
            </S.Main>
          </S.Container>
        ),
        actions: [<MwButton content='OK' onClick={() => setModal(null)} />],
      }}
    />
  )
}
