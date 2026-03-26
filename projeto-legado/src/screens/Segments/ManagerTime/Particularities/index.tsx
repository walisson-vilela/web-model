import React, { useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  SearchFilter,
  SortState,
} from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../../components/ManagerCounter'
import Tabs from '../../../../components/Tabs'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { download } from '../../../../utils/DownloadFile'
import * as MainStyles from '../../styled'

import ManagerRegions from './ManagerRegions'
import { extractData as extractDataRegions } from './ManagerRegions/services'
import ManagerRoles from './ManagerRoles'
import { extractData as extractDataRoles } from './ManagerRoles/services'
import ManagerStores from './ManagerStores'
import { extractData as extractDataStores } from './ManagerStores/services'
import ParticularitiesContext from './context'
import { ExtractDataFunction } from './interfaces'
import * as S from './styled'

interface Tab {
  label: string
  component: JSX.Element
  extractData: ExtractDataFunction
}

interface ParticularitiesProps {
  item: any
  closeModal: () => void
  title: string | JSX.Element
}

const Particularities = (props: ParticularitiesProps) => {
  const { item, closeModal, title } = { ...props }

  const segment_id = item.id

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado controlador do componente correspondente a aba ativa
  const [activeTab, setActiveTab] = useState<number>(0)

  const [quantity, setQuantity] = useState<number>(0)

  const tabs: Tab[] = [
    {
      label: `Área de Atuação`,
      component: <ManagerRegions setArea={setQuantity} />,
      extractData: extractDataRegions,
    },
    {
      label: `PDV`,
      component: <ManagerStores setPdv={setQuantity} />,
      extractData: extractDataStores,
    },
    {
      label: `Função`,
      component: <ManagerRoles setFunction={setQuantity} />,
      extractData: extractDataRoles,
    },
  ]

  useEffect(() => {
    setSort(null)
    setPage(1)
    setIsLastPage(false)
  }, [activeTab])

  const onClickExtractData = async (): Promise<any> => {
    const extractData = tabs[activeTab].extractData

    setLoading(true)

    try {
      const { data, success } = await extractData(segment_id, search, sort)

      if (!success || !data.url)
        toast(<ToasterContent color='error' />, ErrorStyle)
      download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      rules: [],
    },
  ]

  return (
    <Modal size='large' open className='default-large-modal'>
      <S.ModalHeader content='Particularidades' />

      <MainStyles.Content>
        <S.Toolbar>
          <S.ToolbarCell>
            <S.ToolbarTitle>{title}</S.ToolbarTitle>
          </S.ToolbarCell>

          <S.ToolbarCell>
            <SearchFilter setSearch={setSearch} />
          </S.ToolbarCell>

          <S.ToolbarCell>
            <Dropdown
              items={dropdownItems}
              loading={loading}
              axis='y'
              centerCoodinates={{ y: 100 }}
            />
          </S.ToolbarCell>
        </S.Toolbar>

        <Tabs
          options={tabs}
          active={{
            active: activeTab,
            setActive: setActiveTab,
          }}
        />

        <ParticularitiesContext.Provider
          value={{
            // id do canal
            segment_id,
            search,
            setSearch,
            sort,
            setSort,
            loading,
            setLoading,
            page,
            setPage,
            isLastPage,
            setIsLastPage,
          }}
        >
          {tabs[activeTab].component}
        </ParticularitiesContext.Provider>
        <ManagerCounter partial={quantity} total={quantity} />
      </MainStyles.Content>

      <Modal.Actions>
        <Button
          type='button'
          content='OK'
          color='blue'
          onClick={() => closeModal()}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default Particularities
