import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Dropdown, SearchFilter, SortState } from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'
import { Button, Loader, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { download } from '../../../../../../../utils/DownloadFile'
import { SurveysContext } from '../../../../../context'
import {
  ModalsNames,
  PeopleProps,
  ProductsProps,
  StoresProps,
} from '../../interfaces'
import { GetConflicts } from '../../service'

import Rows from './components/Rows'
import * as S from './styles'

interface Props {
  id: number
  code: number[]
  type: ModalsNames
}

const ConflictListModal = ({ code, id, type }: Props) => {
  const { setOpenSelectModal } = useContext(SurveysContext)
  const [loading, setLoading] = useState(true)
  const [conflict, setConflict] = useState<
    PeopleProps[] | ProductsProps[] | StoresProps[]
  >([])
  const [sort, setSort] = useState<SortState>()
  const [search, setSearch] = useState('')

  const onExtractData = async (): Promise<any> => {
    setLoading(true)
    const contain =
      type === 'Products'
        ? 'Products'
        : type === 'PDVHierarchy'
        ? 'Stores'
        : 'Peoples'
    try {
      const { success, data } = await GetConflicts(
        id,
        code,
        contain,
        sort,
        search,
        type,
        true,
      )

      if (success) {
        download(data.url)
        toast(<ToasterContent color='normal' />, SuccessStyle)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems = [
    {
      content: 'Extrair dados',
      onClick: onExtractData,
      rules: [],
    },
  ]

  const getConflicts = useCallback(async () => {
    setLoading(true)
    const contain =
      type === 'Products'
        ? 'Products'
        : type === 'PDVHierarchy'
        ? 'Stores'
        : 'Peoples'
    try {
      const { data } = await GetConflicts(id, code, contain, sort, search, type)
      setConflict(data)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [sort, search])

  useEffect(() => {
    getConflicts()
  }, [getConflicts])
  return (
    <Modal open size='large'>
      <S.HeaderContainer>
        <span>Lista de Conflitos</span>
      </S.HeaderContainer>
      <S.Container>
        <S.InfoContainer>
          <S.InfoText>
            <strong>Lista de Conflitos</strong>
            <span>Visualize abaixo a lista de conflitos existentes</span>
          </S.InfoText>

          <S.InfoInputsContainer>
            <SearchFilter search={search} setSearch={setSearch} />
            <S.More>
              <Dropdown
                items={dropdownItems}
                loading={false}
                axis='y'
                centerCoodinates={{ y: 100 }}
              />
            </S.More>
          </S.InfoInputsContainer>
        </S.InfoContainer>

        <S.Body>
          {loading ? (
            <S.LoaderContainer>
              <Loader active />
            </S.LoaderContainer>
          ) : (
            conflict.map((item) => (
              <Rows
                key={item.id}
                item={item}
                type={type}
                setSort={setSort}
                sort={sort}
              />
            ))
          )}
        </S.Body>
      </S.Container>
      <Modal.Actions>
        <Button
          primary
          content='Ok'
          onClick={() => setOpenSelectModal(<React.Fragment />)}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ConflictListModal
