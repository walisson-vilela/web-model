import React, { useContext } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { Loader } from 'semantic-ui-react'

import ListItem from './components/ListItem'
import { ImpactSideContext } from './context'
import * as S from './styles'

export const ImpactSide = () => {
  const { storeImpacted, setSearchStoreImpacted, loadingStores } =
    useContext(ImpactSideContext)

  const attendences = storeImpacted.reduce((accumulator, attendence) => {
    return (accumulator += attendence.attendances.length)
  }, 0)

  return (
    <S.Impact>
      <span>
        Impacto da Justificativa ( {storeImpacted.length} PDVS | {attendences}{' '}
        atendimentos)
      </span>
      <S.ImpactData>
        <S.SearchDiv>
          <S.Search>
            <SearchFilter setSearch={setSearchStoreImpacted} />
          </S.Search>
        </S.SearchDiv>
        <S.List>
          {loadingStores ? (
            <S.LoaderButtonContainer>
              <Loader active />
            </S.LoaderButtonContainer>
          ) : (
            storeImpacted.map((store) => (
              <ListItem key={store.id} props={store} />
            ))
          )}
        </S.List>
      </S.ImpactData>
    </S.Impact>
  )
}
