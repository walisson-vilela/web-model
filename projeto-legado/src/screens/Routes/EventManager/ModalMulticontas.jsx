import React, { forwardRef, useContext, useMemo } from "react";
import { Button } from "semantic-ui-react";

import { Modal } from '../../../components';

import { Multicontas } from "./components";

import { EventManagerContext } from ".";

const ModalMulticontas = forwardRef((props, ref) => {

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
            title={"Gerenciar Multicontas"}
            footer={Footer}
            style={{
                width: 945
            }}
        >
            <Multicontas/>
        </Modal>
    );
});

export default ModalMulticontas;
