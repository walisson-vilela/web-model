import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'
import {
  Button,
  Dropdown,
  Icon,
  Label,
  Table as ReactTable
} from 'semantic-ui-react'

import { Confirm, Manager, Modal } from '../../components'
import {
  deleteContractor,
  fetchContractors
} from '../../redux/actions/ContractorsActions'
import { createRouteTab } from '../../routes'

import api from './mocks/api.json'
import { Content, ContentIcon } from './styles'

const getText = (contractor) => {
  if (!contractor.id) {
    return ''
  }

  return (
    <>
      Você deseja realmente deletar a conta <strong>({contractor.name})</strong>
      ? Uma vez realizada essa ações você estará excluindo os{' '}
      <strong>
        vínculos de pessoas, rotas e demais itens associados a conta.
      </strong>
    </>
  )
}

const Filters = ({ options, setOptions }) => {
  const [text, setText] = useState('Filtros')
  const labels = [
    {
      label: 'Status',
      value: undefined,
    },
  ]

  return (
    <Dropdown item text={`${text}`} style={{ color: '#949494' }}>
      <Dropdown.Menu>
        <Dropdown.Header>SELECIONAR STATUS</Dropdown.Header>
        {labels.map((item, index) => (
          <Dropdown.Item
            key={`month-${index}`}
            selected={item.value === options.active}
            content={
              <>
                <Label circular empty color={item.color} size={'large'} />
                {item.label}
              </>
            }
            onClick={() => {
              setText(item.label)
              setOptions((prevState) => ({ ...prevState, active: item.value }))
            }}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const InternalUsers = createRouteTab(
  () => {
    const dispatch = useDispatch()
    const [contractor, setContractor] = useState({})
    const [options, setOptions] = useState({
      type: 'P,F',
    })

    const confirmDelete = useRef()

    const openModal = useCallback(
      async (contractor) => {
        await setContractor(contractor)
        await confirmDelete.current.openModal()
      },
      [confirmDelete],
    )

    const handleDelete = () => {
      return dispatch(deleteContractor(contractor.id))
    }

    const fetchAll = useCallback(() => {
      dispatch(fetchContractors(options, { direct: true }))
    }, [dispatch, options])

    useEffect(() => {
      fetchAll()
    }, [fetchAll])

    return (
      <React.Fragment>
        <Manager
          table={'Contractors'}
          header={'Usuários'}
          subheader={
            'Utilize os campos abaixo para gerenciar os usuários cadastrados'
          }
          result={api}
          celled={false}
          onlyView={true}
          haveSearch={true}
          onPageChange={(params) => setOptions({ ...options, ...params })}
          headerRow={
            <React.Fragment>
              <ReactTable.HeaderCell
                style={{
                  width: 130,
                  textAlign: 'center',
                  paddingLeft: 18,
                  paddingRight: 18,
                }}
              >
                <Content>
                  <span> Status</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>
              <ReactTable.HeaderCell
                style={{
                  width: 130,
                  textAlign: 'center',
                }}
              >
                <Content>
                  <span> Matricula</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>

              <ReactTable.HeaderCell
                style={{
                  width: 360,
                  textAlign: 'center',
                  paddingLeft: 45,
                }}
              >
                <Content>
                  <span> Nome</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>

              <ReactTable.HeaderCell
                style={{
                  width: 300,
                }}
              >
                <Content>
                  <span> CPF</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>

              <ReactTable.HeaderCell>
                <Content>
                  <span> Função</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>

              <ReactTable.HeaderCell>
                <Content>
                  <span> Equipe</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>

              <ReactTable.HeaderCell>
                <Content>
                  <span> Responsável Direito</span>
                  <div />
                </Content>
              </ReactTable.HeaderCell>
            </React.Fragment>
          }
          renderBodyRow={(row) => {
            return (
              <React.Fragment>
                <ReactTable.Cell style={{ textAlign: 'left', width: 55 }}>
                  <ContentIcon>
                    <div />
                    <span> {row.status}</span>
                  </ContentIcon>
                </ReactTable.Cell>

                <ReactTable.Cell
                  style={{
                    width: 115,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <span> {row.matricula}</span>
                </ReactTable.Cell>

                <ReactTable.Cell
                  content={row.name}
                  style={{
                    textAlign: 'center',
                    paddingLeft: 30,
                  }}
                />
                <ReactTable.Cell
                  content={row.cpf}
                  style={{
                    textAlign: 'center',
                  }}
                />
                <ReactTable.Cell
                  content={row.funcao}
                  style={{
                    textAlign: 'center',
                  }}
                />
                <ReactTable.Cell className={'dropdown-row'}>
                  <div>
                    <Dropdown
                      icon={null}
                      trigger={
                        <Icon
                          name={'ellipsis vertical'}
                          style={{ color: '#D6D6D6' }}
                        />
                      }
                      direction={'left'}
                      pointing={'left'}
                    >
                      <Dropdown.Menu>
                        {/*<Dropdown.Header>Escolha</Dropdown.Header>*/}
                        <Dropdown.Item
                          content={'Editar'}
                          onClick={() =>
                            history.push(`/main/accounts/contractors/edit/${row.id}`)
                          }
                        />
                        <Dropdown.Item
                          content={'Excluir'}
                          onClick={() => openModal(row)}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </ReactTable.Cell>
              </React.Fragment>
            )
          }}
          onFiltersToolbar={
            <Filters options={options} setOptions={setOptions} />
          }
          crud={{
            add: (
              <Button
                primary
                size={'tiny'}
                content={'Novo Cadastro'}
                onClick={() => history.push('/main/dev/internaluser')}
              />
            ),
          }}
          handleOptions={[
            { key: 0, text: 'Publicar', value: 'publish', disabled: true },
            { key: 1, text: 'Despublicar', value: 'unpublish', disabled: true },
          ]}
          onGetFilters={[]}
        />
        <Modal ref={confirmDelete} size={'tiny'}>
          <Confirm
            title={'Deletar Conta'}
            description={getText(contractor)}
            onCancel={() => confirmDelete.current.closeModal()}
            onConfirm={handleDelete}
            onSuccess={fetchAll}
            onError={() =>
              alert('Ocorreu um erro durante a exclusão do contratante.')
            }
            confirmButton={'Deletar'}
            cancelButton={'Cancelar'}
          />
        </Modal>
      </React.Fragment>
    )
  },
  (props) => <>{props.children}</>,
)

export default InternalUsers
