import { useCallback, useEffect, useState } from 'react'

import { MwManager, SortState } from '@mw-kit/mw-manager'

import header from './Header'
import Parse from './Parse'
import { BodyInterface, Props, UserInterface } from './interfaces'
import { getSettingData } from './services'

const Manager = ({ loading, pendance, setLoading }: Props) => {
  const [pendenciesInfo, setPendenciesInfo] = useState<UserInterface[]>([])
  const [parcedInfo, setParcedInfo] = useState<BodyInterface[]>([])
  const [sort, setSort] = useState<SortState | null>(null)

  const getData = useCallback(async () => {
    setLoading((prev) => ({ ...prev, form: true }))

    try {
      const dataResponseList = await getSettingData({
        pendence: pendance,
        sort,
      })

      setPendenciesInfo(dataResponseList)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading((prev) => ({ ...prev, form: false }))
    }
  }, [sort])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    setParcedInfo(Parse(pendenciesInfo))
  }, [pendenciesInfo])

  return (
    <MwManager
      columns={header}
      rows={parcedInfo}
      hasFilters={false}
      loading={loading.form}
      sort={{ sort, setSort }}
    />
  )
}

export default Manager
