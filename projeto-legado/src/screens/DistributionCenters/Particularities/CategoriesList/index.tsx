import React from 'react'

import { Loader, Table } from 'semantic-ui-react'

import { notEmptyStringOrDefault } from '../../../../utils/Formatters'
import { isNumber } from '../../../../utils/Validators'
import { Category } from '../interfaces'

import * as S from './styled'

interface CategoryListProps {
  loading: boolean
  categories: Category[]
}

const CategoryList = (props: CategoryListProps) => {
  const { loading, categories } = { ...props }

  return (
    <S.Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={8} textAlign='left'>
            Código
          </Table.HeaderCell>
          <Table.HeaderCell width={8} textAlign='center'>
            Linha de Produto
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <S.TableBody>
        {loading ? (
          <Table.Row>
            <Table.Cell>
              <Loader />
            </Table.Cell>
          </Table.Row>
        ) : (
          categories.map((category, index) => (
            <Table.Row key={index}>
              <Table.Cell width={8} textAlign='left'>
                {isNumber(category.id) ? category.id : '-'}
              </Table.Cell>
              <Table.Cell width={8} textAlign='center'>
                {notEmptyStringOrDefault(category.name, '-')}
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </S.TableBody>
    </S.Table>
  )
}

export default CategoryList
