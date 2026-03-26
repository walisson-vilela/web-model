import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #0F224D;
    padding: 1rem 1rem 0 !important;
    color: #FFF;
`;

export const SearchArea = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    > div:not(:last-child) {
        margin-right: 1rem;
    }

    .__check-all {
        border: 1px solid rgba(255, 255, 255, .6);
        padding: 0 1rem;
        display: flex;
        align-items: center;
        border-radius: .3rem;

        label {
            text-wrap: nowrap;
            color: #FFF !important;
        }
    }

    .__search {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, .6);
        border-radius: .3rem;
        padding-left: 1rem;

        input {
            color: #FFF !important;
        }

        input::placeholder {
            color: rgba(255, 255, 255, .6) !important;
        }

        i {
            color: #FFF;
            margin-right: .5rem !important;
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 0;

    .empty__stores {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        justify-content: center;
        text-align: center;

        h1 {
            font-size: 1.5rem;
            margin: 0;
            padding: 0;
        }

        h5 {
            font-size: 1.1rem;
            font-weight: normal;
            margin: 0;
            padding: 0;
        }
    }

    .area__scroll {
        height: 0;
        flex: 1;
        overflow-y: scroll;
        padding-right: .4rem;

        article + article {
            border-top: 1px solid rgba(255, 255, 255, .5);
        }
    }

    .area__scroll + div {
        height: 32px;
        display: flex;
        align-items: center;
    }

    .div__area_selectall {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .ui.checkbox {
            margin-right: 1rem;
            border: 1px solid rgba(255, 255, 255, .5);
            padding: .6rem .5rem;
            border-radius: .3rem;

            label {
                color: #FFF;

                :before {
                    background: transparent !important;
                    border: 1px solid rgba(255, 255, 255, .5) !important;
                }
            }
        }

        .ui.checkbox input:not([type=radio]):indeterminate ~ .box:after,
        .ui.checkbox input:not([type=radio]):indeterminate ~ label:after,
        .ui.checkbox input:checked ~ .box:after,
        .ui.checkbox input:checked ~ label:after {
            color: #FFF !important;
        }
    }
`;

export const ItemStore = styled.article`
    display: flex;
    padding: .4rem .5rem;
    align-items: center;
    opacity: ${props => props.disabled ? '.5' : '1'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'auto'};
    user-select: ${props => props.disabled ? 'none' : 'auto'};

    label:before {
        background: transparent !important;
        border: 1px solid rgba(255, 255, 255, .5) !important;
    }

    .ui.checkbox input:checked ~ .box:after,
    .ui.checkbox input:checked ~ label:after {
        color: #FFF !important;
    }

    .item__content {
        margin-left: 1.5rem;
        flex: 1;
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

        small {
            font-size: 11.5px !important;
        }

        hgroup {
            margin-bottom: .2rem;

            h1 {
                max-width: 65ch;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
                padding: 0;
                font-size: 1rem;
            }
        }

        p {
            color: rgba(255, 255, 255, .5);
            max-width: 65ch;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 4px;
            padding: 0;
            font-size: 13px;
            line-height: 15.6px;
        }
    }
`;
