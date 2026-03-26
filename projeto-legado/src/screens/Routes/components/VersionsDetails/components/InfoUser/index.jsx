import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {defineMessages, injectIntl} from 'react-intl';

import {Icomoon} from "../../../../../../components";
import {Divider, Label, Popup, Header, Grid, Menu, Tab, List, Container} from "semantic-ui-react";
import './index.css';

const messages = defineMessages({
    registrationData: {
        id: 'infoUser.registrationData',
        defaultMessage: 'Dados Cadastrais'
    },
    perfomance: {
        id: 'infoUser.perfomance',
        defaultMessage: 'Indice de Performance'
    },
    userInformation: {
        id: 'infoUser.userInformation',
        defaultMessage: 'Informações do usuário'
    },
    function: {
        id: 'infoUser.function',
        defaultMessage: 'Função'
    }
});

class InfoUser extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderPanes = () => {
        const {intl: {formatMessage}} = this.props;

        return [{
            menuItem: formatMessage(messages.registrationData),
            render: () =>
                <Tab.Pane attached={false}>
                    <List as={'ul'}>
                        <List.Item as={'li'}>
                            <strong>Matricula:</strong> 224056
                        </List.Item>
                        <List.Item as={'li'}>
                            <strong>CPF:</strong> 014.640.576.56
                        </List.Item>
                        <List.Item as={'li'}>
                            <strong>Registro Funcional (RE)</strong> 100813
                        </List.Item>
                        <List.Item as={'li'}>
                            <strong>Endereço Residencial</strong>
                            <p>Av.: João Cesar de Oliveira, 2167 - A Novo Eldorado, Belo Horizonte CEP: 32044-390</p>
                        </List.Item>
                        <List.Item as={'li'}>
                            <strong>Telefones / E-mail</strong>
                            <p>(31) 9 8499-1830 | (31) 9 5240-1054</p>
                            <p>eudes@mundowap.com.br</p>
                        </List.Item>
                    </List>
                    <Divider/>
                    <Container>
                        <Header
                            as={'h3'}
                            content={'Gestor Direto'}
                        />
                        <p><strong>Supervisor:</strong> Carlos Drummond de Andrade</p>
                        <List as={'ul'}>
                            <List.Item as={'li'}>
                                <strong>Telefones / E-mail</strong>
                                <p>(31) 9 8499-1830 | (31) 9 5240-1054</p>
                                <p>eudes@mundowap.com.br</p>
                            </List.Item>
                        </List>
                    </Container>
                </Tab.Pane>
        }, {
            menuItem: formatMessage(messages.perfomance),
            render: () =>
                <Tab.Pane attached={false}>
                    Tab 2 Content
                </Tab.Pane>
        }]
    };

    render() {
        const {onOpen, onClose, intl: {formatMessage}} = this.props;

        return (
            <Popup
                basic
                flowing
                on={'click'}
                className={'popupUserInfo'}
                onOpen={() => onOpen()}
                onClose={() => onClose()}
                position={'right center'}
                verticalOffset={150}
                trigger={
                    <Menu.Item
                        content={formatMessage(messages.userInformation)}
                        icon={
                            <Icomoon name={'chevron-right'}/>
                        }
                    />
                }
            >
                <Header as={'h3'}>
                    <Header.Content>
                        Dra. Laura Antonieta Gusmão
                        <Label>IP 50%</Label>
                    </Header.Content>
                </Header>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column computer={6}>
                            <strong>{formatMessage(messages.function)}:</strong> Promotor
                        </Grid.Column>
                        <Grid.Column computer={7} textAlign={'center'}>
                            <small>
                                <Icomoon name={'layers'} label={'Atendimento 1000/1800 - 49,6%'}/>
                            </small>
                        </Grid.Column>
                        <Grid.Column computer={3} textAlign={'right'}>
                            <small>
                                <Icomoon name={'user'} label={'83,4%'}/>
                            </small>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider/>
                <Tab
                    menu={{secondary: true, pointing: true}}
                    panes={this.renderPanes()}
                    className={'TabInfo'}
                />
            </Popup>
        )
    }
}

InfoUser.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

InfoUser.defaultProps = {
    onOpen: () => {
    },
    onClose: () => {
    }
};

export default injectIntl(InfoUser);