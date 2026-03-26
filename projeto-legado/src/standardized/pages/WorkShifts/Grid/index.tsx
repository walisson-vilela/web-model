import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'
import { RouteComponentProps } from 'react-router'

import ManagerCounter from '../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { ManagerProps } from '../../../../screens/interfaces'
import Form from '../Form'
import { extractWorkShifts } from '../services/list'

import * as Modals from './Modals'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interface'
import { getManagerWorkShifts } from './service'

const Manager = (props: ManagerProps & { route: RouteComponentProps }) => {
  const { search, setSearch } = props.search

  const { sort, setSort } = props.sort

  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [modal, setModal] = useState<ModalState>(null)

  const [body, setBody] = useState<BodyInterface[]>([])

  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const [pagination, setPagination] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })
  const paginator = () => {
    setPagination((prev) => {
      return prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev
    })
  }
  const setPage: React.Dispatch<React.SetStateAction<number>> = (page) => {
    setPagination((prev) => ({
      ...prev,
      page: typeof page === 'function' ? page(prev.page) : page,
    }))
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const {
        data: results,
        pagination: { has_next_page, count, page: currentPage },
      } = await getManagerWorkShifts(
        search,
        pagination.page,
        setModal,
        appliedFilters,
        sort,
      )

      setPagination((prev) => ({
        ...prev,
        has_next_page,
        count,
        page: currentPage,
      }))

      setBody((prev) =>
        pagination.page === 1 ? results : [...prev, ...results],
      )
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [appliedFilters, search, sort, pagination.page])

  const reload = async () => {
    pagination.page === 1
      ? await loadData()
      : setPagination((prev) => ({ ...prev, page: 1 }))
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Transferir Usuário',

        onClick: () =>
          setModal(
            <Modals.TransferUsers
              reload={reload}
              item={item}
              onClose={() => setModal(null)}
            />,
          ),
        rules: [],
      },
      {
        content: 'Editar',
        onClick: () =>
          setModal(
            <Form setModal={setModal} loadData={loadData} id={item.id} />,
          ),

        rules: [],
      },
    ]
  }

  const onClickExtractData = async () => {
    setLoading(true)
    try {
      await extractWorkShifts({
        search,
        sort,
        appliedFilters,
        ids: checkeds.map((e) => e.id),
      })
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: () =>
        setModal(
          <Modals.Activate
            checked={checkeds}
            reload={reload}
            close={() => setModal(null)}
          />,
        ),
      rules: [
        {
          rule: () => checkeds.some((item) => item.active === false),
          message: 'Selecione  ao menos um turno inativo para ativar.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: () =>
        setModal(
          <Modals.Inactivate
            checked={checkeds}
            reload={reload}
            close={() => setModal(null)}
          />,
        ),
      rules: [
        {
          rule: () => checkeds.some((item) => item.active === true),
          message: 'Selecione  ao menos um turno ativo para inativar.',
        },
      ],
    },

    {
      content: 'Deletar',
      onClick: () => {
        const filteredCheckeds = checkeds.filter((item) => item.user_count < 1)
        setModal(
          <Modals.Delete
            checked={filteredCheckeds}
            reload={reload}
            isInvalid={checkeds.some((e) => e.user_count > 0)}
            close={() => setModal(null)}
          />,
        )
      },
      rules: [
        {
          rule: () =>
            checkeds.length > 0 &&
            checkeds.some((item) => item.user_count === 0),
          message:
            'Selecione ao menos um turno sem usuários associados para deletar.',
        },
      ],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      rules: [],
    },
  ]

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{
          setPage,
          isLastPage: pagination.has_next_page,
          paginator,
        }}
      >
        <MwButton
          size='tiny'
          content='Novo Turno'
          onClick={() =>
            setModal(<Form setModal={setModal} loadData={loadData} />)
          }
        />

        <Dropdown
          items={dropdownItems}
          loading={loading}
          axis='y'
          centerCoodinates={{ y: 100 }}
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={pagination.page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
        getItemMenu={getItemMenu}
      />
      <Modal modal={modal} />
      <Toaster position='bottom-right' />
      <ManagerCounter partial={body.length} total={pagination.count} />
    </React.Fragment>
  )
}

export default Manager
