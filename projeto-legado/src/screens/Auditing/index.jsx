import moment from 'moment';
import { Component, Fragment } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Dropdown, Grid, Header, Label, Popup, Progress, Table } from 'semantic-ui-react';

import { fetchRoutesWindows } from '../../redux/actions/RoutesWindowsActions';

import { dateGet } from '../../utils/DateTime';
import { MyClock } from './components';

import { DropdownMonths, Manager } from '../../components';
import './index.css';

const messages = defineMessages({
    header: {
        id: 'auditing.header',
        defaultMessage: 'Planejamento/Auditoria'
    },
    title: {
        id: 'auditing.title',
        defaultMessage: 'Planejamento'
    },
    subtitle: {
        id: 'auditing.subtitle',
        defaultMessage: 'Faça análise de rota(s) e envie para aprovação'
    },
    table_id: {
        id: 'auditing.table_id',
        defaultMessage: 'ID'
    },
    table_responsible: {
        id: 'auditing.table_responsible',
        defaultMessage: 'Responsável'
    },
    table_function_hierarchy: {
        id: 'auditing.table_function_hierarchy',
        defaultMessage: 'Função/Hierarquia'
    },
    table_reference_month: {
        id: 'auditing.table_reference_month',
        defaultMessage: 'Mês de referência'
    },
    table_group_quantity: {
        id: 'auditing.table_group_quantity',
        defaultMessage: 'Qtde Grupo/Rota'
    },
    table_status_step: {
        id: 'auditing.table_status_step',
        defaultMessage: 'Status/Etapa'
    },
    table_responsible_for_access: {
        id: 'auditing.table_responsible_for_access',
        defaultMessage: 'Responsável pelo acesso'
    },
    table_closing_window: {
        id: 'auditing.table_closing_window',
        defaultMessage: 'Janela de fechamento'
    },
    table_planning: {
        id: 'auditing.table_planning',
        defaultMessage: 'Planejamento'
    },
    table_auditing: {
        id: 'auditing.table_auditing',
        defaultMessage: 'Auditoria'
    }
});

class Auditing extends Component {
    /**
     * Constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            windows: {},
            filters: {}
        };
    }

    /**
     * Executa funções ao iniciar ocmponente.
     */
    componentDidMount() {
        const {intl: {formatMessage}} = this.props;

        const DidMount = async () => {
            await this.props.setTitle(this.props.location.pathname, 'Carregando', 'map');

            try {
                await this.onFetchRoutesWindows({date: moment.utc().startOf('month').format('YYYY-MM-DD')});
                await this.props.setTitle(this.props.location.pathname, formatMessage(messages.header), 'map');
            } catch (e) {
                await console.log(e);
            }
        };

        // noinspection JSIgnoredPromiseFromCall
        DidMount();
    }

