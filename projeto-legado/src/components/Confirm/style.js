import styled from 'styled-components';

export const Container = styled.div`
    margin: -1rem;
`;

export const Header = styled.h5`
    color: var(--headers-blue) !important;
    font-size: 18px;
    line-height: 24px;
    padding: 1rem 1.5rem;
    margin-bottom: .5rem;
    border-bottom: 1px solid #DADADB;
`;

export const Description = styled.p`
    color: var(--black);
    padding: 1rem 1.5rem;
`;

export const GroupButton = styled.div`
    text-align: right;
    margin-top: .5rem;

    border-top: 1px solid #DADADB;

    padding: 1rem 1.5rem;

    button:first-child {
        background: transparent !important;
    }
`;
