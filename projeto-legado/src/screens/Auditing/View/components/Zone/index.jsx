import { Cell, Column, Table as TableFix } from 'fixed-data-table-2';
import { isArray, isEmpty, isFunction, isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneRoute } from '../../../../../redux/actions/RoutesActions';
import { fetchRoutesWindowMessageUnread } from '../../../../../redux/actions/RoutesWindowMessageActions';
import { getRoutesWindowsParam, getRoutesWindowsSubmit } from '../../../../../redux/actions/RoutesWindowsActions';

import { Dropdown } from 'semantic-ui-react';
import { GroupButtons } from '..';
import { Icomoon, MenuPopup } from '../../../../../components';
import { dateDuration } from '../../../../../utils/DateTime';
import { formatMoney } from '../../../../../utils/Help';

import 'fixed-data-table-2/dist/fixed-data-table.css';
import { ColorDropdown, Container, Header, Mask } from './style';

const Zone = (props) => {
    const refContainer = createRef();

    const {
        getRoutesWindowsSubmit,
        getRoutesWindowsParam,
        fetchRoutesWindowMessageUnread,
        data,
        toggleMessages,
        toggleLog,
        fetchZones,
        auditing,
        history,
        cloneRoute,
        actions,
        options,
        changeOption,
        active,
        fixedRight,
        widthCell,
        approved,
        proposed,
        step,
        logged,
        conflict,
        toggleGroup,
        visible,
        temporary,
        handleTemporary,
        toggleConfirm,
        window
    } = props;
    const {published_version, draft_version, route, editable} = data;

    const [rows, setRows] = useState(1);
    const [width, setWidth] = useState(900);
    const [height, setHeight] = useState(125);
    const [loading, setLoading] = useState(false);
    const [selects, setSelects] = useState([{key: 0, text: 'Pendente', value: '0'}]);
    const [table, setTable] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [unread, setUnread] = useState(0);
    const [, setPerformer] = useState('');

    // Verifica se rota esta disponivel para edição.
    const [planning, setPlanning] = useState(false);
    const [approval, setApproval] = useState(false);

    /**
     * Envia seleção para API e modifica tabela de acordo com valor selecionado.
     *
     * @param value
     * @returns {Promise<void>}
     */
    const handleChangeActioon = async (value) => {

        switch (parseInt(value)) {
            case 0:
            case 1:
            case 2:
            case 3:
                if (parseInt(proposed.id) === parseInt(logged)) {
                    await handleUpdateWindow(auditing, data.id, value);
                } else {
                    await handleUpdateAudit(auditing, data.id, value)
                }
                break;
            case 4:
                await setRows(2);
                await setHeight(185);
                break;
            default:
                break;
        }
    };

    /**
     * Atualiza registro na API.
     *
     * @param id
     * @param zone
     * @param action
     * @returns {Promise<void>}
     */
    const handleUpdateWindow = async (id, zone, action) => {
        await setLoading(true);
        await toggleGroup(true);

        try {
            await getRoutesWindowsSubmit(id, zone, action);

            // Verifica se é uma rota temporária e atualiza os registros
            if (temporary) {
                await handleTemporary()
            } else {
                await fetchZones();
            }
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoading(false);
            await toggleGroup(false);
        }
    };

    /**
     * Atualiza registro na API na parte de auditoria.
     *
     * @param id
     * @param zone
     * @param value
     * @returns {Promise<void>}
     */
    const handleUpdateAudit = async (id, zone, value) => {
        let action;

        switch (parseInt(value)) {
            case 0:
            default:
                action = 'pending';
                break;
            case 1:
                action = 'approve';
                break;
            case 2:
                action = 'reprove';
                break;
        }

        await setLoading(true);
        await toggleGroup(true);

        try {
            await getRoutesWindowsParam(id, zone, action);

            // Verifica se é uma rota temporária e atualiza os registros
            if (temporary) {
                await handleTemporary()
            } else {
                await fetchZones();
            }
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoading(false);
            await toggleGroup(false);
        }
    };

    /**
     * Executa ação de acordo com opção selecionada.
     *
     * @param action
     * @param route_id
     * @returns {Promise<void>}
     */
    const handleActionPopup = async (action, route_id) => {

        const {id} = route;

        switch (action) {
            case 0:
                await history.push(`/main/routes/home/${id}/versions/${route_id || id}/${window}`);
                break;
            case 2:
                if (table.length === 2) {
                    await toggleConfirm({id: data.route.id, route_id: data.route.draft_id});
                } else {
                    await toggleConfirm({id: data.route.id});
                }

                break;
            case 1:
            default:
                await handleClone(id);
                break;

        }
    };

    /**
     * Clone de rota.
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleClone = async (id) => {

        await setLoading(true);

        try {
            const clone = await cloneRoute(id);
            await history.push(`/main/routes/home/${id}/versions/${clone.data.id}`);
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoading(false);
        }
    };

    /**
     * Verifica a etapa atual
     * Seta disponibilidade de edição do registro (planejamento / aprovação);
     *
     * @returns {Promise<void>}
     */
    const handleEnableEdit = async () => {

        switch (parseInt(step)) {
            case 1:
                (parseInt(proposed.id) === parseInt(logged) && editable) &&
                await setPlanning(true);
                break;
            case 2:
                (parseInt(approved.id) === parseInt(logged) && editable) &&
                await setApproval(true);
                break;
            default:
                await setPlanning(false);
                await setApproval(false);
                break;
        }
    };

    /**
     * Serializa dados para armazenamento no state local.
     *
     * @param values
     * @param draft
     * @returns {{performer: (*|number), planned_tma: *, performed_cost_attendances: *, performed_perc: (*|number), performed_tma: *, billing: *, planned_cost_trip: *, performed_tmo: *, planned_tmo: *, planned_cost_attendances: *, draft: *, performed_cost_trip: *, checkout: string}}
     */
    const handleSerializeDataTable = (values, draft = false) => {

        const {id, statistics} = values;

        const {
            planned_tma = 0,
            planned_tmo = 0,
            planned_cost_trip = 0,
            planned_cost_attendances = 0,
            performed_tma = 0,
            performed_tmo = 0,
            performed_billing = 0,
            performed_cost_trip = 0,
            performed_cost_attendances = 0,
            performed_cost_perc = 0,
            performed_performance = 0
        } = statistics[0] || {};

        return {
            performer: performed_performance,
            planned_tma: dateDuration(planned_tma, 'HH:mm:ss'),
            performed_tma: dateDuration(performed_tma, 'HH:mm:ss'),
            planned_tmo: dateDuration(planned_tmo, 'HH:mm:ss'),
            performed_tmo: dateDuration(performed_tmo, 'HH:mm:ss'),
            checkout: 'ND',
            billing: formatMoney(performed_billing),
            planned_cost_trip: formatMoney(planned_cost_trip),
            performed_cost_trip: formatMoney(performed_cost_trip),
            planned_cost_attendances: formatMoney(planned_cost_attendances),
            performed_cost_attendances: formatMoney(performed_cost_attendances),
            performed_perc: performed_cost_perc,
            draft: draft,
            id
        };
    };

    /**
     * Seta dados da estatísticas no state local.
     *
     * @returns {Promise<void>}
     */
    const handleStatisticsTable = async () => {
        const tabeles = [];

        // Rota publicada
        if (!isEmpty(published_version)) {
            if (published_version.people && !isUndefined(published_version.people.name)) {
                await setName(published_version.people.name);
            }

            await tabeles.push(handleSerializeDataTable(published_version))
        }

        // Rota de rascunho
        if (!isEmpty(draft_version)) {
            if (draft_version.people && !isUndefined(draft_version.people.name) && isEmpty(name)) {
                await setName(draft_version.people.name);
            }

            await tabeles.push(handleSerializeDataTable(draft_version, true))
        }

        await setTable(tabeles);
    };

    /**
     * Busca quantidade de mensagens não lidas.
     *
     * @returns {Promise<void>}
     */
    const handleNumberMessageUnread = async () => {
        await setLoading(true);

        try {
            const request = await fetchRoutesWindowMessageUnread(route.id);
            await setUnread(isEmpty(request.data) ? 0 : parseInt(request.data.total));
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoading(false);
        }
    };

    /**
     * Seta responsável pela rota.
     *
     * @returns {Promise<void>}
     */
    const handlePerformer = async () => {
        const {draft_version, published_version} = data;

        switch (parseInt(data.submitted)) {
            case 1:
            case 3:
                if (!isEmpty(published_version)) {
                    setPerformer(published_version.people.name);
                }
                break;
            case 2:
                if (!isEmpty(draft_version)) {
                    setPerformer(draft_version.people.name);
                }
                break;
            default:
                if (isEmpty(published_version) && !isEmpty(draft_version)) {
                    setPerformer(draft_version.people.name);
                } else if (!isEmpty(published_version) && isEmpty(draft_version)) {
                    setPerformer(published_version.people.name);
                }
                break;
        }
    };

    /**
     * Modifica o width da tabela de acordo com a resolução acessada.
     * Modifica a quantidade de linhas.
     */
    useEffect(() => {
        const handleUpdate = async () => {

            await setWidth(refContainer.current.parentElement.clientWidth - 30);

            if (!isEmpty(published_version) && !isEmpty(draft_version)) {

                await setRows(2); // Quantidade de linhas
                await setHeight(185); // Height
            }
        };

        // noinspection JSIgnoredPromiseFromCall
        handleUpdate();
    }, [route]);

    /**
     * Adiciona mensagem ao registro
     */
    useEffect(() => {

        const handleModifyRecord = async () => {
            /**
             * Seta quantidades de linha na tabela.
             */
            if (!isEmpty(published_version) && !isEmpty(draft_version)) {

                await setRows(3); // Quantidade de linhas
                await setHeight(245); // Height
            } else {

                await setRows(2); // Quantidade de linhas
                await setHeight(185); // Height
            }

            switch (parseInt(data.submitted)) {
                case 0:
                default:
                    await setMessage('ND');
                    break;
                case 1:
                    await setMessage('Manter versão original');
                    break;
                case 2:
                    if (isEmpty(published_version)) {
                        await setMessage('Criar nova rota');
                    } else {
                        await setMessage('Criar nova versão');
                    }

                    break;
                case 3:
                    await setMessage('Excluir rota');
                    break;
            }
        };

        if (parseInt(approved.id) === parseInt(logged)) {

            // noinspection JSIgnoredPromiseFromCall
            handleModifyRecord();
        }
    }, [table]);

    /**
     * Seta opções no componente de select.
     */
    useEffect(() => {

        const disableOptions = [
            {key: 0, text: 'Pendente', value: '0'},
            {key: 1, text: 'Manter rota original', value: '1'},
            {key: 2, text: 'Submeter a rota modificada', value: '2'},
            {key: 3, text: 'Excluir rota', value: '3'},
            {key: 4, text: 'Modificar rota', value: '4'}
        ];

        if (parseInt(proposed.id) === parseInt(logged) && editable) {
            const defaultOptions = [
                {key: 0, text: 'Pendente', value: '0'},
                {key: 1, text: 'Manter rota original', value: '1'}
            ];

            if (!isEmpty(draft_version)) {

                defaultOptions.push({key: 2, text: 'Submeter a rota modificada', value: '2'});
            } else {

                defaultOptions.push({key: 2, text: 'Modificar rota', value: '4'});
            }

            // Verifica se o rascunho não existe.
            if (isEmpty(draft_version)) {
                defaultOptions.splice(2, 1);
            }

            // Verifica se a rota publicada não existe.
            if (isEmpty(published_version)) {
                defaultOptions.splice(1, 1);
            }

            // Verifica se a rota já foi publicada em algum momento
            if (parseInt(data.is_published) !== 0) {
                defaultOptions.push({key: 3, text: 'Excluir rota', value: '3'});
            }

            setSelects(defaultOptions);
        } else {
            setSelects(disableOptions);
        }

    }, [planning, approval, step]);

    /**
     * Edição de registro (Select).
     */
    useEffect(() => {

        // noinspection JSIgnoredPromiseFromCall
        handlePerformer();

        // noinspection JSIgnoredPromiseFromCall
        handleNumberMessageUnread();

        // noinspection JSIgnoredPromiseFromCall
        handleEnableEdit();

        // noinspection JSIgnoredPromiseFromCall
        handleStatisticsTable();
    }, []);

    const disableDropdown = (parseInt(proposed.id) === parseInt(logged)) ? (actions && editable) : (parseInt(step) === 2);
    const optionsPopup = [
        {key: 0, text: 'Visualizar Rota', value: 0},
        {key: 1, text: 'Editar Rota', value: 1}
    ];

    if (parseInt(proposed.id) === parseInt(logged) && data.submitted.toString() === '0') {
        optionsPopup.push({key: 2, text: 'Remover Rota', value: 2})
    }

    return (
        <Container active={active}>
            <Header ref={refContainer}>
                <div>
                    <h5>{route.name}</h5>
                    {
                        (!isEmpty(published_version) && !isEmpty(published_version.people)) &&
                        <h5 style={{textTransform: 'uppercase', margin: 0, padding: 0, fontSize: '.85rem'}}>Rota em Produção: <span>{published_version.people.name}</span></h5>
                    }

                    {
                        (!isEmpty(draft_version) && !isEmpty(draft_version.people)) &&
                        <h5 style={{textTransform: 'uppercase', margin: 0, padding: 0, fontSize: '.85rem'}}>Rota em Rascunho: <span>{draft_version.people.name}</span></h5>
                    }
                </div>
                <div className={'__actions'}>
                    {
                        (isFunction(toggleLog)) &&
                        <div className="__icons">
                            <Icomoon
                                name={'file-text link'}
                                onClick={() => toggleLog({id: data.id, title: route.name})}
                            />
                        </div>
                    }

                    {
                        (isFunction(toggleMessages)) &&
                        <div className="__icons">
                            <Icomoon
                                label={unread > 0}
                                color={'#50CF73'}
                                name={'message-square link'}
                                onClick={() => toggleMessages({id: route.id, title: route.name})}
                            />
                        </div>
                    }

                    {
                        (!conflict && parseInt(approved.id) !== parseInt(logged)) && (
                            <ColorDropdown changed={data.submitted.toString()}>
                                <Dropdown
                                    selection
                                    placeholder={'Ação'}
                                    options={selects}
                                    defaultValue={data.submitted.toString()}
                                    selectOnBlur={false}
                                    onChange={(e, {value}) => handleChangeActioon(value)}
                                    loading={loading}
                                    disabled={(loading || !disableDropdown || parseInt(proposed.id) !== parseInt(logged) || visible)}
                                />
                            </ColorDropdown>
                        )
                    }

                    {
                        (parseInt(approved.id) === parseInt(logged)) && (
                            <GroupButtons
                                bordered
                                action={(value) => handleChangeActioon(value)}
                                disabled={(loading || visible)}
                                value={data.finished.toString()}
                                options={[
                                    {key: 0, text: 'Pendente', color: 'grey', value: '0'},
                                    {key: 1, text: 'Aprovado', color: 'green', value: '1'},
                                    {key: 2, text: 'Reprovado', color: 'red', value: '2'}
                                ]}
                            />
                        )
                    }

                    {
                        (isArray(options) && !isEmpty(options)) &&
                        <Dropdown icon={<Icomoon name={'more-vertical link'}/>} direction={'left'}>
                            <Dropdown.Menu>
                                {
                                    options.map((option, index) => (
                                        <Dropdown.Item key={index} onClick={() => changeOption(option.value)}>
                                            {option.text}
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
            </Header>

            <TableFix
                rowHeight={60}
                rowsCount={rows}
                headerHeight={45}
                width={width}
                height={height}
                showScrollbarY={true}
            >
                <Column
                    align={'center'}
                    columnKey={'Performance'}
                    header={<Cell>Performance</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[0])) ? widthCell[0] : 110}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].performer : 0}%
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'TMA'}
                    header={<Cell>TMA</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[1])) ? widthCell[1] : 100}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].planned_tma : '00:00:00'}
                            <span
                                className={'cell__row'}>{!isUndefined(table[rowIndex]) ? table[rowIndex].performed_tma : '00:00:00'}</span>
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'TMO'}
                    header={<Cell>TMO</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[2])) ? widthCell[2] : 90}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].planned_tmo : '00:00:00'}
                            <span
                                className={'cell__row'}>{!isUndefined(table[rowIndex]) ? table[rowIndex].performed_tmo : '00:00:00'}</span>
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'Último CheckOut'}
                    header={<Cell>Último CheckOut</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[3])) ? widthCell[3] : 150}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].checkout : 'ND'}
                            <p>--:--</p>
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'Faturamento'}
                    header={<Cell>Faturamento</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[4])) ? widthCell[4] : 130}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].billing : 'R$ 0,00'}
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'Custo Desloc.'}
                    header={<Cell>Custo Desloc.</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[5])) ? widthCell[5] : 110}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].planned_cost_trip : 'R$ 0,00'}
                            <span
                                className={'cell__row'}>{!isUndefined(table[rowIndex]) ? table[rowIndex].performed_cost_trip : 'R$ 0,00'}</span>
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'Custo Operacional'}
                    header={<Cell>Custo Operacional</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[6])) ? widthCell[6] : 140}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].performed_cost_attendances : 'R$ 0,00'}
                        </Cell>
                    )}
                />

                <Column
                    align={'center'}
                    columnKey={'%'}
                    header={<Cell>%</Cell>}
                    width={(!isEmpty(widthCell) && !isUndefined(widthCell[7])) ? widthCell[7] : 50}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                            {!isUndefined(table[rowIndex]) ? table[rowIndex].performed_perc : 0}%
                        </Cell>
                    )}
                />

                {
                    fixedRight &&
                    <Column
                        align={'center'}
                        fixedRight={true}
                        columnKey={'Icome'}
                        header={<Cell/>}
                        width={(!isEmpty(widthCell) && !isUndefined(widthCell[8])) ? widthCell[8] : 50}
                        cell={({rowIndex, ...props}) => (
                            <Cell {...props}>
                                {
                                    (!isUndefined(table[rowIndex]) && table[rowIndex].draft && editable)
                                        ? <MenuPopup
                                            items={optionsPopup}
                                            handleReturn={value => handleActionPopup(value, table[rowIndex].id)}
                                            loading={loading}
                                            disabled={!disableDropdown}
                                        />
                                        : <MenuPopup
                                            items={[
                                                {key: 0, text: 'Visualizar Rota', value: 0}
                                            ]}
                                            handleReturn={value => handleActionPopup(value, table[rowIndex].id)}
                                            loading={loading}
                                        />
                                }
                            </Cell>
                        )}
                    />
                }
            </TableFix>

            {
                (!isEmpty(message) && parseInt(approved.id) === parseInt(logged)) &&
                <Mask width={width}>{message}</Mask>
            }
        </Container>
    )
};

