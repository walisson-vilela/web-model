import styled from 'styled-components';

export const Content = styled.div`
    background: var(--white);
    padding: 1rem;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, .2);
    border-radius: .2rem;
    
    th {
        color: var(--headers-blue) !important;
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--black-10);
    
    h1 {
        color: var(--blue-facebook);
        font-size: 1.3rem;
        margin: 0;
        padding: 0;
        
        .mw-icon {
            margin-left: 1rem;
            font-weight: 700;
            font-size: 1rem;
            color: var(--black-40);
        }
    }
    
    h5 {
        color: var(--black-40);
        margin: 0;
        padding: 0;
    }
`;
