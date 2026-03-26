import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  margin-top: ${({ theme }) => theme.spacings.s4};
  max-height: calc(100vh - 240px);
  overflow: auto;
  padding-right: ${({ theme }) => theme.spacings.s1};
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacings.s3};
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s2};
  height: 100%;
`

export const CardSlot = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
`

export const PlaceholderWrapper = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  > div {
    width: 100%;
  }
  position: relative;
`

export const PlaceholderCard = styled.div`
  flex: 1 1 0%;
  border: 1px solid rgb(212, 212, 213);
  border-radius: 16px;
  background: rgb(255, 255, 255);
  display: flex;
  width: 100%;
  position: relative;
  min-height: 185px;
`
