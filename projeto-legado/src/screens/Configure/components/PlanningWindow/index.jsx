import { findIndex, isEmpty, isNull, isUndefined } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change, Field, reduxForm, reset } from 'redux-form';
import { isDate, isDateGreater, isDateLess, required } from '../../../../utils/Validate';

import { Button, Dimmer, Form, Loader } from 'semantic-ui-react';
import { Icomoon, InputDate, MenuPopup, Modal } from '../../../../components';
import { Container, DropdownUser, Item, List, Row } from './style';

const usersRef = createRef();

class PlanningWinndow extends Component {
    /**
     * Constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            api: [],
            configs: [],
            excluded: [],
            loading: false,
            edit: null,
            total: 0
        }
    }

    /**
     * Executa ação ao montar componente.
     */
    componentDidMount() {
        const didMount = async () => {
            await this.hanfleFetchAPI();
        };

        // noinspection JSIgnoredPromiseFromCall
        didMount();
    }

    /**
     * Modifica objeto para envio e salvamento no state local.
     *
     * @param forms
     * @returns {Promise<{audit_performer: *, month: *, planning_end: *, audit_end: *, planning_performer: *, audit_start: *, published: *, planning_start: *}>}
     */
    handleModObject = async (forms) => {
        return {
            month: moment(forms.values.month, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            published: moment(forms.values.published, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            planning_start: moment(forms.values.planning_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            planning_end: moment(forms.values.planning_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            planning_performer: forms.values.planning_performer,
            audit_start: moment(forms.values.audit_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            audit_end: moment(forms.values.audit_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            audit_performer: forms.values.audit_performer
        }
    };

    /**
     * Recebe os dados do formulário e salva no state local para avaliação.
     * Reseta redux form.
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        const {configs} = this.state;
        const {form, forms} = this.props;

        // modifica dados recebidos do redux-form.
        const ob = await this.handleModObject(forms);

        await this.setState({configs: [ob, ...configs]});
        await this.props.dispatch(reset(form));
    };

    /**
     * Executa ação de acordo com opção selecionada.
     *
     * @param action
     * @param id
     * @param index
     * @returns {Promise<void>}
     */
    handleChangeAction = async (action, id, index) => {
        switch (action) {
            case 'edit':
                await this.handleChangeConfig(index);
                break;
            case 'delete':
            default:
                await this.handleRemoveConfig(id, index);
                break;
        }
    };

    /**
     * Recupera dados e preenche inputs com valores recuperados.
     *
     * @param index
     * @returns {Promise<void>}
     */
    handleChangeConfig = async (index) => {
        const {form} = this.props;
        const {api, configs} = this.state;

        const records = [...configs, ...api];

        const config = {...records[index]};

        await this.setState({edit: index});
        await this.props.dispatch(change(form, 'id', config.id));
        await this.props.dispatch(change(form, 'month', moment(config.month).format('DD/MM/YYYY')));
        await this.props.dispatch(change(form, 'published', moment(config.published).format('DD/MM/YYYY')));
        await this.props.dispatch(change(form, 'planning_start', moment(config.planning_start).format('DD/MM/YYYY')));
        await this.props.dispatch(change(form, 'planning_end', moment(config.planning_end).format('DD/MM/YYYY')));
        await this.props.dispatch(change(form, 'planning_performer', config.planning_performer));
        await this.props.dispatch(change(form, 'audit_start', moment(config.audit_start).format('DD/MM/YYYY')));
        await this.props.dispatch(change(form, 'audit_end', moment(config.audit_end).format('DD/MM/YYYY')));
        await this.props.dispatch(change(form, 'audit_performer', config.audit_performer));
    };

    /**
     * Altera state edit para false e modifica dado existente.
     *
     * @param id
     * @returns {Promise<void>}
     */
    handleApplyMod = async (id) => {
        const {edit} = this.state;
        const {form, forms} = this.props;

        // modifica dados recebidos do redux-form.
        const ob = await this.handleModObject(forms);

        /**
         * Verifica se o ID passado é diferente de 0.
         * IF - Remove registro do state local (API) e cria novo array (CONFIGS).
         * ELSE - Edita registro e atualiza state local (CONFIGS).
         */
        if (id !== 0) {
            let api = [...this.state.api];
            let configs = [ob, ...this.state.configs];

            const index = await findIndex(api, o => o.id === id);

            await api.splice(index, 1);
            await this.setState({api, configs});
        } else {
            let configs = [...this.state.configs];
            configs[edit] = ob;

            await this.setState({configs});
        }

        await this.setState({edit: null});
        await this.props.dispatch(reset(form));
    };

    /**
     * Remove registro e salva ID no state local.
     *
     * @param id
     * @param index
     * @returns {Promise<void>}
     */
    handleRemoveConfig = async (id, index) => {
        const {edit} = this.state;

        /**
         * Verifica se o ID é diferente de 0 e adiciona no state local.
         * IF - Remove item e atualiza state local (API).
         * ELSE - Remove item e atualiza state local (CONFIGS).
         */
        if (!isUndefined(id) && id !== 0) {
            const del = [...this.state.excluded, id];
            await this.setState({excluded: del});

            let api = [...this.state.api];

            await api.splice(index, 1);
            await this.setState({api});
        } else {
            let configs = [...this.state.configs];

            await configs.splice(index, 1);
            await this.setState({configs});
        }

        // Verifica se o ID removido é o mesmo que está sendo editado.
        if (!isNull(edit) && edit === index) {
            await this.setState({edit: null});
        }
    };

    /**
     * Busca dados de configuração na API.
     *
     * @returns {Promise<void>}
     */
    hanfleFetchAPI = async () => {
        const api = [
            {
                id: 1,
                month: '2019-09-01',
                published: '2019-09-01',
                planning_start: '2019-09-08',
                planning_end: '2019-09-14',
                planning_performer: [],
                audit_start: '2019-09-15',
                audit_end: '2019-09-21',
                audit_performer: []
            }, {
                id: 2,
                month: '2019-10-01',
                published: '2019-10-01',
                planning_start: '2019-10-06',
                planning_end: '2019-10-12',
                planning_performer: [],
                audit_start: '2019-10-13',
                audit_end: '2019-10-19',
                audit_performer: []
            }
        ];

        await this.setState({loading: true});

        setTimeout(async () => {
            try {
                await this.setState({loading: false});
                await this.setState({
                    api,
                    total: api.length
                });
            } catch (e) {
                await this.setState({loading: false});
                await console.log(e);
            }
        }, 2000);
    };

    render() {
        const objectForm = {
            values: {
                id: 0,
                month: '',
                published: '',
                planning_start: '',
                planning_end: '',
                planning_performer: [],
                audit_start: '',
                audit_end: '',
                audit_performer: []
            }
        };

        const {configs, loading, edit, api, total} = this.state;
        const {pristine, submitting, valid, forms} = this.props;
        const {values} = isUndefined(forms) ? objectForm : forms;

        const records = [...configs, ...api];
        const optionsMenu = [
            {key: 0, text: 'Editar', value: 'edit'},
            {key: 1, text: 'Excluir', value: 'delete'}
        ];

        return (
            <Fragment>
                <Container>
                    <h3>Definir os parâmetros</h3>

                    <Form onSubmit={() => this.handleSubmit()}>
                        <Row marginTop={'1.75rem'}>
                            <Field
                                label={'Selecione o mês'}
                                component={InputDate}
                                name={'month'}
                                placeholder={'Escolher'}
                                validate={[required, isDate]}
                            />

                            <Field
                                label={'Data de publicação'}
                                component={InputDate}
                                name={'published'}
                                placeholder={'Escolher'}
                                validate={[required, isDate]}
                            />
                        </Row>

                        <Row marginTop={'2rem'} justifyContent>
                            <div>
                                <p>Defina a janela de planejamento e executor(s)</p>
                                <div>
                                    <Field
                                        component={InputDate}
                                        name={'planning_start'}
                                        placeholder={'Inicio'}
                                        type={'text'}
                                        validate={[required, isDate, isDateLess]}
                                        maxDate={values.planning_end}
                                    />

                                    <Field
                                        component={InputDate}
                                        name={'planning_end'}
                                        type={'text'}
                                        placeholder={'Fim'}
                                        validate={[required, isDate, isDateGreater]}
                                        minDate={values.planning_start}
                                    />

                                    <DropdownUser onClick={() => this.props.toggleModal()}>
                                        {
                                            isEmpty(values.planning_performer)
                                                ? <p>Executor</p>
                                                : <p>{values.planning_performer.length} usuários</p>
                                        }
                                        <Icomoon name={'chevron-down'}/>
                                    </DropdownUser>
                                </div>
                            </div>
                            <div>
                                <p>Defina a janela de auditoria e executor(s)</p>
                                <div>
                                    <Field
                                        component={InputDate}
                                        name={'audit_start'}
                                        placeholder={'Inicio'}
                                        validate={[required, isDate, isDateLess]}
                                        maxDate={values.audit_end}
                                    />

                                    <Field
                                        component={InputDate}
                                        name={'audit_end'}
                                        placeholder={'Fim'}
                                        validate={[required, isDate, isDateGreater]}
                                        minDate={values.audit_start}
                                    />

                                    <DropdownUser marginRight={'2rem'} onClick={() => this.props.toggleModal()}>
                                        {
                                            isEmpty(values.audit_performer)
                                                ? <p>Executor</p>
                                                : <p>{values.audit_performer.length} usuários</p>
                                        }
                                        <Icomoon name={'chevron-down'}/>
                                    </DropdownUser>

                                    {
                                        !isNull(edit)
                                            ? <Button
                                                basic
                                                color={'blue'}
                                                disabled={Boolean(pristine || submitting || !valid)}
                                                content={'Aplicar'}
                                                type={'button'}
                                                onClick={() => this.handleApplyMod(values.id)}
                                            />
                                            : <Button
                                                basic
                                                color={'blue'}
                                                disabled={Boolean(pristine || submitting || !valid)}
                                                content={'Adicionar'}
                                            />
                                    }
                                </div>
                            </div>
                        </Row>
                    </Form>

                    <List>
                        <h3>Lista de configurações estabelecida</h3>

                        {
                            isEmpty(records)
                                ? <div className="div__empty"><p>Até o momento não há configurações estabelecidas.</p>
                                </div>
                                : <div className={'div__items'}>
                                    {
                                        records.map((config, index) => (
                                            <Item key={index}>
                                                <div>
                                                    <strong>Mês {config.id} {index}</strong>
                                                    {moment(config.month).format('MMMM/YYYY')}
                                                </div>
                                                <div>
                                                    <strong>Publicação</strong>
                                                    {moment(config.published).format('DD/MM/YYYY')}
                                                </div>
                                                <div>
                                                    <strong>Planejamento</strong>
                                                    {moment(config.planning_start).format('DD/MM')} a {moment(config.planning_end).format('DD/MM')}

                                                    <span>
                                                        <p>{config.planning_performer.length} usuários</p>
                                                        <Icomoon
                                                            name={'chevron-down link'}
                                                            onClick={() => usersRef.current.openModal()}
                                                        />
                                                    </span>
                                                </div>
                                                <div>
                                                    <strong>Auditoria</strong>
                                                    {moment(config.audit_start).format('DD/MM')} a {moment(config.audit_end).format('DD/MM')}

                                                    <span>
                                                        <p>{config.audit_performer.length} usuários</p>
                                                        <Icomoon name={'chevron-down'}/>
                                                    </span>

                                                    <MenuPopup
                                                        compact
                                                        icon={'more-vertical link'}
                                                        items={optionsMenu}
                                                        handleReturn={(res) => this.handleChangeAction(res, config.id, index)}
                                                        size={'small'}
                                                    />
                                                </div>
                                            </Item>
                                        ))
                                    }
                                </div>
                        }

                        <div className="div__footer">
                            <Button
                                color={'green'}
                                content={'Salvar'}
                                disabled={Boolean(isEmpty(configs) && api.length === total)}
                            />
                        </div>
                    </List>

                    <Dimmer active={loading} inverted>
                        <Loader inverted/>
                    </Dimmer>
                </Container>

                <Modal ref={usersRef} size={'large'} style={{padding: 0}}>
                    <button onClick={() => usersRef.current.closeModal()}>Fechar</button>
                </Modal>
            </Fragment>
        )
    }
}

PlanningWinndow.propTypes = {
    toggleModal: PropTypes.func.isRequired
};

PlanningWinndow = reduxForm({
    form: 'PlanningWinndow',
    enableReinitialize: true,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(PlanningWinndow);

const mapStateToProps = (state) => {
    const {PlanningWinndow} = state.form;

    return {
        forms: PlanningWinndow,
        _validDateLessOrGreater: {
            planning_start: 'planning_end',
            planning_end: 'planning_start',
            audit_start: 'audit_end',
            audit_end: 'audit_start'
        },
        initialValues: {
            id: 0,
            month: '',
            published: '',
            planning_start: '',
            planning_end: '',
            planning_performer: [],
            audit_start: '',
            audit_end: '',
            audit_performer: []
        }
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlanningWinndow);
