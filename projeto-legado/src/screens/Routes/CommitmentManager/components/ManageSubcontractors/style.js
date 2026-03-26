import styled from 'styled-components';

export const Container = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 1rem;
    height: 0;

    h1 {
        font-size: 1rem;
        margin-bottom: 1rem;
        padding: 0;
        color: #192338;
        text-transform: capitalize;
    }

    .__articles {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        height: 0;
        overflow-y: auto;

        .__empty {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const Contractor = styled.article`
    position: relative;
    align-items: center;
    justify-content: left;
    height: 4rem;
    border-bottom: 1px solid rgba(0, 0, 0, .3);
    padding: 1rem;
    width: 20rem;
    display: flex;
    margin: 0 auto;

    img {
        margin-right: 1rem;
        width: 3.5rem;
    }

    .ui.dropdown {
        position: absolute;
        right: 0;
        top: .2rem;
    }
`;
