import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-semantic-toasts';
import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react';

import { Icomoon } from '../../../../components';
import { Container, Footer, Header } from './style';

class DeleteGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            open: false,
            props: {}
        };
    }

    /**
     * toggle modal
     *
     * @param props
     * @returns {Promise<void>}
     */
    handleToggleModal = async (props = {}) => {
        const {open} = this.state;

        await this.setState({
            open: !open,
            props
        });
    };

    /**
     * delete group
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        const {id} = this.state.props;

        await this.setState({loading: true});

        try {
            await this.props.onSubmit(id);
            await this.handleToggleModal();
            await toast({
                type: 'success',
                title: 'Sucesso!',
                description: 'Grupo removido com sucesso!',
                animation: 'bounce',
                time: 5000
            });
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    render() {
        const {open, props, loading} = this.state;

        return (
            <Modal open={open} size={'tiny'}>
                <Container>
                    <Dimmer inverted active={loading}>
                        <Loader inverted/>
                    </Dimmer>

                    <Header>
                        <h1>Excluir Grupo</h1>
                        <Icomoon
                            link
                            name={'x'}
                            onClick={() => this.handleToggleModal()}
                        />
                    </Header>

                    <p>Você está excluindo o grupo: <span>"{props.name}"</span>.</p>
                    <p>Tem certeza que deseja excluir?</p>

                    <Footer>
                        <Button
                            onClick={() => this.handleToggleModal()}
                            content={'Cancelar'}
                        />

                        <Button
                            onClick={() => this.handleSubmit()}
                            content={'Excluir'}
                            color={'red'}
                        />
                    </Footer>
                </Container>
            </Modal>
        )
    }
}

DeleteGroup.defaultProps = {
    onSubmit: PropTypes.func.isRequired
};

export default DeleteGroup;
