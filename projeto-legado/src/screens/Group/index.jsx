import { isEmpty, isUndefined } from 'lodash';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Table } from 'semantic-ui-react';

import {
    deleteContractorGroup,
    fetchContractorGroup,
    postContractorGroup,
    putContractorGroup
} from '../../redux/actions/ContractorsActions';

import { Icomoon, Label, Manager } from '../../components';
import { dateGet } from '../../utils/DateTime';
import { CreateGroup, DeleteGroup, InactivateGroup } from './Components';
import { GroupAccount } from './style';

function Group(props) {
    const {
        location,
        setTitle,
        fetchContractorGroup,
        postContractorGroup,
        putContractorGroup,
        deleteContractorGroup,
        contractor
    } = props;

    const modalRef = createRef();
    const inactivateRef = createRef();
    const deleteRef = createRef();

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState({});
    const [filters, setFilters] = useState({});

    /**
     * search data in API
     *
     * @returns {Promise<void>}
     */
    const handleFetchData = async () => {
        await setLoading(true);

        try {
            const request = await fetchContractorGroup(contractor, {...filters});
            await setGroups(request);
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoading(false);
        }
    };

    /**
     * store filters in state for API query
     *
     * @param params
     * @returns {Promise<void>}
     */
    const handlePageFilters = async (params) => {
        await setFilters({...filters, ...params});
    };

    /**
     * render header table
     */
    const hadleHeaderTable = () => {
        return (
            <Fragment>
                <Table.HeaderCell content={'ID'} style={{width: '80px'}}/>
                <Table.HeaderCell content={'Criado em'} style={{width: '110px'}}/>
                <Table.HeaderCell content={'Status'} style={{width: '90px'}}/>
                <Table.HeaderCell content={'Criado por'}/>
                <Table.HeaderCell content={'Nome do Grupo'}/>
                <Table.HeaderCell content={'Contas'}/>
            </Fragment>
        )
    };

    /**
     * render body table
     *
     * @param row
     */
    const handleBodyTable = (row) => {
        const {id, detail, subcontractors} = row;
        const {created_by_user} = detail;

        return (
            <Fragment>
                <Table.Cell content={id}/>
                <Table.Cell content={dateGet(detail.created_at, 'DD/MM/YYYY')}/>
                <Table.Cell content={
                    <Label
                        circular
                        empty
                        color={detail.active === 1 ? 'green' : 'red'}
                        content={detail.active === 1 ? 'Ativo' : 'Inativo'}
                        size={'mini'}
                    />
                }
                />
                <Table.Cell content={created_by_user.name}/>
                <Table.Cell content={row.detail.name}/>
                <Table.Cell style={{overflow: 'unset'}}>
                    <GroupAccount>
                        <p>Contas ({subcontractors})</p>

                        <Dropdown icon={<Icomoon link name={'more-vertical'}/>} direction={'left'}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => inactivateRef.current.handleToggleModal({
                                        id,
                                        name: row.detail.name,
                                        active: Boolean(detail.active === 1)
                                    })}
                                    content={detail.active === 1 ? 'Inativar Grupo' : 'Ativar Grupo'}
                                />

                                <Dropdown.Item
                                    onClick={() => modalRef.current.handleToggleModal({
                                        id,
                                        name: row.detail.name
                                    })}
                                    content={'Editar'}
                                />

                                <Dropdown.Item
                                    onClick={() => deleteRef.current.handleToggleModal({
                                        id,
                                        name: row.detail.name
                                    })}
                                    content={'Excluir'}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </GroupAccount>
                </Table.Cell>
            </Fragment>
        )
    };

    /**
     * render filters in header table
     */
    const handleFiltersHeader = () => {
        const active = isUndefined(filters.sort) ? false : filters.sort;

        return (
            <Dropdown text={'Ordenar'} item>
                <Dropdown.Menu>
                    <Dropdown.Header content={'Ordenar por'}/>
                    <Dropdown.Divider/>
                    <Dropdown.Item
                        onClick={() => handlePageFilters({direction: 'ASC', sort: undefined})}
                        content={'A/Z'}
                        active={active === false && filters.direction === 'ASC'}
                    />
                    <Dropdown.Item
                        onClick={() => handlePageFilters({sort: 'Details.created_at'})}
                        content={'Recentes'}
                        active={active === 'Details.created_at'}
                    />
                    <Dropdown.Item active={active === 'Details.active'}>
                        <Dropdown text={'Status'}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => handlePageFilters({sort: 'Details.active', direction: 'DESC'})}
                                    content={<Label empty circular color={'green'} content={'Ativo'}/>}
                                    active={active === 'Details.active' && filters.direction === 'DESC'}
                                />
                                <Dropdown.Item
                                    onClick={() => handlePageFilters({sort: 'Details.active', direction: 'ASC'})}
                                    content={<Label empty circular color={'red'} content={'Inativo'}/>}
                                    active={active === 'Details.active' && filters.direction === 'ASC'}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };

    /**
     * perform functions that must be started in component building
     *
     * @returns {Promise<void>}
     */
    const handleComponentDidMount = async () => {
        // seta title in tab
        await setTitle(location.pathname, 'Gerenciador de Grupos');

        // search data
        await handleFetchData();
    };

    /**
     * create or update group
     *
     * @param params
     * @returns {Promise<void>}
     */
    const handleCreateOrUpdateGroup = async (params) => {
        if (isUndefined(params.id)) {
            await postContractorGroup(contractor, params)
        } else {
            const id = params.id;
            delete params.id;

            await putContractorGroup(contractor, id, params);
        }
    };

    /**
     * remove group
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleRemoveGroup = async (id) => {
        try {
            await deleteContractorGroup(contractor, id);
            await handleFetchData();
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * toggle active group
     *
     * @param params
     * @returns {Promise<void>}
     */
    const handleToggleActiveGroup = async (params) => {
        const {id, active} = params;

        try {
            await putContractorGroup(contractor, id, {active: Number(!active)});
            await handleFetchData();
        } catch (e) {
            await console.log(e);
        }
    };

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        if (contractor !== 0) {
            // noinspection JSIgnoredPromiseFromCall
            handleComponentDidMount();
        }
    }, [contractor]);

    /**
     * search the API when filters variable is modified and not empty
     */
    useEffect(() => {
        if (!isEmpty(filters)) {
            // noinspection JSIgnoredPromiseFromCall
            handleFetchData();
        }
    }, [filters]);

    return (
        <Fragment>
            <Manager
                table={'Group'}
                header={'Gerenciador de Grupos'}
                subheader={'Crie e gerencie seus grupos'}
                isLoading={loading}
                result={groups}
                onPageChange={(params) => handlePageFilters(params)}
                headerRow={hadleHeaderTable()}
                renderBodyRow={(body) => handleBodyTable(body)}
                onFiltersToolbar={handleFiltersHeader()}
                crud={{
                    refresh: () => handleFetchData(),
                    add: () => modalRef.current.handleToggleModal()
                }}
                label={{
                    add: 'Novo Grupo'
                }}
            />

            <CreateGroup
                ref={modalRef}
                onSubmit={(params) => handleCreateOrUpdateGroup(params)}
                onRefresh={() => handleFetchData()}
                contractor={contractor}
            />

            <InactivateGroup
                ref={inactivateRef}
                onSubmit={(params) => handleToggleActiveGroup(params)}
            />

            <DeleteGroup
                ref={deleteRef}
                onSubmit={(id) => handleRemoveGroup(id)}
            />
        </Fragment>
    );
}

const mapsStateToProps = state => {

    let contractor = 0;

    if(
        !isUndefined(state.Users.content)
        && !isUndefined(state.Users.content.result)
        && !isUndefined(state.Users.content.result.data)
        && !isUndefined(state.Users.content.result.data.user)
        && !isUndefined(state.Users.content.result.data.user.contractor)
    ){
        contractor = state.Users.content.result.data.user.contractor.id;
    }

    return {
        contractor
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchContractorGroup,
    postContractorGroup,
    putContractorGroup,
    deleteContractorGroup
}, dispatch);

export default connect(mapsStateToProps, mapDispatchToProps)(Group);
