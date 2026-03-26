import React from 'react'
import * as S from './styles'

interface EPIQuantity {
  size: string
  qtd: number
}

interface Props {
  data: EPIQuantity[]
  loading?: boolean
}

const EPIQuantityTable: React.FC<Props> = ({ data, loading }) => {
  if (loading) return <S.EmptyMessage>Carregando...</S.EmptyMessage>

  console.log('EPIQuantityTable data:', data)

  return (
    <S.TableContainer>
      <S.TableHeader>
        <span>Tamanho</span>
        <span style={{ textAlign: 'center' }}>Qtde.</span>
      </S.TableHeader>

      {data.map((item, index) => (
        <S.TableRow key={index}>
          <span>{item.size}</span>
          <S.Badge>{item.qtd}</S.Badge>
        </S.TableRow>
      ))}
    </S.TableContainer>
  )
}

export default EPIQuantityTable
