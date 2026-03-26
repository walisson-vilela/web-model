import * as PropTypes from 'prop-types';
import { Fragment } from 'react';
import { formatMoney } from '../../../../../utils/Help';

import { Dropdown, Table } from 'semantic-ui-react';
import { Icomoon } from '../../../../../components';
import { Content, Header } from './style';

const ZoneStatistics = (props) => {
    const {active, block, newRoute, data = {}} = props;
    const {
        planned_stores = '0',
        performed_performance = '0',
        planned_tmo = '0',
        performed_billing = '0',
        planned_cost_perc = '0',
        planned_cost = '0',
        planned_cost_attendances = '0',
        performed_damages = '0'
    } = data;

    return (
        <Fragment>
            <Header>
                <h1>
                    {active.name}
                    {
                        (block && parseInt(active.id) > 0) && (
                            <Dropdown icon={<Icomoon name={'more-vertical'}/>}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => newRoute()}>Criar Rota</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    }
                </h1>
            </Header>

            {
                parseInt(active.id) > 0 &&
                <Content>
                    <Table basic={'very'} celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign={'center'}>Vol. de rota(s) / PDA</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>Performance</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>TMO</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>Faturamento</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>Custo Atend.</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>Custo Oper.</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>%</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>Perdas</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={'center'}>---/{parseInt(planned_stores)}</Table.Cell>
                                <Table.Cell textAlign={'center'}>{performed_performance}%</Table.Cell>
                                <Table.Cell textAlign={'center'}>{planned_tmo}%</Table.Cell>
                                <Table.Cell textAlign={'center'}>{formatMoney(parseFloat(performed_billing))}</Table.Cell>
                                <Table.Cell textAlign={'center'}>{formatMoney(parseFloat(planned_cost_attendances))}</Table.Cell>
                                <Table.Cell textAlign={'center'}>{formatMoney(parseFloat(planned_cost))}</Table.Cell>
                                <Table.Cell textAlign={'center'}>{planned_cost_perc}%</Table.Cell>
                                <Table.Cell textAlign={'center'}>{formatMoney(parseFloat(performed_damages))}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Content>
            }
        </Fragment>
    )
};

ZoneStatistics.propTypes = {
    active: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    block: PropTypes.bool,
    newRoute: PropTypes.func.isRequired
};

ZoneStatistics.defaultProps = {
    active: {
        id: 0,
        name: ''
    },
    block: false
};

export default ZoneStatistics;
