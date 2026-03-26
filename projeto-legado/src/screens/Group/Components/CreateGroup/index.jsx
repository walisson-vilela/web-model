import { findIndex, isEmpty, isNull } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-semantic-toasts';
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Dimmer, Input, Loader, Modal, Tab } from 'semantic-ui-react';

import {
    fetchContractorSub,
    getContractorGroup,
    postContractorGroup
} from '../../../../redux/actions/ContractorsActions';

import { Icomoon } from '../../../../components';
import {
    ConfirmContent,
    Container,
    Content,
    Finish,
    Footer,
    FooterConfirm,
    GroupName,
    Header,
    HeadingConfirm,
    SelectAccount
} from './style';

const inputNameRef = createRef();

class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            confirm: false,
            editable: false,
            title: 'Criar novo grupo',
            subtitle: 'Defina o nome do grupo',
            step: 0,
            id: 0,
            disabled: true,
            name: '',
            accounts: [],
            checkeds: [],
            loadingAccount: false,
            loading: false
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
            confirm: false,
            editable: false,
            disabled: true,
            accounts: [],
            checkeds: [],
            name: '',
            id: 0
        });

        // check if an object has been passed and search the items already selected
        if (!isEmpty(props)) {
            const {contractor} = this.props;

            await this.handleChangeTab(1);
            await this.setState({
                loadingAccount: true,
                editable: true
            });

            try {
                const request = await this.props.getContractorGroup(contractor, props.id, {});

                await this.setState({
                    checkeds: request.data.subcontractors,
                    name: props.name,
                    id: props.id
                });
            } catch (e) {
                await console.log(e);
            } finally {
                await this.setState({loadingAccount: false});
            }
        } else {
            await this.handleChangeTab(0);
        }
    };

    /**
     * render panes tab
     *
     * @returns {[{menuItem: string, render: (function(): *)}, {menuItem: string, render: (function(): *)}, {menuItem: string, render: (function(): *)}]}
     */
    handleRenderPanes = () => {
        return [
            {
                menuItem: 'Nome do Grupo',
                render: () => <Tab.Pane attached={false}>{this.handleRenderFirstStep()}</Tab.Pane>,
            },
            {
                menuItem: 'Selecionar Contas',
                render: () => <Tab.Pane attached={false}>{this.handleRenderSecondStep()}</Tab.Pane>,
            },
            {
                menuItem: 'Finalizar',
                render: () => <Tab.Pane attached={false}>{this.handleRenderThirdStep()}</Tab.Pane>,
            },
        ];
    };

    /**
     * take action when changing tab
     *
     * @param tab
     * @returns {Promise<void>}
     */
    handleChangeTab = async (tab) => {
        const {accounts, editable} = this.state;

        switch (tab) {
            case 0:
            default:
                await this.setState({
                    title: `${editable ? 'Editar' : 'Criar novo'} grupo`,
                    subtitle: 'Defina o nome do grupo',
                    step: tab
                });

                if (!isNull(inputNameRef.current)) {
                    await inputNameRef.current.select();
                }
                break;
            case 1:
                await this.setState({
                    title: 'Selecionar contas',
                    subtitle: `Selecione as contas para ${editable ? 'atualizar' : 'criar'} o grupo`,
                    step: tab
                });

                // check if account array is empty
                if (isEmpty(accounts)) {
                    await this.handleSearchAccounts()
                }
                break;
            case 2:
                await this.setState({
                    title: 'Finalizar',
                    subtitle: `Confirme os dados para ${editable ? 'atualizar' : 'criar'} o grupo`,
                    step: tab
                });
                break;
        }
    };

    /**
     * click in first buttom
     *
     * @returns {Promise<void>}
     */
    handleFirstButton = async () => {
        const {step} = this.state;

        if (step === 0) {
            await this.handleToggleModal();
        } else {
            await this.handleChangeTab(Number(step - 1));
        }
    };

    /**
     * click in second buttom
     *
     * @returns {Promise<void>}
     */
    handleSecondButton = async () => {
        const {step} = this.state;

        if (step === 2) {
            await this.setState({confirm: true});
        } else {
            await this.handleChangeTab(Number(step + 1));
        }
    };

    /**
     * render first step
     *
     * @returns {*}
     */
    handleRenderFirstStep = () => {
        const {name, editable} = this.state;

        return (
            <GroupName>
                <h1>{editable ? 'Editar' : 'Criar'} nome do grupo</h1>
                <Input
                    fluid
                    onChange={(e, {value}) => this.setState({name: value})}
                    value={name}
                    placeholder={'Nome do grupo'}
                    ref={inputNameRef}
                />
            </GroupName>
        )
    };

    /**
     * render second step
     *
     * @returns {*}
     */
    handleRenderSecondStep = () => {
        const {accounts, checkeds, loadingAccount} = this.state;

        return (
            <SelectAccount>
                <Dimmer inverted active={loadingAccount}>
                    <Loader inverted/>
                </Dimmer>

                <h1>Contas selecionadas ({checkeds.length} / {accounts.length})</h1>

                <div>
                    <ul>
                        {
                            accounts.map((account, index) => (
                                <li key={index}>
                                    <Checkbox
                                        onChange={() => this.handleToggleItemChecked(account)}
                                        checked={findIndex(checkeds, (check) => check.id === account.id).toString() !== '-1'}
                                    />

                                    <img
                                        src="https://react.semantic-ui.com/images/wireframe/image.png"
                                        alt="Account"
                                        onClick={() => this.handleToggleItemChecked(account)}
                                    />

                                    <p onClick={() => this.handleToggleItemChecked(account)}>{account.detail.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </SelectAccount>
        )
    };

    /**
     * render third step
     *
     * @returns {*}
     */
    handleRenderThirdStep = () => {
        const {name, checkeds} = this.state;

        return (
            <Finish>
                <hgroup>
                    <h1>Nome do Grupo:</h1>
                    <h2>{name}</h2>
                </hgroup>

                {
                    isEmpty(checkeds) ? (
                        <div className={'__empty'}>
                            <p>Você não selecionou nenhuma conta.</p>
                        </div>
                    ) : (
                        <ul>
                            {
                                checkeds.map((checked, index) => (
                                    <li key={index}>
                                        <img src="https://react.semantic-ui.com/images/wireframe/image.png" alt="Account"/>
                                        <p>Conta: {checked.detail.name}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </Finish>
        )
    };

    /**
     * check button lock condition next
     *
     * @returns {boolean}
     */
    handleDisabledButtonNext = () => {
        const {step, name} = this.state;

        switch (step) {
            case 0:
                return isEmpty(name);
            case 1:
            default:
                return false;
        }
    };

    /**
     * register and remove item from selected list
     *
     * @param item
     * @returns {Promise<void>}
     */
    handleToggleItemChecked = async (item) => {
        const checkeds = [...this.state.checkeds];
        const index = findIndex(checkeds, (check) => check.id === item.id);

        if (index.toString() === '-1') {
            checkeds.push(item);
        } else {
            checkeds.splice(index, 1);
        }

        await this.setState({checkeds});
    };

    /**
     * search accounts
     *
     * @returns {Promise<void>}
     */
    handleSearchAccounts = async () => {
        await this.setState({accounts: [], loadingAccount: true});

        try {
            const request = await this.props.fetchContractorSub();
            await this.setState({accounts: request.data});
        } catch (e) {
            await console.log(e)
        } finally {
            await this.setState({loadingAccount: false});
        }
    };

    /**
     * submit accounts
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        const {onSubmit, onRefresh} = this.props;
        const {editable, name, checkeds, id} = this.state;

        await this.setState({loading: true});

        try {
            let defParams = {
                name,
                subcontractors: checkeds.map((checked) => checked.id)
            };

            if (id !== 0) {
                defParams = {...defParams, id};
            }

            await onSubmit(defParams);
            await toast({
                type: 'success',
                title: 'Sucesso!',
                description: `Grupo ${editable ? 'atualizado' : 'criado'} com sucesso!`,
                animation: 'bounce',
                time: 5000
            });
            await this.setState({open: false, confirm: false});
            await onRefresh();
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    render() {
        const {open, title, subtitle, step, confirm, name, loading, editable} = this.state;

        return (
            <Fragment>
                <Modal open={open}>
                    <Container>
                        <Header>
                            <hgroup>
                                <h1>{title}</h1>
                                {
                                    !isEmpty(subtitle) && <h2>{subtitle}</h2>
                                }
                            </hgroup>

                            <Icomoon
                                link
                                name={'x'}
                                onClick={() => this.handleToggleModal()}
                            />
                        </Header>

                        <Content>
                            <Tab
                                activeIndex={step}
                                menu={{secondary: true, pointing: true}}
                                panes={this.handleRenderPanes()}
                            />
                        </Content>

                        <Footer>
                            <Button
                                content={step === 0 ? 'Fechar' : 'Voltar'}
                                onClick={() => this.handleFirstButton()}
                            />

                            <Button
                                color={'facebook'}
                                disabled={this.handleDisabledButtonNext()}
                                content={step === 2 ? 'Finalizar' : 'Avançar'}
                                onClick={() => this.handleSecondButton()}
                            />
                        </Footer>
                    </Container>
                </Modal>

                <Modal open={confirm} size={'tiny'}>
                    <ConfirmContent>
                        <Dimmer inverted active={loading}>
                            <Loader inverted/>
                        </Dimmer>

                        <HeadingConfirm>
                            <h1>{editable ? 'Atualizar' : 'Criar'} grupo</h1>
                            <Icomoon
                                link
                                name={'x'}
                                onClick={() => this.setState({confirm: false})}
                            />
                        </HeadingConfirm>

                        <p>Você está {editable ? 'atualizando' : 'criando'} o grupo: <span>"{name}"</span>.</p>
                        <p>Tem certeza que deseja {editable ? 'modificar' : 'criar'} esse grupo?</p>

                        <FooterConfirm>
                            <Button
                                content={'Cancelar'}
                                onClick={() => this.setState({confirm: false})}
                            />

                            <Button
                                content={'Confirmar'}
                                color={'facebook'}
                                onClick={() => this.handleSubmit()}
                            />
                        </FooterConfirm>
                    </ConfirmContent>
                </Modal>
            </Fragment>
        )
    }
}

CreateGroup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    contractor: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
    postContractorGroup,
    getContractorGroup,
    fetchContractorSub
}, dispatch);

export default connect(undefined, mapDispatchToProps, undefined, {forwardRef: true})(CreateGroup);
