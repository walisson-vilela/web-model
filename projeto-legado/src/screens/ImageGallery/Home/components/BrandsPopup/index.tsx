import React, { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { FiCamera } from 'react-icons/fi'

import Popup from '../../../../../components/ManagerColumnPopup'

import { BrandsPopupProps } from './interfaces'
import * as S from './styles'

const BrandsPopup = ({ name, data, page }: BrandsPopupProps) => {
  const [list, setList] = useState([...data])
  const [search, setSearch] = useState<string>('')

  const loader = useCallback(async () => {
    let aux = [...data]

    if (search) {
      const regex = new RegExp(search, 'i')

      aux = aux.filter((e) => e.name.search(regex) > -1)
    }

    setList(aux)
  }, [search])

  useEffect(() => {
    loader()
  }, [loader])

  return (
    <S.Container>
      <S.Header>
        <div>
          <p>
            <b>Marca</b>
          </p>
          <p>
            {page}: <b>{name}</b>
          </p>
        </div>

        <div>
          <SearchFilter setSearch={setSearch} size='mini' />
        </div>
      </S.Header>

      <S.Body>
        {list.map((item, index) => (
          <div key={index}>
            {item.avatar ? (
              <Popup
                trigger={
                  <S.Link>
                    <S.Avatar source={item.avatar} size='small' />
                  </S.Link>
                }
                getContent={async (): Promise<JSX.Element> => (
                  <S.Avatar source={item.avatar} size='large' />
                )}
                on='hover'
                position='right center'
                style={{ padding: 7 }}
              />
            ) : (
              <S.Avatar source='' size='small'>
                <FiCamera size={14} color='#B2B2B2' />
              </S.Avatar>
            )}

            <div>
              <p>
                <b>{item.name}</b>
              </p>
            </div>
          </div>
        ))}
      </S.Body>
    </S.Container>
  )
}

export default BrandsPopup