    /**
     * Busca registros na janela na API.
     *
     * @param options
     * @returns {Promise<void>}
     */
    onFetchRoutesWindows = async options => {
        await this.setState({loading: true});

        try {
            const windows = await this.props.fetchRoutesWindows({...options});
            await this.setState({windows});
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Renderiza header da tabela.
     *
     * @returns {*}
     */
    onRenderTableHeader = () => {
        const {intl: {formatMessage}} = this.props;

        return (
            <Fragment>
                <Table.HeaderCell style={{width: '3rem'}} textAlign={'center'}>
                    {formatMessage(messages.table_id)}
                </Table.HeaderCell>
                <Table.HeaderCell style={{width: '18rem'}}>
                    {formatMessage(messages.table_responsible)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                    {formatMessage(messages.table_function_hierarchy)}
                </Table.HeaderCell>
                <Table.HeaderCell>
                    {formatMessage(messages.table_reference_month)}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>
                    {formatMessage(messages.table_group_quantity)}
                </Table.HeaderCell>
                <Table.HeaderCell style={{width: '10rem'}}>
                    {formatMessage(messages.table_status_step)}
                </Table.HeaderCell>
                <Table.HeaderCell style={{width: '15rem'}}>
                    {formatMessage(messages.table_responsible_for_access)}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} style={{width: '12.5rem'}}>
                    {formatMessage(messages.table_closing_window)}
                </Table.HeaderCell>
            </Fragment>
        )
    };

    /**
     * Renderiza corpo da tabela.
     *
     * @param row
     * @returns {*}
     */
    onRenderTableBody = row => {
        const {id, proposed_by_user, approved_by_user, config_window, zone_count, route_count, status, step} = row;
        const {proposal_start, proposal_end, approval_start, approval_end, done_per} = config_window;

        const time_start = (step === 1) ? proposal_start : approval_start;

        /**
         * Responsável por planejamento.
         *
         * @param props
         * @returns {*}
         * @constructor
         */
        const ResponsibleForPlanning = props => {
            const {name, id, document} = props;

            return (
                <Header as={'h5'}>
                    <Header.Content>
                        {name}
                        <Header.Subheader>
                            {id}/{document}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            );
        };

        /**
         * Perfil responsável por planejamento.
         *
         * @param name
         * @returns {*}
         * @constructor
         */
        const ProfileResponsiblePlanning = ({name}) => {
            return (
                <Header as={'h5'}>
                    <Header.Content>
                        {name}
                    </Header.Content>
                </Header>
            )
        };

        /**
         * Mes de referência.
         *
         * @param props
         * @returns {*}
         * @constructor
         */
        const MonthReference = props => {
            const {step, proposal_start, proposal_end, approval_start, approval_end} = props;

            /**
             * Header
             *
             * @param start
             * @param end
             * @returns {*}
             * @constructor
             */
            const HeaderContent = (start, end) => (
                <Header.Content>
                    {dateGet(start, 'MMMM')}/{dateGet(start, 'YYYY')}
                    <Header.Subheader>
                        {dateGet(start, 'DD/MM')} a {dateGet(end, 'DD/MM')}
                    </Header.Subheader>
                </Header.Content>
            );

            return (
                <Header as={'h5'}>
                    {
                        step === 1 ?
                            HeaderContent(proposal_start, proposal_end) :
                            HeaderContent(approval_start, approval_end)
                    }
                </Header>
            )
        };

        /**
         * Status e etapa.
         *
         * @param props
         * @returns {*}
         * @constructor
         */
        const StatusAndStep = props => {
            switch (props) {
                case 1:
                    return (
                        <Label>
                            <Label circular color={'red'} style={{fontSize: '.6rem'}} empty/> Em Planejamento
                        </Label>
                    );
                case 2:
                    return (
                        <Label>
                            <Label circular color={'orange'} style={{fontSize: '.6rem'}} empty/> Pendente de Aprovação
                        </Label>
                    );
                case 3:
                    return (
                        <Label>
                            <Label circular color={'yellow'} style={{fontSize: '.6rem'}} empty/> Em Aprovação
                        </Label>
                    );
                case 4:
                    return (
                        <Label>
                            <Label circular color={'green'} style={{fontSize: '.6rem'}} empty/> Concluído
                        </Label>
                    );
                default:
                    return (
                        <Label>
                            <Label circular color={'grey'} style={{fontSize: '.6rem'}} empty/> Pendente de Planejamento
                        </Label>
                    );
            }
        };

        /**
         * Responsavel pelo processo.
         *
         * @param proposed
         * @param aproved
         * @param step
         * @returns {*}
         * @constructor
         */
        const ResponsibleForProcess = (proposed, aproved, step) => {

            if (parseInt(step) === 1) {
                return (<Header as={'h5'}>{proposed}</Header>)
            }

            return (<Header as={'h5'}>{aproved}</Header>)
        };

        return (
            <Fragment>
                <Table.Cell textAlign={'center'}>
                    <strong>{id}</strong>
                </Table.Cell>
                <Table.Cell>
                    <NavLink to={`/main/dev/auditing/${id}`}>
                        {proposed_by_user && ResponsibleForPlanning(proposed_by_user)}
                    </NavLink>
                </Table.Cell>
                <Table.Cell>
                    <NavLink to={`/main/dev/auditing/${id}`}>
                        {proposed_by_user.profiles[0] && ProfileResponsiblePlanning(proposed_by_user.profiles[0])}
                    </NavLink>
                </Table.Cell>
                <Table.Cell>
                    <NavLink to={`/main/dev/auditing/${id}`}>
                        {config_window && MonthReference(config_window)}
                    </NavLink>
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                    <strong>{`${zone_count}/${route_count}`}</strong>
                </Table.Cell>
                <Table.Cell className={`status-${status}`}>
                    {StatusAndStep(status)}
                </Table.Cell>
                <Table.Cell className={`status-${status}`}>
                    {ResponsibleForProcess(proposed_by_user.name, approved_by_user.name, step)}
                </Table.Cell>
                <Table.Cell className={'p-0'}>
                    {this.PopupClosingWindow(status, step, id, time_start, proposed_by_user, approved_by_user, proposal_end, approval_end, done_per)}
                </Table.Cell>
            </Fragment>
        )
    };

    /**
     * Filtros da tabela.
     *
     * @returns {*}
     */
    onRenderFiltersToolbar = () => {
        const status = [{
            key: 0,
            text: 'Pendente',
            value: 0
        }, {
            key: 1,
            text: 'Em Planejamento',
            value: 1
        }, {
            key: 2,
            text: 'Aprovação Pendente',
            value: 2
        }, {
            key: 3,
            text: 'Em Aprovação',
            value: 3
        }, {
            key: 4,
            text: 'Concluído',
            value: 4
        }];
/*
        const type = [{
            key: 0,
            text: 'Planejamento',
            value: 1
        }, {
            key: 1,
            text: 'Auditoria',
            value: 2
        }];
*/
        /**
         * Componente de Dropdown.
         *
         * @param options
         * @param placeholder
         * @param key
         * @returns {*}
         */
        const dropdown = (options, placeholder, key) => (
            <Dropdown
                inline
                options={options}
                className={'item'}
                placeholder={placeholder}
                onChange={(e, {value}) => this.HanddleFilters({[key]: value})}
                selectOnBlur={false}
            />
        );

        return (
            <Fragment>
                <DropdownMonths
                    onChange={(value) => this.HanddleFilters({date: value})}
                />
                {dropdown(status, 'Situação', 'status')}
                {/*dropdown(type, 'Etapa', 'step')*/}
            </Fragment>
        )
    };

    /**
     * Seta filtros no state local e busca dados na API.
     *
     * @param value
     * @returns {Promise<void>}
     * @constructor
     */
    HanddleFilters = async (value) => {
        try {
            await this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    ...value
                }
            }));
            await this.onFetchRoutesWindows(this.state.filters);
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * Popup de fechamento.
     *
     * @param status
     * @param stage
     * @param id
     * @param reference
     * @param responsible
     * @param approved
     * @param proposal_end
     * @param approval_end
     * @param percent
     * @returns {*}
     * @constructor
     */
    PopupClosingWindow = (status, stage, id, reference, responsible, approved, proposal_end, approval_end, percent) => {
        const {intl: {formatMessage}} = this.props;
        const infoResponsable = (stage === 1) ? {...responsible} : {...approved, profiles: [{name: 'COORDENADOR'}]};

        return (
            <Popup
                basic
                on={'click'}
                trigger={
                    <Table basic={'very'} celled collapsing size={'small'} textAlign={'center'}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan={'2'}>
                                    <Progress percent={percent} color={'blue'} size={'tiny'} className={'m-0'}/>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell colSpan={2}>Progresso</Table.Cell>
                                {/*<Table.Cell>*/}
                                {/*    {formatMessage(messages.table_planning)}*/}
                                {/*</Table.Cell>*/}
                                {/*<Table.Cell>*/}
                                {/*    {formatMessage(messages.table_auditing)}*/}
                                {/*</Table.Cell>*/}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                }
                position={'bottom right'}
                content={
                    <Grid className={'component-popup-closing-window'}>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as={'h5'}>
                                            <Header.Content>
                                                {status === 1 && 'Pendente'}
                                                {status === 2 && 'Em Andamento'}
                                                {status === 3 && 'Finalizado'}
                                                <Header.Subheader>{`Etapa: ${stage === 1 ? 'Planejamento' : 'Auditoria'}`}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        {`ID: ${id}`}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        Referência: {dateGet(reference, 'MMMM')}/{dateGet(reference, 'YYYY')}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as={'h5'}>
                                            <Header.Content>
                                                {infoResponsable.name}
                                                <Header.Subheader>
                                                    {`${infoResponsable.id} / ${infoResponsable.document}`}
                                                </Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Progress percent={percent} color={'blue'} size={'tiny'} className={'m-0'}/>
                                        <div className={'info-progressao'}>
                                            {/*<div>{formatMessage(messages.table_planning)}</div>*/}
                                            {/*<div>{formatMessage(messages.table_auditing)}</div>*/}
                                            <div style={{textAlign: 'right'}}>Progr</div>
                                            <div style={{textAlign: 'left'}}>esso</div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as={'h5'} className={stage === 2 ? 'disabled' : ''}>
                                            <Header.Content>
                                                <Label>
                                                    <Label circular color={'blue'}
                                                           empty/> {formatMessage(messages.table_planning)}
                                                </Label>
                                                <Header.Subheader>
                                                    <MyClock time={proposal_end}/>
                                                </Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as={'h5'} className={stage === 1 ? 'disabled' : ''}>
                                            <Header.Content>
                                                <Label>
                                                    <Label circular color={'blue'}
                                                           empty/> {formatMessage(messages.table_auditing)}
                                                </Label>
                                                <Header.Subheader>
                                                    <MyClock time={approval_end}/>
                                                </Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }
            />
        )
    };

    render() {
        const {intl: {formatMessage}} = this.props;
        const {loading, windows} = this.state;

        return (
            <Manager
                sortable={true}
                table={'Auditing'}
                className={'table-auditing'}
                header={formatMessage(messages.title)}
                subheader={formatMessage(messages.subtitle)}
                isLoading={loading}
                result={windows}
                onPageChange={(options) => this.HanddleFilters(options)}
                headerRow={this.onRenderTableHeader()}
                renderBodyRow={(element) => this.onRenderTableBody(element)}
                onFiltersToolbar={this.onRenderFiltersToolbar()}
                crud={{
                    refresh: () => this.HanddleFilters({})
                }}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    setTitle: ownProps.setTitle
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchRoutesWindows}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Auditing));
