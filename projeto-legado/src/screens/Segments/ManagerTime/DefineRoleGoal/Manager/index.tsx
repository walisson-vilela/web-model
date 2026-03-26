import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../../../components/ManagerCounter'
import TimeInput from '../../../../../components/TimeInput'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { download } from '../../../../../utils/DownloadFile'
import {
  simpleTime as formatTime,
  reverseSimpleTime as reverseFormatTime,
} from '../../../../../utils/Formatters'
import { isNumber, notEmptyString } from '../../../../../utils/Validators'
import { isOppenedModal } from '../../../functions'
import { OpenedModal } from '../../../interfaces'
import * as MainStyles from '../../../styled'
import DefineGoals from '../../DefineGoals'
import { DurationGoal, SegmentGoal } from '../../interfaces'
import { editGoal } from '../../services'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getRoles as request } from './services'

interface ManagerProps {
  segment: {
    id: number
    name: string
    store_count: number
  }
}

const Manager = (props: ManagerProps) => {
  const { segment } = { ...props }

  // estado controlador dos filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager pre processado
  const [parsed, setParsed] = useState<BodyInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  // const [totalRegistries, setTotalRegistries] = useState<number>(0);
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  // estado controlador do modal
  const [modal, setModal] = useState<OpenedModal | JSX.Element | null>(null)
  // estado controlador dos valores dos inputs de meta por canal
  const [durationGoals, setDurationGoals] = useState<DurationGoal>({})

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    let responseData: any

    try {
      // fazendo requisição dos dados
      responseData = await request(
        segment.id,
        appliedFilters,
        search,
        sort,
        page,
      )
    } catch (e) {
      console.error(e)
      setLoading(false)
      return
    }

    // setando dados sobre a paginação
    const { has_next_page = false } = responseData.pagination || {}

    setIsLastPage(!has_next_page)
    // setTotalRegistries(total_registries);

    // pegando os resultados da requisição
    const results: DataInterface[] = responseData.data || []

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setData(page === 1 ? results : (prev) => prev.concat(results))

    setLoading(false)
  }, [appliedFilters, search, sort, page])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  const onSubmitDurationGoal = async (item: BodyInterface) => {
    const id = item.id

    const original = item.duration_goal

    let newValue = null
    if (durationGoals[id] !== '') {
      newValue = reverseFormatTime(durationGoals[id])

      // formatando valor, completando com zeros
      setDurationGoals((prev) => {
        const newState = { ...prev }

        newState[id] = formatTime(newValue)

        return newState
      })
    }

    // se o estado nao foi alterado nao tem porque enviar os dados
    if (original === newValue) return

    setLoading(true)

    // enviando os dados
    const success = await editGoal([
      {
        id: segment.id,
        role_id: id,
        goal: newValue,
        store_statistic_attendance_id: item.store_statistic_attendance_id,
      },
    ])

    setLoading(false)

    // se os dados foram salvos, altera os dados originais
    if (success) {
      setData((prev) =>
        prev.map((item) => {
          if (item.id === id) item.duration_goal = newValue
          return item
        }),
      )

      toast(<ToasterContent color='normal' />, SuccessStyle)
    }
    // se falhar, volta o valor do input pro valor original
    else {
      // voltando ao valor original
      setDurationGoals((prev) => {
        const newState = { ...prev }

        newState[id] = formatTime(newValue)

        return newState
      })

      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setParsed(parseData(data, setDurationGoals))
  }, [data])

  // sempre que os dados pre processados ou o estado de algum input porem alterados, altera o estado das linhas do manager
  useEffect(() => {
    setBody(
      parsed.map((item: BodyInterface): BodyInterface => {
        const newItem = { ...item }
        const id = item.id

        const value = durationGoals[id] === null ? '' : durationGoals[id]

        newItem.duration_goal_jsx = (
          <form
            onSubmit={(event: any) => {
              event.preventDefault()

              // removendo foco do input
              const a = document.createElement('a')
              document.body.appendChild(a)
              a.href = '#'
              a.focus()
              document.body.removeChild(a)
            }}
          >
            <TimeInput
              value={value}
              apperance={notEmptyString(value) ? 'focus' : undefined}
              setValue={(value: string) => {
                setDurationGoals((prev) => {
                  const newState = { ...prev }

                  newState[id] = value

                  return newState
                })
              }}
              onBlur={() => onSubmitDurationGoal(item)}
            />
          </form>
        )

        return newItem
      }),
    )
  }, [parsed, durationGoals])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const { data, success } = await extractData(
        segment.id,
        appliedFilters,
        search,
        sort,
        checkeds,
      )

      download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const onClickDefineGoals = () => {
    setModal(
      <DefineGoals
        segments={checkeds.map((item) => ({
          id: segment.id,
          role_id: item.id,
          name: item.name,
          store_statistic_attendance_id: item.store_statistic_attendance_id,
        }))}
        closeModal={() => setModal(null)}
        toast={toast}
        reload={reload}
        messages={{
          title:
            checkeds.length === 1
              ? 'Foi selecionada 1 função'
              : `Foram selecionadas ${checkeds.length} funções`,
          label: 'Atribua uma meta para o tempo de atendimento das funções',
        }}
      />,
    )
  }

  const onClickClearGoals = () => {
    setModal({
      title: 'Limpar Metas',
      content:
        checkeds.length === 1 ? (
          <React.Fragment>
            Você deseja limpar as metas da função selecionada?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja limpar as metas das {checkeds.length} funções
            selecionadas?
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Limpar',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            const success = await editGoal(
              checkeds.map(
                (checked): SegmentGoal => ({
                  id: segment.id,
                  role_id: checked.id,
                  goal: null,
                  store_statistic_attendance_id:
                    checked.store_statistic_attendance_id,
                }),
              ),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickAssignAverageTime = () => {
    setModal({
      title: 'Atribuir tempo Médio',
      content:
        checkeds.length === 1 ? (
          <React.Fragment>
            Você deseja atribuir como meta o tempo médio respectivo <br />a{' '}
            <b>{checkeds.length} Função</b> selecionada?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja atribuir como meta o tempo médio respectivo <br />
            as <b>{checkeds.length} Funções</b> selecionadas?
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Atribuir',
          color: 'blue',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            const success = await editGoal(
              checkeds.map(
                (checked): SegmentGoal => ({
                  id: segment.id,
                  role_id: checked.id,
                  goal: checked.duration_average,
                  store_statistic_attendance_id:
                    checked.store_statistic_attendance_id,
                }),
              ),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma função',
  }

  const dropdownItems = [
    {
      content: 'Definir Metas',
      onClick: onClickDefineGoals,
      rules: [noneSelectedRule],
    },
    {
      content: 'Limpar Metas',
      onClick: onClickClearGoals,
      rules: [noneSelectedRule],
    },
    {
      content: 'Atribuir tempo Médio',
      onClick: onClickAssignAverageTime,
      rules: [noneSelectedRule],
      border: true,
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      rules: [],
      border: true,
    },
  ]

  return (
    <React.Fragment>
      <Toolbar
        search={{ setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        {/*<Button*/}
        {/*  primary*/}
        {/*  size="tiny"*/}
        {/*  content="Extrair dados"*/}
        {/*  onClick={() => onClickExtractData()}*/}
        {/*/>*/}

        <Dropdown
          items={dropdownItems}
          loading={loading}
          axis='y'
          centerCoodinates={{ y: 100 }}
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
      />

      <ManagerCounter partial={body.length} total={body.length} />

      {!isOppenedModal(modal) ? (
        modal
      ) : (
        <Modal size={modal.size || 'tiny'} open>
          <MainStyles.ModalHeader
            content={modal.title}
            color={modal.titleColor}
          />

          <Modal.Content>{modal.content}</Modal.Content>

          <Modal.Actions>
            {modal.actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </Modal.Actions>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default Manager
