import { isEmpty, isObject } from 'lodash';
import { useState } from 'react';
import { Input, Popup } from 'semantic-ui-react';

import { Icomoon } from '../../..';
import { Content, ContentMore, Empty, HeaderMore, Item, ItemMore, ListMore, More } from './style';

const MoreFilters = ({records, handleRemove, reset}) => {
    const [search, setSearch] = useState('');

    return (
        <Popup
            basic
            on={'click'}
            position={'top right'}
            trigger={
                <More>
                    <Icomoon name={'more-vertical'}/>
                </More>
            }
        >
            <ContentMore>
                <HeaderMore>
                    <h1>Filtros aplicados ({records.length})</h1>
                    <Input
                        icon={<Icomoon name={'search'}/>}
                        placeholder={'Pesquisar'}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </HeaderMore>

                <ListMore>
                    {
                        records.filter(row => row.label.toLowerCase().includes(search.toLowerCase()))
                            .map((res, index) => (
                                <ItemMore key={index}>
                                    <h5>{res.label}</h5>
                                    <p>{isObject(res.value) ? `min ${res.value.min} - max ${res.value.max}` : res.value.trim()}</p>
                                    <Icomoon
                                        name={'x link'}
                                        title={'Fechar'}
                                        onClick={() => handleRemove(parseInt(index + 3))}
                                    />
                                </ItemMore>
                            ))
                    }
                </ListMore>

                <p>
                    <span onClick={() => reset()}>Limpar todos</span>
                </p>
            </ContentMore>
        </Popup>
    )
};

const Filter = ({records, handleRemove, reset}) => {
    if (isEmpty(records)) {
        return <Empty>No momento não há filtros aplicados</Empty>
    } else {
        return (
            <Content>
                {
                    records.slice(0, 3).map((filter, index) => (
                        <Item className={'animated fadeIn'} key={index}>
                            <h5>{filter.label}</h5>
                            <p>{isObject(filter.value) ? `min ${filter.value.min} - max ${filter.value.max}` : filter.value}</p>
                            <Icomoon
                                name={'x link'}
                                title={'Fechar'}
                                onClick={() => handleRemove(index)}
                            />
                        </Item>
                    ))
                }
                {
                    records.length > 3 &&
                        <MoreFilters
                            records={records.slice(3, records.length)}
                            handleRemove={key => handleRemove(key)}
                            reset={() => reset()}
                        />
                }
            </Content>
        )
    }
};

export default Filter;
