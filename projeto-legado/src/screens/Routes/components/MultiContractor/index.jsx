import { findIndex, isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Dimmer, Input, Loader } from 'semantic-ui-react';

import { Icomoon } from '../../../../components';
import { Container } from './style';

import { getContractorGroup } from '../../../../redux/actions/ContractorsActions';

const MultiContractor = (props) => {
    const {
        onAdded,
        getContractorGroup,
        contractor,
        account
    } = props;

    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [checked, setChecked] = useState([]);

    /**
     * Busca dados na API
     *
     * @returns {Promise<void>}
     */
    const handleSearch = async () => {
        await setLoading(true);

        try {
            const request = await getContractorGroup(contractor, account, {q: search});
            await setRecords(request.data.subcontractors);
        } catch (e) {
            console.error(e);
        } finally {
            await setLoading(false);
        }
    };

    /**
     * Remove ou adiciona item no array de itens já selecionados.
     *
     * @param record
     * @returns {Promise<void>}
     */
    const handleToggleCheckbox = async (record) => {
        const items = [...checked];
        const index = findIndex(items, (item) => item.id === record.id);

        if (index < 0) {
            items.push(record);
        } else {
            items.splice(index, 1);
        }

        await setChecked(items);
    };

    /**
     * Executa ação onAdded
     * Limpa itens já selecionados
     *
     * @returns {Promise<void>}
     * @constructor
     */
    const HandleAdded = async () => {
        await onAdded(checked);
        await setChecked([]);
    };

    /**
     * Seleciona todos os elementos disponiveis.
     *
     * @param confirm
     * @returns {Promise<void>}
     */
    const handleCheckAll = async (confirm) => {
        const checkeds = [...checked];

        records.map((record) => {
            const index = findIndex(checkeds, (check) => check.id === record.id);

            if (confirm) {
                if (index.toString() === '-1') {
                    checkeds.push(record)
                }
            } else {
                if (index.toString() !== '-1') {
                    checkeds.splice(index, 1)
                }
            }

            return true;
        });

        await setChecked(checkeds);
    };

    /**
     * checkbox indeterminate
     *
     * @returns {boolean|boolean}
     */
    const handleIndeterminate = () => {
        const newRecords = records.map((record) => {
            const index = findIndex(checked, (c) => c.id === record.id).toString();

            if (index !== '-1') {
                return record
            }

            return false
        }).filter(Boolean).length;

        return newRecords > 0 && newRecords < records.length;
    };

    /**
     * checkbox checked
     *
     * @returns {boolean}
     */
    const handleChecked = () => {
        const newRecords = records.map((record) => {
            const index = findIndex(checked, (c) => c.id === record.id).toString();

            if (index !== '-1') {
                return record
            }

            return false
        }).filter(Boolean).length;

        return newRecords === records.length;
    };

    /**
     * search in press Enter
     *
     * @param key
     * @returns {Promise<void>}
     */
    const handleKeyPress = async (key) => {
        if (key === 'Enter') {
            await handleSearch();
        }
    };

    return (
        <Container>
            <Dimmer active={loading} inverted>
                <Loader inverted/>
            </Dimmer>

            <h1>Multicontas</h1>

            <Input
                fluid
                icon={<Icomoon name={'search'} link onClick={() => handleSearch()}/>}
                placeholder={'Pesquisar'}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e.key)}
                value={search}
                type={'search'}
            />

            <div className="__articles">
                {
                    !isEmpty(records) &&
                    <Checkbox
                        label={'Selecionar todos'}
                        onChange={(e, data) => handleCheckAll(data.checked)}
                        indeterminate={handleIndeterminate()}
                        checked={handleChecked()}
                    />
                }

                {
                    records.map((record, index) => {
                        const confirm = findIndex(checked, (c) => c.id === record.id) > -1;
                        const {detail} = record;

                        return (
                            <Checkbox
                                key={index}
                                label={detail.name}
                                checked={confirm}
                                onChange={() => handleToggleCheckbox(record)}
                            />
                        )
                    })
                }
            </div>

            <Button
                fluid
                color={'facebook'}
                content={'aplicar'}
                disabled={isEmpty(checked)}
                onClick={() => HandleAdded()}
            />
        </Container>
    )
};

MultiContractor.defaultProps = {
    onAdded: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contractor: state.Users.content.result.data.user.contractor.id,
    // account: state.Contractors.results.data.id
});

const mapDispatchToProps = dispatch => bindActionCreators({getContractorGroup}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MultiContractor);
