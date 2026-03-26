import React from 'react'

import { Button } from 'semantic-ui-react'

import { ModalState } from '../../../components/MwModal'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject, isOneOf } from '../../../utils/Validators'

import Modals from './Modals'
import { BodyInterface, DataInterface } from './interfaces'

export const dataParser = (data: unknown[]): DataInterface[] => {
  return data.reduce<DataInterface[]>((parseds, e) => {
    if (!isObject(e)) return parseds

    const setting_id = numberOrDefault(e.setting_id)
    if (!setting_id || !isObject(e.setting)) return parseds

    const parsed: DataInterface = {
      setting_id,
      settings_decoded: e.settings_decoded,
      setting: {
        id: setting_id,
        name: notEmptyStringOrDefault(e.setting.name),
        reference: isObject(e.setting.reference)
          ? {
              id: numberOrDefault(e.setting.reference.id),
              name: notEmptyStringOrDefault(e.setting.reference.name),
            }
          : null,
        reference_id: numberOrDefault(e.setting.reference_id),
        type: isOneOf(e.setting.type, ['web', 'mobile'])
          ? e.setting.type
          : null,
        _labels: e.setting._labels,
      },
    }

    return [...parseds, parsed]
  }, [])
}

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setModal: React.Dispatch<React.SetStateAction<ModalState>>,
): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((parseds, e) => {
    const id = numberOrDefault(e.setting_id)
    if (!(id in Modals)) return parseds

    const Modal = Modals[id]

    const parsed: BodyInterface = {
      id,
      setting: isObject(e.setting)
        ? notEmptyStringOrDefault(e.setting.name)
        : null,
      reference:
        isObject(e.setting) && isObject(e.setting.reference)
          ? notEmptyStringOrDefault(e.setting.reference.name)
          : null,
      reference_id:
        isObject(e.setting) && isObject(e.setting.reference)
          ? numberOrDefault(e.setting.reference.id)
          : null,
      action: (
        <Button
          type='button'
          className='tertiary'
          onClick={() => setModal(<Modal {...{ setModal }} />)}
          content='Configurar'
        />
      ),
    }

    return [...parseds, parsed]
  }, [])
}

export default parser
