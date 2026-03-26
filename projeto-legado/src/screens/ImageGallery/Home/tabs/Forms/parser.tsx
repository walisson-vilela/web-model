import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isArray, isObject } from '../../../../../utils/Validators'
import BrandsPopup from '../../components/BrandsPopup'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      form_id: null,
      form_name: null,
      contractor_name: null,
      brands: isArray(e.brands)
        ? e.brands.map((brand) => ({
            name: notEmptyStringOrDefault(brand.name),
            avatar: notEmptyStringOrDefault(brand.avatar),
          }))
        : [],
      brand_count_jsx: null,
      image_count: e.image_count || '-',
      approved_image_count: e.approved_image_count || '-',
      disapproved_image_count: e.disapproved_image_count || '-',
      file_ids: e.file_ids,
    }

    if (isObject(e.form)) {
      item.form_id = numberOrDefault(e.form.id)
      item.form_name = notEmptyStringOrDefault(e.form.name)
    }

    if (isObject(e.contractor)) {
      item.contractor_name = notEmptyStringOrDefault(e.contractor.name)
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
              name={item.form_name}
              data={item.brands}
              page='Formulário'
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
