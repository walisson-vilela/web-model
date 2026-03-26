import { useCallback, useEffect, useState } from 'react'

import { getUserQueues } from './services'
import { UserQueue } from './types'

const useUserQueues = (hierarchyId?: number) => {
  const [data, setData] = useState<UserQueue[]>([])
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    last: true,
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadUserQueues = useCallback(async () => {
    if (!hierarchyId) return

    setLoading(true)

    try {
      const response = await getUserQueues(hierarchyId, pagination.page)
      setData(
        pagination.page === 1
          ? [...response.data]
          : (prev) => [...prev, ...response.data],
      )
      setPagination((prev) => ({
        ...prev,
        last: response.pagination.last,
        count: response.pagination.count,
      }))
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [hierarchyId, pagination.page])

  useEffect(() => {
    loadUserQueues()
  }, [loadUserQueues])

  const reloadUserQueues = useCallback(() => {
    if (pagination.page === 1) {
      loadUserQueues()
    } else {
      setPagination((prev) => ({
        ...prev,
        page: 1,
        last: true,
      }))
    }
  }, [loadUserQueues])

  return {
    userQueues: [data, setData] as const,
    userQueuesPagination: [pagination, setPagination] as const,
    userQueuesOpen: [open, setOpen] as const,
    userQueuesLoading: [loading, setLoading] as const,
    reloadUserQueues,
  }
}

export default useUserQueues
