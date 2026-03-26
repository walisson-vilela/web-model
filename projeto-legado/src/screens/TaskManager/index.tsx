import React, { useCallback, useEffect, useState } from 'react'

import {
  AppliedFilters,
  Dropdown,
  DropdownInterfaces,
  FiltersInterfaces,
  MenuFilters,
  SearchFilter
} from '@mw-kit/mw-manager'
import { Accordion, Icon, Loader, Popup } from 'semantic-ui-react'

import Bullet from '../../components/Bullet'
import { Header } from '../../components/Header'
import { createRouteTab } from '../../routes'

import { Card } from './components/Card'
import { filters, sorts } from './filters'
import { DataInterface } from './interfaces'
import MockData from './mock'
import * as S from './styled'

const TaskManager = createRouteTab(
  () => {
    // estado controlador dos filtros aplicados
    const [appliedFilters, setAppliedFilters] = useState<
      FiltersInterfaces.AppliedFilter[]
    >([])

    // estado controlador do valor do input de pesquisa
    const [search, setSearch] = useState<string>('')

    // estado controlador do valor do dropdown de ordenacao
    const [sort, setSort] = useState<string>('Melhor Performance')

    const [data, setData] = useState<DataInterface[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [inactiveAccordions, setInactiveAccordions] = useState<number[]>([])

    const loadData = useCallback(() => {
      setLoading(true)
      setData(MockData as any)
      setLoading(false)
    }, [search, appliedFilters, sort])

    useEffect(() => {
      setInactiveAccordions([])
      loadData()
    }, [loadData])

    const onClickAccordion = (_event: any, data: any) => {
      setInactiveAccordions((prev) => {
        const index = data.index

        const i = prev.indexOf(index)

        const r = [...prev]

        i === -1 ? r.push(index) : r.splice(i, 1)

        return r
      })
    }

    return (
      <React.Fragment>
        <Header
          description='Acompanhe a performance das tarefas programadas'
          child={
            <S.HeaderContainer>
              <S.HeaderCell>
                <SearchFilter
                  loading={loading}
                  setSearch={setSearch}
                  transparent
                />
              </S.HeaderCell>

              <S.HeaderCell>
                <AppliedFilters
                  loading={loading}
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                />
              </S.HeaderCell>

              <S.HeaderCell>
                <MenuFilters
                  loading={loading}
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                  filters={filters}
                />
              </S.HeaderCell>
            </S.HeaderContainer>
          }
        />

        <S.SortContainer>
          <S.SortContainerCell>Ordernar por:</S.SortContainerCell>

          <S.SortContainerCell>
            <Dropdown
              loading={loading}
              axis='y'
              items={sorts.map((option): DropdownInterfaces.Item => {
                return {
                  content: option.label,
                  onClick: (_event: any) => {
                    setSort(option.value.toString())

                    // fechando dropdown, clicando fora dele
                    const a = document.createElement('a')
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                  },
                  rules: [],
                }
              })}
            >
              {sort}
              <Icon name='caret down' />
            </Dropdown>
          </S.SortContainerCell>

          <S.SortContainerCell>
            <Popup
              on='click'
              content={
                <React.Fragment>
                  <h4>Cores dos Cards (Alcance % da Tarefa)</h4>
                  <S.SubtitleContainer>
                    <Bullet content='Sem ação' color='#3455AB' />
                    <Bullet content='76% - 90%' color='#FBCB01' />
                    <Bullet content='0% - 75%' color='#E23851' />
                    <Bullet content='91% - 100%' color='#66BB6A' />
                  </S.SubtitleContainer>
                </React.Fragment>
              }
              trigger={<S.InfoIcon />}
              inverted
              wide
              offset={[8, 0]}
              position='bottom right'
            />
          </S.SortContainerCell>
        </S.SortContainer>

        <S.AccordionsContainer>
          {loading ? (
            <Loader active />
          ) : (
            data.map((item, index) => {
              const active = !inactiveAccordions.includes(index)

              return (
                <React.Fragment key={index}>
                  <Accordion.Title
                    active={active}
                    index={index}
                    onClick={onClickAccordion}
                  >
                    <Icon name='dropdown' />
                    {item.title}
                  </Accordion.Title>

                  <Accordion.Content active={active}>
                    <S.CardsContainer>
                      {item.cards.map((card, index) => {
                        return <Card key={index} card={card} />
                      })}
                    </S.CardsContainer>
                  </Accordion.Content>
                </React.Fragment>
              )
            })
          )}
        </S.AccordionsContainer>
      </React.Fragment>
    )
  },
  (props) => <>{props.children}</>,
)

export default TaskManager
