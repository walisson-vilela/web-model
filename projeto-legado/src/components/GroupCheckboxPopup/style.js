import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  
  .ui.toggle.checkbox + .ui.toggle.checkbox {
    margin-top: .75rem;
  }
`;
