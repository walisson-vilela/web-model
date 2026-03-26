import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'
import toast from 'react-hot-toast'

import tabs, { type TabKey } from '../..'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { download } from '../../../../../../../utils/DownloadFile'
import { useMainContext, useTabContext } from '../../../contexts'
import { getEvents } from '../../../services'

const extract = (): Option => {
  const {
    tab: [tab],
    appliedFilters: [appliedFilters],
    search: [search],
    year: [year],
    loading: [, setLoading],
  } = useMainContext()

  const {
    checked: [checked],
  } = useTabContext()

  const { types } = tabs[tab as TabKey]

  const card_ids = checked.reduce<number[]>((ids, month) => {
    ids.push(
      ...month.cards.reduce<number[]>((ids, card) => {
        ids.push(card.id)
        return ids
      }, []),
    )
    return ids
  }, [])

  return {
    label: <MwEllipsisContainer>Extrair Dados</MwEllipsisContainer>,
    onClick: async () => {
      setLoading(true)

      try {
        const url = await getEvents({
          types,
          year,
          appliedFilters,
          search,
          extract: true,
          card_ids,
        })
        download(url)
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      setLoading(false)
    },
    data: {},
  }
}

export default extract
