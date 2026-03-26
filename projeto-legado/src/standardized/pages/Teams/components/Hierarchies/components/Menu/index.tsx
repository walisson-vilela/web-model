import { useCallback } from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { GenericMenu } from '../../../../../../components/global/GenericMenu'
import useTeamsContext from '../../../../context'
import { getNodesXlsx } from '../../../../services'

export const HierarchiesMenu = () => {
  const {
    hierarchy: [hierarchy],
    loading: [loading, setLoading],
  } = useTeamsContext()

  const downloadXlsx = useCallback(async () => {
    if (!hierarchy?.id) return
    setLoading(true)
    try {
      await getNodesXlsx({ hierarchy_id: hierarchy.id })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }, [hierarchy?.id])

  return (
    <GenericMenu
      width={'136px'}
      itemSpacing={'s3'}
      options={[
        {
          label: <MwEllipsisContainer>Extrair Dados</MwEllipsisContainer>,
          data: {},
          disabled: loading,
          onClick: downloadXlsx,
        },
      ]}
    />
  )
}
