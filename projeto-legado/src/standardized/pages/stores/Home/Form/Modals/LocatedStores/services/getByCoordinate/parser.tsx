import {
  cnpj,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import Popup from '../../../../../../../../components/Popup'
import { cepFormatter } from '../../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../../utils/validators'
import { sourceStatusOrDefault } from '../../../../../../functions'
import { CheckAddress } from '../../../../../components'
import { BodyInterface } from '../../types'

const parseBody = (data: unknown[]): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((data, e) => {
    if (!isObject(e) || !isObject(e.address)) return data

    const id = numberOrDefault(e.id)
    if (!id) return data

    const source_status = sourceStatusOrDefault(e.source_status, null)

    const address = {
      formatted: notEmptyStringOrDefault(e.address.formatted, ''),
      postal_code: cepFormatter(
        notEmptyStringOrDefault(e.address.postal_code, ''),
      ),
    }

    const parsed: BodyInterface = {
      id,
      nickname: notEmptyStringOrDefault(e.nickname, ''),
      address: (
        <Popup
          on='click'
          position='right center'
          hideOnScroll
          offset={({ placement }) => (placement === 'top-start' ? [10, 0] : [])}
          trigger={
            <Popup.TriggerContainer ellipsis={false}>
              <CheckAddress
                status={source_status}
                children={address.formatted}
              />
            </Popup.TriggerContainer>
          }
          content={
            <div style={{ width: '250px' }}>
              {address.formatted}
              <br />
              Cep: {address.postal_code}
            </div>
          }
          inverted
        />
      ),
      document: cnpj(notEmptyStringOrDefault(e.document, '')) || null,
    }

    return [...data, parsed]
  }, [])

  return parsed
}

export default parseBody
