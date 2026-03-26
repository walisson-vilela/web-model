import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;

    .avatar {
        width: 3rem !important;
        height: 3rem !important;
        margin-right: 1rem !important;
    }

    .details > div {
        display: flex;
        align-items: center;
    }

    h4, h5 {
        margin: 0 .5rem 0 0;
        max-width: ${props => props.maxWidth ? props.maxWidth : '34ch'};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h4 {
        color: var(--headers-blue);
    }

    h5 {
        font-weight: normal;
        color: var(--black-50);
    }

    .text {
        color: var(--black-50) !important;
    }
`

export const ItemMenu = styled.p`
    margin: 0;
    padding: 0;
    font-size: .9rem;
    color: var(--black-50);
`;

export const Loader = styled.div`
    width: 20rem;
`;
