import { MwButton } from '@mw-kit/mw-ui'
import { Dropdown, Icon, Loader, Table } from 'semantic-ui-react'

import Modal from '../../../../../../components/MwModal'
import useAFDContext from '../../../../provider'
import * as MS from '../../styles'

import ConfigureSchedule from './Modals/ConfigureSchedule'
import * as S from './styles'

const ToSchedule = () => {
  const {
    schedulesState: {
      schedules,
      setSchedules,
      setDirtySchedules,
      loadingSchedules,
    },
    modalState: { modal, setModal },
  } = useAFDContext()

  return (
    <div style={{ flex: 1 }}>
      <MS.Title>Agendar</MS.Title>

      <MwButton
        color='blue'
        type='button'
        size='small'
        content='Configurar Agendamento'
        onClick={() => setModal(<ConfigureSchedule />)}
      />

      <S.Subtitle>Agendamento(s)</S.Subtitle>

      <S.TableContainer>
        {loadingSchedules ? (
          <S.Empty>
            <Loader active inline='centered' />
          </S.Empty>
        ) : schedules.length > 0 ? (
          <Table compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell content='Programação do Envio' />
                <Table.HeaderCell content='Frequência' />
                <Table.HeaderCell content='Destinatários' textAlign='center' />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {schedules.map((schedule, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div>{schedule.deliverySchedule.label}</div>
                  </Table.Cell>

                  <Table.Cell>
                    <div>{schedule.frequency.label}</div>
                  </Table.Cell>

                  <Table.Cell textAlign='center'>
                    <div>{`${schedule.emails.length < 10 ? '0' : ''}${
                      schedule.emails.length
                    }`}</div>
                  </Table.Cell>

                  <Table.Cell textAlign='right' width='1'>
                    <div>
                      <Dropdown
                        icon={null}
                        direction='left'
                        pointing='left'
                        trigger={
                          <Icon
                            name='ellipsis vertical'
                            style={{ color: '#D6D6D6' }}
                          />
                        }
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            content='Editar'
                            onClick={() =>
                              setModal(
                                <ConfigureSchedule
                                  editData={{ index, schedule }}
                                />,
                              )
                            }
                          />

                          <Dropdown.Item
                            content='Remover'
                            onClick={() => {
                              setModal(
                                <Modal
                                  modal={{
                                    title: 'Deletar Agenda AFD',
                                    content: (
                                      <div style={{ paddingBlock: '14px' }}>
                                        <span>
                                          Você deseja realmente deletar a
                                          configuração?
                                        </span>
                                      </div>
                                    ),

                                    buttonType: 'MwButton',
                                    actions: [
                                      <MwButton
                                        appearance='borderless'
                                        content='Cancelar'
                                        onClick={() => setModal(null)}
                                      />,
                                      <MwButton
                                        style={{ marginLeft: '7px' }}
                                        appearance='solid'
                                        color='red'
                                        content='Deletar'
                                        onClick={() => {
                                          setSchedules((prev) => {
                                            let aux = [...prev]

                                            aux.splice(index, 1)
                                            setDirtySchedules(true)

                                            return aux
                                          })
                                          setModal(null)
                                        }}
                                      />,
                                    ],
                                  }}
                                />,
                              )
                            }}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <S.Empty>Nenhum agendamento programado até o momento.</S.Empty>
        )}
      </S.TableContainer>

      <Modal modal={modal} />
    </div>
  )
}

export default ToSchedule
