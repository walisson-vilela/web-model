import * as PropTypes from 'prop-types';
import { createRef, forwardRef, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Checkbox,
  Container,
  Dimmer,
  Dropdown,
  Form,
  List,
  Loader,
  Popup,
  Segment,
  TextArea
} from 'semantic-ui-react';

import { Empty, Icomoon, Modal, ModalBasic, PaginationMW, Search } from '../../../components';
import './stores.css';
import {
  ContentGeneral,
  FooterGeneral,
  Header,
  HeaderGeneral,
  HeaderTitle,
  HeadingFilters,
  ItemSearch,
  OptionsPopup
} from './styles/stores';

import { getRoutesWindowsProgress } from '../../../redux/actions/RoutesWindowsActions';
import { fetchStores } from '../../../redux/actions/StoresActions';

const EventManagerStores = props => {
    const refMaximumNumber = createRef();

    const {
        route,
        verifyChecked,
        selectElements,
        quantity,
        addEvents,
        _day,
        isChecked,
        checkItem,
        handleCancel,
        fetchStores,
        handleStores,
        getRoutesWindowsProgress
    } = props;

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});
    const [stores, setStores] = useState({data: []});
    const [onlyGroup, setOnlyGroup] = useState(true);
    const [onlyUnpaid, setOnlyUnpaid] = useState(false);
    const [tradeStore, setTradeStore] = useState(false);
    const [defaultParams, setDefaultParams] = useState({});
    const [progress, setProgress] = useState(false);

    const handleFilter = async value => {
        await setParams(value);
        await handleFetchStores();
    };

    const handlePageChange = async param => {
        await setStores({data: []});
        await handleStores({data: []});
        await handleFetchStores(param);
    };

    const handleFetchStores = async (param = {}) => {
        // await console.log('handleFetchStores', params);
        await setLoading(true);

        try {
            const result = await fetchStores({...param, ...params, ...defaultParams});

            await setStores(result);
            await handleStores(result);
            await setLoading(false);
        } catch (e) {
            await setLoading(false);
            console.error(e);
        }
    };

    /**
     * Toggle Trade Store
     */
    const handleTradeStore = async (value = false) => {
        if (value === true) {
            await setOnlyGroup(false);
            await setOnlyUnpaid(false);
            await setTradeStore(true);
        } else {
            setTradeStore(false);
        }
    };

    const handleSearch = async (param) => {
        return await fetchStores({...param, ...defaultParams});
    };

    useEffect(() => {
        let def = {};

        if (onlyGroup) {
            def = {zone_id: route.data.route.zone_id};
            setTradeStore(false);
        }

        if (onlyUnpaid) {
            def = {...defaultParams, unattended: 1};
            setTradeStore(false);
        }

        if (tradeStore) {
            def = {...defaultParams, without_hierarchy: 1}
        }

        setDefaultParams(def);
    }, [onlyGroup, onlyUnpaid, tradeStore]);

    useEffect(() => {
        const handleProgress = async () => {
            const response = await getRoutesWindowsProgress();
            const {status} = response;

            await setProgress(status);
        };

        // noinspection JSIgnoredPromiseFromCall
        handleProgress();
    }, []);

    return (
        <Fragment>
            <Segment basic className={'stores-events'} loading={loading}>
                <Header>
                    <HeaderTitle>
                        <div>
                            <Icomoon name={'chevron-left link'} onClick={() => handleCancel()}/>
                        </div>
                        <div>
                            <h3>Gerenciador de Eventos</h3>
                            <p>{route.data.route.name}</p>
                        </div>
                    </HeaderTitle>
                    <div>
                        <Popup basic on={'click'} trigger={<Icomoon name={'more-vertical link'}/>}
                               position={'bottom right'}>
                            <OptionsPopup>
                                <Dimmer inverted active={false}>
                                    <Loader inverted/>
                                </Dimmer>

                                {
                                    progress &&
                                    <div>
                                        <Checkbox toggle label={'Exibir somente pontos do grupo'}
                                                  onChange={(e, {checked}) => setOnlyGroup(checked)} checked={onlyGroup}/>
                                    </div>
                                }

                                <div>
                                    <Checkbox toggle label={'Exibir somente pontos sem atendimento'}
                                              onChange={(e, {checked}) => setOnlyUnpaid(checked)} checked={onlyUnpaid}/>
                                </div>

                                <div>
                                    <Checkbox
                                        toggle
                                        label={'Loja sem vínculo de trade'}
                                        onChange={(e, {checked}) => handleTradeStore(checked)}
                                        checked={tradeStore}
                                    />
                                </div>
                            </OptionsPopup>
                        </Popup>
                    </div>
                </Header>
                <HeaderFilters stores={handleSearch} handleFilter={handleFilter}/>
                <Container fluid className={'p-0'}>
                    {
                        stores.data.length > 0 &&
                        <Fragment>
                            <Form className={'form-select-all-stores'}>
                                <Form.Group>
                                    <Form.Checkbox label={'Selecionar todos'} checked={verifyChecked}
                                                   onClick={() => selectElements()}/>
                                    {
                                        quantity.checked !== 0 &&
                                        <Form.Button color={'green'} onClick={addEvents}>Adicionar</Form.Button>
                                    }
                                </Form.Group>
                            </Form>
                            <List divided relaxed>
                                {
                                    stores.data.map((row, index) => {
                                        return <ListLocal day={_day} isChecked={isChecked} checkItem={checkItem}
                                                          item={row} key={index} index={index} quantity={quantity()}
                                                          refMaximumNumber={refMaximumNumber} conflict={route}
                                                          zone_id={route.data.route.zone_id}/>
                                    })
                                }
                            </List>
                            <PaginationMW
                                transparent
                                size={'mini'}
                                pagination={stores.pagination}
                                onPageChange={page => handlePageChange(page)}
                                onLimitChange={limit => handlePageChange({limit})}
                            />
                        </Fragment>
                    }
                    {
                        stores.data.length <= 0 &&
                        <Empty
                            title={'Não há dados para exibição'}
                            description={'Utilize os campos acima para encontrar e adicionar pontos de atendimento'}
                            image={''}
                            className={'empty__white'}
                        />
                    }
                </Container>
            </Segment>

            <MaximumNumber ref={refMaximumNumber}/>
        </Fragment>
    )
};

