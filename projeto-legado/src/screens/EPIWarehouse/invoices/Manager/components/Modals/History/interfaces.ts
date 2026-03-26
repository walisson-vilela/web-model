import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../utils/hooks'
import { BodyInterface } from '../../../interfaces'

export interface Form {
  name: string
  status: string
  size_type: string
  sizes: string[]
}

export interface CreateProps {
  data?: BodyInterface
  reload: () => void
  close: () => void
}
export interface EPIType {
  name: string;
}

export interface EPI {
  epi_type: EPIType;
  size: string;
}

export interface Created {
  people_id_name: string;
}

export interface DecreaseItem {
  id: number;
  epi: EPI;
  created_at: string;
  created: Created;
  inventory_decrease: number;
  reason: string;
  obs: string;
}

export interface HistoryProps {
  close: () => void;
  data: {
    id: number;
  };
}

export interface ReduxState {
  epiWarehouse: {
    decreases: {
      data: DecreaseItem[];
    };
    loading: boolean;
  };
}

export type Context = Pick<CreateProps, 'data' > & {
  form: UseFormReturn<Form>

  nameCheck: ReturnType<typeof useEndpointValidation>
}
