import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar
} from "@mw-kit/mw-manager"
import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import ManagerCounter from "../../../../components/ManagerCounter"
import { ModalState } from '../../../../components/MwModal'
import { ManagerProps } from '../../../interfaces'
import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import * as Modals from './Modals'
import parseData from './parser'
import { getEPIWarehouse as request } from './services'

const InventoryManager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [data, setData] = useState<DataInterface[]>([])
  const [body, setBody] = useState<BodyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  const [notificationModal, setNotificationModal] = useState<ModalState>(null)
  const [modal, setModal] = useState<ModalState>(null)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)

      const contain = 'EpiType'

      const responseData = await request(appliedFilters, search, contain, sort, page)

      const { has_next_page = false, count: total_registries = 0 } = responseData.pagination || {}
      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      const results = responseData.data || []
      console.log(results)

      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    const parsed = parseData(data)
    setBody(parsed)
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => prev + 1)
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Troca de EPI',
      onClick: () =>
        setModal(
          <Modals.EPITrade
            close={() => setModal(null)}
            reload={() => reload()}
            data={undefined}
          />
        ),
      rules: [],
    },
    {
      content: 'Adicionar Tamanho',
      onClick: () =>
        setModal(
          <Modals.AddSize
            close={() => setModal(null)}
            reload={() => reload()}
          />
        ),
      rules: [],
    },
  ]

   const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [

      {
        content: 'Estoque Mínimo',
        onClick: () =>
          setModal(
            <Modals.InventoryLimit
              close={() => setModal(null)}
              reload={() => reload()}
              data={item}
            />
          ),
        rules: [],
      },
      {
        content: 'Trocar status',
        onClick: () =>
          setModal(
            <Modals.StatusExchange
              close={() => setModal(null)}
              reload={() => reload()}
              data={item}
            />
          ),
        rules: [],
      },
      {
        content: 'Baixa Manual',
        onClick: () =>
          setModal(
            <Modals.ManualDownload
              close={() => setModal(null)}
              reload={() => reload()}
              data={item}
            />
          ),
        rules: [],
      },
      {
        content: 'Remover',
        onClick: () =>
          setModal(
            <Modals.DeleteEPI
              close={() => setModal(null)}
              reload={() => reload()}
              data={item}
            />
          ),
        rules: [],
      },
      {
        content: 'Histórico de Baixa',
        onClick: () =>
          setModal(
            <Modals.History
              close={() => setModal(null)}
              data={item}
            />
          ),
        rules: [],
      },
    ]
  }

  return (
    <>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Button
          primary
          size='tiny'
          content='Cadastrar'
          onClick={() =>
            setModal(
              <Modals.Create
                close={() => setModal(null)}
                reload={() => reload()}
              />,
            )
          }
        />

        <Dropdown items={dropdownItems} loading={loading} axis='y' centerCoodinates={{ y: 100 }} />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        getItemMenu={getItemMenu}
      />
      <ManagerCounter partial={body.length} total={totalRegistries} />
      {modal}
      {notificationModal}
    </>
  )
}

export default InventoryManager
