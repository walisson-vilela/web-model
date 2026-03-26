import React from 'react'

import { Dropdown, Toolbar } from '@mw-kit/mw-manager'

import { ManagerProps } from '../../../../../interfaces'
import filters from '../Events/filters'

import { Item } from './components/Item'
import * as S from './styles'

export const History = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const onExtractData = async () => {
    /*
    setLoading(true);
    try {
      const { success, data } = await getAllSuppliers(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((item) => item.id),
        true
      );
      if (success) {
        download(data.url);
        toast(<ToasterContent color="normal" />, SuccessStyle);
      }
    } catch (error) {
      toast(<ToasterContent color="error" />, ErrorStyle);
    } finally {
      setLoading(false);
    }
    */
  }

  const dropdownItems = [
    {
      content: 'Extrair dados',
      onClick: onExtractData,
      rules: [],
    },
  ]

  return (
    <S.Container>
      <S.ListContainer>
        <S.ListHeader>
          <Toolbar
            filters={{ filters, appliedFilters, setAppliedFilters }}
            search={{ setSearch, search }}
          >
            <Dropdown
              items={dropdownItems}
              loading={false}
              axis='y'
              centerCoodinates={{ y: 100 }}
            />
          </Toolbar>
        </S.ListHeader>

        <S.ListContent>
          <Item status='Concluído' hasFile />
          <Item status='Interrompido' />
          <Item status='Removido' hasFile />
          <Item status='Interrompido' />
          <Item status='Removido' />
          <Item status='Concluído' />
        </S.ListContent>
      </S.ListContainer>
    </S.Container>
  )
}
