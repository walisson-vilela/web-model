import styled from 'styled-components';

export const Dropdown = styled.div`
    width: 20rem;
    //min-height: 2.71428571em;
    margin-right: 1rem;
    padding: .7rem 1rem;
    border-radius: .2rem;
    border: .1rem solid rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .87);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    :hover {
        border-color: rgba(0, 0, 0, .3);
    }

    p, i.icon {
        margin: 0;
        padding: 0;
        text-transform: capitalize;
    }
`;

export const Container = styled.div`
    display: flex;

    .ui.button.facebook {
        font-size: .75rem;
        text-transform: uppercase;
    }
`;

export const Content = styled.div`
    position: relative;
    width: 18rem;
    height: 20rem;
    display: flex;
    flex-direction: column;

    .__heading > .ui.input > div {
        margin-left: -2.3rem;
    }

    .__contents {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;

        > div + div {
            margin-top: 1rem;
        }
    }
`;

export const List = styled.div`
    label {
        color: ${props => props.checked ? '#476098' : 'rgba(0, 0, 0, .5)'} !important;
    }
`;
