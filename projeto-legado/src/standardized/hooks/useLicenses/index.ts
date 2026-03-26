import { useCallback, useEffect, useState } from 'react'

import useHomeContext from '../../pages/Home/context'

import { Licenses } from './interfaces'
import getLicenses from './request'

const useLicenses = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  initial: Licenses | (() => Licenses) = {},
) => {
  const {
    contractor: { id: contractor_id },
  } = useHomeContext()

  const [licenses, setLicenses] = useState<Licenses>(initial)

  const load = useCallback(async () => {
    setLoading(true)

    try {
      const parsedLicenses = await getLicenses(contractor_id)
      setLicenses(parsedLicenses)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [contractor_id])

  useEffect(() => {
    load()
  }, [load])

  const useLicense = useCallback(
    (access_level_id: number, hierarchy_id: number) => {
      return access_level_id in licenses &&
        hierarchy_id in licenses[access_level_id]
        ? licenses[access_level_id][hierarchy_id]
        : {
            reserved: 0,
            consumed: 0,
          }
    },
    [licenses],
  )

  return [licenses, load, useLicense] as const
}

export { default as getLicenses } from './request'

export default useLicenses
