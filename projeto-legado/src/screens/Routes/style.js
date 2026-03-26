import styled from 'styled-components';

export const Item = styled.div`
    color: #525A6A;
    cursor: pointer;
`;

export const Route = styled.p`
    display: block;
    color: var(--black-40);
    font-size: .8rem;
`;

export const Options = styled.div`
    text-align: left;
    width: 100%;
    .mw-icon {
        font-weight: bold;
        margin: 0 !important;
        padding: 0 !important;
        font-size: 1.1rem;
        color: #525A6A;
    }
`;

export const HeaderDraft = styled.div`
    width: 25rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--black-20);
    padding: 1rem 0;
    margin-bottom: 1.5rem;

    div {
        color: var(--headers);
    }

    div:nth-child(1) {
        flex-shrink: 0;
        flex-grow: 1;
    }
`;

export const DraftItens = styled.p`
    color: var(--headers);
    margin-bottom: .1rem;

    span {
        color: var(--black-60);
    }
`;

export const DraftFooter = styled.div`
    text-align: right;
    margin-top: 1.5rem;
`;
