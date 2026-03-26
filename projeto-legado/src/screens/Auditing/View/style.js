import styled from 'styled-components';

export const Conteudo = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    display: flex;
    background: var(--white);
`;

export const Sidebar = styled.div`
    width: 22rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--black-10);
    padding-right: 1rem;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    padding: 0 1rem;

    > div:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const Group = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 0;
    position: relative;
`;

export const GroupHeader = styled.div`
    background-color: var(--headers-blue);
    padding: 1rem;
    font-weight: 700;
    color: var(--white);
    display: flex;
    flex-direction: column;

    .__inline + .__inline {
        border-top: 1px solid rgba(255, 255, 255, .07);
        margin-top: .5rem;
        padding-top: .5rem;
    }

    .__inline {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ui.dropdown > .text {
        display: none;
    }

    .mw-icon {
        margin: 0;
        padding: 0;
        font-weight: 700;
    }

    .__footer_dropdown {
        font-size: .8rem;
        display: flex;
        justify-content: flex-end;
        text-decoration: underline;
        color: rgba(0, 0, 0, .4);
    }
`;

export const GroupSearch = styled.div`
    padding: 1rem;
    border-bottom: 1px solid var(--black-20);
`;

export const GroupZones = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 .3rem;
    margin-top: 1rem;
    overflow-y: auto;
    height: 100%;

    > div {
        :not(:last-child) {
            margin-bottom: 1rem;
        }

        :last-child {
            margin-bottom: .2rem;
        }
    }

    .group__empty {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: center;

        h5 {
            color: var(--headers-blue);
            margin: 0;
            padding: 0;
        }

        p {
            color: var(--black-40);
            margin: 0;
            padding: 0;
        }
    }
`;

export const GroupZonesItem = styled.div`
    padding: 1rem;
    border-top: 1px solid var(--black-10);
    border-left: 1px solid var(--black-10);
    border-bottom: 1px solid var(--black-10);
    border-right: 5px solid var(${props => props.status === 0 ? '--black-10' : props.status === 1 ? '--green' : '--yellow'});
    border-radius: .1rem;

    label {
        color: var(--blue-facebook) !important;
    }
`;

export const GroupFooter = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
`;

export const MessageLoader = styled.hgroup`
    margin: 0;
    padding: 0;
    width: 37rem;

    h1 {
        margin-top: 0;
        margin-bottom: 1rem;
        padding: 0;
        font-size: 1.5rem;
        color: #192338;
    }

    h5 {
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        color: rgba(0, 0, 0, .6);
    }
`;
