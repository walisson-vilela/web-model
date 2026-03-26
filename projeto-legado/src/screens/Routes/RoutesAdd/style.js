import styled from 'styled-components';

export const Content = styled.div`

    padding-top: 1rem;

    .item.active {
        color: var(--blue-facebook) !important;
        border-color: var(--blue-facebook) !important;
    }

    .item {
        color: var(--black-30) !important;
    }

    .tab {
        box-shadow: none !important;
        border-color: transparent !important;
    }

    .segment {
        padding: .75rem 0 !important;
    }

    .active.selected.item {
        border-color: transparent !important;
    }

    .text, label, input {
        color: var(--headers-blue) !important;
    }
`;

export const GroupButton = styled.div`
    display: flex;
    justify-content: flex-end;

    .field {
        margin: 0 !important;
    }

    .field:first-child > .ui.button {
        background: transparent !important;
        text-decoration: underline;
    }
`;
