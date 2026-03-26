import React, { useCallback, useEffect, useState } from 'react'

import { Toolbar } from '@mw-kit/mw-manager'
import { Button } from 'semantic-ui-react'

import Modal, { ModalState } from '../../../../components/MwModal'
import CreateDistributionModal from './components/Modals/Create'
import WorkersModal from '../components/WorkersModal'
import EditDistributorModal from '../components/EditDistributorModal'
import RemoveWorkersModal from '../components/RemoveWorkersModal'
import { ManagerProps } from '../../../interfaces'
import DistributionList from '../components/DistributionList'
import { DistributionActionKey } from '../constants'
import filters from '../filters'
import { DistributionCardData } from '../interfaces'
import { listDistributions } from '../services'
import * as S from '../styles'

const DistributeManager: React.FC<ManagerProps> = (props) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  const { dateInterval, setDateInterval } = props.dateInterval

  const [distributions, setDistributions] = useState<DistributionCardData[]>([])
  const [expandedCards, setExpandedCards] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)
  const [workersModalDistribution, setWorkersModalDistribution] =
    useState<DistributionCardData | null>(null)
  const [editDistributorDistribution, setEditDistributorDistribution] =
    useState<DistributionCardData | null>(null)
  const [removeWorkersDistribution, setRemoveWorkersDistribution] =
    useState<DistributionCardData | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await listDistributions({
        appliedFilters,
        search,
        sort,
        dateInterval,
        page,
      })

      const { has_next_page = false } = response.pagination || {}
      setIsLastPage(!has_next_page)

      const results = response.data || []
      setDistributions((prev) => (page === 1 ? results : prev.concat(results)))

      if (page === 1) {
        setExpandedCards([])
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, dateInterval, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage) {
      setPage((prev) => prev + 1)
    }
  }

  const handleCreateDistribution = () => {
    setModal(<CreateDistributionModal close={() => setModal(null)} />)
  }

  const handleToggleCard = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id],
    )
  }

  const handleSelectAction = (
    action: DistributionActionKey,
    item: DistributionCardData,
  ) => {
    if (action === 'editDistributor') {
      setEditDistributorDistribution(item)
      return
    }

    if (action === 'removeWorkers') {
      setRemoveWorkersDistribution(item)
      return
    }

    console.info('distribution-action', action, item)
  }

  return (
    <S.Container>
      <S.ToolbarWrapper>
        <Toolbar
          filters={{ filters, setAppliedFilters, appliedFilters }}
          search={{ search, setSearch }}
          calendarInterval={{ dateInterval, setDateInterval }}
          loading={loading}
          reloader={reload}
          pagination={{ setPage, isLastPage, paginator }}
          except={{ paginator: true }}
        >
          <Button
            primary
            size='tiny'
            content='Novo'
            onClick={handleCreateDistribution}
          />
        </Toolbar>
      </S.ToolbarWrapper>

      <S.ListWrapper>
        <DistributionList
          items={distributions}
          expandedIds={expandedCards}
          loading={loading}
          onToggleExpand={handleToggleCard}
          onSelectAction={handleSelectAction}
          onClickWorkers={(item) => setWorkersModalDistribution(item)}
        />
      </S.ListWrapper>
      <Modal modal={modal} />
      {workersModalDistribution && (
        <WorkersModal
          distribution={workersModalDistribution}
          close={() => setWorkersModalDistribution(null)}
        />
      )}
      {editDistributorDistribution && (
        <EditDistributorModal
          distribution={editDistributorDistribution}
          close={() => setEditDistributorDistribution(null)}
          onSaved={reload}
        />
      )}
      {removeWorkersDistribution && (
        <RemoveWorkersModal
          distribution={removeWorkersDistribution}
          close={() => setRemoveWorkersDistribution(null)}
          onRemoved={reload}
        />
      )}
    </S.Container>
  )
}

export default DistributeManager
