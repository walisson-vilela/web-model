import { isEmpty, isUndefined } from 'lodash';
import moment from 'moment';
import { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRoutesStatistics } from '../../../redux/actions/RoutesStatisticsActions';
import {
  getApprovedOriginals, getRoutesWindows, getRoutesWindowsFinish, getRoutesWindowsParams, getRoutesWindowsProgress, getRoutesWindowsSub,
  getRoutesWindowsZones
} from '../../../redux/actions/RoutesWindowsActions';
import { fetchWithoutRoute } from '../../../redux/actions/WithoutRouteActions';
import { fetchZones } from '../../../redux/actions/ZonesActions';

import PlanningParameter from '../screens/PlanningParameter';

import { Dimmer, Dropdown, Input, Loader, Radio } from 'semantic-ui-react';
import { Confirm, ConfirmPopup, Icomoon, Label, ModalBasic } from '../../../components';
import { MyCard } from '../components';
import { GroupRoutes, ModalRoute, ZoneStatistics } from './components';
import {
  Container,
  Content, Conteudo, Group,
  GroupFooter,
  GroupHeader,
  GroupSearch,
  GroupZones,
  GroupZonesItem, MessageLoader, Sidebar
} from './style';

const AuditingView = props => {
    const {
        auditing_id,
        setTitle,
        location,
        getRoutesWindows,
        fetchWithoutRoute,
        fetchZones,
        getRoutesWindowsZones,
        getRoutesWindowsParams,
        getRoutesStatistics,
        history,
        getRoutesWindowsSub,
        getRoutesWindowsFinish,
        logged,
        getApprovedOriginals,
        getRoutesWindowsProgress
    } = props;

    const createRoute = createRef();
    const approveRef = createRef();
    const submitRef = createRef();

    const [loadingStep, setLoadingStep] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingZones, setLoadingZones] = useState(true);
    const [loadingRoutes, setLoadingRoutes] = useState(true);
    const [progress, setProgress] = useState(false);
    const [download, setDownload] = useState(false);
    const [progressWindow, setProgressWindow] = useState(0);
    const [step, setStep] = useState({});
    const [without, setWithout] = useState([]);
    const [groups, setGroups] = useState([]);
    const [active, setActive] = useState({id: 0, name: 'CONFLITOS'});
    const [routes, setRoutes] = useState([]);
    const [conflicts, setConflicts] = useState([]);
    const [temps, setTemps] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [search, setSearch] = useState('');
    const [stage, setStage] = useState(0);
    const [params, setParams] = useState({});
    const [view, setView] = useState('window');
    const [toggleGroup, setToggleGroup] = useState(false);
    const [filters, setFilters] = useState({});
    const [colorTemp, setColorTemp] = useState(1);

    const sessionKey = `window_${step.id}`;
    const windowSession = JSON.parse(sessionStorage.getItem(sessionKey));

    /**
     * Função de inicialização de componente.
     *
     * @returns {Promise<void>}
     */
    const handleDidMount = async () => {
        await setTitle(location.pathname, 'Planejanemnto/Auditoria', '');
        await handleProgressWindow();
        await handleRoutesWindows(auditing_id);
        await handleGroupConflicts();
        await handleGroupTemporary();
    };

    /**
     * busca informações da janela e atualiza o título da aba.
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleRoutesWindows = async (id) => {
        await setLoadingStep(true);

        let time;

        try {
            const result = await getRoutesWindows(id);
            const proposed = `Plan. ${result.data.proposed_by_user.name}`;
            const approved = `Audit. ${result.data.approved_by_user.name}`;

            // noinspection JSUnresolvedVariable
            const {proposal_start, proposal_end, approval_start, approval_end} = result.data.config_window;

            if (result.data.step === 1) {

                await setTitle(location.pathname, proposed, 'map-pin');

                time = {
                    start: moment.utc(proposal_start).startOf('month').format('YYYY-MM-DD'),
                    end: moment.utc(proposal_end).endOf('month').format('YYYY-MM-DD'),
                    period: 'M'
                };
            } else {

                await setTitle(location.pathname, approved, 'map-pin');

                time = {
                    start: moment.utc(approval_start).startOf('month').format('YYYY-MM-DD'),
                    end: moment.utc(approval_end).endOf('month').format('YYYY-MM-DD'),
                    period: 'M'
                };
            }

            await setStep({...result.data});
            await setParams(time);
            await handleFetchWithout(result.data.proposed_by_user.id);
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoadingStep(false);
        }
    };

    /**
     * busca todos os grupos e incrementa novo registro de conflitos.
     * caso o param routes esteja setado como true, ele irá buscar todas as rotas do grupo selecionado.
     *
     * @param changeActive
     * @returns {Promise<void>}
     */
    const handleFetchZones = async (changeActive = true) => {
        await setLoadingZones(true);

        let defParams;

        if (parseInt(step.approved_by_user.id) === logged) {
            defParams = {approve: 1};
        }

        try {
            const result = await fetchZones(auditing_id, defParams);

            await setGroups(result.data);

            // Verifica se existe dados salvo na session do navegador e seta no active
            if (!isEmpty(windowSession)) {
                const {id} = windowSession;

                if (parseInt(id) === 0 && conflicts.length === 0) {
                    await setActive(result.data[0]);
                } else {
                    window.location.hash = `z${id}`;
                    await setActive(windowSession);
                }
            } else {
                if (!isEmpty(result.data) && changeActive) {
                    await setActive(result.data[0]);
                } else {
                    await setLoadingRoutes(false);
                }
            }

            await setLoadingZones(false);

        } catch (e) {
            await setLoadingZones(false);
            await console.log(e);
        }
    };

    /**
     * busca todos os usuários sem rotas disponiveis.
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleFetchWithout = async (id) => {
        try {
            const result = await fetchWithoutRoute(id, {without_route: 1});

            await setWithout(result.data);
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * busca rotas do id informado e estatisticas da mesma.
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleFetchRoutes = async (id) => {
        await setLoadingRoutes(true);

        try {
            const result = await getRoutesWindowsZones(auditing_id, id);

            await setRoutes(result.data);

            const statistic = await getRoutesStatistics(id, params);

            await setStatistics(statistic.data[0]);
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoadingRoutes(false);
        }
    };

    /**
     * busca todos os conflitos existentes.
     *
     * @returns {Promise<void>}
     */
    const handleGroupConflicts = async () => {
        await setConflicts([]);

        try {
            const result = await getRoutesWindowsParams(auditing_id, 'with-conflicts');
            await setConflicts(result.data);
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * busca todas as rotas temporárias existentes.
     * @returns {Promise<void>}
     */
    const handleGroupTemporary = async () => {
        await setTemps([]);

        try {
            const result = await getRoutesWindowsParams(auditing_id, 'temporary');
            await setTemps(result.data);
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * modifica grupo e reseta dados da loja.
     *
     * @param group
     * @returns {Promise<void>}
     */
    const handleCheckItem = async (group) => {
        await setRoutes([]);
        await setActive(group);
        await sessionStorage.setItem(sessionKey, JSON.stringify(group));
    };

    /**
     * realiza envio dos grupos para API.
     *
     * @returns {Promise<void>}
     */
    const handleSubmit = async () => {

        await setLoadingSubmit(true);

        try {
            if (step.proposed_by_user && parseInt(step.proposed_by_user.id) === parseInt(logged)) {
                await getRoutesWindowsSub(auditing_id);
            } else {
                await getRoutesWindowsFinish(auditing_id);
            }

            await handleDidMount();
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoadingSubmit(false);
        }
    };

    /**
     * cria nova rota.
     *
     * @param disable
     * @returns {Promise<void>}
     */
    const handleNewRoute = async (disable = false) => {
        // const defObject = {id: active.id, name: active.name, disabled: disable};

        /**
         * Verifica se a rota selecionada é uma rota de conflitos.
         */
        // if (parseInt(active.id) === 0) {
            await createRoute.current.toggleModal();
        // } else {
        //     await createRoute.current.toggleModal(defObject);
        // }
    };

    /**
     * Apply filter in group routes
     *
     * @param group
     * @returns {boolean}
     */
    const handleFilters = (group) => {
        if (isEmpty(filters)) {
            return group.name.toLowerCase().includes(search.toLowerCase());
        } else {
            return group.name.toLowerCase().includes(search.toLowerCase()) && parseInt(group.routes_color) === filters.value;
        }
    };

    /**
     * Aprova todos as rotas mantidas originais.
     *
     * @returns {Promise<void>}
     */
    const handleApproveOriginals = async () => {
        try {
            await getApprovedOriginals('approve-originals', step.id);
            await approveRef.current.closeModal();
            await setFilters({});
            await handleDidMount();
        } catch (e) {
            await console.log(e)
        }
    };

    /**
     * Submit rotas pendentes.
     *
     * @returns {Promise<void>}
     */
    const handleSubmitOriginals = async () => {
        try {
            await getApprovedOriginals('submit-pending', step.id);
            await submitRef.current.closeModal();
            await setFilters({});
            await handleDidMount();
        } catch (e) {
            await console.log(e)
        }
    };

    /**
     * Retorna rotas para componente.
     *
     * @returns {Array}
     */
    const handleGetRoutesInComponent = () => {
        switch (parseInt(active.id)) {
            case 0:
                return conflicts;
            case -1:
                return temps;
            default:
                return routes;
        }
    };

    /**
     * Update all and remove sessionStorage
     * @returns {Promise<void>}
     */
    const handleUpdateAll = async () => {
        const item = JSON.parse(sessionStorage.getItem(sessionKey));

        try {
            await handleFetchZones(false);

            switch (parseInt(item.id)) {
                case -1:
                    await handleGroupTemporary();
                    break;
                case 0:
                    await handleGroupConflicts();
                    break;
                default:
                    await setRoutes([]);
                    await handleFetchRoutes(item.id);
                    break;
            }
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * Verifica se janela esta em progresso
     *
     * @returns {Promise<void>}
     */
    const handleProgressWindow = async () => {

        try {
            const request = await getRoutesWindowsProgress();
            await setProgress(request.status);
            await setProgressWindow(parseInt(request.data.id));
        } catch (e) {
            await console.log(e)
        }
    };

    /**
     * criado função promisse "handleDidMount" para setar título da página, buscar informações da janela, buscar
     * todos os grupos e conflitos existentes.
     */
    useEffect(() => {

        // noinspection JSIgnoredPromiseFromCall
        handleDidMount();
    }, []);

    /**
     * busca estatísticas e todos os registros da zona informada.
     */
    useEffect(() => {
        if (!isEmpty(active) && parseInt(active.id) > 0) {
            const fetchData = async () => {
                await handleFetchRoutes(active.id);
            };

            // noinspection JSIgnoredPromiseFromCall
            fetchData();
        }

    }, [active]);

    /**
     * realiza contagem de grupo concluídos.
     */
    useEffect(() => {
        /**
         * Realiza contagem e seta informação no state local.
         * @returns {Promise<void>}
         */
        const countGroups = async () => {
            const colors = await groups.filter(group => parseInt(group.routes_color) === 1);
            let numbers = colors.length;

            // Verifica se não existe conflitos e acrescenta +1 nos itens checados.
            if (isEmpty(conflicts)) {
                numbers = numbers + 1;
            }

            // Verifica se temporária foi concluída e acrescenta +1 nos itens checados
            if (colorTemp === 1) {
                numbers = numbers + 1;
            }

            await setStage(numbers);
        };

        // noinspection JSIgnoredPromiseFromCall
        countGroups()
    }, [groups, colorTemp]);

    /**
     * Verifica se a variavel step foi preenchida e busca as zonas.
     */
    useEffect(() => {
        !isEmpty(step) && handleFetchZones()
    }, [step]);

    /**
     * Ativa primeiro item encontrado, apos filtro ser aplicado.
     */
    useEffect(() => {
        const handleActiveFirstItem = async () => {
            const firstItem = await groups.filter(group => parseInt(group.routes_color) === filters.value).slice(0, 1);

            await sessionStorage.removeItem(sessionKey);
            await setRoutes([]);
            await setActive(...firstItem);
        };

        if (!isEmpty(filters)) {
            // noinspection JSIgnoredPromiseFromCall
            handleActiveFirstItem();
        }
    }, [filters]);

    /**
     * Cor temporário.
     */
    useEffect(() => {
        /**
         * Altera cor do grupo temporário
         */
        const handleColorTemp = async () => {

            if (isEmpty(temps)) {
                await setColorTemp(1)
            } else {
                let tempNotSubmit;

                if (parseInt(step.proposed_by_user.id) === logged) {
                    tempNotSubmit = temps.filter((temp) => parseInt(temp.submitted) === 0);
                } else {
                    tempNotSubmit = temps.filter((temp) => parseInt(temp.finished) === 0);
                }

                if (isEmpty(tempNotSubmit)) {
                    await setColorTemp(1)
                } else if (tempNotSubmit.length === temps.length) {
                    await setColorTemp(0)
                } else {
                    await setColorTemp(2)
                }
            }
        };

        if (parseInt(active.id) === -1) {
            setLoadingRoutes(false);
        }

        // noinspection JSIgnoredPromiseFromCall
        handleColorTemp();
    }, [temps, groups]);

    if (view === 'PlanningParameter') {
        return (
            <PlanningParameter
                back={() => setView('window')}
            />
        )
    }

    const block = Boolean(
        (
            progress && (
                (!step.submitted && step.proposed_by_user && parseInt(step.proposed_by_user.id) === parseInt(logged)) ||
                (!step.finished && step.approved_by_user && parseInt(step.approved_by_user.id) === parseInt(logged))
            )
        ) || parseInt(step.window_id) === progressWindow
    );
    const colorConflicts = isEmpty(conflicts) ? 1 : 2;

    // filters
    const pending = groups.filter(group => parseInt(group.routes_color) === 0);
    const in_progress = groups.filter(group => parseInt(group.routes_color) === 2);
    const completed = groups.filter(group => parseInt(group.routes_color) === 1);


    let proposed_by_user = step.proposed_by_user || {};
        proposed_by_user = proposed_by_user.id || 0;

    let approved_by_user = step.approved_by_user || {};
        approved_by_user = approved_by_user.id || 0;

    let subtitle;

    if (!isEmpty(without)) {
        subtitle = (!step.submitted && step.proposed_by_user && step.proposed_by_user.id === logged) ?
            `Foi identificado que está área de supervisão possui ${without.length} colaboradores sem rota, você confirma a ação de submeter para aprovação?` :
            `Foi identificado que está área de supervisão possui ${without.length} colaboradores sem rota, você confirma a ação?`
    } else {
        subtitle = (!step.submitted && step.proposed_by_user && step.proposed_by_user.id === logged) ?
            'Você está submetendo todos os grupos para aprovação. Você confirma esta ação?' :
            'Você está aprovando todos os grupos. Você confirma esta ação?';
    }

    return (
        <Conteudo>
            <Dimmer inverted active={download}>
                <Loader inverted size={'large'}>
                    <MessageLoader>
                        <h1>Requisição em andamento!</h1>
                        <h5>Este processo pode demorar um pouco. Por favor, aguarde enquanto processamos os dados.</h5>
                    </MessageLoader>
                </Loader>
            </Dimmer>

            <Content>
                <Sidebar>
                    <MyCard
                        approved_by_user={step.approved_by_user}
                        id={step.id}
                        isLoading={loadingStep || loadingSubmit}
                        proposed_by_user={step.proposed_by_user}
                        step={step.step}
                        window={step.window}
                        without={without}
                        progress={parseInt(step.config_window && step.config_window.done_per)}
                        downloading={(loading) => setDownload(loading)}
                    />
                    <Group>
                        <Dimmer inverted active={loadingZones || loadingSubmit}>
                            <Loader inverted/>
                        </Dimmer>

                        <GroupHeader>
                            <div className="__inline">
                                <div>Grupos ({groups.length})</div>
                                <Dropdown icon={<Icomoon name={'more-vertical'}/>}>
                                    <Dropdown.Menu>
                                        <Dropdown.Header content={'Menu'}/>
                                        {
                                            (parseInt(proposed_by_user) === parseInt(logged) && block) &&
                                            <Dropdown.Item
                                                onClick={() => handleNewRoute()}
                                                content={'Criar rota'}
                                            />
                                        }

                                        {
                                            (parseInt(proposed_by_user) === parseInt(logged) && filters.value === 0 && block) &&
                                                <Dropdown.Item
                                                    onClick={() => submitRef.current.openModal()}
                                                    content={'Submeter rotas originais'}
                                                />
                                        }

                                        {
                                            (parseInt(approved_by_user) === parseInt(logged) && block) &&
                                            <Dropdown.Item
                                                onClick={() => approveRef.current.openModal()}
                                                content={'Aprovar rotas originais'}
                                            />
                                        }
                                        {/*<Dropdown.Item onClick={() => setView('PlanningParameter')}>*/}
                                        {/*    Planejamento por parâmetros*/}
                                        {/*</Dropdown.Item>*/}
                                        <Dropdown.Header content={'Filtrar por status'}/>
                                        <Dropdown.Item active={filters.value === 0} disabled={isEmpty(pending)} onClick={() => setFilters({
                                            content: 'Pendente',
                                            color: 'grey',
                                            value: 0
                                        })}>
                                            <Label circular empty color={'grey'} content={'Pendente'}/>
                                        </Dropdown.Item>
                                        <Dropdown.Item active={filters.value === 2} disabled={isEmpty(in_progress)} onClick={() => setFilters({
                                            content: 'Em andamento',
                                            color: 'yellow',
                                            value: 2
                                        })}>
                                            <Label circular empty color={'yellow'} content={'Em andamento'}/>
                                        </Dropdown.Item>
                                        <Dropdown.Item active={filters.value === 1} disabled={isEmpty(completed)} onClick={() => setFilters({
                                            content: 'Concluída',
                                            color: 'green',
                                            value: 1
                                        })}>
                                            <Label circular empty color={'green'} content={'Concluída'}/>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFilters({})}>
                                            <p className="__footer_dropdown">Redefinir</p>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="__inline">
                                <div>Etapa: {stage}/{groups.length + 2}</div>
                                <div>
                                    {
                                        !isEmpty(filters) &&
                                        <Label circular empty inverted color={filters.color} content={filters.content}/>
                                    }
                                </div>
                            </div>
                        </GroupHeader>
                        <GroupSearch>
                            <Input
                                fluid
                                transparent
                                icon={<Icomoon name={'search'}/>}
                                placeholder={'Faça sua pesquisa'}
                                onChange={(e, {value}) => setSearch(value)}
                                value={search}
                            />
                        </GroupSearch>
                        <GroupZones>
                            {
                                groups
                                    .filter(handleFilters)
                                    .map(group => (
                                        <GroupZonesItem status={group.routes_color} key={group.id}>
                                            <Radio
                                                disabled={toggleGroup || loadingSubmit}
                                                id={`z${group.id}`}
                                                label={group.name}
                                                value={group.id}
                                                checked={active.id === group.id}
                                                onChange={() => handleCheckItem(group)}
                                            />
                                        </GroupZonesItem>
                                    ))
                            }
                            {
                                (isEmpty(filters) || filters.value === colorConflicts) &&
                                <GroupZonesItem status={colorConflicts} key={0}>
                                    <Radio
                                        disabled={toggleGroup || isEmpty(conflicts) || loadingSubmit}
                                        label={`Conflitos (${conflicts.length})`}
                                        value={0}
                                        checked={active.id === 0}
                                        onChange={() => handleCheckItem({id: 0, name: 'CONFLITOS'})}
                                    />
                                </GroupZonesItem>
                            }

                            {
                                (isEmpty(filters) || filters.value === colorTemp) &&
                                <GroupZonesItem status={colorTemp} key={1}>
                                    <Radio
                                        disabled={toggleGroup || isEmpty(temps) || loadingSubmit}
                                        label={`Temporária (${temps.length})`}
                                        value={-1}
                                        checked={active.id === -1}
                                        onChange={() => handleCheckItem({id: -1, name: 'TEMPORÁRIA'})}
                                    />
                                </GroupZonesItem>
                            }
                        </GroupZones>

                        {
                            block &&
                            <GroupFooter>
                                <ConfirmPopup
                                    loading={loadingSubmit}
                                    inverted
                                    disabled={(!(stage === (groups.length + 2)) || !isEmpty(conflicts))}
                                    content={(!step.submitted && step.proposed_by_user && step.proposed_by_user.id === logged) ? 'Submeter para aprovação' : 'Concluir'}
                                    position={'top left'}
                                    colorSecondary={'facebook'}
                                    textSubmit={'Confirmar'}
                                    onSubmit={() => handleSubmit()}
                                    title={'Antes de confirmar sua ação, temos uma informação importante para compartilhar!'}
                                    subtitle={subtitle}
                                />
                            </GroupFooter>
                        }
                    </Group>
                </Sidebar>
                <Container>
                    <Dimmer inverted active={loadingRoutes || loadingSubmit}>
                        <Loader inverted/>
                    </Dimmer>
                    <ZoneStatistics
                        data={statistics}
                        active={active}
                        block={(parseInt(step.step) === 1 && block)}
                        newRoute={() => handleNewRoute(true)}
                    />

                    <GroupRoutes
                        routes={handleGetRoutesInComponent()}
                        fetchZones={() => handleFetchZones(false)}
                        auditing={auditing_id}
                        history={history}
                        approved={step.approved_by_user}
                        proposed={step.proposed_by_user}
                        step={step.step}
                        finished={step.finished}
                        conflict={Boolean(parseInt(active.id) === 0)}
                        toggleGroup={(value) => setToggleGroup(value)}
                        visible={!block}
                        temporary={Boolean(parseInt(active.id) === -1)}
                        handleTemporary={() => handleGroupTemporary()}
                        handleUpdateAll={() => handleUpdateAll()}
                        window={parseInt(step.window_id)}
                    />
                </Container>
            </Content>

            <ModalRoute
                ref={createRoute}
                handleConfirm={() => handleDidMount()}
                history={history}
                window={parseInt(auditing_id)}
                proposed={parseInt(proposed_by_user)}
                approved={parseInt(approved_by_user)}
            />

            <ModalBasic ref={approveRef} size={'mini'}>
                <Confirm
                    title={'Confirmação'}
                    description={'Deseja aprovar todas as rotas mantidas como originais?'}
                    onConfirm={() => handleApproveOriginals()}
                    onCancel={() => approveRef.current.closeModal()}
                    confirmButton={'Sim, aprovar!'}
                />
            </ModalBasic>

            <ModalBasic ref={submitRef} size={'mini'}>
                <Confirm
                    title={'Confirmação'}
                    description={'Deseja submeter todas as rotas originais?'}
                    onConfirm={() => handleSubmitOriginals()}
                    onCancel={() => submitRef.current.closeModal()}
                    confirmButton={'Sim, submeter!'}
                />
            </ModalBasic>
        </Conteudo>
    );
};

const mapStateToProps = (state, ownProps) => {
    const logged = (!isEmpty(state.Users.content.result.data.user) && !isUndefined(state.Users.content.result.data.user.id)) ? state.Users.content.result.data.user.id : 0;

    return {
        auditing_id: ownProps.match.params.auditing_id,
        setTitle: ownProps.setTitle,
        location: ownProps.location,
        logged
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getRoutesWindows,
    fetchWithoutRoute,
    fetchZones,
    getRoutesWindowsZones,
    getRoutesWindowsParams,
    getRoutesStatistics,
    getRoutesWindowsSub,
    getRoutesWindowsFinish,
    getApprovedOriginals,
    getRoutesWindowsProgress
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuditingView);
