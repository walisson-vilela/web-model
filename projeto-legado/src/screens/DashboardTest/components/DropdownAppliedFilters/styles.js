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
}
`;

export const MenuItens = styled.div`
    position: absolute;
    width:100%;
    max-width:157px;
    right: 0px;
    top: 34px;
    border: 1px solid black;
    z-index: 99999;
    min-height: 270px;
    height: auto;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 4px #67676733;
    border: 1px solid #eeeeee;
    opacity: 1;

    .applied-filters-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;

        .applied-filters-title {
            color: #263046;
            font-size: 16px;
            opacity: 0.5;
        }

        .applied-filters-clear-all {
            color: #263046;
            opacity: 0.5;
            cursor: pointer;
        }
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

    .applied-filters-itens {
        padding: 0px 14px;
        max-height: 157px;
        overflow-y: auto;

        .applied-filters-item {
            width: 100%;
            max-width:157px;

            padding: 10px 0px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(112, 112, 112, 0.15);

            .item-info{

                .item-info-filter {
                    color: #525A6A;
                    opacity: 0.5;
                    display: flex;
                    align-items: center;
                }

                .item-info-value {
                    color: #525A6A;
                    display: flex;
                    align-items: center;
                }

            }

            .item-remove {
                color: #263046;
                cursor: pointer;
                margin-left: 14px;
            }
        }
    }
`;

export const ContainerPopUp = styled.div`
    text-align: center;
`;
