import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../components/MwModal'
import Popup from '../../../../../components/Popup'
import { formatNumber } from '../../../../../utils/formatters/numbers'
import useHierarchyContext from '../../../context'
import { Role } from '../../../types'

import * as S from './styled'

interface IProgramingHierarchy {
  onClose: () => void
}

const ProgramingHierarchy = (props: IProgramingHierarchy) => {
  const { onClose } = props
  const {
    schedule: [schedule],

    hierarchy,
    loading: [loading],
    onScrollEnd,
  } = useHierarchyContext()

  if (!schedule || !hierarchy) return null

  const date = new Date(schedule.schedule)

  const dateSchedule = date.toLocaleDateString('pt-BR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })

  const hour = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const modifier = schedule.modifier.name

  return (
    <Modal.Modal
      open
      style={{
        width: '681px',
        height: '429px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Hierarquia Programada</Modal.Header>
      <Modal.Body
        style={{ justifyContent: 'normal', padding: '0px', gap: '0px' }}
      >
        <S.ContentContainer>
          <S.Subtitle>
            Hierarquia: <b children={hierarchy.name} /> | Associação:{' '}
            <b children={schedule.manual_elements_label} />
          </S.Subtitle>
          <S.Subtitle>
            Niveis: <b children={formatNumber(schedule.structure.length)} />
          </S.Subtitle>
        </S.ContentContainer>

        <S.ScrollContainer loading={loading.roles} onScrollEnd={onScrollEnd}>
          {schedule.structure.map((level, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <S.LeftColumn>
                  <S.LeftColumnTitle>{level.level_label}</S.LeftColumnTitle>

                  {level.name && (
                    <S.LeftSubtitleContainer>
                      <S.LeftSubtitle>{level.name}</S.LeftSubtitle>
                    </S.LeftSubtitleContainer>
                  )}
                </S.LeftColumn>

                <S.RightColumn>
                  {level.roles_hierarchies.map(({ role }, index) => {
                    const messages: {
                      [k in Exclude<Role['status'], undefined>]: string
                    } = {
                      DELETED: 'A função foi deletada',
                      STATUS: 'A função foi inativada',
                      INTERNAL_ACCESS:
                        'A função sofreu mudança de atributos internos',
                      HIERARCHY: 'A função sofreu mudança de pilar',
                    }

                    return (
                      <S.RightColumnTagContainer
                        key={index}
                        $isStatus={role.status !== undefined}
                      >
                        <Popup
                          on='click'
                          inverted
                          position='right center'
                          content={
                            messages[
                              role.status as Exclude<Role['status'], undefined>
                            ]
                          }
                          trigger={
                            <S.RightTag $isStatus={role.status !== undefined}>
                              {role.name}
                            </S.RightTag>
                          }
                          disabled={!role.status}
                        />
                      </S.RightColumnTagContainer>
                    )
                  })}
                </S.RightColumn>
              </div>
            )
          })}
        </S.ScrollContainer>
      </Modal.Body>
      <Modal.Footer>
        <S.FooterContent>
          <S.Message>
            Data: {dateSchedule} as {hour} - Programado por: {modifier}
          </S.Message>
          <MwButton content='Ok' onClick={onClose} />
        </S.FooterContent>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ProgramingHierarchy
