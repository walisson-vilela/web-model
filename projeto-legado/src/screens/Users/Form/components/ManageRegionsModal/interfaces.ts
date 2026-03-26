import { Form } from '../../../../../standardized/pages/Users/Form/interfaces'

type Hierarchy = Form['hierarchies'][number]

export type Region = Hierarchy['regions'][number]

export interface ManageRegionsModalProps {
  hierarchy: Hierarchy
  close: () => void
  save: (regions: Region[]) => void
}
