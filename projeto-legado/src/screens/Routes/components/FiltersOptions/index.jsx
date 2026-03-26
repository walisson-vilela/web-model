import { debounce, isEmpty, isNull, isUndefined } from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dimmer, Form, Header, Input, List, Loader, Menu, Popup } from 'semantic-ui-react';

import { fetchMarkets } from '../../../../redux/actions/MarketsActions';
import { fetchProfiles } from '../../../../redux/actions/ProfilesActions';
import { fetchRegion } from '../../../../redux/actions/RegionActions';
import { fetchStores } from '../../../../redux/actions/StoresActions';

import { Empty, Icomoon } from '../../../../components';
import { Container, ContainerItem, ContainerRange, ContentEmpty, GroupInputRange, PointService } from './style';

const Option = ({title, handleToggle, fetchData, handleBody, handleSelect, params = 'q', offset = 0}) => {
    const [active, setActive] = useState(null);
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        !isNull(active) && handleFetchData();
    }, [active]);

    useEffect(() => {
        !isEmpty(search) && handleFetchData({[params]: search})
    }, [search]);

    const handleFetchData = param => {
        setLoading(true);
        setRecords([]);
        fetchData({...param, limit: 100}).then(({data}) => {
            setLoading(false);
            setRecords(data);
        }).catch(() => setLoading(false))
    };

    const handleSearch = debounce((search) => setSearch(search), 1000);

    return (
        <Popup
            basic
            on={'click'}
            position={'left center'}
            trigger={
                <Menu.Item onClick={() => setActive(title)} active={(active === title)}>
                    <ContainerItem>{title}</ContainerItem>
                </Menu.Item>
            }
            onOpen={() => {
                handleToggle(true);
                setSearch('');
            }}
            onClose={() => {
                handleToggle(false);
                setActive(null);
            }}
            offset={`${offset}px`}
        >
            <Container>
                <Dimmer inverted active={loading}>
                    <Loader inverted/>
                </Dimmer>

                <Header as={'h4'}>
                    <Header.Content>{title}</Header.Content>
                </Header>

                <Input
                    icon={'search'}
                    placeholder={'Pesquisar'}
                    onChange={e => handleSearch(e.target.value)}
                />

                {
                    (isEmpty(search) && isEmpty(records)) ?
                        <ContentEmpty>
                            Utilize o campo de pesquisa acima para realizar uma busca.
                        </ContentEmpty> :
                        isEmpty(records) ?
                            <Empty/> :
                            handleBody(records, handleSelect, title)
                }
            </Container>
        </Popup>
    )
};

const LotOption = ({title, handleToggle, handleSelect, handleBody, fetchData}) => {
    const [active, setActive] = useState(null);
    const [father, setFather] = useState(false);
    const [children, setChildren] = useState(false);

    return (
        <Popup
            basic
            on={'click'}
            position={'left center'}
            open={father}
            trigger={
                <Menu.Item
                    onClick={() => {
                        setActive(title);
                        setFather(true);
                    }}
                    active={(active === title)}
                >
                    <ContainerItem>{title}</ContainerItem>
                </Menu.Item>
            }
            onOpen={() => handleToggle(true)}
            onClose={() => {
                setFather(children);
                handleToggle(children);
                !children && setActive(null);
            }}
            offset={'-69px'}
        >
            <Menu secondary vertical>
                <Option
                    title={'País'}
                    handleToggle={toggle => setChildren(toggle)}
                    fetchData={q => fetchData('countries', q)}
                    handleBody={(records, select, title) => handleBody(records, select, title, 'stores', 'country_id')}
                    handleSelect={value => handleSelect(value)}
                    offset={160}
                    params={'name'}
                />
                <Option
                    title={'Estado'}
                    handleToggle={toggle => setChildren(toggle)}
                    fetchData={name => fetchData('states', name)}
                    handleBody={(records, select, title) => handleBody(records, select, title, 'stores', 'state_id')}
                    handleSelect={value => handleSelect(value)}
                    offset={119}
                    params={'name'}
                />
                <Option
                    title={'Cidade'}
                    handleToggle={toggle => setChildren(toggle)}
                    fetchData={name => fetchData('cities', name)}
                    handleBody={(records, select, title) => handleBody(records, select, title, 'stores', 'city_id')}
                    handleSelect={value => handleSelect(value)}
                    offset={78}
                    params={'name'}
                />

                {/*<Option*/}
                {/*    title={'Bairro'}*/}
                {/*    handleToggle={toggle => setChildren(toggle)}*/}
                {/*    fetchData={name => fetchData('sublocalities', name)}*/}
                {/*    handleBody={(records, select, title) => handleBody(records, select, title, 'stores', 'sublocality_id')}*/}
                {/*    handleSelect={value => handleSelect(value)}*/}
                {/*    offset={37}*/}
                {/*    params={'name'}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title={'Logradouro'}*/}
                {/*    handleToggle={toggle => setChildren(toggle)}*/}
                {/*    fetchData={name => fetchData('logradouro', name)}*/}
                {/*    handleBody={(records, select, title) => handleBody(records, select, title, 'stores', 'logradouro')}*/}
                {/*    handleSelect={value => handleSelect(value)}*/}
                {/*    offset={-4}*/}
                {/*    params={'name'}*/}
                {/*/>*/}
            </Menu>
        </Popup>
    )
};

