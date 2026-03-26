import { SortState } from '@mw-kit/mw-manager'

export type ExtractDataFunction = (
  segment_id: number,
  search: string,
  sort: SortState | null,
) => Promise<any>
