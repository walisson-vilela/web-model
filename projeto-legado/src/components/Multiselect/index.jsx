import { findIndex, isEmpty, isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-semantic-toasts';

import { Button, Checkbox, Dimmer, Dropdown, Input, Loader, Modal, Popup } from 'semantic-ui-react';
import { Icomoon, PaginationMW } from '..';
import { FiltersOptions } from "../../screens/Routes/components";
import { Column, Container, Content, ContentPopup, Header, Item } from './style';

const columnRef = createRef();
const inputRef = createRef();

class Multiselect extends Component {
    /**
     * Constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loading: false,
            isLoading: false,
            notified: false,
            isChildren: {},
            query: {},
            api: {
                data: [],
                pagination: {}
            },
            starter: [],
            text: '',
            body: '',
            ids: [],
            temp: '',
            news: [],
            checkeds: [],
            removed: [],
            active: {},
            childrens: []
        }
    }

    /**
     * Toggle modal.
     *
     * @returns {Promise<void>}
     */
    toggleModal = async (query = {}) => {
        const {open} = this.state;
        const {header} = this.props;

        await this.setState({
            open: !open,
            query
        });

        if (!open) {

            await this.setState({
                text: header[0].text,
                body: header[0].key
            });

            await this.handleFetchData();
            await this.handleGetCheckeds();
        } else {

            await this.setState({
                api: {
                    data: [],
                    pagination: {}
                },
                starter: [],
                ids: [],
                news: [],
                removed: [],
                checkeds: [],
                temp: '',
                query: {},
                q: ''
            });
        }
    };

    /**
     * Faz requisição de dados na API.
     *
     * @param params
     * @returns {Promise<void>}
     */
    handleFetchData = async (params = {}) => {

        const {body, temp, active} = this.state;
        const {search} = this.props;

        let defaultParams;

        if (!isEmpty(temp)) {
            defaultParams = {[search]: temp};
        }

        await this.setState({
            loading: true,
            api: {
                data: [],
                pagination: {}
            }
        });

        columnRef.current.scrollTop = 0;

        try {
            const response = await this.props.header[body].data({...defaultParams, ...params, ...active});
            await this.setState({api: response});
        } catch (e) {
            await console.log(e);
        }

        await this.setState({loading: false});
    };

    /**
     * Busca dados da API já selecionados.
     *
     * @returns {Promise<void>}
     */
    handleGetCheckeds = async () => {
        const params = {...this.state.query};

        await this.setState({isLoading: true});

        try {
            const response = await this.props.getStarter(params);
            await this.setState({starter: response.data});
        } catch (e) {
            await console.log(e);
        }

        await this.setState({isLoading: false});
    };

    /**
     * Executa ação de acordo com opção selecionada.
     * Troca text ativo.
     *
     * @param index
     * @returns {Promise<void>}
     */
    handleChangeDropdown = async (index) => {
        const {header} = this.props;
        const ob = header[index];

        await this.setState({
            loading: true,
            notified: false,
            text: ob.text,
            body: index,
            starter: [],
            ids: [],
            news: [],
            checkeds: [],
            removed: []
        });

        try {
            const response = await ob.data();
            await this.setState({api: response});
        } catch (e) {
            await console.log(e);
        }

        await this.setState({loading: false});
    };

    /**
     * Toggle Checkbox.
     *
     * @param key
     * @returns {Promise<void>}
     */
    toggleCheckbox = async (key) => {
        const {starter, ids, news} = this.state;
        const {uniqueFrom, uniqueTo} = this.props;
        const index = await findIndex(ids, id => id[uniqueTo] === key[uniqueTo]);
        const indexNews = await findIndex(news, n => n[uniqueTo] === key[uniqueTo]);

        // Verifica se o item já não foi adicionado.
        if (indexNews === -1) {
            let records = [...ids];

            if (index === -1) {
                if (await findIndex(starter, start => start[uniqueFrom] === key[uniqueTo]) === -1) {
                    records = [key, ...ids];
                }
            } else {
                records.splice(index, 1);
            }

            await this.setState({ids: records});
        }
    };

    /**
     * Verifica se o objeto foi selecionado ou existe na lista vinda da API.
     *
     * @param key
     * @returns {boolean}
     */
    handleChecked = (key) => {
        const {uniqueTo, uniqueFrom} = this.props;
        const {starter, news, ids} = this.state;

        return Boolean(
            (findIndex(starter, start => start[uniqueFrom] === key[uniqueTo]) !== -1) ||
            (findIndex(ids, id => id[uniqueTo] === key[uniqueTo]) !== -1) ||
            (findIndex(news, n => n[uniqueTo] === key[uniqueTo]) !== -1)
        )
    };

    /**
     * Realiza contagem de itens já selecionados.
     *
     * @returns {{count: *, checked: *}}
     */
    confirmCheckbox = () => {
        const {api, ids, news} = this.state;
        const {uniqueTo} = this.props;

        const records = api.data.filter(record => {
            if (
                findIndex(ids, id => id[uniqueTo] === record[uniqueTo]) !== -1 ||
                findIndex(news, n => n[uniqueTo] === record[uniqueTo]) !== -1
            ) {
                return record
            }

            return false;
        });

        return {
            checked: Boolean(api.data.length === records.length),
            count: records.length
        };
    };

    /**
     * Seleciona todos os elementos disponíveis.
     *
     * @param checked
     * @returns {Promise<void>}
     */
    toggleCheckAll = async (checked) => {
        const {uniqueTo, uniqueFrom} = this.props;
        const {ids, starter, api, news} = this.state;
        const {data} = api;

        if (checked) {
            const records = data.map(record => {
                if (Boolean(
                    findIndex(ids, id => id[uniqueTo] === record[uniqueTo]) === -1 &&
                    findIndex(starter, start => start[uniqueFrom] === record[uniqueTo]) === -1 &&
                    findIndex(news, n => n[uniqueTo] === record[uniqueTo]) === -1)) {
                    return record;
                }

                return false;
            });

            await this.setState({
                ids: [...records.filter(Boolean), ...ids]
            });
        } else {
            const records = [...ids].filter(id => {
                if (findIndex(data, record => record[uniqueTo] === id[uniqueTo]) === -1) {
                    return id;
                }

                return false;
            });

            await this.setState({ids: records.filter(Boolean)});
        }
    };

    /**
     * Seta parametro de busca temporária no state local.
     *
     * @param temp
     * @returns {Promise<void>}
     */
    setSearch = async (temp) => {
        await this.setState({temp});
    };

    /**
     * Realiza busca na API.
     *
     * @returns {Promise<void>}
     */
    handleParamSearch = async () => {
        const {temp} = this.state;
        const {search} = this.props;

        await this.handleFetchData({[search]: temp});
    };

    /**
     * Paginação de resultados.
     *
     * @param params
     * @returns {Promise<void>}
     */
    handlePageChange = async (params) => {
        await this.handleFetchData(params);
    };

    /**
     * Altera quantidade de registros para paginação.
     *
     * @param limit
     * @returns {Promise<void>}
     */
    handleLimitPaginationChange = async (limit) => {
        await this.handleFetchData({limit});
    };

    /**
     * Adiciona itens selecionados no state local.
     *
     * @returns {Promise<void>}
     */
    handleSetNew = async () => {
        await this.setState(prevState => ({
            news: [...prevState.ids, ...prevState.news],
            ids: []
        }))
    };

    /**
     * Filtra resultados já encontrados.
     *
     * @param value
     * @returns {boolean}
     */
    handleFilters = (value) => {
        const {searchFrom, searchTo, uniqueFrom} = this.props;
        const {q} = this.state;
        if (!isUndefined(q) && !isEmpty(q)) {
            if (isUndefined(value[uniqueFrom])) {
                return value[searchTo].toString().toLowerCase().includes(q.toLowerCase())
            } else {
               for(let from of searchFrom){
                   const search = from.split('.');
                   if (search.length > 1) {
                        const [model, key] = search;
                       if(value[model][key].toString().toLowerCase().includes(q.toLowerCase()))
                           return true;
                   } else {
                       if(value[searchFrom].toString().toLowerCase().includes(q.toLowerCase()))
                           return true;
                   }
               }
                return false;

            }
        }

        return true;
    };

    /**
     * Seta dados da pesquisa no state local.
     *
     * @param q
     * @returns {Promise<void>}
     */
    handleSearchQuery = async (q) => {
        await this.setState({q});
    };

    /**
     * Toggle checkbox query.
     *
     * @param key
     * @returns {Promise<void>}
     */
    toggleCheckboxQuery = async (key) => {
        const {checkeds} = this.state;
        const {uniqueTo, uniqueFrom} = this.props;

        let records = [...checkeds];

        if (isUndefined(key[uniqueFrom])) {
            const index = await findIndex(checkeds, check => check[uniqueTo] === key[uniqueTo]);

            if (index === -1) {
                records = [key, ...records];
            } else {
                records.splice(index, 1);
            }
        } else {
            const index = await findIndex(checkeds, check => check[uniqueFrom] === key[uniqueFrom]);

            if (index === -1) {
                records = [key, ...records];
            } else {
                records.splice(index, 1);
            }
        }

        await this.setState({checkeds: records});
    };

    /**
     * Verifica se o objeto foi selecionado.
     *
     * @param key
     * @returns {boolean}
     */
    handleCheckedQuery = (key) => {
        const {uniqueFrom, uniqueTo} = this.props;
        const {checkeds} = this.state;

        let index;

        if (isUndefined(key[uniqueFrom])) {
            index = findIndex(checkeds, checks => checks[uniqueTo] === key[uniqueTo]);
        } else {
            index = findIndex(checkeds, checks => checks[uniqueFrom] === key[uniqueFrom]);
        }

        return Boolean(index !== -1)
    };

    /**
     * Seleciona todos os elementos disponiveis.
     *
     * @param checked
     * @returns {Promise<void>}
     */
    toggleCheckAllQuery = async (checked) => {
        const {uniqueTo, uniqueFrom} = this.props;
        const {news, starter, checkeds} = this.state;
        const allRecords = [...news, ...starter].filter((row) => this.handleFilters(row));

        if (checked) {
            const records = allRecords.map(record => {
                if (isUndefined(record[uniqueFrom])) {
                    const index = findIndex(checkeds, check => check[uniqueTo] === record[uniqueTo]);

                    if (index === -1) {
                        return record
                    } else {
                        return false
                    }
                } else {
                    const index = findIndex(checkeds, check => check[uniqueFrom] === record[uniqueFrom]);

                    if (index === -1) {
                        return record
                    } else {
                        return false
                    }
                }
            });

            await this.setState({
                checkeds: [...records.filter(Boolean), ...checkeds]
            });
        } else {
            await this.setState({checkeds: []});
        }
    };

    /**
     * Remove dados selecionados.
     *
     * @returns {Promise<void>}
     */
    handleRemoveQuery = async () => {
        const {checkeds, starter, removed, news} = this.state;
        const {uniqueFrom, uniqueTo} = this.props;

        let records = [...removed];
        let recordsNews = [...news];
        let recordsStarter = [...starter];

        checkeds.map(async (check) => {
            const indexAPI = findIndex(recordsStarter, start => start[uniqueFrom] === check[uniqueFrom]);
            const indexNew = findIndex(recordsNews, n => n[uniqueTo] === check[uniqueTo]);

            // Verifica se registro veio da API.
            if (indexAPI !== -1) {
                if (findIndex(removed, r => r[uniqueFrom] === check[uniqueFrom]) === -1) {
                    records = [check, ...records]
                }

                recordsStarter.splice(indexAPI, 1);
            } else {
                recordsNews.splice(indexNew, 1);
            }
        });

        await this.setState({
            checkeds: [],
            removed: records,
            news: recordsNews,
            starter: recordsStarter
        });
    };

    /**
     * Centraliza função de aplicar.
     *
     * @returns {Promise<void>}
     */
    handleApplied = async () => {
        const {body, removed, news, query} = this.state;
        const {applied, success} = this.props;

        await this.setState({
            loading: true,
            isLoading: true
        });

        try {
            await applied[body]({news, removed, ...query});
            await this.toggleModal();
            await toast({
                type: 'success',
                title: 'Sucesso!',
                description: success,
                animation: 'bounce',
                time: 5000
            });
        } catch (e) {
            await console.log(e);
            await toast({
                type: 'error',
                title: 'Oops...',
                description: 'Houve um erro ao executar requisição.',
                animation: 'bounce',
                time: 5000
            });
        }

        await this.setState({
            loading: false,
            isLoading: false
        });
    };

    /**
     * Desabilita notificações de perda de dados.
     *
     * @returns {Promise<void>}
     */
    handleDisableNotify = async () => {
        await this.setState({notified: true});
    };

    /**
     * Seta item ativo no state local e executa ação de filtro.
     *
     * @param value
     * @returns {Promise<void>}
     */
    handleSetFilter = async (value) => {

        await this.setState({active: {...value}});
        await this.handleFetchData();
        await inputRef.current.select();
    };

    /**
     * Limpa dados do filtro
     *
     * @returns {Promise<void>}
     */
    handleClearFilter = async () => {

        await this.setState({active: {}});
        await this.handleFetchData();
        await inputRef.current.select();
    };

    /**
     * Search data in API and set result in state local.
     *
     * @param search
     * @param key
     * @param params
     * @returns {Promise<void>}
     */
    handleSetChildrens = async (search, key, params) => {

        await this.setState({isChildren: {key, value: true}});
        await this.handleClearChildrens();

        try {
            const request = await search();
            const childrens = request.data.map((children) => ({
                key: `children-${children[params.key]}`,
                text: children[params.text],
                value: children[params.value]
            }));

            await this.setState({childrens});
        } catch (e) {
            await console.log(e)
        } finally {
            await this.setState({isChildren: {}});
        }
    };

    /**
     * Limpa state childrens ao fechar dropdown.
     *
     * @returns {Promise<void>}
     */
    handleClearChildrens = async () => {
        await this.setState({childrens: []});
    };

    /**
     * Renderiza conteúdo de options.
     *
     * @param option
     * @returns {*}
     */
    handleRenderOptions = option => {
        const {active, isChildren, childrens} = this.state;
        const {key, text, value, search, params} = option;

        if (isUndefined(search)) {
            return (
                <Dropdown.Item
                    key={key}
                    text={text}
                    active={Object.values(active).toString() === value.toString()}
                    onClick={() => this.handleSetFilter({[key]: value})}
                />
            )
        }

        return (
            <Dropdown.Item key={key} active={Object.keys(active).toString() === key.toString()}>
                <Dropdown
                    scrolling
                    text={text}
                    loading={Boolean(!isEmpty(isChildren) && isChildren.key.toString() === key.toString() && isChildren.value === true)}
                    onOpen={() => this.handleSetChildrens(search, key.toString(), params)}
                    onClose={() => this.handleClearChildrens()}
                    disabled={!isEmpty(isChildren)}
                >
                    <Dropdown.Menu>
                        {
                            childrens.map((children) => (
                                <Dropdown.Item
                                    key={children.key}
                                    text={children.text}
                                    active={Object.keys(active).toString() === key.toString() && Object.values(active).toString() === children.value.toString()}
                                    onClick={() => this.handleSetFilter({[key]: children.value})}
                                />
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Dropdown.Item>
        )
    };

    handleFiltersX = async (value) => {

        const {key, id} = value;

        try {

            await this.handleSetFilter({[key]: id});
        } catch (e) {

            console.log(e);
        }

    };

    render() {
        const {open, text, loading, isLoading, api, ids, starter, news, body, checkeds, removed, notified} = this.state;
        const {header, subtitle, size, selectAll, content, activeFilters, countRecords} = this.props;

        const firstCheck = this.confirmCheckbox();
        const rows = [...news, ...starter].filter((row) => this.handleFilters(row));

        return (
            <Modal open={open} size={size}>
                <Container>
                    <Header>
                        {
                            header.length > 1
                                ? <Popup
                                trigger={
                                    <Dropdown text={text} onClick={() => console.log('Teste')}>
                                        <Dropdown.Menu>
                                            {
                                                header
                                                    .filter(option => option.text !== text)
                                                    .map((option, index) => (
                                                        <Dropdown.Item
                                                            key={index}
                                                            content={option.text}
                                                            onClick={() => this.handleChangeDropdown(option.key)}
                                                        />
                                                    ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                header={'Aviso'}
                                content={
                                    <ContentPopup>
                                        Você possui dados que ainda não foram salvos. Caso altere o tipo de registro, todos os dados serão perdidos.
                                        <Button
                                            size={'tiny'}
                                            color={'blue'}
                                            onClick={() => this.handleDisableNotify()}
                                            content={'Ok'}
                                        />
                                    </ContentPopup>
                                }
                                on={'click'}
                                position={'bottom left'}
                                disabled={(notified || (news.length <= 0 && removed.length <= 0))}
                                />
                                : <h3>{text}</h3>
                        }
                        <p>{subtitle}</p>
                    </Header>

                    <Content>
                        <div className={'row__area'}>
                            <div className="row__header">
                                {
                                    selectAll &&
                                    <Checkbox
                                        label={'Selecionar todos'}
                                        onClick={(e, {checked}) => this.toggleCheckAll(checked)}
                                        checked={(api.data.length > 0 && firstCheck.checked)}
                                        indeterminate={Boolean(firstCheck.count > 0 && !firstCheck.checked)}
                                    />
                                }

                                <Input
                                    transparent
                                    ref={inputRef}
                                    placeholder={'Pesquisar...'}
                                    icon={<Icomoon name={'search link'} onClick={() => this.handleParamSearch()}/>}
                                    onChange={(e, {value}) => this.setSearch(value)}
                                    onKeyPress={(e) => Boolean(e.key === 'Enter') && this.handleParamSearch()}
                                />

                                <FiltersOptions
                                    filters={value => this.handleFiltersX(value)}
                                    clearFilters={this.handleClearFilter}
                                    options={activeFilters}
                                />

                            </div>
                            <Column ref={columnRef}>
                                {
                                    isEmpty(api.data)
                                        ? <div className="div__empty">
                                            <h5>Até o momento não há dados para exibição.</h5>
                                            <p>Utilize o campo acima e faça uma pesquisa.</p>
                                        </div>
                                        : api.data.map((record, index) => {
                                            const check = this.handleChecked(record);

                                            return (
                                                <Item key={index} disable={check}>
                                                    <Checkbox
                                                        onClick={() => this.toggleCheckbox(record)}
                                                        checked={check}
                                                        disabled={check}
                                                    />
                                                    <div className="row__children"
                                                         onClick={() => this.toggleCheckbox(record)}>
                                                        {
                                                            content[body](record)
                                                        }
                                                    </div>
                                                </Item>
                                            )
                                        })
                                }
                            </Column>

                            {
                                !isEmpty(api.pagination) &&
                                <div className="row__pagination">
                                    <PaginationMW
                                        pagination={api.pagination}
                                        onPageChange={param => this.handlePageChange(param)}
                                        onLimitChange={limit => this.handleLimitPaginationChange(limit)}
                                    />
                                </div>
                            }



                            <div className="row__footer">
                                <Button
                                    basic
                                    color={'blue'}
                                    disabled={isEmpty(ids)}
                                    content={'Adicionar'}
                                    onClick={() => this.handleSetNew()}
                                />
                            </div>

                            <Dimmer inverted active={loading}>
                                <Loader inverted/>
                            </Dimmer>
                        </div>
                        <div className={'row__area'}>
                            <div className="row__header">
                                {
                                    selectAll &&
                                    <Checkbox
                                        label={'Selecionar todos'}
                                        onClick={(e, {checked}) => this.toggleCheckAllQuery(checked)}
                                        checked={(rows.length === checkeds.length && (rows.length > 0 || checkeds.length > 0))}
                                        indeterminate={Boolean(checkeds.length > 0 && rows.length !== checkeds.length)}
                                    />
                                }

                                <div>
                                    <Button disabled={(checkeds.length === 0)} onClick={() => this.handleRemoveQuery()}>
                                        <Icomoon
                                            name={'trash-2 link'}
                                        />
                                    </Button>
                                </div>

                                <Input
                                    transparent
                                    placeholder={'Pesquisar...'}
                                    icon={<Icomoon name={'search link'}/>}
                                    onChange={(e, {value}) => this.handleSearchQuery(value)}
                                />
                            </div>
                            <Column>
                                {
                                    isEmpty(rows)
                                        ? <div className="div__empty">
                                            <h5>Até o momento não foi selecionado dados.</h5>
                                            <p>Para adicionar, utilize o campo ao lado e faça edição.</p>
                                        </div>
                                        : <Fragment>
                                            {
                                                rows.map((record, index) => (
                                                    <Item key={`new ${index}`}>
                                                        <Checkbox
                                                            onClick={() => this.toggleCheckboxQuery(record)}
                                                            checked={this.handleCheckedQuery(record)}
                                                        />
                                                        <div className="row__children"
                                                             onClick={() => this.toggleCheckboxQuery(record)}>
                                                            {
                                                                content[body](record)
                                                            }
                                                        </div>
                                                    </Item>
                                                ))
                                            }
                                        </Fragment>
                                }
                                <Dimmer inverted active={isLoading}>
                                    <Loader inverted/>
                                </Dimmer>
                            </Column>

                            {
                                countRecords &&
                                <div className="row__records">
                                    { news.length + starter.length } Registros
                                </div>
                            }
                            <div className="row__footer">
                                <Button
                                    className={'bg-transparent text-underline'}
                                    onClick={() => this.toggleModal()}
                                    content={'Cancelar'}
                                />
                                <Button
                                    basic
                                    color={'green'}
                                    content={'Aplicar'}
                                    disabled={(news.length <= 0 && removed.length <= 0)}
                                    onClick={() => this.handleApplied()}
                                />
                            </div>
                        </div>
                    </Content>
                </Container>
            </Modal>
        )
    }
}

Multiselect.propTypes = {
    content: PropTypes.object.isRequired,
    header: PropTypes.array.isRequired,
    getStarter: PropTypes.func.isRequired,
    applied: PropTypes.object.isRequired,
    subtitle: PropTypes.string,
    selectAll: PropTypes.bool,
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge']),
    uniqueFrom: PropTypes.string,
    uniqueTo: PropTypes.string,
    searchFrom: PropTypes.array,
    searchTo: PropTypes.string,
    filters: PropTypes.array,
    activeFilters: PropTypes.array,
    success: PropTypes.string,
    scrolling: PropTypes.bool,
};

Multiselect.defaultProps = {
    selectAll: true,
    countRecords: false,
    subtitle: '',
    size: 'large',
    uniqueFrom: 'id',
    uniqueTo: 'id',
    searchFrom: ['name'],
    searchTo: 'name',
    filters: [],
    activeFilters: [],
    success: 'Requisição realizada com sucesso!',
    scrolling: false
};

export default connect(undefined, undefined, undefined, {forwardRef: true})(Multiselect);
