import React from 'react';
import * as PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {Popup, Table} from 'semantic-ui-react';

import {Icomoon} from '../../../../components';
import {Content, Empty, Item, Porcent} from './style';

const CalculateVariation = (v1 = 0, v2 = 0) => {
    v1 = parseFloat(v1);
    v2 = parseFloat(v2);

    const result = parseFloat(Math.abs(((v1 - v2) / v1 * 100)).toFixed(2));

    return (
        <Porcent positive={(v1 > v2)}><Icomoon name={(v1 > v2) ? 'arrow-up' : 'arrow-down'}/> {result}%</Porcent>
    )
};

const Comparation = ({trigger, production, draft, basic, position}) => (
    <Popup position={position} trigger={trigger} basic={basic}>
        {
            (isEmpty(draft) || isEmpty(production)) ?
                <Empty>
                    <p>Notificação</p>
                    <small>Sem dados para comparação.</small>
                </Empty> :
                <Content>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Em Produção</Table.HeaderCell>
                                <Table.HeaderCell>Rascunho</Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>%</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Faturamento: <Item>R$ {production.billing_count && production.billing_count.toLocaleString('pt-BR')}</Item></Table.Cell>
                                <Table.Cell>Faturamento: <Item>R$ {draft.billing_count && draft.billing_count.toLocaleString('pt-BR')}</Item></Table.Cell>
                                <Table.Cell textAlign={'center'}>
                                    {
                                        (production.billing_count && draft.billing_count) ? CalculateVariation(production.billing_count, draft.billing_count) : '-'
                                    }
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Taxa de Ocupação: <Item>{production.tmo_count}</Item></Table.Cell>
                                <Table.Cell>Taxa de Ocupação: <Item>{draft.tmo_count}</Item></Table.Cell>
                                <Table.Cell textAlign={'center'}>
                                    {
                                        (production.tmo_count && draft.tmo_count) ? CalculateVariation(production.tmo_count, draft.tmo_count) : '-'
                                    }
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Custo (Jan
                                    2019): <Item>R$ {(production.statistics && production.statistics.cost_count) && production.statistics.cost_count.toLocaleString('pt-BR')}</Item></Table.Cell>
                                <Table.Cell>Custo (Jan
                                    2019): <Item>R$ {(draft.statistics && draft.statistics.cost_count) && draft.statistics.cost_count.toLocaleString('pt-BR')}</Item></Table.Cell>
                                <Table.Cell textAlign={'center'}>
                                    {
                                        (production.statistics && production.statistics.cost_count && draft.statistics && draft.statistics.cost_count) ? CalculateVariation(production.statistics.cost_count, draft.statistics.cost_count) : '-'
                                    }
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Percentual: <Item>{production.statistics && production.statistics.cost_per_count}%</Item></Table.Cell>
                                <Table.Cell>Percentual: <Item>{draft.statistics && draft.statistics.cost_per_count}%</Item></Table.Cell>
                                <Table.Cell textAlign={'center'}>
                                    {
                                        (production.statistics  && production.statistics.cost_per_count && draft.statistics && draft.statistics.cost_per_count) ? CalculateVariation(production.statistics.cost_per_count, draft.statistics.cost_per_count) : '-'
                                    }
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Content>
        }
    </Popup>
);

Comparation.propTypes = {
    trigger: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    production: PropTypes.object,
    draft: PropTypes.object,
    basic: PropTypes.bool,
    position: PropTypes.oneOf([
        'top center', 'top left', 'top right', 'bottom center', 'bottom left', 'bottom right', 'right center', 'left center'
    ])
};

Comparation.defaultProps = {
    trigger: 'Rota MG00',
    production: {
        tmo_count: '116.3',
        billing_count: 1000000.00,
        statistics: [
            {
                cost_count: 0,
                cost_per_count: 0,
                reference_month: '2019-06-01'
            }
        ]
    },
    draft: {
        tmo_count: '126.3',
        billing_count: 850000.00,
        statistics: [
            {
                cost_count: 0,
                cost_per_count: 0,
                reference_month: '2019-06-01'
            }
        ]
    },
    basic: false,
    position: 'right center'
};

export default Comparation;
