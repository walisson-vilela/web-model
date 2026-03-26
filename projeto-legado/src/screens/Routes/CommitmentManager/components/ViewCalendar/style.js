import styled from 'styled-components';
import { BigCalendarContent, HeaderWeek } from './../../../View/style';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem;
    background: var(--white);
    height: 100%;

    > div {
        display: flex;
        flex-direction: column;
        position: relative !important;
        height: 100%;
    }

    .ui.selection.dropdown .menu>.item {
        border-color: transparent !important;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    > div:last-child {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        button {
            margin: 0;
            padding: .5rem;
            background-color: transparent;

            :hover, :focus, :active {
                background-color: transparent;
            }

            .mw-icon {
                font-weight: 700;
                margin: 0 !important;
                padding: 0 !important;
            }

            :not(:last-child) {
                margin-right: 1rem;
            }
        }

        p {
            color: var(--black-60);
            font-weight: 700;
        }
    }
`;

export const Calendar = styled(BigCalendarContent)`
    margin-bottom: 1rem;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const HeaderCalendar = styled(HeaderWeek)`
    span:first-child {
        color: var(--white) !important;
    }
`;

export const FloatToogle = styled.div`
    position: absolute;
    top: -4.7rem;
    right: 0;
    display: flex;
    flex-direction: row;
    color: var(--headers-blue);

    p {
        margin-right: 1rem;
    }
`;
