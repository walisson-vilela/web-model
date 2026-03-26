import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  h1 {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
  }
  
  i.mw-icon {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }
`;
