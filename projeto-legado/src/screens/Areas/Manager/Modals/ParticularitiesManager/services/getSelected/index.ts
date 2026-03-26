import GridSelector from '../../../../../../../components/GridSelector'
import axios from '../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { isOneOf } from '../../../../../../../utils/Validators'
import { Rule, Selected } from '../../interface'

const parseSegments = (e: unknown): Selected['segments'][number] | null => {
  if (!isObject(e) || !isObject(e.segment)) return null

  const id = numberOrDefault(e.id)
  const foreign_id = numberOrDefault(e.segment.id)
  if (!id || !foreign_id) return null

  return {
    id,
    foreign_id,
    name: notEmptyStringOrDefault(e.segment.name),
  }
}

const parseFlags = (e: unknown): Selected['market_flags'][number] | null => {
  if (!isObject(e) || !isObject(e.market_flag)) return null

  const id = numberOrDefault(e.id)
  const foreign_id = numberOrDefault(e.market_flag.id)
  if (!id || !foreign_id) return null

  return {
    id,
    foreign_id,
    name: notEmptyStringOrDefault(e.market_flag.name),
    chain: notEmptyStringOrDefault(e.market_flag.network.name),
    group: notEmptyStringOrDefault(e.market_flag.network.group.name),
  }
}

const parseRule = (e: unknown): Rule[keyof Rule] => {
  const rule = notEmptyStringOrDefault(e, '')
  return isOneOf(
    rule,
    GridSelector.ActionType.Constants.RULES as never as Rule[keyof Rule][],
  )
    ? rule
    : ''
}

const getSelected = async (
  id: number,
): Promise<{
  selected: Selected
  rule: Rule
}> => {
  const params = {
    contain: ['Segments', 'MarketFlags'].join(','),
  }

  const { data: res } = await axios.get(`/v1/tr/regions/${id}`, { params })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (
    !res.success ||
    !isObject(res.data) ||
    !isObject(res.data.particularities)
  ) {
    throw new Error('Invalid value response')
  }

  const selected = {
    segments: (Array.isArray(res.data.particularities.segments)
      ? res.data.particularities.segments
      : []
    ).reduce<Selected['segments']>((parsed, e) => {
      const segments = parseSegments(e)
      return segments ? [...parsed, segments] : parsed
    }, []),

    market_flags: (Array.isArray(res.data.particularities.market_flags)
      ? res.data.particularities.market_flags
      : []
    ).reduce<Selected['market_flags']>((parsed, e) => {
      const flags = parseFlags(e)
      return flags ? [...parsed, flags] : parsed
    }, []),
  }

  return {
    selected,
    rule: {
      market_flags:
        selected.market_flags.length > 0
          ? parseRule(res.data.market_flags_rule)
          : '',
      segments:
        selected.segments.length > 0 ? parseRule(res.data.segments_rule) : '',
    },
  }
}

export default getSelected
