import styled from 'styled-components';

export const EventPopup = styled.div`
  h4, h5 {
    margin: 0;
  }

  p {
    font-size: .8rem;
    color: var(--white-80);
  }
`

export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 8px;
    overflow: hidden;
`;

export const Header = styled.div`
    width: 100%;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    small {
        color: #666;
    }

    .action-zones {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }

    .scheduling {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        margin-bottom: -11px;
        color: var(--black-50);
        font-size: 12px;
    }

    .mini.statistics {
        margin: 0;

        .ui.statistic {
            margin: 0 1.5rem !important;
            position: relative;
            min-width: 72px;

            .label {
                color: var(--black-60);
                font-size: .9rem;
                text-transform: none;
                font-weight: normal;
            }

            .value {
                font-size: 1.2rem !important;
                color: var(--black-80) !important;
            }

            :not(:last-child):after {
                position: absolute;
                content: "";
                width: 1rem;
                height: 100%;
                border-left: 1px solid var(--black-10);
                top: 0;
                right: -2.5rem;
            }
        }

        @media(max-width: 73.14285714285714rem) {
            .ui.statistic {
                margin: 0 .5rem !important;

                :not(:last-child):after {
                    right: -1.4rem;
                }
            }
        }
    }
`;

export const BigCalendarContent = styled.div`
    flex: 1;
    height: 0;
    overflow-y: ${props => props.loading === 1 ? 'none' : 'auto'};
    position: relative;

    .rbc-slot-selection {
        position: absolute;
        margin: .2rem;
        padding: .39rem;
        border-radius: .2rem;
        width: calc(100% - .4rem) !important;
        color: #FFF;
        background-color: var(--blue-facebook);
    }

    .rbc-day-slot {
        .rbc-timeslot-group {
            display: flex;
            flex-direction: column;
            > div {
                height: 50%;
                margin: 0.2rem;

                :hover {
                    cursor: ${props => props.temporary ? "pointer" : "inherit"};
                    background-color: ${props => props.temporary ? "var(--black-10) !important" : "inherit"};
                    z-index: 4;
                    ::after {
                        display: ${props => props.temporary ? "block" : "none"};
                        content: "Novo evento";
                        width: 100%;
                        height: 50px;
                        position: absolute;
                        left: 0;
                        text-align: center;
                        color: var(--black-50);
                    }
                }
            }
        }
    }

    .rbc-time-header {
        border-bottom: 1px solid var(--black-10);
    }

    .rbc-time-header, .rbc-month-header {
        background-color: #FFFFFF;
        position: sticky !important;
        width: 100%;
        top: 0 !important;
        z-index: 9 !important;
    }

    .rbc-overlay {
        position: absolute;
        z-index: 5;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
        padding: 10px;
    }

    .rbc-event-content {
        height: 3.3rem;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .rbc-day-slot.rbc-time-column {
        .rbc-event-content {
            height: 1.5rem !important;
        }
    }

    .rbc-show-more {
        position: relative;
        z-index: 3;
        float: right;
        font-size: .8rem;
        color: var(--headers-blue);
        padding: 0 .5rem;

        :hover {
            text-decoration: underline;
        }
    }

    .rbc-month-view {
        display: flex;
        flex-direction: column;

        .rbc-month-row {
            position: relative;

            :not(:last-child) {
                margin-bottom: .5rem;
                position: relative;
            }
        }

        .rbc-month-header {
            display: flex;
            background-color: #465F98;
            justify-content: space-between;

            .rbc-header {
                width: calc(100% / 7);

                .renderTitle {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .item {
                        font-weight: 700;
                    }
                }
            }

            .rbc-header:not(:last-child) {
                border-right: 1px solid var(--white);
            }
        }

        .rbc-row-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 14.5rem;
            display: flex;

            .rbc-day-bg {
                width: 100%;
                flex: 1;
                position: relative;
                z-index: 0;

                :not(:last-child) {
                    border-right: 1px solid var(--black-10);
                }
            }

            .rbc-day-bg.rbc-off-range-bg {
                background-color: rgba(0, 0, 0, .04);
            }
        }

        .rbc-row-content {
            border: 1px solid var(--black-10);
            height: 14.5rem;

            .rbc-row {
                display: flex;

                .rbc-date-cell {
                    width: calc(100% / 7);
                    position: relative;
                    z-index: 2;
                }
            }

            .rbc-date-cell.rbc-now.rbc-current {
                span:nth-child(1) {
                    background: #192438 !important;
                }
            }
        }
    }

    .rbc-row.rbc-time-header-cell {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 4rem;

        .rbc-header {
            width: 100%;
            border-left: 1px solid var(--black-10);
        }

        //.rbc-header.rbc-today {
        //    span:last-child {
        //        background-color: #192438 !important;
        //        color: var(--white);
        //    }
        //}
    }

    .rbc-time-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .rbc-time-gutter.rbc-time-column {
            width: 4rem;

            .rbc-timeslot-group {
                width: 4.1rem;
                height: 3.5rem;
                font-size: .85rem;
                color: var(--black-50);
                display: flex;
                align-items: center;
                justify-content: center;
                border-top: 1px solid var(--black-10);

                :last-child {
                    border-bottom: 1px solid var(--black-10);
                }
            }
        }

        .rbc-day-slot.rbc-time-column {
            width: 100%;
            border-left: 1px solid var(--black-10);
            border-top: 1px solid var(--black-10);
            position: relative;

            .rbc-timeslot-group {
                border-bottom: 1px solid var(--black-10);
                height: 3.5rem;
            }

            .rbc-events-container {
                .rbc-background-event {
                    position: absolute;
                    background-image: repeating-linear-gradient(
                        45deg,
                        #f5f5f5,
                        #f5f5f5 7px,
                        #fafafa 7px,
                        #fafafa 14px
                    );
                    width: 100%;
                    padding: .39rem;
                    display: flex;
                    font-size: 12px;
                    align-items: baseline;
                    color: var(--black-50);

                  .rbc-event-label, .rbc-event-content {
                      display: none;
                  }
                }

                .rbc-event {
                    position: absolute;
                    margin: .2rem;
                    background: #465F98;
                    border-radius: .2rem;
                    width: calc(100% - .4rem) !important;
                    padding: .39rem;
                    color: var(--white);
                    font-weight: 700;
                    cursor: pointer;
                    z-index: 8;
                    left: inherit !important;

                    .rbc-event-label {
                        display: none;
                    }

                    p {
                        max-width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
`;

export const GroupButtonActionsDiv = styled.div`
    display: flex;

    button:not(.group__button) {
        background: var(--white) !important;
        color: var(--blue-facebook) !important;
        border: 1px solid #8590A5 !important;
        margin: 0 !important;
        font-weight: normal !important;
    }

    > .dropdown {
        border-color: #8590A5 !important;
        margin-left: 1.25rem;

        .text {
            color: var(--blue-facebook) !important;
        }

        .icon {
            color: var(--blue-facebook);
        }
    }

    .ml-2 {
        margin-left: 1rem !important;
    }
`;

export const ButtonStyled = styled.button`
    margin-left: ${props => props.marginLeft};
    padding: 0;
    background-color: transparent;
    border: 0;
    opacity: ${props => props.disabled ? .4 : 1};

    .mw-icon {
        margin: 0;
        color: ${props => props.color ? props.color : 'var(--white)'};
    }
`;

export const DayOfWeek = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: .39rem;
    color: var(--white);
    font-weight: 700;
    font-size: .75rem;
    text-transform: uppercase;
`;

export const HeaderWeek = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        justify-content: space-between;
        padding: .39rem;
        text-transform: uppercase;
        font-size: .75rem;
        font-weight: 700;
        align-items: center;

        > span {
            display: flex;
        }

        :first-child {
            background-color: #465F98;
            color: var(--white);

            span:last-child {
                font-weight: normal;
                padding: 0 .25rem;
            }

            span:not(.week):last-child {
              background-color: var(--white);
              color: #465F98;
              border-radius: 1rem;
            }
        }

        :nth-child(2) {
            color: var(--black-80) !important;
            font-size: .85rem;
        }
    }
`;

export const DayOfWeekActions = styled.div`
    display: flex;
    flex-direction: column;

    div {
        font-size: .85rem;
        border-bottom: 1px solid var(--black-10);
        text-transform: uppercase;
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            color: var(--headers-blue);
            font-size: .75rem;
        }

        span:nth-child(1) {
            background-color: #465F98;
            color: var(--white);
            font-weight: 700;
            border-radius: 1rem;
            padding: 0 .25rem;
        }
    }
`;

export const EventList = styled.div`
    background: #465F98;
    margin: .03rem;
    padding: .3rem;
    position: relative;
    z-index: 1;
    cursor: pointer;

    p {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--white);
        font-size: .9rem;
        margin: 0;
        padding: 0;
    }

    small {
        color: var(--white-80);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        padding: 0
    }
`;

export const HeaderEventDay = styled.div`
    margin-left: -4rem;
    font-weight: 700;
    padding: .75rem;
    color: var(--white);
    background-color: #465F98;
    font-size: 1rem;

    .mw-icon {
        margin-right: 1rem;
        font-size: 1rem;
        font-weight: 700;
        color: var(--white);
    }
`;

export const ContentProduction = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;

    h5 {
        color: var(--headers);
        margin-bottom: 1rem;
        text-align: center;
    }

    p {
        color: var(--black-60);
        text-align: center;
        margin-bottom: 2rem;
    }

    .group__buttons {
        display: flex;
        flex-direction: row-reverse;
    }
`;
