import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, SortState } from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'

import header from './header'
import { BodyInterface, DataInterface } from './interface'
import parser from './parser'
import { getDetails } from './service'

interface Props {
  id: number
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Manager = ({ id, search, setSearch }: Props) => {
  const [sort, setSort] = useState<SortState>()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<DataInterface[]>([])
  const [body, setBody] = useState<BodyInterface[]>([])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getDetails(id, search, sort)
      setData(data)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [search, sort])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setBody(parser(data))
  }, [data])

  return (
    <MwManager
      columns={header}
      rows={body}
      sort={{ sort, setSort }}
      loading={loading}
      hasFilters
    />
  )
}

export default Manager
