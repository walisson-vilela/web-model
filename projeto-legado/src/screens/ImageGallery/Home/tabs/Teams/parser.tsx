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
import getPeopleDetails from '../../components/PeopleDetails'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      people_id: null,
      people_re: null,
      people_name: null,
      people_name_jsx: null,
      role_name: null,
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

    let people_status = null

    if (isObject(e.people)) {
      item.people_id = numberOrDefault(e.people.id)
      item.people_re = numberOrDefault(e.people.re)
      item.people_name = notEmptyStringOrDefault(e.people.name)
      people_status = numberOrDefault(e.people.status)
    }

    item.people_name_jsx =
      item.people_id === null ? (
        item.people_name
      ) : (
        <ManagerColumnPopup
          position='right center'
          triggerDisplay='inline'
          trigger={
            <Bullet
              color={people_status === 1 ? '#66BB6A' : '#EF5350'}
              content={item.people_name}
            />
          }
          getContent={async (): Promise<JSX.Element> =>
            getPeopleDetails(item.people_id)
          }
        />
      )

    if (isObject(e.role)) {
      item.role_name = notEmptyStringOrDefault(e.role.name)
    }

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
            <BrandsPopup
              name={item.people_name}
              data={item.brands}
              page='Equipe'
            />
          }
          style={{ padding: 0 }}
        />
      )
    }

    return item
  })
}

export default parser