const HeaderFilters = ({stores, handleFilter}) => {
    const refGeneral = createRef();

    const optionsSearch = [
        {key: 0, text: 'Geral', value: 0},
        {key: 1, text: 'PDA', value: 1},
        {key: 2, text: 'Código', value: 2}
    ];
    const optionsFilter = [
        {key: 0, text: 'ID GIV', value: 0},
        {key: 1, text: 'CNPJ', value: 1},
        {key: 2, text: 'Código do Cliente', value: 2}
    ];

    const [dropdown, setDropdown] = useState(0);
    const [filter, setFilter] = useState(0);
    const [code, setCode] = useState('');

    const contextRef = createRef();

    useEffect(() => {
        if (dropdown === 2) {
            refGeneral.current.openModal();
        }
    }, [dropdown]);

    const handleSearch = search => {
        switch (dropdown) {
            case 0:
                return stores({general: search});
            case 1:
                return stores({pda: search});
            case 2:
                return stores({code: search});
            default:
                return stores({general: search});
        }
    };

    const resultRender = ({company_name, formatted_address, code}) => {
        return (
            <ItemSearch>
                <div>{code} - {company_name}</div>
                <div>{formatted_address}</div>
            </ItemSearch>
        )
    };

    const handleSendObject = async value => {
        switch (dropdown) {
            case 0:
                await handleFilter({general: value.name});
                break;
            case 1:
                await handleFilter({pda: value.name});
                break;
            default:
                await handleFilter({general: value.name});
                break;
        }
    };

    const handleCloseGeneral = async (closed = false) => {
        if (closed === true) {
            await refGeneral.current.closeModal();
        }

        await setCode('');
        await setFilter(0);
        await setDropdown(0);
    };

    const handleSubmitGeneral = async () => {
        switch (filter) {
            case 0:
                await refGeneral.current.closeModal();
                await handleFilter({id: code});
                await handleCloseGeneral();
                break;
            case 1:
                await refGeneral.current.closeModal();
                await handleFilter({document: code});
                await handleCloseGeneral();
                break;
            case 2:
                await refGeneral.current.closeModal();
                await handleFilter({code: code});
                await handleCloseGeneral();
                break;
            default:
                await refGeneral.current.closeModal();
                await handleFilter({id: code});
                await handleCloseGeneral();
                break;
        }
    };

    return (
        <Fragment>
            <HeadingFilters ref={contextRef}>
                <Dropdown selection options={optionsSearch} value={dropdown}
                          onChange={(e, {value}) => setDropdown(value)}/>
                <Search
                    transparent
                    fluid
                    onChange={value => handleSendObject(value)}
                    handleResultSelect={handleSearch}
                    resultRenderer={resultRender}
                    maxLength={4}
                    title={'company_name'}
                />
            </HeadingFilters>

            <Modal ref={refGeneral} size={'small'}>
                <ContentGeneral>
                    <HeaderGeneral>
                        <div>Defina o tipo de código a ser inserido</div>
                        <Dropdown
                            inline
                            options={optionsFilter}
                            defaultValue={optionsFilter[0].value}
                            onChange={(e, {value}) => setFilter(value)}
                        />
                    </HeaderGeneral>
                    <Form>
                        <TextArea placeholder={'Informe o código...'} value={code}
                                  onChange={(e, {value}) => setCode(value)}/>
                    </Form>
                    <FooterGeneral>
                        <Button
                            content={'Cancelar'}
                            className={'text-underline bg-transparent'}
                            onClick={() => handleCloseGeneral(true)}
                        />

                        <Button
                            basic
                            content={'Aplicar'}
                            color={'blue'}
                            onClick={() => handleSubmitGeneral()}
                            disabled={(code === '')}
                        />
                    </FooterGeneral>
                </ContentGeneral>
            </Modal>
        </Fragment>
    )
};

