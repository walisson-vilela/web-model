import { find, isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { createRef, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Input, List, Menu, Radio } from 'semantic-ui-react';

import { withoutRoutePeoples } from '../../../../../redux/actions/PeoplesActions';
import { putRoutesVersions } from '../../../../../redux/actions/RoutesVersionsActions';
import { getUser } from '../../../../../redux/actions/UsersActions';

import { Confirm, Empty, GroupCheckboxPopup, Icomoon, Modal } from '../../../../../components';
import { HierarchyStructure } from '../../../components';
import { ListWrapper } from './style';

const removerPerformer = createRef();
const swapPerformer = createRef();
const hierarchy = createRef();
// const team = createRef();

const ListItem = ({item, checked, setPerformer}) => {
    const {id, re, name, zone} = item;
    return (
        <List.Item as={"a"} onClick={() => setPerformer(id)}>
            <List.Content floated={"left"}>
                <Radio
                    checked={id === checked}
                />
            </List.Content>
            <List.Content floated={"left"}>
                <List.Header>
                    <small>Código: {re}</small>
                    <div>{name}</div>
                </List.Header>
                <List.Description>{zone}</List.Description>
            </List.Content>
        </List.Item>
    );
}

const NavigationUser = (props) => {
    const {
        putRoutesVersions,
        withoutRoutePeoples,
        enrollment_id,
        people,
        route,
        refresh,
        published,
        type,
        defaultParams
    } = props;

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [performer, setPerformer] = useState(null);
    const [search, setSearch] = useState(null);
    const [without_zone, setWithoutZone] = useState(false);
    const [without_route] = useState(false);
    const [without_hierarchy, setWithoutHierarchy] = useState(false);

    let options = [{
        key: 0,
        text: 'Todas as Zonas',
        checked: without_zone,
        onChange: (value) => handleAllZones(value)
    }];

    if(!defaultParams.only_hierarchy) {
        options.push({
            key: 2,
            text: 'Pessoas sem Hierarquia',
            checked: without_hierarchy,
            onChange: (value) => handlePeoplesNotHierarchies(value)
        });
    }

    /**
     * Atualiza versão da rota.
     *
     * @param route
     * @param id
     * @returns {Promise<void>}
     */
    const putPeople = useCallback(async (route, id = null) => {
        await putRoutesVersions(route.route_id, route.route_version_id, {people_id: id})
    }, []);

    /**
     * Toggle "Todas as zonas"
     *
     * @param checked
     * @returns {Promise<void>}
     */
    const handleAllZones = useCallback(async (checked) => {
        try {
            if (checked) {
                await setWithoutHierarchy(false);
            }

            await setWithoutZone(checked);
        } catch (e) {
            console.error(e);
        }
    }, []);

    /**
     * Toggle "Pessoas sem hierarquia"
     *
     * @param checked
     * @returns {Promise<void>}
     */
    const handlePeoplesNotHierarchies = useCallback(async (checked) => {
        try {
            if (checked) {
                await setWithoutZone(false);
            }
            await setWithoutHierarchy(checked);
        } catch (e) {
            await console.error(e)
        }
    }, []);

    /**
     * Busca pessoas
     *
     * @param params
     * @returns {Promise<void>}
     */
    const handlePeople = async (params = {}) => {

        if (swapPerformer.current && !swapPerformer.current.statusModal()) {
            return;
        }

        let defParams = {
            ...params,
            "zone_id": route.zone_id,
            "contain": "Users",
            "limit": 20
        };

        // Pesquisa
        if (!isEmpty(search)) {
            defParams = {...defParams, name: search};
        }

        // Todas as zonas
        if (without_zone) {
            delete defParams.zone_id;
        }

        // Somente pessoas sem rotas
        if (without_route) {
            defParams = {...defParams, without_route: 1};
        }

        // Somente pessoas sem hierarquias
        if (defaultParams.only_hierarchy) {
            defParams = {...defParams, only_hierarchy: 1};
        } else if (without_hierarchy) {
            defParams = {...defParams, without_hierarchy: 1};
        }

        try {
            await setLoading(true);
            await setPerformer(null);
            const res = await withoutRoutePeoples(enrollment_id, {...defParams, route_type: type});
            if (res.success) {
                const items = res.data.map((o) => {
                    const {id, re, name, _matchingData: hierarchy} = o;

                    let item = {
                        "id": id,
                        "code": re || "",
                        "name": name,
                        "zone": ""
                    }

                    if(hierarchy && hierarchy.HierarchyElements) {
                        item.zone = hierarchy.HierarchyElements.name;
                    }

                    return item;
                });
                setItems(items);
            }
        } catch (e) {
            await console.error(e)
        } finally {
            await setLoading(false);
        }
    };

    useEffect(() => {
        handlePeople();
    }, [without_zone, without_route, without_hierarchy]);

    const Footer = useMemo(() => (
        <Fragment>
            <div style={{float: "left", lineHeight: "36px", color: "var(--black-40)", fontSize: 13}}>
                {
                    items.length
                        ? `${items.length} registro(s) encontrado(s)`
                        : "Nenhum registro encontrado"
                }
            </div>
            <Button
                basic
                className={"transparent"}
                type={"button"}
                content={"Cancelar"}
                onClick={() => swapPerformer.current.closeModal()}
            />
            <Button
                primary
                disabled={performer === null}
                content={"Aplicar"}
                onClick={() => {
                    setLoading(true);
                    putPeople(route, performer).then(() => {
                        swapPerformer.current.closeModal();
                        setLoading(false);
                        refresh();
                    });
                }}
            />
        </Fragment>
    ), [performer, items]);

    return (
        <Fragment>
            <Dropdown
                pointing='top left'
                trigger={<Icomoon name={'more-vertical link'}/>}
                icon={null}
            >
                <Dropdown.Menu>
                    {
                        people !== null ?
                            <Fragment>
                                <Dropdown.Header content={"Usuários"}/>

                                {/*<PopupChildren*/}
                                {/*    trigger={<Dropdown.Item text={"Dados do usuário"}/>}*/}
                                {/*    // handleToggle={toggle => setChildren(toggle)}*/}
                                {/*    content={<DataUSer users={user}/>}*/}
                                {/*/>*/}

                                <Dropdown.Item
                                    onClick={() => {
                                        hierarchy.current.openModal();
                                    }}
                                    text={"Dados da hierarquia"}
                                />

                                {
                                    !published &&
                                    <Fragment>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item
                                            onClick={async () => {
                                                await swapPerformer.current.openModal();
                                                // handlePerformer();
                                                // noinspection JSIgnoredPromiseFromCall
                                                await handlePeople();
                                                setPerformer(null);
                                            }}
                                            text={"Trocar executor"}
                                        />
                                        <Dropdown.Item
                                            onClick={() => {
                                                removerPerformer.current.openModal();
                                            }}
                                            text={"Remover executor"}
                                        />
                                    </Fragment>
                                }
                            </Fragment> :

                            (route.temporary && <Fragment>
                                <Dropdown.Item
                                    onClick={async () => {
                                        await swapPerformer.current.openModal();
                                        // handlePerformer();
                                        // noinspection JSIgnoredPromiseFromCall
                                        await handlePeople();
                                        setPerformer(null);
                                    }}
                                    text={"Vincular executor"}
                                />
                            </Fragment>)

                    }
                </Dropdown.Menu>
            </Dropdown>

            <Modal ref={removerPerformer} size={'mini'}>
                <Confirm
                    title={'Remover Executor'}
                    description={'Ao confirmar essa ação a rota passará a não ter mais um executor, você confirma?'}
                    onCancel={() => removerPerformer.current.closeModal()}
                    onConfirm={() => putPeople(route)}
                    onSuccess={() => refresh()}
                    confirmButton={'Sim, confirmo'}
                />
            </Modal>

            <Modal
                menu
                ref={swapPerformer}
                title={`${people ? "Trocar" : "Vincular"} Executor`}
                size={'tiny'}
                footer={Footer}
                loading={loading}
            >
                <Menu>
                    <Menu.Item style={{flexGrow: 1}}>
                        <Input
                            fluid
                            autoFocus
                            transparent
                            placeholder={'Buscar'}
                            icon={
                                <Icomoon
                                    link
                                    name={'search'}
                                    onClick={() => handlePeople()}
                                />
                            }
                            onChange={e => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handlePeople()}
                        />
                    </Menu.Item>
                    <GroupCheckboxPopup
                        basic
                        options={options}
                        style={{borderRadius: 0}}
                    />
                </Menu>
                <div style={{height: 230, overflow: "auto"}}>
                    {
                        isEmpty(items)
                            ? <Empty/>
                            : <ListWrapper divided relaxed={"very"}>
                                {
                                    items.map((o, i) => (
                                        <ListItem
                                            key={i}
                                            item={o}
                                            checked={performer}
                                            setPerformer={setPerformer}
                                        />
                                    ))
                                }
                            </ListWrapper>
                    }
                </div>
            </Modal>

            <Modal
                menu
                ref={hierarchy}
                title={"Dados da Hierarquia"}
                size={'tiny'}
            >
                <HierarchyStructure people_id={people}/>
            </Modal>

            {/*<TeamInformation ref={team}/>*/}
        </Fragment>
    )
};

NavigationUser.propTypes = {
    people: PropTypes.number,
    type: PropTypes.number,
    route: PropTypes.object,
    refresh: PropTypes.func,
    published: PropTypes.bool
};

NavigationUser.defaultProps = {
    route: {},
    refresh: (() => {
    }),
    published: false
};

// const mapStateToProps = (state) => ({
//     enrollment_id: state.Users.content.result.data.user && state.Users.content.result.data.user.id
// });

const mapStateToProps = (state) => {

    const user = state.Users.content.result.data.user || {};
    const enrollment_id = user.id || null;
    const contractor = user.contractor || {}
    const params = contractor.params || [];

    const without_hierarchy = find(params, {"key": "without_hierarchy"}, 0) || {value: 0};
    const only_hierarchy = find(params, {"key": "only_hierarchy"}, 0) || {value: 0};

    return {
        enrollment_id,
        "defaultParams": {
            without_hierarchy: parseInt(without_hierarchy.value),
            only_hierarchy: parseInt(only_hierarchy.value),
        }
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getUser,
    putRoutesVersions,
    withoutRoutePeoples
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationUser);
