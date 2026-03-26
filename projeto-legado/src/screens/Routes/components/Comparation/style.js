import styled from 'styled-components';

export const Content = styled.div`
    width: 45rem;
    
    td {
        color: var(--headers-blue) !important;
    }
`;

export const Item = styled.span`
    color: var(--black-50);
`;

export const Porcent = styled.span`
    color: ${props => props.positive ? '#43BD88' : '#EC4D47'};
    font-weight: 700;
`;

export const Empty = styled.div`
    color: var(--headers-blue);
    
    p {
        margin: 0;
        padding: 0;
        font-weight: 700;
    }
`;
