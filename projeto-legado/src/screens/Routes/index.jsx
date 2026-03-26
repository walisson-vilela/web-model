import { isEmpty, isUndefined } from 'lodash';
import { createRef, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dimmer, Header, Icon, Input, List, Loader, Menu, Popup, Table } from 'semantic-ui-react';

import { Alert, Confirm, Icomoon, Manager, Modal, ModalForms } from '../../components';
import DropdownToolbar from '../../components/Manager/components/DropdownToolbar';
import { cloneRoute, deleteRoutes, fetchRoutes, publishRoute, unpublishRoute } from '../../redux/actions/RoutesActions';
import { fetchStores } from '../../redux/actions/StoresActions';
import { dateGet } from "../../utils/DateTime";
import { hashKey } from "../../utils/HashParams";
import { PublishUnpublish } from './components';
import RoutesAdd from './RoutesAdd';
import { DraftFooter, DraftItens, HeaderDraft, Item, Options, Route } from './style';

const confirmRef = createRef();
const createdRef = createRef();
const publishUnpublishRef = createRef();
const input_pdv = createRef();

const MenuRow = ({id, draft, name, handleCloneRoute}) => {
    const [father, setFather] = useState(false);
    const [children, setChildren] = useState(false);
    const {created_at, created_by_user} = draft || {};
    const Draft = () => (
        <Popup
            basic
            on={'click'}
            open={children}
            onOpen={() => setChildren(true)}
            onClose={() => setChildren(false)}
            position={'left center'}
            trigger={<Menu.Item link>Planejar roteiro</Menu.Item>}
        >
            <HeaderDraft>
                <div>
                    <Header as={'h4'}>
                        <Header.Content>
                            Planejar Roteiro
                            <Header.Subheader>Crie e projete versão para roteiro</Header.Subheader>
                        </Header.Content>
                    </Header>
                </div>
                <div>{name}</div>
            </HeaderDraft>

            <DraftItens>Esse roteiro já possui uma versão de planejamento</DraftItens>
            <DraftItens>Chave: {draft.id}</DraftItens>
            <DraftItens>
                Criação: {dateGet(created_at, 'DD/MM/YYYY \\à\\s HH:mm')} - {created_by_user ? created_by_user.name : '-'}
            </DraftItens>

            <DraftFooter>
                <Button
                    size={'tiny'}
                    className={'bg-transparent text-underline'}
                    onClick={() => setChildren(false)}
                >
                    Fechar
                </Button>
                <Button
                    size={'tiny'}
                    color={'facebook'}
                    onClick={() => {
                        handleCloneRoute(id);
                        setChildren(false);
                        setFather(false);
                    }}
                >
                    Acessar
                </Button>
            </DraftFooter>
        </Popup>
    );

    const NoDraft = () => (
        <Popup
            position={'top left'}
            trigger={<Menu.Item disabled>Rascunho</Menu.Item>}
            content={'Não há rascunho disponível no momento.'}
        />
    );

    return (
        <Popup
            on={'click'}
            open={father}
            onOpen={() => setFather(true)}
            onClose={() => !children && setFather(false)}
            position={'left center'}
            trigger={<Icomoon name={'more-vertical link'}/>}
        >
            <Menu secondary vertical>
                {!!draft ? Draft() : NoDraft()}
                <Menu.Item link className={'mb-0'} onClick={() => {
                    confirmRef.current.openModal({ids: [id]});
                    setFather(false);
                }}>Excluir</Menu.Item>
            </Menu>
        </Popup>
    )
};

