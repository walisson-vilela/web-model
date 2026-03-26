import React, { useEffect, useState } from 'react';
import * as S from './styles';

interface SizeRow {
  id: number;
  size: string;
  quantity: number | string;
  addQuantity?: number | string;
}

interface SizesTableProps {
  data?: SizeRow[];
  onChange?: (updatedSizes: SizeRow[]) => void;
  disabled?: boolean;
  isEditing?: boolean;
}

const SizesTable: React.FC<SizesTableProps> = ({ data = [], onChange, isEditing = false }) => {
  const [sizes, setSizes] = useState<SizeRow[]>(data);

  useEffect(() => {
    setSizes(data);
  }, [data]);

  const handleQuantityChange = (index: number, value: string, field: 'quantity' | 'addQuantity') => {
    const updated = [...sizes];
    updated[index][field] = Number(value) || 0;
    setSizes(updated);
    onChange?.(updated);
  };

  return (
    <S.Table>
      <thead>
        <tr>
          <S.Th  style={{ width: '100px', textAlign: 'center',  color: isEditing ? '#aaa' : '#000',  }}>Tamanho</S.Th>
          <S.Th alignCenter  style={{ width: '100px', textAlign: 'center', border: 'none', color: isEditing ? '#aaa' : '#000', }}>Quantidade</S.Th>
          {isEditing && (
            <S.Th alignCenter style={{ background: '#748ed6', color: '#FFF' }}>
              Adicionar Quantidade
            </S.Th>
          )}
        </tr>
      </thead>

      <tbody>
        {sizes.map((item, index) => (
          <S.Row key={index}>
            <S.Td style={{ width: '100px', textAlign: 'center', color: isEditing ? '#aaa' : '#000', background: isEditing ? '#fff' : '#fff' }}>{item.size}</S.Td>

            <S.Td alignCenter>
              <input
                type="number"
                value={item.quantity}
                min={0}
                style={{ width: '100px', textAlign: 'center', border: 'none', color: isEditing ? '#aaa' : '#000', background: isEditing ? '#fff' : '#fff' }}
                onChange={(e) => handleQuantityChange(index, e.target.value, 'quantity')}
                disabled={isEditing}
              />
            </S.Td>

            {isEditing && (
              <S.Td alignCenter>
                <input
                  type="number"
                  value={item.addQuantity}
                  min={0}
                  style={{ width: '160px', textAlign: 'center', border: 'none' }}
                  onChange={(e) => handleQuantityChange(index, e.target.value, 'addQuantity')}
                />
              </S.Td>
            )}
          </S.Row>
        ))}
      </tbody>
    </S.Table>
  );
};

export default SizesTable;
