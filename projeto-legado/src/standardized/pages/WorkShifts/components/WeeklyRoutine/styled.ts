import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  cursor: pointer;
  width: fit-content;
  flex: 1;
  gap: 2px;
`
export const WeekDay = styled.div<{ $active: boolean }>`
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
`
