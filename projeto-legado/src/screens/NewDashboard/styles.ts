import styled from 'styled-components'

export const Container = styled.div`
  min-width: 100%;
`

export const Header = styled.div`
  padding: 16px 0 8px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
`

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;

  h1 {
    text-align: left;
    font: normal normal bold 18px/22px 'Lato';
    letter-spacing: 0px;
    color: #192338;
    opacity: 1;
    margin-bottom: 0;
  }

  span {
    display: inline-block;
    margin: 8px 0;
    position: relative;
    font: normal normal normal 16px 'Lato';
    letter-spacing: 0px;
    color: #263046b3;
    opacity: 1;
  }
`

export const Menu = styled.div.attrs({
  className: 'hide-on-print',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Section1 = styled.section`
  width: 100%;
  h2 {
    color: #192338;
    font-size: 18px;
    padding: 24px 0 16px 0;
  }
`
export const Wrapper = styled.div`
  width: 100%;

  max-height: 264px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Section2 = styled.section`
  width: 100%;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`

export const WidgetContent = styled.div`
  width: 44.5%;
  height: 268px;
  max-height: 300px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
`

export const Section3 = styled.section`
  width: 100%;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`

export const Section4 = styled.section`
  width: 100%;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`

interface DirectionProps {
  direction: string
  align: string
  justify: string
}

export const Section5 = styled.section.attrs({
  className: 'pagebreak',
})`
  width: 100%;

  h2 {
    color: #192338;
    font-size: 18px;
    padding: 24px 0 16px 0;
  }
`
export const WidgetContentSection5 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Section6 = styled.section`
  width: 100%;

  margin-top: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Section7 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 14px;
`

export const Section8 = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 14px;
`
