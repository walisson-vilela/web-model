import React, { useCallback, useEffect, useState } from 'react'

import type { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { Dropdown, MwManager, Toolbar } from '@mw-kit/mw-manager'

import Modal from '../../../../../../../../../../components/MwModal'
import {
  getUserEvent,
  getUserEventXlsx,
} from '../../../../../../components/Grid/services'
import useExclusionHistoryListContext from '../../../../context'

import filters from './filters'
import header from './header'
import type { BodyInterface } from './interfaces'

export const Manager = () => {
  const { card } = useExclusionHistoryListContext()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState | null>(null)
  const [body, setBody] = useState<BodyInterface[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getUserEvent(
        'out',
        card.id,
        page,
        search,
        sort || undefined,
        appliedFilters,
      )

      const parsed = response.data.reduce<BodyInterface[]>((acc, item) => {
        const obj = {
          name: item.user.name,
          registration: item.user.person.registration,
          role: item.role.name,
          team: item.hierarchy_count,
        }
        acc.push(obj)
        return acc
      }, [])

      setBody(page === 1 ? parsed : (prev) => prev.concat(parsed))
      setPage(response.pagination.page)
      setIsLastPage(!response.pagination.has_next_page)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [card.id, page, search, sort, appliedFilters])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => prev + 1)
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Dropdown
          items={[
            {
              content: 'Extrair dados',
              onClick: () => {
                getUserEventXlsx('out', card.id)
              },
              rules: [],
            },
          ]}
          loading={loading}
          axis='y'
          centerCoodinates={{ y: 100 }}
        />
      </Toolbar>

      <Modal.Toolbar.ManagerContainer>
        <MwManager
          columns={header}
          rows={body}
          sort={{ sort, setSort }}
          hasFilters={appliedFilters.length > 0 || search.length > 0}
          loading={loading}
          paginator={paginator}
          page={page}
          setPage={setPage}
          centerCoodinates={{ y: 73 }}
        />
      </Modal.Toolbar.ManagerContainer>
    </React.Fragment>
  )
}
