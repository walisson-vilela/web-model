import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import moment from 'moment'

import { ModalState } from '../../../components/MwModal'
import { download } from '../../../utils/DownloadFile'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'
import Approve from '../Modals/Approve'

import { BodyInterface, DataInterface } from './interfaces'
import { Files } from './styles'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setModal: React.Dispatch<React.SetStateAction<ModalState>>,
): BodyInterface[] => {
  return data.map((e) => {
    return {
      id: numberOrDefault(e.id),
      name: isObject(e.people) ? notEmptyStringOrDefault(e.people.name) : '-',
      import_date: e.created_at
        ? moment(e.created_at).format('DD/MM/YYYY HH:mm:ss')
        : '-',
      scheduled_date: e.notbefore
        ? moment(e.notbefore).format('DD/MM/YYYY HH:mm:ss')
        : '-',
      processed_date: e.fetched
        ? moment(e.fetched).format('DD/MM/YYYY HH:mm:ss')
        : '-',
      files:
        isObject(e.params) && isObject(e.params.files) ? (
          <Files>
            {isObject(e.params.files.target) && (
              <MwButton
                content={((): string => {
                  const name = e.params.files.target.name.split('.')

                  return name[name.length - 1].toUpperCase()
                })()}
                onClick={() => download(e.params.files.target.url)}
              />
            )}

            {isObject(e.params.files.log) && (
              <MwButton
                content='LOG'
                onClick={() => download(e.params.files.log.url)}
              />
            )}
          </Files>
        ) : (
          '-'
        ),
      status:
        e.status && e.status === 'AA' ? (
          <MwButton
            content='Aguardando'
            onClick={() =>
              setModal(<Approve setModal={setModal} editData={e} />)
            }
          />
        ) : (
          notEmptyStringOrDefault(e.status_label)
        ),
    }
  })
}

export default parser