Zone.propTypes = {
    data: PropTypes.shape({
        approved: PropTypes.bool.isRequired,
        finished: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        id: PropTypes.number.isRequired,
        reproved: PropTypes.bool.isRequired,
        route: PropTypes.shape({
            draft_id: PropTypes.number,
            statistics: PropTypes.array,
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            published_id: PropTypes.number,
            published_version: PropTypes.object,
            draft_version: PropTypes.object,
            submitted: PropTypes.bool,
            submitted_original: PropTypes.bool
        })
    }),
    toggleMessages: PropTypes.func,
    toggleLog: PropTypes.func,
    fetchZones: PropTypes.func,
    auditing: PropTypes.string,
    history: PropTypes.object,
    options: PropTypes.array,
    actions: PropTypes.bool,
    active: PropTypes.bool,
    changeOption: PropTypes.func,
    fixedRight: PropTypes.bool,
    widthCell: PropTypes.array,
    approved: PropTypes.shape({
        id: PropTypes.number
    }),
    proposed: PropTypes.shape({
        id: PropTypes.number
    }),
    step: PropTypes.number,
    conflict: PropTypes.bool,
    toggleGroup: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    temporary: PropTypes.bool.isRequired,
    handleTemporary: PropTypes.func.isRequired,
    toggleConfirm: PropTypes.func,
    window: PropTypes.number.isRequired
};

Zone.defaultProps = {
    fetchZones: () => undefined,
    auditing: '',
    history: {},
    options: [],
    actions: false,
    active: false,
    fixedRight: false,
    approved: {
        id: 0
    },
    proposed: {
        id: 0
    },
    step: 1,
    visible: false
};

const mapStateToProps = (state) => {
    const logged = (!isEmpty(state.Users.content.result.data.user) && !isUndefined(state.Users.content.result.data.user.id)) ? state.Users.content.result.data.user.id : 0;

    return {
        logged
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getRoutesWindowsSubmit,
    cloneRoute,
    getRoutesWindowsParam,
    fetchRoutesWindowMessageUnread
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