const ListLocal = props => {

    const item = {
        store_id: props.item.id,
        store_code: props.item.code,
        company_name: props.item.company_name,
        name: props.item.name,
        formated_adrress: props.item.formatted_address,
        document: props.item.document,
        start_time: '00:00',
        end_time: '00:00',
        duration: '00:00',
        extra_time: '00:00',
        time_total: '00:00',
        distance: '0.0',
        time_trip: '00:00',
        time_attendance_avg: props.item.time_attendance_avg,
        zone_id: props.item.zone_id,
        zone_name: props.item.zone_name,
        _interval: {
            type: 'unique',
            every: 1,
            days: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            start: props.day,
            endBy: 'occorrs',
            endEvents: 0,
            endDate: '',
            dates: []
        }
    };
    const {refMaximumNumber} = props;

    const quantity = parseInt(props.quantity.checked + props.quantity.selected);
    const isCheck = props.isChecked(props.item.id);

    return (
        <List.Item key={props.index} className={'list-store-item'} style={{display: 'table'}}>
            <List.Content floated={'left'} verticalAlign={'middle'}>
                <Form.Checkbox
                    checked={isCheck.success}
                    onClick={() => (quantity < 100) ? props.checkItem(item) : refMaximumNumber.current.openModal()}
                />
            </List.Content>
            <List.Content>
                <List.Header>
                    {props.item.name}
                </List.Header>
                <List.Description>
                    {props.item.formatted_address}
                    <div>
                        <span>
                            ID GIV: {props.item.id} | Código Interno: {props.item.code}
                        </span>
                        {/*{*/}
                        {/*    parseInt(props.item.zone_id) !== parseInt(props.zone_id) &&*/}
                        {/*    <Label>*/}
                        {/*        <Label circular color={'yellow'} empty/> {props.item.zone_name}*/}
                        {/*    </Label>*/}
                        {/*}*/}
                    </div>
                </List.Description>
            </List.Content>
        </List.Item>
    )
};

const MaximumNumber = forwardRef((props, ref) => (
    <ModalBasic
        ref={ref}
        size={'mini'}
        textAlign={'center'}
        title={'Você atingiu o número máximo de pontos!'}
        subheader={
            <div className={'mt-1'}>
                Você não pode selecionar mais pontos! <br/>
                (Limite: 100 pontos)
            </div>
        }
    />
));

EventManagerStores.propsTypes = {
    route: PropTypes.object,
    verifyChecked: PropTypes.bool,
    _day: PropTypes.string,
    quantity: PropTypes.func,
    addEvents: PropTypes.func,
    checkItem: PropTypes.func,
    isChecked: PropTypes.func,
    selectElements: PropTypes.func,
    handleCancel: PropTypes.func,
    handleStores: PropTypes.func,
};

EventManagerStores.defaultProps = {
    route: {},
    verifyChecked: false,
    _day: '',
    quantity: (() => {
    }),
    addEvents: (() => {
    }),
    checkItem: (() => {
    }),
    isChecked: (() => {
    }),
    selectElements: (() => {
    }),
    handleCancel: (() => {
    }),
    handleStores: (() => {
    }),
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStores,
    getRoutesWindowsProgress
}, dispatch);

export default connect(undefined, mapDispatchToProps)(EventManagerStores);
