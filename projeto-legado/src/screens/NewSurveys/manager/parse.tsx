import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'

import AccountName from './components/AccountsName'
import ParseConfig from './components/ParseConfig'
import ParseOptions from './components/ParseOptions'
import ParseSend from './components/ParseSend'
import { BodyInterface, DataInterface } from './interface'

export const parseSurveys = (
  data: DataInterface[],
  reload: () => void,
): BodyInterface[] => {
  return data.map((item) => {
    return {
      id: numberOrDefault(item.id),
      name: notEmptyStringOrDefault(item.name),
      name_jsx: notEmptyStringOrDefault(item.name) ? (
        <AccountName
          name={item.name}
          action_icon={item.action_icon}
          status={item.status}
        />
      ) : null,
      status: notEmptyStringOrDefault(item.status),
      validity: notEmptyStringOrDefault(item.validity),
      account_name: notEmptyStringOrDefault(item.account_name),
      hierarchy_name: notEmptyStringOrDefault(item.hierarchy_name),
      hierarchy_id: numberOrDefault(item.hierarchy_id),
      delivered: numberOrDefault(item.delivered) ? (
        <ParseSend active id={item.id} name={item.name} />
      ) : (
        <ParseSend />
      ),
      has_forms: (
        <ParseOptions
          type='Form'
          quantity={item.has_forms}
          errors={0}
          item={item}
          reload={reload}
        />
      ),
      has_regions: (
        <ParseOptions
          type='Local'
          quantity={item.has_regions}
          errors={0}
          item={item}
          reload={reload}
        />
      ),
      has_segments: (
        <ParseOptions
          type='Channel'
          quantity={item.has_segments}
          errors={0}
          item={item}
          reload={reload}
        />
      ),
      has_stores: (
        <ParseOptions
          type='PDVHierarchy'
          quantity={item.has_stores}
          errors={item.stores_conflicts_count}
          item={item}
          reload={reload}
          code={[7]}
        />
      ),
      has_products: (
        <ParseOptions
          type='Products'
          quantity={item.has_products}
          errors={item.products_conflicts_count}
          item={item}
          reload={reload}
          code={[1, 2, 3]}
        />
      ),
      has_peoples: (
        <ParseOptions
          type='User'
          quantity={item.has_peoples}
          errors={item.peoples_conflicts_count}
          item={item}
          reload={reload}
          code={[4, 5, 6, 8]}
        />
      ),
      config: <ParseConfig id={item.id} reload={reload} />,
    }
  })
}