const Routes = ({fetchRoutes, deleteRoutes, cloneRoute, setTitle, location, history, publishRoute, unpublishRoute, fetchStores}) => {

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});
    const [records, setRecords] = useState({});
    const [filter, setFilter] = useState([]);
    const [req, setReq] = useState(false);
    const [error, setError] = useState(false);
    const [stores, setStores] = useState([]);
    const [storesLoading, setStoresLoading] = useState(false);
    const [pdvSearch, setPdvSearch] = useState("");
    const [pdvStarted, setPdvStarted] = useState(true);

    const defaultKey = hashKey();

    useEffect(() => {
        setTitle(location.pathname, 'Roteiro', 'map-pin');
    }, []);

    useEffect(() => {
        if (!params.page) {
            const defaultParams = JSON.parse(localStorage.getItem(defaultKey) || '{"page": 1}');
            setParams(defaultParams);
            return;
        }
        handleFetchRoutes(params)
    }, [params]);

    const handleFetchStores = useCallback(async (q) => {
        try {
            setStoresLoading(true);
            const stores = await fetchStores({q});
            const content = stores.data;
            setStores(content);
            setPdvStarted(false);
        }catch (e) {
            console.log(e);
        } finally {
            setStoresLoading(false);
        }
    }, []);

    const handleParams = useCallback((values) => {
        let content = {...params, ...values};
        localStorage.setItem(defaultKey, JSON.stringify(content));
        if(!content.pdv) {
            setPdvSearch("");
            setPdvStarted(true)
            setStores([]);
        }
        setParams(content);
    }, [params]);

    const handleFetchRoutes = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setRecords(await fetchRoutes(params));
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }, []);

    const handleFilters = useCallback((params, remove = false) => {
        if (remove) {
            const demo = filter.slice(0, params).concat(filter.slice(params + 1, filter.length));
            setFilter(demo);
        } else {
            setFilter(res => [...res, params]);
        }
    }, [filter]);

    /**
     * Faz copia da rota e redireciona usuário.
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleCloneRoute = useCallback(async (id) => {
        await setReq(true);

        try {
            const route = await cloneRoute(id);
            await history.push(`/main/routes/home/${id}/versions/${route.data.id}`);
        } catch (e) {
            await setReq(false);
            console.error(e);
        }
    }, []);

    /**
     * Verifica se rota atual é uma cópia de rascunho não editavel e cria uma nova copia.
     * @returns {Promise<void>}
     */
    const handleRedirectView = useCallback(async (route, version) => {
        if (version === 0) {
            await setError(true);
        } else {
            await history.push(`/main/routes/home/${route}/versions/${version}`);
        }
    }, []);

    const managerHeader = useMemo(() => (
        <Fragment>
            <Table.HeaderCell style={{width: 85}} textAlign={'center'} content={"ID"}/>
            <Table.HeaderCell style={{width: 85}} content={"Tipo"}/>
            <Table.HeaderCell content={"Nome da rota"}/>
            <Table.HeaderCell style={{width: 250}} content={"Grupo"}/>
            <Table.HeaderCell style={{width: 135}} textAlign={'center'} content={"Publicado"}/>
            <Table.HeaderCell style={{width: 110}} textAlign={'center'} content={"Qtd. PDVs"}/>
            <Table.HeaderCell style={{width: 110}} textAlign={'center'} content={"TMO"}/>
            <Table.HeaderCell style={{width: 40}} textAlign={'center'}/>
        </Fragment>
    ), []);

    const managerBody = useCallback(({
                                         id,
                                         name,
                                         published,
                                         published_version,
                                         type,
                                         draft_version,
                                         zone,
                                         publish_id,
                                         publish_at
                                     }) => {

        let version = published ? published_version : draft_version;
        if (!version && published_version) {
            version = published_version;
        }

        if (!version) {
            version = {}
        }

        let people = version.people || {name: "Sem executor"};

        const {store_count, tmo_count} = version;

        let status = "Não";
        if (published) {
            status = 'Sim';
        }
        if (publish_id) {
            status += ', agendado para ' + dateGet(publish_at, 'DD/MM/YY');
        }

        return (
            <Fragment>
                <Table.Cell textAlign={'center'}>
                    <Item onClick={() => handleRedirectView(id, version.id)}>{id}</Item>
                </Table.Cell>
                <Table.Cell>
                    <Item onClick={() => handleRedirectView(id, version.id)}>
                        {type === 1 ? 'Fixa' : type === 2 ? 'Temporária' : 'Cobertura'}
                    </Item>
                </Table.Cell>
                <Table.Cell>
                    <Item onClick={() => handleRedirectView(id, version.id)}>
                        {name}
                        <Route>{people.name}</Route>
                    </Item>
                </Table.Cell>
                <Table.Cell>
                    <Item onClick={() => handleRedirectView(id, version.id)}>{zone && zone.name}</Item>
                </Table.Cell>
                <Table.Cell content={status}/>
                <Table.Cell textAlign={'center'} content={!store_count ? "-" : store_count}/>
                <Table.Cell textAlign={'center'} content={!tmo_count ? "-" : `${tmo_count}%`}/>
                <Table.Cell textAlign={'center'}>
                    <Options>
                        <MenuRow id={id} draft={draft_version} name={name} handleCloneRoute={handleCloneRoute}/>
                    </Options>
                </Table.Cell>
            </Fragment>
        )
    }, []);

    const managerFilters = useMemo(() => {
        const optionsType = [
            {"key": 1, "value": 1, "text": 'Fixa'},
            {"key": 2, "value": 2, "text": 'Temporária'},
            {"key": 3, "value": 3, "text": 'Cobertura'}
        ];
        const optionsDraft = [
            {"key": 1, "value": 0, "text": 'Não'},
            {"key": 2, "value": 1, "text": 'Sim'}
        ];
        const optionsPublish = [
            {"key": 1, "value": 0, "text": 'Não'},
            {"key": 2, "value": 1, "text": 'Sim'}
        ];

        return (
            <Fragment>
                {
                    params.pdv
                        ?
                        <div
                            className={"item"}
                            style={{
                                maxWidth: 185.95,
                            }}
                        >
                            <div
                                title={params.pdv_name}
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}
                            >
                            {params.pdv_name}
                            </div>
                            <Icon
                                link
                                name={"times"}
                                style={{marginLeft: 7}}
                                color={"black"}
                                title={"Limpar"}
                                onClick={() => handleParams({"pdv": undefined, "pdv_name": undefined, "page": 1})}
                            />
                        </div>
                        : <Popup
                            content={
                                <div style={{"width": 370}}>
                                    <Input
                                        fluid
                                        autoFocus
                                        loading={storesLoading}
                                        ref={input_pdv}
                                        icon={
                                            <Icon
                                                link
                                                name={"search"}
                                                onClick={() => handleFetchStores(pdvSearch)}
                                            />
                                        }
                                        placeholder='Pesquisar'
                                        onKeyPress={(e) => e.key === 'Enter' && handleFetchStores(e.target.value)}
                                        value={pdvSearch}
                                        onChange={(e, {value}) => setPdvSearch(value)}
                                    />
                                    <div style={{
                                        maxHeight: 230,
                                        overflow: "auto",
                                        marginTop: ".5rem"
                                    }}>
                                        {
                                            stores.length > 0
                                                ? <List divided relaxed selection>
                                                    {
                                                        stores.map((store) => {
                                                            return (
                                                                <List.Item
                                                                    key={store.id} active={store.id === params.pdv}
                                                                    onClick={() => handleParams({
                                                                        "pdv": store.id,
                                                                        "pdv_name": store.name,
                                                                        "page": 1
                                                                    })}
                                                                >
                                                                    <List.Content>
                                                                        <small>Código: {store.code}</small>
                                                                        <List.Header>{store.name}</List.Header>
                                                                        <List.Description style={{fontSize: 13}}>
                                                                            {store.formatted_address}
                                                                        </List.Description>
                                                                    </List.Content>
                                                                </List.Item>
                                                            );
                                                        })
                                                    }
                                                </List>
                                                : <div
                                                    style={{
                                                        textAlign: "center",
                                                        color: "var(--black-40)",
                                                        margin: "1rem 0"
                                                    }}
                                                >
                                                    {
                                                        pdvStarted
                                                            ? <Fragment>Digite o nome, código, cnpj ou razão social do PDV<br /> para saber quem tem o mesmo em sua rota</Fragment>
                                                            : <Fragment>
                                                                <strong>Nenhum resultado encontrado!</strong><br />
                                                                Altere os parâmetros de pesquisa ou crie novas rotas,<br /> caso não haja nenhuma.
                                                            </Fragment>
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            }
                            position={"bottom right"}
                            trigger={
                                <div
                                    className={"item link"}
                                    style={{"color": "rgba(191,191,191,.87)"}}
                                >
                                    Quem atende o PDV?
                                    <Icon name={"dropdown"} style={{marginLeft: 7}} color={"black"}/>
                                </div>
                            }
                            on={"click"}
                        />
                }

                <DropdownToolbar
                    title={'Tipo de Rota'}
                    itens={optionsType}
                    onSelectItem={(type) => handleParams({type, "page": 1})}
                    value={isUndefined(params.type) ? '' : params.type}
                />

                <DropdownToolbar
                    title={'Possui Rascunho'}
                    itens={optionsDraft}
                    onSelectItem={(draft) => handleParams({draft, "page": 1})}
                    value={isUndefined(params.draft) ? '' : params.draft}
                />

                <DropdownToolbar
                    title={'Publicado'}
                    itens={optionsPublish}
                    onSelectItem={(published) => handleParams({published, "page": 1})}
                    value={isUndefined(params.published) ? '' : params.published}
                />
            </Fragment>
        )
    }, [params, pdvSearch, pdvStarted, stores, storesLoading]);

    /**
     * Executa ação conforme opçao selecionada.
     *
     * @param action
     * @param selected
     * @returns {Promise<*>}
     */
    const handleOptionActionManager = useCallback(async (action, selected) => {
        await setLoading(true);

        try {
            switch (action) {
                case 'publish':
                    const published = await publishRoute({ids: selected});

                    !isEmpty(published.data) &&
                    await publishUnpublishRef.current.toggleModal(published.data);
                    break;
                case 'unpublish':
                    const unpublished = await unpublishRoute({ids: selected});

                    !isEmpty(unpublished.data) &&
                    await publishUnpublishRef.current.toggleModal(unpublished.data);
                    break;
                default:
                    break;
            }
            await handleFetchRoutes(params);
        } catch (e) {
            console.error(e);
        } finally {
            await setLoading(false);
        }
    }, [params]);

    return (
        <Fragment>
            <Dimmer inverted active={req}>
                <Loader inverted/>
            </Dimmer>
            <Manager
                table={'routesTable'}
                header={'Gerenciador de Rotas'}
                subheader={'Gerencie as rotas de sua empresa'}
                result={records}
                params={params}
                isLoading={loading}
                onPageChange={(props) => handleParams(props)}
                onFiltersToolbar={managerFilters}
                headerRow={managerHeader}
                renderBodyRow={row => managerBody(row)}
                crud={{
                    add: () => createdRef.current.handleOpen(),
                    deleteMany: (ids) => confirmRef.current.openModal({ids}),
                    refresh: () => handleFetchRoutes(params)
                }}
                label={{
                    add: 'Adicionar Rota'
                }}
                onGetFilters={filter}
                onRemoveFilters={(param) => handleFilters(param, true)}
                reset={() => setFilter([])}
                handleOptions={[
                    {key: 0, text: 'Publicar', value: 'publish', disabled: true},
                    {key: 1, text: 'Despublicar', value: 'unpublish', disabled: true}
                ]}
                handleActionOptions={(action, selected) => handleOptionActionManager(action, selected)}
            />

            <Modal ref={confirmRef} size={'mini'}>
                <Confirm
                    onCancel={() => confirmRef.current.closeModal()}
                    onConfirm={() => deleteRoutes(confirmRef.current.state.props.ids)}
                    onSuccess={() => handleFetchRoutes(params)}
                />
            </Modal>

            <ModalForms icon={'/assets/images/pin.svg'} title={'Adicionar Rota'} ref={createdRef} size={"small"}>
                <RoutesAdd
                    history={history}
                    onCancel={() => createdRef.current.handleClose()}
                />
            </ModalForms>

            <PublishUnpublish
                ref={publishUnpublishRef}
                title={'Ooops...'}
                description={'Erro ao tentar executar a ação solicitada.'}
            />

            {
                error &&
                <Alert
                    title={'Oops...'}
                    description={'Esta rota não possui copia de rascunho/produção. Por favor, contate o suporte.'}
                    onPress={() => setError(false)}
                />
            }
        </Fragment>
    )
};

const mapStateToProps = (state, ownProps) => ({
    routes: state.Routes,
    setTitle: ownProps.setTitle
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoutes,
    deleteRoutes,
    cloneRoute,
    publishRoute,
    unpublishRoute,
    fetchStores
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
