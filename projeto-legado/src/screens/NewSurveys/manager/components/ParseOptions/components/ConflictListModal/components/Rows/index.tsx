import React, { useEffect, useState } from 'react'

import { MwManager, SortState } from '@mw-kit/mw-manager'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Loader } from 'semantic-ui-react'

import {
  PeopleBody,
  PeopleProps,
  ProductsBody,
  ProductsProps,
  StoresBody,
  StoresProps,
} from '../../../../interfaces'

import { pdvHeader, productsHeader, userHeader } from './header'
import { ProductParse, StoreParse, UserParse } from './parser'
import * as S from './styles'

interface Props {
  item: PeopleProps | ProductsProps | StoresProps
  type: string
  setSort: React.Dispatch<any>
  sort: SortState
}

const Rows = ({ item, type, setSort, sort }: Props) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)
  const [row, setRow] = useState<ProductsBody[] | PeopleBody[] | StoresBody[]>(
    [],
  )

  useEffect(() => {
    setLoading(true)
    type === 'Products' && setRow(ProductParse(item['products']))
    type === 'PDVHierarchy' && setRow(StoreParse(item['stores']))
    type === 'User' && setRow(UserParse(item['peoples']))
    setLoading(false)
  }, [item])

  return (
    <S.Container>
      <strong>
        Código:{' '}
        <span>
          {item.code} - {item.message}
        </span>
      </strong>
      <S.ToggleContainer>
        <strong>
          Impacto:{' '}
          <span>
            {type === 'Products' &&
              item &&
              item['products'].length + ' produtos'}
            {type === 'PDVHierarchy' && item && item['stores'].length + ' pdv'}
            {type === 'User' && item && item['peoples'].length + ' usuário'}
          </span>
        </strong>
        <S.ToggleAccordion onClick={() => setOpenAccordion((prev) => !prev)}>
          {openAccordion ? (
            <FiChevronUp size={14} color='#B2B2B2' />
          ) : (
            <FiChevronDown size={14} color='#B2B2B2' />
          )}
        </S.ToggleAccordion>
      </S.ToggleContainer>

      <S.Accordion isOpen={openAccordion}>
        {loading || !row ? (
          <Loader active />
        ) : (
          <>
            {type === 'Products' && (
              <MwManager
                columns={productsHeader}
                rows={row}
                sort={{ sort, setSort }}
                loading={loading}
                hasFilters={false}
              />
            )}
            {type === 'PDVHierarchy' && (
              <MwManager
                columns={pdvHeader}
                rows={row}
                sort={{ sort, setSort }}
                loading={loading}
                hasFilters={false}
              />
            )}
            {type === 'User' && (
              <MwManager
                columns={userHeader}
                rows={row}
                sort={{ sort, setSort }}
                loading={loading}
                hasFilters={false}
              />
            )}
          </>
        )}
      </S.Accordion>
    </S.Container>
  )
}

export default Rows
