import styled, { css } from 'styled-components'

export const Counter = styled.p`
  width: fit-content;
  font-size: 13px;
  color: #9e9e9e;
  margin: 0;
  padding-bottom: 7px;
  text-align: end;
  margin-left: 7px;
`

interface ContainerProps {
  qntAccordion: number
}

export const Container = styled.div<ContainerProps>`
  max-height: ${(props) =>
    props.qntAccordion > 1 ? 'calc(100vh - 348px)' : '100%'};
  overflow: auto;
  header {
    display: flex;
    align-items: center;

    label {
      margin: 0 8px 0 2px;
      display: flex;
      align-items: center;

      strong {
        font: normal normal bold 18px/22px Lato;
        letter-spacing: 0px;
        color: #192338;
        opacity: 1;
        margin-left: 7px;
      }

      span {
        font: normal normal bold 18px/22px Lato;
        letter-spacing: 0px;
        color: #192338;
        opacity: 0.5;
        display: inline-block;
        margin-left: 4px;
      }
    }
  }

  .row {
    margin: 0 !important;
    padding: 0 !important;
  }

  .ui.card {
    margin: 0 !important ;
  }

  .ui.grid {
    margin-top: 8px !important;
  }
  .ui.three.column.grid {
    margin: 0 !important;
  }
  .ui.two.column.grid {
    margin: 0 !important;
    padding: 0 !important;
  }

  .ui.grid > .column:not(.row),
  .ui.grid > .row > .column {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    padding-bottom: 1rem !important;
  }

  .ui[class*='two column'].grid > .column:not(.row),
  .ui[class*='two column'].grid > .row > .column {
    width: 50%;
  }
`

interface ArrowProps {
  active: boolean
}

export const Arrow = styled.div<ArrowProps>`
  width: 0;
  height: 0;
  margin-left: 7px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
  margin-right: 2px;

  :hover {
    cursor: pointer;
  }

  ${(props) => {
    if (props.active === true) {
      return css`
        transform: rotate(-90deg);
      `
    }
    return css`
      transform: rotate(0deg);
    `
  }}
`

export const DynamicGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(406px, 1fr));
  gap: 1rem;
  padding-inline: 0.5rem;
`

export const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    margin-left: 44px;
  }
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 99 !important;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    position: fixed !important;
  }
`
export const EmptyMessage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 7px;

  & > span {
    color: #b2b2b2;
    font-size: 16px;
  }
`
