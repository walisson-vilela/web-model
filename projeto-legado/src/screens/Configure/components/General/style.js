import styled from 'styled-components';

export const Container = styled.div`
    padding: 1rem;
    border-bottom: 1px solid var(--black-10);
`;

export const View = styled.div`
    color: var(--header);
    width: 30rem;
    
    h3 {
        font-weight: normal;
        color: var(--headers);
        margin-bottom: .5rem;
        padding: 0;
    }
    
    p {
        color: var(--headers);
    }
    
    .div__footer {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        padding: 1rem 0;
        
        p {
            margin-bottom: 0;
            margin-right: 1rem;
        }
    }
`;
