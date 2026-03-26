import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import Search from '../../../../components/Search'
import { GenericMenu } from '../../../../components/global/GenericMenu'

import { Header } from './styles'

type PopupHeaderProps = {
  search: [string, React.Dispatch<React.SetStateAction<string>>]
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; lastPage: boolean }>
  >
  menu: Parameters<typeof GenericMenu>[0]
  title: React.ReactNode
  name: string
}

const PopupHeader = ({
  title,
  name,
  search: [search, setSearch],
  setPagination,
  menu,
  children,
}: React.PropsWithChildren<PopupHeaderProps>) => {
  return (
    <Header>
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <h5>Responsável:</h5>
            <MwEllipsisContainer>
              <span className='bold'>{name}</span>
            </MwEllipsisContainer>
          </div>
        </div>

        <Search
          submitted={[
            search,
            (value) => {
              setSearch(value)
              setPagination({ page: 1, lastPage: true })
            },
          ]}
        />

        <div className='menu'>
          <GenericMenu
            width='141px'
            scrollSpacing={{
              top: 's1',
              left: '0',
              bottom: 's1',
            }}
            itemSpacing={{
              top: 's1',
              left: 's3',
              bottom: 's1',
              right: '0',
            }}
            position='right bottom'
            {...menu}
          />
        </div>
      </div>

      {children}
    </Header>
  )
}

export default PopupHeader
