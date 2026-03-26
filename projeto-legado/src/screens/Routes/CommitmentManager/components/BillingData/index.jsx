import { isEmpty, isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dateGet } from '../../../../../utils/DateTime';
import { compareValues, formatMoney } from '../../../../../utils/Help';

import { fetchStoresBillings } from '../../../../../redux/actions/StoresActions';

import { Dimmer, Dropdown, Loader, Popup } from 'semantic-ui-react';
import { Empty, Icomoon } from '../../../../../components';

import { Chart, Container, ContainerPopup, Content, Header, Item } from './style';

const BillingData = ({store_id, fetchStoresBillings}) => {
    const [billings, setBillings] = useState([]);
    const [limit, setLimit] = useState(4);
    const [loading, setLoading] = useState(false);

    /**
     * Busca novas estatísticas toda vez que a variavel limit sofrer alterações.
     */
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        handleFechBillings(store_id, limit);
    }, [limit]);

    /**
     * Busca estatísticas na API.
     *
     * @param id
     * @param months
     * @param params
     * @returns {Promise<void>}
     */
    const handleFechBillings = async (id, months, params = {}) => {
        await setLoading(true);

        try {
            const billing = await fetchStoresBillings(id, 'by-month', months, params);

            await setBillings(billing.data);
            await setLoading(false);
        } catch (e) {
            await setLoading(false);
            console.error(e);
        }
    };

    const optionsMonth = [
        {key: 0, text: '3 meses', value: 4},
        {key: 1, text: '6 meses', value: 7},
        {key: 2, text: '9 meses', value: 10},
        {key: 3, text: '12 meses', value: 13}
    ];

    let records = [...billings];

    if (records.length === limit) {
        records.pop();
    }

    return (
        <Container>
            <Header>
                <Dropdown
                    options={optionsMonth}
                    selectOnBlur={false}
                    defaultValue={limit}
                    onChange={(e, {value}) => setLimit(value)}
                    selection
                />
            </Header>
            <Content>
                <Dimmer inverted active={loading}>
                    <Loader inverted/>
                </Dimmer>

                {
                    isEmpty(records) ? <Empty description={'Nenhum dado de faturamento foi encontrado! Tente novamente mais tarde.'}/> :
                    records.map((billing, key) => (
                        <Item key={key}>
                            <div>{dateGet(billing.reference, 'MMMM')} <span>{dateGet(billing.reference, 'YYYY')}</span>
                            </div>
                            <div>Faturamento <span>{formatMoney(billing.amount)}</span></div>
                            {
                                !isUndefined(billings[(key + 1)]) ?
                                    <Popup on={'click'} trigger={<Icomoon name={'pie-chart link'}/>}
                                           position={'left center'}>
                                        <ContainerPopup>
                                            <h5>Comparativo (Faturamento)</h5>
                                            <div style={{display: 'flex', alignItens: 'center', position: 'relative'}}>
                                                <article style={{flex: 1}}>
                                                    <p>Atual</p>
                                                    <p>Mês: <span>{dateGet(billing.reference, 'MMMM (YYYY)')}</span></p>
                                                    <p>
                                                        Faturamento: <span>{formatMoney(billing.amount)}</span>
                                                    </p>
                                                </article>
                                                <Chart positive={(billing.amount > billings[(key + 1)].amount)}>
                                                    {compareValues(billings[(key + 1)].amount, billing.amount)}
                                                </Chart>
                                            </div>
                                            <div>
                                                <p>Anterior</p>
                                                <p>Mês: <span>{dateGet(billings[(key + 1)].reference, 'MMMM (YYYY)')}</span>
                                                </p>
                                                <p>Faturamento: <span>{formatMoney(billings[(key + 1)].amount)}</span>
                                                </p>
                                            </div>
                                        </ContainerPopup>
                                    </Popup> :
                                    <Popup trigger={<Icomoon name={'pie-chart link'}/>} position={'left center'}>
                                        Não existem dados para comparação
                                    </Popup>
                            }
                        </Item>
                    ))
                }
            </Content>
        </Container>
    )
};

BillingData.propTypes = {
    store_id: PropTypes.number
};

BillingData.defaultProps = {
    store_id: 0
};

const mapDispatchToProps = dispatch => bindActionCreators({fetchStoresBillings}, dispatch);

export default connect(undefined, mapDispatchToProps)(BillingData);
