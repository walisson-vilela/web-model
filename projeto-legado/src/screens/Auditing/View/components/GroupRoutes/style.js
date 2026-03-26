import styled from 'styled-components';

export const Content = styled.div`
    height: 0;
    display: flex;
    flex-direction: column;
    flex: 1;

    .empty__div {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        justify-content: center;

        .ui.container {
            width: 100% !important;

            h4.ui.header {
                margin-bottom: 1rem !important;
            }
        }
    }
`;

export const Filter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;

    > div:first-child {
        border-bottom: 1px solid var(--black-10);
        padding: .5rem;
    }

    > div:not(:last-child) {
        margin-right: 2rem;
    }

    > .ui.inline.dropdown {
        > .text {
            font-weight: normal !important;
            color: var(--black-40);
        }

        .dropdown.icon {
            color: var(--black-40);
            margin-left: .75rem;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 0;
    overflow-y: scroll;
    padding-right: .5rem;

    > div:not(:last-child) {
        margin-bottom: 1rem;
    }
`;
