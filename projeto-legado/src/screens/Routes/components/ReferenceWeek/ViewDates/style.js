import styled from 'styled-components';

export const Container = styled.div`
    margin: 1rem 0;
    
    h5 {
        margin-bottom: 1.5rem;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    > div:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        p {
            font-size: .9rem;
            margin-right: 1rem;
            margin-bottom: 0;
            color: var(--black-60);
        }
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid var(--black-10);
    padding: 1rem 0;
    
    .field {
        margin: 0 !important;
    }
    
    label {
        color: var(--black-60) !important;
    }
`;
