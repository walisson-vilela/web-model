import React from 'react'

import { isArray } from 'lodash'

import ManagerColumnPopup from '../../../../../components/ManagerColumnPopup'
import { getToken } from '../../../../../utils'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import { shareTypesOptions } from '../../../Modals/FavoriteShare/labels'
import { FavoriteSharedList } from '../../../Modals/FavoriteSharedList'

import { BodyInterface, ParserProps } from './interfaces'
import * as S from './styles'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = ({ data, setModal }: ParserProps): BodyInterface[] => {
  const {
    payload: { people: signedUserID },
  } = getToken()

  return data.map((e) => {
    const owner = isArray(e.file_favorite_permissions)
      ? e.file_favorite_permissions.find((item) => item.role === 'owner')
      : null

    let share = booleanOrDefault(e.shared)
      ? { label: 'Sim', value: 'owner-yes' }
      : { label: '-', value: 'owner-none' }

    let peopleName: string

    if (isObject(owner)) {
      if (owner.people_id !== signedUserID) {
        peopleName =
          isObject(owner.people) && notEmptyStringOrDefault(owner.people.name)

        const user = e.file_favorite_permissions.find(
          (item) => item.people_id === signedUserID,
        )

        if (user) {
          const role = shareTypesOptions.find(
            (item) => item.value === user.role,
          )

          if (role) share = role
        }
      } else {
        peopleName = 'Própria'
      }
    }

    return {
      favorite_id: numberOrDefault(e.id),
      favorite_name: notEmptyStringOrDefault(e.name),
      favorite_name_jsx: notEmptyStringOrDefault(e.description) ? (
        <ManagerColumnPopup
          on='click'
          position='right center'
          triggerDisplay='inline'
          trigger={e.name}
          getContent={async () => (
            <S.DescriptionContainer>
              <h4>Descrição do Favorito</h4>
              {e.description}
            </S.DescriptionContainer>
          )}
          inverted
        />
      ) : (
        notEmptyStringOrDefault(e.name)
      ),
      people_name: peopleName,
      share_type: share.value,
      share_type_label:
        share.value === 'owner-yes' ? (
          <S.Link
            onClick={() => {
              setModal(
                <FavoriteSharedList setModal={setModal} code={e.id} item={e} />,
              )
            }}
          >
            {share.label}
          </S.Link>
        ) : (
          share.label
        ),
      image_count: e.file_count || '-',
      approved_image_count: e.approved || '-',
      disapproved_image_count: e.disapproved || '-',
      file_ids: e.file_ids,
      permissions: isArray(e.file_favorite_permissions)
        ? e.file_favorite_permissions.map((item) => ({
            people_id: item.people_id,
            people_name: item.people && item.people.name,
            role: item.role,
          }))
        : [],
    }
  })
}

export default parser
