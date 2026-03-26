import React from 'react'

import { DistributionEpiType } from '../../../interfaces'
import * as S from './styles'

type Props = {
  data: DistributionEpiType[]
  loading?: boolean
}

const EpiTypesQuantityTable: React.FC<Props> = ({ data, loading }) => {
  if (loading) return <S.EmptyMessage>Carregando...</S.EmptyMessage>

  return (
    <S.TableContainer>
      <S.TableHeader>
        <span>Tipo</span>
        <span style={{ textAlign: 'center' }}>Qtde.</span>
      </S.TableHeader>

      {data.map((item) => (
        <S.TableRow key={item.id}>
          <span>{item.name}</span>
          <S.Badge>{item.quantity}</S.Badge>
        </S.TableRow>
      ))}

      {data.length === 0 && (
        <S.TableRow>
          <span>Nenhum tipo encontrado</span>
          <span />
        </S.TableRow>
      )}
    </S.TableContainer>
  )
}

export default EpiTypesQuantityTable
