import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  align-items: center;
  justify-items: center;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 14px;
    bottom: 14px;
    width: 1px;
    background: #e5e7eb;
    transform: translateX(-50%);
  }
`

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  text-align: center;

  strong {
    font-size: 28px;
    font-weight: 600;
    color: #263046;
  }

  span {
    font-size: 13px;
    color: #4b5563;
  }
`
