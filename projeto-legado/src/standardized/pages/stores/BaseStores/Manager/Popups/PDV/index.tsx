import React, { useCallback, useEffect, useState } from 'react'

import { MwLoader } from '@mw-kit/mw-ui'

import { isObject, notEmptyString } from '../../../../../../../utils/Validators'
import Popup from '../../../../../../components/Popup'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import {
  formatCEP,
  formatCNPJ,
} from '../../../../../../utils/formatters/numbers'

import Details from './components/DetailsInfo'
import DetailsContext from './components/DetailsInfo/DetailsProvider'
import { IDisplay } from './components/DetailsInfo/interfaces'
import * as Types from './interface'
import { requestStoreDetails } from './service'

const Component = (props: { data: Types.Details }) => {
  const { data } = props

  const display: IDisplay = {
    id: null,
    name: '-',
    document: '-',
    address: null,

    markets: [],

    otherInfo: { classification: '-' },
  }

  display.id = data.id !== null ? data.id : '-'

  if (notEmptyString(data.name)) {
    display.name = notEmptyStringOrDefault(data.name, '-')
  }
  if (notEmptyString(data.document)) {
    display.document = `(${notEmptyStringOrDefault(formatCNPJ(data.document))})`
  }

  if (isObject(data.address)) {
    display.address = {
      formatted: notEmptyStringOrDefault(data.address.formatted, '-'),
      postal_code: formatCEP(data.address.postal_code),
    }
  }

  const markets = [
    notEmptyStringOrDefault(data.group, ' - '),
    notEmptyStringOrDefault(data.network, ' - '),
    notEmptyStringOrDefault(data.flag?.name, ' - '),
  ]
  display.markets = [...markets]

  display.otherInfo = {
    classification: notEmptyStringOrDefault(data.classification, ' - '),
  }

  return (
    <DetailsContext.Provider value={{ data, display }}>
      <Details />
    </DetailsContext.Provider>
  )
}

const Handler = React.forwardRef<
  HTMLDivElement,
  Pick<Types.StoreDetailsProps, 'store_id'> & {
    data: [
      Types.Details | null,
      React.Dispatch<React.SetStateAction<Types.Details | null>>,
    ]
  }
>((props, ref) => {
  const {
    store_id,
    data: [data, setData],
  } = props

  const [loading, setLoading] = useState<boolean>(true)

  const load = useCallback(async () => {
    setLoading(true)

    try {
      const data = await requestStoreDetails(store_id)
      setData(data)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [store_id])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div ref={ref} style={{ position: 'relative', minHeight: 48 }}>
      {loading && <MwLoader filled />}

      {data ? (
        <Component data={data} />
      ) : (
        'Não foi possível encontrar os dados do PDV'
      )}
    </div>
  )
})

Handler.displayName = 'StoreDetails'

const PopupPDV = (props: Types.StoreDetailsProps) => {
  const { store_id, name } = props
  const [data, setData] = useState<Types.Details | null>(null)

  return (
    <Popup
      on='click'
      position='right center'
      hideOnScroll
      trigger={<Popup.TriggerContainer>{name}</Popup.TriggerContainer>}
      content={{
        children: (component, props) => (
          <Handler ref={props.ref} store_id={store_id} data={[data, setData]} />
        ),
      }}
      style={{ width: 600, maxWidth: 600 }}
      popperDependencies={[data]}
      onClose={() => setData(null)}
    />
  )
}

export default PopupPDV
