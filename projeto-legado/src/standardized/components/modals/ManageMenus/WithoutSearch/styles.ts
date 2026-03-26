import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  border-bottom: 1px solid #e2e2e3;
`

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
`

export const Accordion = styled.div`
  border-bottom: 1px solid #e2e2e3;
  padding: 21px 14px;

  &:last-child {
    border: none;
  }

  h6 {
    font-size: 18px;
    font-weight: bold;
    color: #263046;
    cursor: pointer;
    margin: 0;
  }

  h5 {
    padding-top: 14px;
    font-size: 14px;
    color: #263046;
    opacity: 50%;
    margin: 0;
  }
`

interface AccordionSubmenusProps {
  opened: number
}

export const AccordionSubmenus = styled.div<AccordionSubmenusProps>`
  padding-left: 37px;
  overflow: hidden;
  transition: height 0.35s ease-in-out;

  height: ${({ opened }) =>
    opened > 0 ? `calc(32px + ${opened} * (17px + 14px))` : 0};
`
