import { isArray, isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, Field, reduxForm, reset } from 'redux-form';
import { number, required } from '../../../../utils/Validate';

import { Button, Dimmer, Form, Loader, Step } from 'semantic-ui-react';
import { Icomoon, Input, InputSelect, InputTime } from '../../../../components';
import { Zone } from '../../View/components';
import { Container, Content, FooterForm, HeaderForm, Heading, Item, ParametersAdded } from './style';

class PlanningParameter extends Component {
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            disabled: true,
            parameters: [],
            tab: 'parameter'
        }
    }

    /**
     * Salva dados no state local.
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        const {form, forms} = this.props;
        const values = forms.values.parameter;

        let itens = [...this.state.parameters];

        if (values.length > 1) {
            itens = [...itens, values];
        } else {
            itens = [...itens, ...values];
        }


        await this.setState({parameters: itens});
        await this.props.dispatch(reset(form));
    };

    /**
     * Adiciona novo parâmetro ao array de dados.
     *
     * @returns {Promise<void>}
     */
    handleNewParameter = async () => {
        const {form, forms} = this.props;
        const defaultParameter = {type: '', criterion: '', value: '', min: '', max: ''};

        await this.props.dispatch(change(form, 'parameter', [...forms.values.parameter, defaultParameter]));
    };

    /**
     * Remove item do array de dados do redux-form.
     *
     * @param index
     * @returns {Promise<void>}
     */
    handleRemoveParameter = async (index) => {
        const {form, forms} = this.props;

        let parameters = [...forms.values.parameter];
        parameters.splice(index, 1);

        await this.props.dispatch(change(form, 'parameter', parameters));
    };

    /**
     * Exibe array de parametros adicionados.
     *
     * @param itens
     * @returns {*}
     */
    handleGetParams = (itens) => {
        return (
            <Item>
                <div className={'div__container'}>
                    {
                        itens.map((item) => {
                            const {type, criterion, value, min, max} = item;

                            return (
                                <Fragment>
                                    <div className={'item'}>Parâmetro: <span>{type}</span></div>
                                    <div className={'item'}>Critério: <span>{criterion}</span></div>
                                    <div className={'item'}>
                                        Valor: <span>{this.hanfleFormatValue(type, criterion, {value, min, max})}</span>
                                    </div>
                                    <div className={'break'}/>
                                </Fragment>
                            )
                        })
                    }
                </div>
                <div><Icomoon name={'more-horizontal link'}/></div>
            </Item>
        )
    };

    /**
     * Formata número para exibição.
     *
     * @param type
     * @param condition
     * @param values
     * @returns {string|*}
     */
    hanfleFormatValue = (type, condition, values) => {
        const {value, min, max} = values;

        switch (type) {
            case 'performance':
            case 'tmo':
                return (condition === 'entre') ? `${min}% a ${max}%` : `${value}%`;
            default:
                return (condition === 'entre') ? `${min} a ${max}` : value;
        }
    };

    /**
     * Realiza requisição na API.
     * Avança para proximo passo.
     *
     * @returns {Promise<void>}
     */
    handleNext = async () => {

        await this.setState({loading: true});

        try {
            await console.log('Executa função de callback');
            await this.setState({tab: 'summary'});
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Ativa/Desativa opção "Manter Original".
     *
     * @returns {Promise<void>}
     */
    handleToggleCards = async () => {
        const {disabled} = this.state;
        await this.setState({disabled: !disabled});
    };

    /**
     * Seta Tab ativa.
     *
     * @returns {Promise<void>}
     */
    handleBackStep = async (tab) => {
        await this.setState({tab});
    };

    render() {
        const {back, forms, pristine, submitting, valid} = this.props;
        const {parameters} = this.state;

        const optionsType = [
            {
                key: 0,
                text: 'Performance',
                value: 'performance'
            }, {
                key: 1,
                text: 'TMA',
                value: 'tma'
            }, {
                key: 2,
                text: 'TMO',
                value: 'tmo'
            }, {
                key: 3,
                text: 'Último CheckOut',
                value: 'checkout'
            }
        ];
        const optionCriterion = [
            {
                key: 0,
                text: 'Entre',
                value: 'entre'
            }, {
                key: 1,
                text: 'Igual',
                value: 'igual'
            }, {
                key: 2,
                text: 'Maior',
                value: 'maior'
            }, {
                key: 3,
                text: 'Menor',
                value: 'menor'
            }
        ];

        return (
            <Container>
                <Dimmer inverted active={this.state.loading}>
                    <Loader inverted/>
                </Dimmer>

                <Heading>
                    <Icomoon
                        name={'chevron-left link'}
                        onClick={() => back()}
                    />

                    <hgroup>
                        <h1>Planejamento por parâmetros</h1>
                        <h5>Utilize os campos abaixo e defina parâmetros de configuração.</h5>
                    </hgroup>
                </Heading>

                <Step.Group>
                    <Step completed={(this.state.tab !== 'summary')}>
                        Parâmetros
                    </Step>
                    <Step completed={(this.state.tab === 'summary')}>
                        Resumo
                    </Step>
                </Step.Group>

                <Content>
                    {
                        this.state.tab !== 'summary' ? (
                            <Fragment>
                                <Form onSubmit={this.handleSubmit}>
                                    <HeaderForm>
                                        <h1>Condições</h1>
                                        <Button
                                            content={'Novo Parâmetro'}
                                            onClick={() => this.handleNewParameter()}
                                            color={'blue'}
                                            type={'button'}
                                        />
                                    </HeaderForm>

                                    {
                                        forms && forms.values.parameter.map((record, index) => (
                                            <div className={'div__row'} key={index}>
                                                <Field
                                                    label={'Tipo de parâmetro'}
                                                    name={`parameter[${index}].type`}
                                                    component={InputSelect}
                                                    type={'select'}
                                                    options={optionsType}
                                                    validate={[required]}
                                                />

                                                <Field
                                                    label={'Critério'}
                                                    name={`parameter[${index}].criterion`}
                                                    component={InputSelect}
                                                    type={'select'}
                                                    options={optionCriterion}
                                                    validate={[required]}
                                                />

                                                {
                                                    record.criterion === 'entre' ?
                                                        <div className={'group__input'}>
                                                            <Field
                                                                label={'Valor'}
                                                                name={`parameter[${index}].min`}
                                                                component={record.type === 'tma' ? InputTime : Input}
                                                                type={'number'}
                                                                validate={record.type === 'tma' ? [required] : [required, number]}
                                                            />

                                                            <Field
                                                                label={'Valor'}
                                                                name={`parameter[${index}].max`}
                                                                component={record.type === 'tma' ? InputTime : Input}
                                                                type={'number'}
                                                                validate={record.type === 'tma' ? [required] : [required, number]}
                                                            />
                                                        </div> :
                                                        <Field
                                                            label={'Valor'}
                                                            name={`parameter[${index}].value`}
                                                            component={record.type === 'tma' ? InputTime : Input}
                                                            type={'text'}
                                                            validate={record.type === 'tma' ? [required] : [required, number]}
                                                        />
                                                }

                                                {
                                                    index > 0 &&
                                                    <Button
                                                        size={'mini'}
                                                        className={'bg-transparent text-underline'}
                                                        content={'Remover'}
                                                        type={'button'}
                                                        onClick={() => this.handleRemoveParameter(index)}
                                                    />
                                                }
                                            </div>
                                        ))
                                    }
                                    <FooterForm>
                                        <Button
                                            color={'green'}
                                            content={'Adicionar'}
                                            disabled={Boolean(pristine || submitting || !valid)}
                                        />
                                    </FooterForm>
                                </Form>

                                <ParametersAdded>
                                    <h1>Adicionados ({parameters.length})</h1>

                                    <div className="div__content">
                                        {
                                            parameters.map((item, index) => {
                                                const {type, criterion, value, min, max} = item;

                                                if (isArray(item)) {
                                                    return this.handleGetParams(item)
                                                } else {
                                                    return (
                                                        <Item key={index}>
                                                            <div className={'div__container'}>
                                                                <div className={'item'}>Parâmetro: <span>{type}</span>
                                                                </div>
                                                                <div
                                                                    className={'item'}>Critério: <span>{criterion}</span>
                                                                </div>
                                                                <div className={'item'}>
                                                                    Valor: <span>{this.hanfleFormatValue(type, criterion, {
                                                                    value,
                                                                    min,
                                                                    max
                                                                })}</span>
                                                                </div>
                                                            </div>
                                                            <div><Icomoon name={'more-horizontal link'}/></div>
                                                        </Item>
                                                    )
                                                }
                                            })
                                        }
                                    </div>

                                    <div className="div__footer">
                                        <Button
                                            content={'Voltar'}
                                            className={'bg-transparent text-underline'}
                                            type={'button'}
                                            onClick={() => back()}
                                        />
                                        <Button
                                            content={'Avançar'}
                                            color={'blue'}
                                            disabled={isEmpty(this.state.parameters)}
                                            onClick={() => this.handleNext()}
                                        />
                                    </div>
                                </ParametersAdded>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <HeaderForm>
                                    <h1>Encontramos (00) rotas com base nos parâmetros informados</h1>
                                    <Button
                                        content={'Manter original'}
                                        onClick={() => this.handleToggleCards()}
                                        color={'green'}
                                        basic={this.state.disabled}
                                    />
                                </HeaderForm>

                                <div className="div__content_cards">
                                    {
                                        [0,0,0,0,0,0].map((row, index) => (
                                            <Zone
                                                key={index}
                                                active={!this.state.disabled}
                                                options={[{key: 0, text: 'Demo', value: 0}]}
                                                changeOption={(value) => console.log(`Valor selecionado ${value}`)}
                                                widthCell={[140, 130, 120, 250, 180, 140, 170, 75]}
                                                data={{
                                                    approved: true,
                                                    finished: true,
                                                    id: 0,
                                                    reproved: false,
                                                    route: {
                                                        draft_id: 1,
                                                        statistics: [],
                                                        id: 1,
                                                        name: 'Demonstração',
                                                        published_id: 2,
                                                        published_version: {},
                                                        draft_version: {},
                                                        submitted: false,
                                                        submitted_original: false
                                                    }
                                                }}
                                            />
                                        ))
                                    }

                                    <div className="div__footer">
                                        <Button
                                            content={'Voltar'}
                                            className={'bg-transparent text-underline'}
                                            type={'button'}
                                            onClick={() => this.handleBackStep('parameter')}
                                        />
                                        <Button
                                            basic
                                            content={'Concluir'}
                                            color={'green'}
                                            disabled={this.state.disabled}
                                            onClick={() => console.log('Concluir')}
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                </Content>
            </Container>
        )
    }
}

PlanningParameter.propTypes = {
    back: PropTypes.func.isRequired
};

PlanningParameter = reduxForm({
    form: 'PlanningParameter'
})(PlanningParameter);

const mapStateToProps = (state) => {
    const {PlanningParameter} = state.form;

    return {
        forms: PlanningParameter
    }
};

const mapDispatchToProps = () => ({
    initialValues: {
        parameter: [{
            type: '',
            criterion: '',
            value: '',
            min: '',
            max: ''
        }]
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanningParameter);
