import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-semantic-toasts';
import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react';

import { Icomoon } from '../../../../components';
import { Container, Footer, Header } from './style';

class InactivateGroup extends Component {
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
     * inactivate group
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        const {id, active} = this.state.props;

        await this.setState({loading: true});

        try {
            await this.props.onSubmit({id, active});
            await this.handleToggleModal();
            await toast({
                type: 'success',
                title: 'Sucesso!',
                description: `Grupo ${active ? 'inativo' : 'ativo'} com sucesso!`,
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
                        <h1>{props.active ? 'Inativar' : 'Ativar'} Grupo</h1>
                        <Icomoon
                            link
                            name={'x'}
                            onClick={() => this.handleToggleModal()}
                        />
                    </Header>

                    <p>Você está {props.active ? 'inativando' : 'ativando'} o grupo: <span>"{props.name}"</span>.</p>
                    <p>Tem certeza que deseja {props.active ? 'inativar' : 'ativar'}?</p>
                    <br/>
                    <br/>
                    <p><span>Obs: Você poderá {props.active ? 'ativa-lo' : 'inativa-lo'} a qualquer momento.</span></p>

                    <Footer>
                        <Button
                            onClick={() => this.handleToggleModal()}
                            content={'Cancelar'}
                        />

                        <Button
                            onClick={() => this.handleSubmit()}
                            content={props.active ? 'Inativar' : 'Ativar'}
                            color={props.active ? 'red' : 'green'}
                        />
                    </Footer>
                </Container>
            </Modal>
        )
    }
}

InactivateGroup.defaultProps = {
    onSubmit: PropTypes.func.isRequired
};

export default InactivateGroup;
