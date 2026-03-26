import { useCallback, useEffect, useState } from 'react'

import { MwEllipsisContainer, MwIcon, MwScrollContainer } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import EmptyMessage from '../../../../../../../../components/EmptyMessage'
import Initials from '../../../../../../../Home/components/Header/styles/Initials'
import { getMirroringSubtitle } from '../../../../../../functions'
import { DeleteUserFromMirroring } from '../../../../../../services'
import type { HierarchyUser } from '../../../../../../types'
import { getMirroringUsers } from '../../service'
import type { MirroringPopupProps } from '../../types'

import * as S from './styled'

const ContentPopup = (props: MirroringPopupProps) => {
  const { hierarchyId, structure, hierarchiesUser } = props
  const [loading, setLoading] = useState(true)
  const [hierarchiesUsers, setHierarchiesUsers] = useState<HierarchyUser[]>([])
  const [paginate, setPaginate] = useState({
    page: 1,
    lastPage: true,
  })

  const onScrollEnd = () => {
    setPaginate((prev) =>
      prev.lastPage
        ? prev
        : {
            page: prev.page + 1,
            lastPage: true,
          },
    )
  }

  const subtitle = getMirroringSubtitle(structure, hierarchiesUser)

  const onLoadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data, pagination } = await getMirroringUsers(
        hierarchyId,
        hierarchiesUser.user.id,
        paginate.page,
      )
      setHierarchiesUsers((prev) =>
        pagination.page === 1 ? data : [...prev, ...data],
      )

      setPaginate((prev) => ({
        ...prev,
        lastPage: !pagination.has_next_page,
      }))
    } catch (e) {
      console.error('error', e)
    }

    setLoading(false)
  }, [hierarchyId, hierarchiesUser.user.id, paginate.page])

  const reloadData = useCallback(() => {
    if (paginate.page === 1) {
      onLoadData()
    } else {
      setPaginate({ page: 1, lastPage: true })
    }
  }, [onLoadData])

  const deleteUserFunc = async (user_id: number) => {
    setLoading(true)

    try {
      await DeleteUserFromMirroring(
        hierarchyId,
        user_id,
        hierarchiesUser.user.id,
      )
      reloadData()
    } catch (err) {
      console.error(err)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  useEffect(() => {
    onLoadData()
  }, [onLoadData])

  return (
    <S.ContentPopupContainer>
      <MwScrollContainer
        loading={loading}
        empty={{
          empty: hierarchiesUsers.length < 1,
          content: <EmptyMessage children='Nenhum resultado encontrado' />,
        }}
        before={
          <S.ContentPopupHeader>
            <S.ContentPopupTitle>Lista de Espelhamento</S.ContentPopupTitle>
            <S.ContentPopupSubTitle>{subtitle}</S.ContentPopupSubTitle>
          </S.ContentPopupHeader>
        }
        onScrollEnd={onScrollEnd}
      >
        {hierarchiesUsers.map(({ user }) => (
          <S.ContentPopupRow key={user.id}>
            <Initials name={user.name} src={user.avatar?.url} bordered />
            <S.ContentPopupRowTextContainer>
              <div>
                <MwEllipsisContainer>{user.name}</MwEllipsisContainer>
              </div>

              <div>
                Função:
                <MwEllipsisContainer>{user.role.name}</MwEllipsisContainer>
              </div>
            </S.ContentPopupRowTextContainer>
            <div>
              <S.IconButton onClick={() => deleteUserFunc(user.id)}>
                <MwIcon icon='trash' type='semantic' width={10} />
              </S.IconButton>
            </div>
          </S.ContentPopupRow>
        ))}
      </MwScrollContainer>
    </S.ContentPopupContainer>
  )
}

export default ContentPopup
