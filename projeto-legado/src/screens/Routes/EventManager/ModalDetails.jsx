import React, { forwardRef, useCallback, useContext, useMemo } from "react";
import { Button, Dropdown } from "semantic-ui-react";

import { Modal } from '../../../components';

import { Repeat } from "../components";

import { EventManagerContext } from ".";

import { dateGet } from "../../../utils/DateTime";

import { Info, Multicontas } from "./components";

import { TabWrapper } from "./style";

const ButtonDelete = () => {

    const {handleDelete, loading} = useContext(EventManagerContext);

    const remove = useCallback((all = false) => {
        handleDelete(all);
    }, []);

    const options = [
        {key: 'unique', text: 'Remover este atendimento', onClick: () => remove()},
        {key: 'delete', text: 'Remover todos atendimentos do PDV', onClick: () => remove(true)},
    ];

    return (
        <Button.Group negative floated={"left"}>
            <Button disabled={loading} content={"Remover"} onClick={() => remove()}/>
            <Dropdown
                floating
                defaultUpward
                className={"button icon"}
                disabled={loading}
                options={options}
                trigger={<></>}
            />
        </Button.Group>
    );
}

const ModalDetails = forwardRef((props, ref) => {

    const {default_mode, isGroup, dirt, item, loading} = useContext(EventManagerContext);

    const date = dateGet(item.start, default_mode === 'week' ? 'dddd' : 'DD/MM/YY').replace("-feira", "");
    const {code, title} = item.event || {};

    const Footer = useMemo(() => (
        <React.Fragment>
            {(default_mode === "week" && item.temporary && !item.new) && <ButtonDelete/>}
            <Button
                basic
                disabled={loading}
                className={"transparent"}
                type={"button"}
                content={"Cancelar"}
                onClick={() => ref.current.closeModal()}
            />
            <Button
                primary
                disabled={!dirt}
                form={"details-form"}
                content={"Aplicar"}
            />
        </React.Fragment>
    ), [dirt, item, loading]);

    const panes = useMemo(() => {
        let options = [];
        if (default_mode === 'week' && item.temporary) {
            options.push({
                menuItem: 'Repetição',
                render: () => <Repeat/>,
            });

            if (isGroup && !item.new) {
                options.push({
                    menuItem: 'Multicontas',
                    render: () => <Multicontas/>,
                });
            }
        }

        if(!item.new){
            options.push({
                menuItem: 'Informações',
                render: () => <Info/>,
            });
        }

        return options;
    }, [default_mode, item]);

    let modal_title = `${code} - ${title} - ${date}`;
    if(item.new) {
        const new_start = item.start.format('HH:mm');
        const new_end = item.end.format('HH:mm');
        modal_title = `Novo Evento - ${date} (${new_start} às ${new_end})`;
    }

    return (
        <Modal
            menu
            ref={ref}
            size={"large"}
            title={modal_title}
            footer={Footer}
            loading={loading}
            style={{
                width: 945
            }}
        >
            <TabWrapper
                props={{new: item.new || false}}
                menu={{secondary: true, pointing: true}}
                panes={panes}
                // tabIndex={tabIndex}
                // onTabChange={(e, {activeIndex}) => {
                //     if (dirt) {
                //         if (window.confirm('Alterações que não foram salvas serão perdidas, deseja prosseguir?')) {
                //             setTabIndex(activeIndex);
                //             setDirt(false);
                //         }
                //     } else {
                //         setTabIndex(activeIndex);
                //     }
                // }}
            />
        </Modal>
    );
});

export default ModalDetails;
