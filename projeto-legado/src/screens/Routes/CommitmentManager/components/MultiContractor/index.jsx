import { findIndex, isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { createRef, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Dimmer, Icon, Input, Loader, Popup } from 'semantic-ui-react';

import { Icomoon } from '../../../../../components';
import { Container, Content, Dropdown, List } from './style';

import { fetchContractorSub } from '../../../../../redux/actions/ContractorsActions';

const contextRef = createRef();

const MultiContractor = (props) => {
    const {
        onAdded,
        contractors,
        fetchContractorSub
    } = props;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [checked, setChecked] = useState([]);

    /**
     * Abre popup e faz requisição dos multicontratantes
     *
     * @returns {Promise<void>}
     */
    const handleOpenPopup = async () => {
        await setOpen(true);
        await handleSearch();
    };

    /**
     * Busca dados na API
     *
     * @returns {Promise<void>}
     */
    const handleSearch = async () => {
        await setLoading(true);

        try {
            const request = await fetchContractorSub({q: search});
            await setRecords(request.data);
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
        const indexContractor = findIndex(contractors, (item) => item.id === record.id);

        if (index < 0 && indexContractor < 0) {
            items.push(record);
        }

        if (index > -1) {
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

    return (
        <Fragment>
            <Container>
                <Dropdown onClick={() => handleOpenPopup()} ref={contextRef}>
                    <p>{isEmpty(checked) ? 'selecionar multicontas' : `${checked.length} multicontas selecionadas`}</p>
                    <Icon name={'caret down'}/>
                </Dropdown>

                <Button
                    color={'facebook'}
                    disabled={isEmpty(checked)}
                    content={'adicionar'}
                    onClick={() => HandleAdded()}
                />
            </Container>

            <Popup
                basic
                position={'bottom left'}
                context={contextRef}
                onClose={() => setOpen(false)}
                open={open}
            >
                <Content>
                    <Dimmer active={loading} inverted>
                        <Loader inverted/>
                    </Dimmer>

                    <div className="__heading">
                        <Input
                            fluid
                            icon={<Icomoon name={'search'} link onClick={() => handleSearch()}/>}
                            placeholder={'Pesquisar'}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            value={search}
                        />
                    </div>

                    <div className="__contents">
                        {
                            records.map((record, index) => {
                                const confirm = findIndex(checked, (c) => c.id === record.id) > -1;
                                const disabled = findIndex(contractors, (c) => c.id === record.id) > -1;

                                const {detail} = record;

                                return (
                                    <List key={index} checked={confirm}>
                                        <Checkbox
                                            label={detail.name}
                                            checked={confirm || disabled}
                                            onChange={() => handleToggleCheckbox(record)}
                                            disabled={disabled}
                                        />
                                    </List>
                                )
                            })
                        }
                    </div>
                </Content>
            </Popup>
        </Fragment>
    )
};

MultiContractor.defaultPros = {
    onAdded: PropTypes.func.isRequired,
    contractors: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchContractorSub
}, dispatch);

export default connect(undefined, mapDispatchToProps)(MultiContractor);
