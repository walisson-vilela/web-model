import styled from 'styled-components'

const styles = {
  spaccing: {
    mini: 7,
    medium: 14,
    large: 21,
    extraLarge: 28,
  },

  colors: {
    background: '#3455AB',
    whitetextColor: '#fff',
    titleTextColor: '#192338',
    borderModalColor: '#DADADB',
  },
}

export const Container = styled.div`
  width: 100%;
  position: relative;
`

export const Header = styled.header`
  width: 100%;
  padding: ${styles.spaccing.large}px;
  background: ${styles.colors.background};
  color: ${styles.colors.whitetextColor};
  font-size: 20px;
  font-weight: bold;
`

export const Main = styled.section`
  width: 100%;
  height: 468px;
  display: flex;
  position: relative;
`

export const Footer = styled.footer`
  padding: ${styles.spaccing.medium}px;
  border-top: 1px solid #dadadb;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
