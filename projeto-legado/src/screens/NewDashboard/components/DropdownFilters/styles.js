import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
`;

export const MenuDropdown = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 7px 14px;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
    border-left: 1px solid #E2E2E3;
    margin-right:10px;

    ::after{
        position: relative;
        content: "";
        top: 3px;
        width: 0;
        height: 0;
        border: 5px
        solid transparent;
        border-color: rgba(38,48,70,0.5) transparent transparent transparent;
        margin-left: 14px;
    }
}
`;

export const MenuItens = styled.div`
    position: absolute;
    right: 1px;
    top:36px;
    z-index: 99999;
    width: 157px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 4px #67676733;
    border: 1px solid #eeeeee;
    opacity: 1;
`;

export const MenuItem = styled.div`
    width: 100%;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ::after{
        position: relative;
        content: "";
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: transparent transparent transparent rgba(38,48,70,0.5);
        opacity: 0.5;
    }

    :hover{
        background-color: #fafafb;
    }
`;

export const MenuOptions = styled.div`
    position: absolute;
    right: 202px;
    top:46px;
    z-index: 99999;
    width: 200px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 4px #67676733;
    border: 1px solid #eeeeee;
    opacity: 1;

    .filter-title{
        color: #525A6A;
        opacity: 0.5;
        padding: 10px 20px;
    }

    .filter-options-item{
        width: 100%;
        padding: 10px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;

        > div{
            width: 100%;
            letter-spacing: 0px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        :hover{
            background-color: #fafafb;
        }
    }
`;

export const MenuOptionsSearch = styled.div`
    position: absolute;
    right: 158px;
    top:36px;
    z-index: 99999;
    width: 280px;
    min-height: 270px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 4px #67676733;
    border: 1px solid #eeeeee;
    opacity: 1;

    .filter-title{
        color: #263046;
        opacity: 0.5;
        padding: 10px 14px;
        font-size: 16px;
    }

    .options-search{
        width: 100%;
        padding: 7px 14px;
        position: relative;
        display: flex;
        align-items: center;

        input{
            width: 100%;
            border: 1px solid #B5BABE;
            height: 34px;
            border-radius: 4px;
            padding-left: 14px;
            padding-right: 14px;

            ::-webkit-input-placeholder { /* Edge */
                font-size: 14px;
                font-family: Lato, sans-serif;
                font-weight: normal;
                color: #263046;
                opacity: 0.5;
            }
        }

        img{
            position: absolute;
            right: 21px;
            cursor:pointer;
        }
    }

    .option-message{
        color: #A6ACB1;
        font-size: 14px;
        width: 100%;
        text-align: center;
        padding: 21px 42px;
    }

    .option-message-notfound{
        color: #A6ACB1;
        font-size: 14px;
        width: 100%;
        text-align: center;
        padding: 21px 42px;
    }

    .filter-options{
        padding: 0px 14px;
        max-height: 191px;
        overflow-y: auto;

        .filter-options-item{
            width: 100%;
            padding: 14px 7px;
            cursor: pointer;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(112, 112, 112, 0.15);

            > div{
                width: 100%;
                letter-spacing: 0px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            :hover{
                background-color: #fafafb;
            }

        }
    }

    .loading-search{
        padding: 21px 0px 21px 0px;
        display: flex;
        align-items: center;
        justify-content: space-center;
    }
`;
