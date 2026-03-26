import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${props => props.inverted === 'true' ? '#FFF' : 'rgba(0, 0, 0, .9)'};
    
    .ui.circular.label,
    .ui.circular.labels .label {
        padding: .25rem !important;
        margin-right: ${props => props.label === 1 ? '.5rem': 0};
    }
`;
