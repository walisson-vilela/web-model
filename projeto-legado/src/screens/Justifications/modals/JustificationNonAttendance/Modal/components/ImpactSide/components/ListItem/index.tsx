import React, { useState } from 'react'

import moment from 'moment'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { StoreImpactedProps } from '../../interfaces'

import * as S from './style'

interface ListItemProps {
  props: StoreImpactedProps
}

const ListItem = ({ props }: ListItemProps) => {
  const { attendances, formatted_address, market_flag, name, segment } = props
  const [open, setOpen] = useState(false)

  return (
    <S.Item>
      <span>
        <strong>PDV:</strong> {name} <strong>| Canal:</strong> {segment.name}{' '}
        <strong>| Bandeira:</strong> {market_flag.name}
      </span>
      <span>
        <strong>Endereço:</strong> {formatted_address}
      </span>
      <span>
        <strong>Atendimento Impactados:</strong> {attendances.length}{' '}
        {open ? (
          <FiChevronUp
            size={12}
            color='#B2B2B2'
            onClick={() => setOpen(false)}
          />
        ) : (
          <FiChevronDown
            size={12}
            color='#B2B2B2'
            onClick={() => setOpen(true)}
          />
        )}
      </span>
      {open && (
        <S.OpenModal>
          {attendances.map((attendance) => (
            <span key={attendance}>
              <strong>{moment(attendance).format('dddd').slice(0, 3)}</strong> -{' '}
              {moment(attendance).format('DD/MM/YYYY')} |
            </span>
          ))}
        </S.OpenModal>
      )}
    </S.Item>
  )
}

export default ListItem
