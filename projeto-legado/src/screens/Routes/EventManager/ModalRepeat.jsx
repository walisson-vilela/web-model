import React, { forwardRef, useContext, useMemo } from "react";
import { Button } from "semantic-ui-react";

import { Modal } from '../../../components';

import { Repeat } from "../components";

import { EventManagerContext } from ".";

const ModalRepeat = forwardRef((props, ref) => {

    const {dirt} = useContext(EventManagerContext);

    const Footer = useMemo(() => (
        <React.Fragment>
            <Button
                basic
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
    ), [dirt]);

    return (
        <Modal
            menu
            ref={ref}
            size={'large'}
            title={"Configurar Repetição"}
            footer={Footer}
            style={{
                width: 945
            }}
        >
            <Repeat/>
        </Modal>
    );
});

export default ModalRepeat;
