import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { GenericMenu } from '../../../../../../../../components/global/GenericMenu'
import useTeamsContext from '../../../../../../context'
import { CardNodeDatum } from '../../../../../../types'
import MirroringModal from '../../../../../Hierarchies/components/MirroringModal'
import TransferUserModal from '../../../../../Hierarchies/components/TransferUserModal'

export const TreeCardMenu = ({ nodeDatum }: { nodeDatum: CardNodeDatum }) => {
  const {
    modal: [, setModal],
    hierarchy: [hierarchy],
    loadingNodes,
    resetDecisions,
  } = useTeamsContext()

  const { attributes } = nodeDatum

  return (
    <div className='menu'>
      <GenericMenu
        position='top left'
        width='142px'
        scrollSpacing={{
          top: 's1',
          left: '0',
          bottom: 's1',
        }}
        itemSpacing={{
          top: 's1',
          left: 's3',
          bottom: 's1',
          right: '0',
        }}
        options={[
          {
            label: (
              <MwEllipsisContainer>Transferir Usuário</MwEllipsisContainer>
            ),
            data: {},
            onClick: () => {
              if (!hierarchy) return
              setModal(
                <TransferUserModal
                  nodeDatum={nodeDatum}
                  close={() => setModal(null)}
                  hierarchy={hierarchy}
                  loadingNodes={loadingNodes}
                />,
              )
            },
            rules: [
              () => {
                return attributes.child_count > 0
                  ? true
                  : {
                      on: 'hover',
                      content: 'Não há usuários para transferir',
                    }
              },
            ],
          },
          {
            label: (
              <MwEllipsisContainer>
                Resetar Decisões
                <br />
                Manuais
              </MwEllipsisContainer>
            ),
            data: {},
            onClick: () => {
              if (!attributes.hierarchies_user) return
              resetDecisions({
                user_ids: [attributes.hierarchies_user.user.id],
              })
            },
            rules: [
              () => {
                return attributes.hierarchies_user &&
                  attributes.hierarchies_user.approval_count > 0
                  ? true
                  : {
                      on: 'hover',
                      content:
                        'Não existem ajustes manuais para serem resetados',
                    }
              },
            ],
          },

          {
            label: <MwEllipsisContainer>Espelhar</MwEllipsisContainer>,
            data: {},
            onClick: () => {
              if (!hierarchy || !attributes.hierarchies_user) return

              setModal(
                <MirroringModal
                  onClose={() => setModal(null)}
                  reload={loadingNodes}
                  hierarchyId={hierarchy.id}
                  hierarchiesUser={attributes.hierarchies_user}
                  structure={attributes.structure}
                />,
              )
            },
            rules: [
              () => {
                return attributes.hierarchies_user
                  ? true
                  : {
                      on: 'hover',
                      content: `Não é permitido espelhar ${nodeDatum.name}`,
                    }
              },
            ],
          },
        ]}
      />
    </div>
  )
}
