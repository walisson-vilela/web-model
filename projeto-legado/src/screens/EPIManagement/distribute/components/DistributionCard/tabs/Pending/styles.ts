import styled from 'styled-components'

import {
  Column,
  ColumnTitle,
  ColumnValue,
  ContractButtonWrapper,
  EpiItem,
  EpisContent,
  EpisCount,
  EpisList,
  EpisSection,
  EpisToggle,
  PartialBadgeColumn,
  QuantityPill,
  SignatureCard,
  SignatureColumns,
  ValueBold
} from '../Signed/styles'

export {
  Column,
  ColumnTitle,
  ColumnValue, ContractButtonWrapper, EpiItem, EpisContent, EpisCount, EpisList, EpisSection,
  EpisToggle, PartialBadgeColumn, QuantityPill, SignatureCard,
  SignatureColumns, ValueBold
}

export const DeliveredBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  width: 140px;
  border-radius: 999px;
  border: 1px solid #34d399;
  background: #dcfce7;
  color: #15803d;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`
