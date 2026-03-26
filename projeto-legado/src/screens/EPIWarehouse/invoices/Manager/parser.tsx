import moment from 'moment'
import CaCodeCell from '../../../../components/CaCodeCell'
import Popup from '../../../../components/ManagerColumnPopup'
import PurchaseDateCell from '../../../../components/PurchaseDateCell'
import { notEmptyStringOrDefault } from '../../../../standardized/utils/formatters'
import { numberOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import EPICountCell from './components/Popups/EPICountCell'
import { BodyInterface } from './interfaces'
import { Link } from './styles'

const parser = (data: unknown[]): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((acc, item) => {
    if (!isObject(item)) return acc

    const id = numberOrDefault(item.id)
    const epi_type_id = numberOrDefault(item.epi_type_id)
    if (!id || !epi_type_id) return acc

    const parse: BodyInterface = {
      id,
      epi_type_id,
      epi: null,
      obs: notEmptyStringOrDefault(item.obs, ''),
      ca_code: (
        <CaCodeCell
          ca_code={notEmptyStringOrDefault(item.ca_code, '-')}
          ca_code_expiration={notEmptyStringOrDefault(item.ca_code_expiration, '')}
        />
      ),
      ca_code_expiration: notEmptyStringOrDefault(item.ca_code_expiration, ''),
      number: notEmptyStringOrDefault(item.number, ''),
      date: null,
      date_formatted: (
        <PurchaseDateCell
          date_formatted={notEmptyStringOrDefault(item.date, '-')}
          supplier={notEmptyStringOrDefault(item.supplier, '')}
        />
      ),
      supplier: notEmptyStringOrDefault(item.supplier, ''),
      epi_count_value: notEmptyStringOrDefault(item.epi_count, ''),
      epi_count: (
        <Popup
          on="click"
          position='left center'
          offset={[5, -80]}
          style={{ padding: 0 }}
          trigger={<Link>{notEmptyStringOrDefault(item.epi_count, '-')}</Link>}
          getContent={async (): Promise<JSX.Element> => (
            <EPICountCell
              link_id={ item.id}
              subtitle={item.epi_type.name ? item.epi_type.name : '-'}
            />
          )}
        />
      ),
    }

    if (isObject(item.epi_type)) {
      parse.epi = notEmptyStringOrDefault(item.epi_type.name, '')
    }

    if (item.date) {
      const formattedDate = moment(item.date)
      if (formattedDate.isValid()) {
        parse.date = formattedDate.toDate()
      }
    }

    acc.push(parse)
    return acc
  }, [])

  return parsed
}

export default parser
