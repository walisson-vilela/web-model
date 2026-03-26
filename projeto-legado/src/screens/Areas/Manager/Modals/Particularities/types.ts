import { SortState } from '@mw-kit/mw-manager'

export interface ParticularitiesProps {
  close: () => void
  data: {
    id: number
    name: string
    country_name: string
    flag_count: number
    segment_count: number
  }
}

export type TabComponent = React.FunctionComponent<{
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  sort: [
    SortState | null,
    React.Dispatch<React.SetStateAction<SortState | null>>,
  ]
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  totalRegistries: [number, React.Dispatch<React.SetStateAction<number>>]
  data: ParticularitiesProps['data']
}> & {
  label: string
  extractor: (
    id: number,
    search: string,
    sort: SortState | null,
  ) => Promise<void>
}

export type BodyInterface = {
  id: number
  name: string
  region_rule_label: string
}
