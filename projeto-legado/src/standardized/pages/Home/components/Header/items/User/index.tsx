import { useState } from 'react'

import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'
import { useHistory } from 'react-router-dom'

import Modal, { ModalState } from '../../../../../../../components/MwModal'
import { Logout } from '../../../../../../../utils/Auth'
import { useOnClickOutState } from '../../../../../../../utils/hooks'
import useHomeContext from '../../../../context'
import { HeaderItemComponent } from '../../../../types'

import { TeamsModal } from './components/TeamsModal'
import * as S from './styles'

type FilterUnion<Union, Id> = Union extends Id ? Union : never

const User: HeaderItemComponent = ({ disabled, ...rest }) => {
  const [open, setOpen] = useState(false)
  const { user, isLoading } = useHomeContext()
  const loading = isLoading('user')
  const [openModal, setOpenModal] = useState<ModalState | null>(null)

  const history = useHistory()

  const close = () => setOpen(false)

  const props: {
    item: Partial<Parameters<typeof S.Item>[0]>
    container: Partial<Parameters<typeof S.Container>[0]>
    initials: Partial<Parameters<typeof S.Initials>[0]>
    icon: Partial<
      FilterUnion<Parameters<typeof MwIcon>[0], { type: 'feather' }>
    >

    id: string
    name: string
    role_name: string
  } = !loading
    ? {
        item: {},
        container: {
          onClick: () => setOpen((prev) => !prev),
        },
        initials: {
          name: user.name,
          src: user.avatar,
        },
        icon: {
          color: 'white',
        },

        id: user.id.toString(),
        name: user.name || '-',
        role_name: user.role ? user.role.name || '-' : '-',
      }
    : {
        item: { $loading: true },
        container: {},
        initials: {},
        icon: {
          color: 'white',
        },

        id: '',
        name: '',
        role_name: '',
      }

  return (
    <S.Item {...props.item} ref={useOnClickOutState(close)}>
      <S.Container {...props.container} $disabled={disabled} {...rest}>
        <div>
          <S.Initials {...props.initials} />
        </div>

        <S.Name children={props.name} />

        <MwIcon
          type='feather'
          icon='chevron_down'
          width='24px'
          height='24px'
          {...props.icon}
        />
      </S.Container>

      <S.Menu
        open={open}
        close={close}
        scrollSpacing={{ top: 's1', bottom: 's1' }}
        itemSpacing={{ left: 's3' }}
        height='214px'
        before={
          <S.MenuHeader>
            <div>
              <S.Initials {...props.initials} mode='menu' />
            </div>

            <div>
              <div>
                <MwEllipsisContainer children={props.name} />
                <MwEllipsisContainer>({props.role_name})</MwEllipsisContainer>
              </div>

              <div>
                <MwEllipsisContainer children='ID Usuário:' />
                <MwEllipsisContainer children={props.id} />
              </div>
            </div>
          </S.MenuHeader>
        }
        options={[
          {
            label: <MwEllipsisContainer children='Meus Dados' />,
            data: {},
            onClick: () => {
              history.push('/main/user/data')
            },
          },
          {
            label: <MwEllipsisContainer children='Troca de Senha' />,
            data: {},
            onClick: () => {
              history.push('/main/user/password')
            },
          },
          {
            label: <MwEllipsisContainer children='Políticas e Termos' />,
            data: {},
            onClick: () => {
              history.push('/main/terms/pendings')
            },
          },
          {
            label: <MwEllipsisContainer children='Organograma' />,
            data: {},
            onClick: () => {
              setOpenModal(<TeamsModal close={() => setOpenModal(null)} />)
            },
          },
          {
            label: <MwEllipsisContainer children='Sair' />,
            data: {},
            onClick: () => {
              Logout()
            },
          },
        ]}
      />
      <Modal modal={openModal} />
    </S.Item>
  )
}

export default User
