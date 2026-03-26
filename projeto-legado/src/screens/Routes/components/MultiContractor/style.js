import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 22rem;
    width: 15rem;

    h1 {
        font-size: 1.1rem;
        color: #0F224D;
        padding: 0;
        margin-bottom: 1rem;
        margin-top: 0;
    }

    .ui.fluid.icon.input {
        margin-bottom: 1rem;

        > div {
            margin-left: -2rem;
        }
    }

    .ui.button {
        text-transform: uppercase;
        font-size: .85rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin-top: 1rem;
    }

    .__articles {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 0;
        overflow-y: auto;

        .ui.checkbox + .ui.checkbox {
            margin-top: 1rem;
        }
    }
`;
