import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
  border: 1px solid #e2e2e3;
  border-radius: 4px;

  & > strong {
    font: normal normal bold 14px/17px Lato;
    color: #192338;
    & > span {
      font: normal normal normal 14px/17px Lato;
      color: #192338;
    }
  }
`

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > strong {
    font: normal normal bold 14px/17px Lato;
    color: #192338;
    & > span {
      font: normal normal normal 14px/17px Lato;
      color: #192338;
    }
  }
`

export const ToggleAccordion = styled.div`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;

  cursor: pointer;
`

interface AccordionProps {
  isOpen: boolean
}

export const Accordion = styled.div<AccordionProps>`
  width: 100%;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
`
