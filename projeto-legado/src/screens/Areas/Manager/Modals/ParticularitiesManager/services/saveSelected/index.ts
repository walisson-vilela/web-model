import axios from '../../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { keys } from '../../../../../../../utils/Formatters'
import { Common, Rule, Selected } from '../../interface'

const saveSelected = async (
  selected: Selected,
  rule: Rule,
  id: number,
): Promise<void> => {
  const payload = {
    ...(rule.segments ? { segments_rule: rule.segments } : {}),
    ...(rule.market_flags ? { market_flags_rule: rule.market_flags } : {}),
    particularities: keys(selected).reduce((particularities, foreign_table) => {
      const items = selected[foreign_table] as Common[]

      return [
        ...particularities,
        ...items.map((e) => {
          return e.id
            ? { id: e.id }
            : { foreign_table, foreign_id: e.foreign_id }
        }, []),
      ]
    }, []),
  }

  const { data: response } = await axios.put(`/v1/tr/regions/${id}`, payload)

  if (!isObject(response) || !response.success)
    throw new Error('Invalid Response')
}

export default saveSelected
