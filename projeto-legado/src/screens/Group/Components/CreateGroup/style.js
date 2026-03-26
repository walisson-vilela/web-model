import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    background: #3455AB;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    color: #fff;

    hgroup {
        margin: 0;
        padding: 0;
    }

    h1, h2 {
        margin: 0;
        padding: 0;
    }

    h1 {
        font-size: 1.3rem;
        text-transform: capitalize;
    }

    h2 {
        font-size: 1rem;
        font-weight: normal;
    }

    i.icon {
        font-size: 1.8rem;
    }
`;

export const Content = styled.div`
    padding: 1rem;
    height: 20rem;
    position: relative;
    display: flex;
    flex-direction: column;

    .item {
        color: rgba(0, 0, 0, .5) !important;
    }

    .active.item {
        border-color: #3455AB !important;
        color: #3455AB !important;
    }

    .ui.segment {
        padding: 0;
        border: 0;
        box-shadow: none;
    }

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 4rem;
        top: 0;
        left: 0;
        background: transparent;
        z-index: 3;
    }

    > div {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .ui.segment.active.tab {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: flex-start;
        justify-content: center;
    }
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 1rem;
    padding-right: 1rem;

    .ui.button:first-child {
        background: transparent;
        text-decoration: underline;
    }
`;

export const GroupName = styled.div`
    width: 20rem;

    h1 {
        color: #13254F;
        font-size: 1.2rem;
    }

    input {
        border: 1px solid #13254F !important;
        color: #13254F !important;
    }
`;

export const SelectAccount = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 0;
    position: relative;

    h1 {
        color: #13254F;
        font-size: 1.1rem;
        text-transform: capitalize;
        margin-bottom: 1.5rem;
        margin-top: 0;
    }

    > div{
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 0;
        flex-grow: 1;
        flex-basis: auto;
        overflow-y: auto;
    }

    ul {
        border: 1px solid rgba(0, 0, 0, .1);
        margin: 0;
        padding: 0;
        border-radius: .1rem;
        width: 100%;

        li + li {
            border-top: 1px solid rgba(0, 0, 0, .1);
        }

        li:nth-child(2n+1) {
            background-color: rgba(0, 0, 0, .02);
        }
    }

    li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 1rem;
        color: #13254F;

        img {
            width: 2rem;
            height: 2rem;
            border-radius: 100%;
            margin: 0 1rem;
        }

        img, p {
            cursor: pointer;
        }

        .ui.checkbox input:checked~.box:after,
        .ui.checkbox input:checked~label:after {
            color: #fff !important;
            background: #3455AB !important;
            border-radius: .2rem;
        }
    }
`;

export const Finish = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 0;
    overflow-y: auto;
    flex-basis: auto;
    
    hgroup {
        margin-bottom: 1.5rem;
        padding: 0;
        display: flex;
        align-items: center;
    }

    h1, h2 {
        font-size: 1.1rem;
        margin: 0;
        padding: 0;
        color: #13254F;
    }

    h1 {
        font-weight: normal;
        margin-right: .5rem;
    }

    ul {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 0;
        overflow-y: auto;
        border: 1px solid rgba(0, 0, 0, .1);
        margin: 0;
        padding: 0;
        border-radius: .1rem;
        width: 100%;

        li + li {
            border-top: 1px solid rgba(0, 0, 0, .1);
        }

        li:nth-child(2n+1) {
            background-color: rgba(0, 0, 0, .02);
        }
    }

    li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 1rem;
        color: #13254F;

        img {
            width: 2rem;
            height: 2rem;
            border-radius: 100%;
            margin-right: 1rem;
        }
    }

    .__empty {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: rgba(0, 0, 0, .8);
    }
`;

export const ConfirmContent = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    position: relative;

    p {
        color: rgba(0, 0, 0, .5);
        margin: 0;
        padding: 0;
        font-size: 1.1rem;

        span {
            color: #13254F;
        }
    }
`;

export const HeadingConfirm = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    h1 {
        font-size: 1.2rem;
        margin: 0;
        padding: 0;
        text-transform: capitalize;
        color: #13254F;
    }

    i.icon {
        font-size: 1.2rem;
        color: rgba(0, 0, 0, .5);
        font-weight: 700;
    }
`;

export const FooterConfirm = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1.5rem;

    .ui.button:first-child {
        background: transparent;
        text-decoration: underline;
    }
`;
