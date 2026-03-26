import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import Bullet from '../../../../../components/Bullet'
import ManagerColumnPopup from '../../../../../components/ManagerColumnPopup'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isArray, isObject } from '../../../../../utils/Validators'
import BrandsPopup from '../../components/BrandsPopup'
import getStoreDetails from '../../components/StoreDetails'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      store_id: null,
      store_name: null,
      store_name_jsx: null,
      brand_count_jsx: null,
      brands: isArray(e.brands)
        ? e.brands.map((brand) => ({
            name: notEmptyStringOrDefault(brand.name),
            avatar: notEmptyStringOrDefault(brand.avatar),
          }))
        : [],
      image_count: e.image_count || '-',
      approved_image_count: e.approved_image_count || '-',
      disapproved_image_count: e.disapproved_image_count || '-',
      file_ids: e.file_ids,
    }

    let store_status = null

    if (isObject(e.store)) {
      item.store_id = numberOrDefault(e.store.id)
      item.store_name = notEmptyStringOrDefault(e.store.name)
      store_status = numberOrDefault(e.store.status)
    }

    item.store_name_jsx =
      item.store_id === null ? (
        item.store_name
      ) : (
        <ManagerColumnPopup
          position='right center'
          triggerDisplay='inline'
          trigger={
            <Bullet
              color={store_status === 1 ? '#66BB6A' : '#EF5350'}
              content={item.store_name}
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getStoreDetails(item.store_id)
          }
        />
      )

    if (item.brands.length > 0) {
      item.brand_count_jsx = (
        <Popup
          on='click'
          position='left center'
          trigger={
            <MwButton
              type='button'
              appearance='link'
              content={item.brands.length.toString()}
              color='greyishBlue'
            />
          }
          content={
            <BrandsPopup name={item.store_name} data={item.brands} page='PDV' />
          }
          style={{ padding: 0 }}
        />
      )
    }

    return item
  })
}

export default parser