const RangeOption = ({title, handleToggle, type = 'number', inputs, offset = 0, handleSelect, param, keey}) => {
    const [active, setActive] = useState(null);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    const handleSubmit = () => {
        handleSelect({label: title, value: {min, max}, param, key: keey})
    };

    return (
        <Popup
            basic
            on={'click'}
            position={'left center'}
            trigger={
                <Menu.Item onClick={() => setActive(title)} active={(active === title)}>
                    <ContainerItem>{title}</ContainerItem>
                </Menu.Item>
            }
            onOpen={() => handleToggle(true)}
            onClose={() => {
                handleToggle(false);
                setActive(null);
            }}
            offset={`${offset}px`}
        >
            <ContainerRange>
                <Header as={'h4'}>
                    <Header.Content>{title}</Header.Content>
                </Header>

                <GroupInputRange>
                    <Form>
                        <Form.Group widths={'equal'}>
                            <Form.Input
                                fluid
                                type={type}
                                label={inputs.min}
                                placeholder={'Ex.: 0'}
                                onChange={e => setMin(e.target.value)}
                            />

                            <Form.Input
                                fluid
                                type={type}
                                label={inputs.max}
                                placeholder={'Ex.: 100'}
                                onChange={e => setMax(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </GroupInputRange>

                <Button
                    floated={'right'}
                    content={'Aplicar'}
                    color={'facebook'}
                    disabled={(isEmpty(min) || isEmpty(max))}
                    onClick={() => handleSubmit()}
                />
            </ContainerRange>
        </Popup>
    )
};

const handleStoreBody = (records, exec, title, param, key) => {
    return (
        <List>
            {
                records.map(({id, code, name, formatted_address}, index) => (
                    <List.Item key={index} onClick={() => exec({label: title, value: name, param, id, key})}>
                        <PointService marginBottom={'1rem'}>
                            <List.Content>
                                <List.Header>{name}</List.Header>
                                <List.Description>
                                    {formatted_address}
                                    <small>ID GIV: {id} | Código Interno: {code}</small>
                                </List.Description>
                            </List.Content>
                        </PointService>
                    </List.Item>
                ))
            }
        </List>
    );
};

const handleChainsBody = (records, exec, title, param, key) => {
    return (
        <List divided>
            {
                records.map(({id, name, parent}, index) => (
                    <List.Item key={index} onClick={() => exec({label: title, value: name, param, id, key})}>
                        <PointService padding={'1rem 0'}>
                            <List.Content>
                                <List.Header>{name}</List.Header>
                                <List.Description>{parent.name}</List.Description>
                            </List.Content>
                        </PointService>
                    </List.Item>
                ))
            }
        </List>
    )
};

const handleFlagBody = (records, exec, title, param, key) => {
    return (
        <List divided>
            {
                records.map(({id, name}, index) => (
                    <List.Item key={index} onClick={() => exec({label: title, value: name, param, id, key})}>
                        <PointService padding={'1rem 0'}>
                            <List.Content>
                                <List.Header>{name}</List.Header>
                            </List.Content>
                        </PointService>
                    </List.Item>
                ))
            }
        </List>
    )
};

const FiltersOptions = ({fetchStores, fetchProfiles, fetchMarkets, fetchRegion, filters, clearFilters, options}) => {
    const [father, setFather] = useState(false);
    const [children, setChildren] = useState(false);

    const handleSelect = param => filters(param);

    options = (!isUndefined(options) && options.length > 0 ) ? options : [];

    return (
        <Popup
            on={'click'}
            position={'bottom right'}
            open={father}
            trigger={<Menu.Item><Icomoon name={'filter link'}/></Menu.Item>}
            onOpen={() => setFather(true)}
            onClose={() => setFather(children)}
        >
            <Header as={'h4'}>
                <Header.Content>Opções de Filtros</Header.Content>
            </Header>

            <Menu secondary vertical>
                {
                    options.includes('stores') && <Option
                        title={'Ponto de Atendimento'}
                        handleToggle={toggle => setChildren(toggle)}
                        fetchData={fetchStores}
                        handleBody={(records, select, title) => handleStoreBody(records, select, title, 'stores', 'id')}
                        handleSelect={value => handleSelect(value)}
                        offset={131}
                    />
                }
                {
                    options.includes('profiles') && <Option
                        title={'Perfis'}
                        handleToggle={toggle => setChildren(toggle)}
                        fetchData={fetchProfiles}
                        handleBody={(records, select, title) => handleFlagBody(records, select, title, 'profiles', 'profile_id')}
                        handleSelect={value => handleSelect(value)}
                        offset={131}
                    />
                }
                {
                    options.includes('markets') && <Option
                        title={'Grupo'}
                        handleToggle={toggle => setChildren(toggle)}
                        fetchData={q => fetchMarkets('', q)}
                        handleBody={(records, select, title) => handleFlagBody(records, select, title, 'stores', 'market_id')}
                        handleSelect={value => handleSelect(value)}
                        offset={90}
                        params={'name'}
                    />
                }
                {
                    options.includes('chains') && <Option
                        title={'Rede'}
                        handleToggle={toggle => setChildren(toggle)}
                        fetchData={q => fetchMarkets('chains', q)}
                        handleBody={(records, select, title) => handleChainsBody(records, select, title, 'stores', 'market_chain_id')}
                        handleSelect={value => handleSelect(value)}
                        offset={90}
                        params={'name'}
                    />
                }
                {
                    options.includes('flags') && <Option
                        title={'Bandeira'}
                        handleToggle={toggle => setChildren(toggle)}
                        fetchData={q => fetchMarkets('flags', q)}
                        handleBody={(records, select, title) => handleFlagBody(records, select, title, 'stores', 'market_flag_id')}
                        handleSelect={value => handleSelect(value)}
                        offset={49}
                        params={'name'}
                    />
                }
                {
                    options.includes('regions') && <LotOption
                        title={'Região'}
                        handleToggle={toggle => setChildren(toggle)}
                        fetchData={fetchRegion}
                        handleSelect={value => handleSelect(value)}
                        handleBody={(records, select, title, param, key) => handleFlagBody(records, select, title, param, key)}
                    />
                }
                {
                    options.includes('performance') && <RangeOption
                        title={'Performance de Atendimento'}
                        handleToggle={toggle => setChildren(toggle)}
                        offset={63}
                        inputs={{min: 'Valor mínimo (%)', max: 'Valor máximo (%)'}}
                        handleSelect={value => handleSelect(value)}
                        param={'old'}
                        keey={'performance'}
                    />
                }
                {
                    options.includes('tmo') && <RangeOption
                        title={'TMO'}
                        handleToggle={toggle => setChildren(toggle)}
                        offset={22}
                        inputs={{min: 'Valor mínimo (%)', max: 'Valor máximo (%)'}}
                        handleSelect={value => handleSelect(value)}
                        param={'current'}
                        keey={'tmo'}
                    />
                }
                {
                    options.includes('billing') && <RangeOption
                        title={'Faturamento'}
                        handleToggle={toggle => setChildren(toggle)}
                        offset={-19}
                        inputs={{min: 'Valor mínimo', max: 'Valor máximo'}}
                        handleSelect={value => handleSelect(value)}
                        param={'old'}
                        keey={'billing'}
                    />
                }
                {
                    options.includes('cost') && <RangeOption
                        title={'Ajuda de Custo'}
                        handleToggle={toggle => setChildren(toggle)}
                        offset={-60}
                        inputs={{min: 'Valor mínimo', max: 'Valor máximo'}}
                        handleSelect={value => handleSelect(value)}
                        param={'current'}
                        keey={'cost'}
                    />
                }
                {
                    (typeof (clearFilters) === 'function') && <Menu.Item onClick={clearFilters}>
                        <center>Redefinir filtros</center>
                    </Menu.Item>
                }
            </Menu>
        </Popup>
    )
};

const mapDispatchToProps = dispatch => ({
    fetchStores: params => (dispatch(fetchStores(params))),
    fetchProfiles: params => (dispatch(fetchProfiles(params))),
    fetchMarkets: (service, params) => (dispatch(fetchMarkets(service, params))),
    fetchRegion: (region, params) => (dispatch(fetchRegion(region, params)))
});

export default connect(undefined, mapDispatchToProps)(FiltersOptions)
