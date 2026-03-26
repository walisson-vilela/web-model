import styled from 'styled-components';

export const Container = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    .ui.selection.dropdown .menu>.item {
        border-color: transparent !important;
    }
`;

export const Header = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 0;
    flex: 1;
    overflow-y: scroll;
    position: relative;
    padding-right: .5rem;

    > div:not(:last-child) {
        margin-bottom: .5rem;
    }

    h4.ui.header {
        margin-bottom: 1rem !important;

        span, .sub.header {
            color: var(--black-60) !important;
        }
    }
`;

export const Item = styled.div`
    border: 1px solid var(--black-10);
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: .2rem;
    color: var(--headers-blue);
    font-size: 1.1rem;

    .mw-icon {
        font-weight: 700;
        color: var(--black-40);
    }

    span {
        color: var(--black-40);
    }

    > div:nth-child(2) {
        text-align: left;
        min-width: 20rem;
    }
`;

export const ContainerPopup = styled.div`
    width: 20rem;

    div {
        padding: 1rem;

        :not(:last-child) {
            border-bottom: 1px solid var(--black-10);
        }

        p {
            margin: 0;
            padding: 0;
            color: var(--headers-blue);
            position: relative;

            span {
                color: var(--black-40);
            }
        }
    }
`;

export const Chart = styled.div`
    color: ${props => props.positive ? 'green' : 'red'};
    font-weight: 700;
    width: 5rem;
`;
