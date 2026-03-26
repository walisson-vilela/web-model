import React from 'react'

import { Dropdown, Toolbar } from '@mw-kit/mw-manager'

import { ManagerProps } from '../../../../../interfaces'

import { Item } from './components/Item'
import { MotivationContainer } from './components/MotivationContainer'
import filters from './filters'
import * as S from './styles'

export const Events = (props: ManagerProps) => {
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
      <MotivationContainer />

      <S.ListContainer>
        <S.ListHeader>
          <Toolbar
            filters={{
              filters: filters,
              appliedFilters,
              setAppliedFilters,
            }}
            search={{
              search,
              setSearch,
            }}
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
          <Item />
          <Item />
          <Item />
          <Item />
        </S.ListContent>
      </S.ListContainer>
    </S.Container>
  )
}
