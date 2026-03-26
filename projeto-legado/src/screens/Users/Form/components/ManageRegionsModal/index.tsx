import { useState } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'
import { Modal } from 'semantic-ui-react'

import MwModal from '../../../../../components/MwModal'

import * as Components from './components'
import { ManageRegionsModalProps, Region } from './interfaces'
import * as S from './styles'

const ManageRegionsModal = (props: ManageRegionsModalProps) => {
  const { hierarchy, close, save } = props

  const [selected, setSelected] = useState<Region[]>([...hierarchy.regions])

  return (
    <Modal
      size='large'
      open
      style={{
        width: '1095px',
      }}
    >
      <MwModal.Header color='blue' content='Gerenciar Área de Atuação' />

      <S.Container>
        <div children={`Pilar: ${hierarchy.name || '-'}`} />

        <MwGrid
          spacing={{
            top: 's3',
            left: '0',
            bottom: '0',
            right: '0',
          }}
          cols={{
            spacing: {
              top: '0',
              left: 's1',
              bottom: 's3',
              right: 's1',
            },
            bordered: true,
          }}
          borderless
        >
          <MwGrid.Row>
            <S.Col>
              <Components.Left
                selected={[selected, setSelected]}
                hierarchy_id={hierarchy.hierarchy_id}
              />
            </S.Col>

            <S.Col>
              <Components.Right
                selected={[selected, setSelected]}
                hierarchy_id={hierarchy.hierarchy_id}
              />
            </S.Col>
          </MwGrid.Row>
        </MwGrid>
      </S.Container>

      <Components.Submit
        close={close}
        save={() => {
          save([...selected])
          close()
        }}
      />
    </Modal>
  )
}

export default ManageRegionsModal
