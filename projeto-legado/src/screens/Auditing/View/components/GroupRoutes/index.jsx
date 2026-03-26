import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { createRef, Fragment, useState } from 'react';

import { Dropdown, Input } from 'semantic-ui-react';
import { Confirm, Logs, Messages, Zone } from '..';
import { Empty, Icomoon } from '../../../../../components';

import { Container, Content, Filter } from './style';

const GroupRoutes = (props) => {
    const refMessages = createRef();
    const refLogs = createRef();
    const refConfirm = createRef();

    const {
        routes,
        fetchZones,
        auditing,
        history,
        approved,
        proposed,
        step,
        finished,
        conflict,
        toggleGroup,
        visible,
        temporary,
        handleTemporary,
        handleUpdateAll,
        window
    } = props;

    const [search, setSearch] = useState('');
    const [drop, setDrop] = useState(4);

    /**
     * Toggle modal de mensagens.
     *
     * @param props
     * @returns {Promise<void>}
     */
    const toggleMessages = async (props) => {
        await refMessages.current.toggleModal(props);
    };

    /**
     * Toggle de modal de logs.
     *
     * @param props
     * @returns {Promise<void>}
     */
    const toggleLog = async (props) => {
        await refLogs.current.toggleModal(props);
    };

    /**
     * Filtra dados encontrados.
     *
     * @param value
     * @returns {boolean | number | Requireable<boolean>|boolean}
     */
    const handleFiltersRoutes = (value) => {
        const def = value.route.name.toLowerCase().includes(search.toLowerCase());

        if (parseInt(step) === 1) {
            switch (drop) {
                case 0:
                    return (def && parseInt(value.submitted) === 0);
                case 1:
                    return (def && parseInt(value.submitted) === 1);
                case 2:
                    return (def && parseInt(value.submitted) === 2);
                case 3:
                    return (def && parseInt(value.submitted) === 3);
                default:
                    return def;
            }
        } else {
            switch (drop) {
                case 0:
                    return (def && parseInt(value.finished) === 0);
                case 1:
                    return (def && parseInt(value.finished) === 2);
                case 2:
                    return (def && parseInt(value.finished) === 1);
                case 3:
                    return (def && parseInt(value.finished) === 3);
                default:
                    return def;
            }
        }
    };

    const records = routes.filter(handleFiltersRoutes);
    const optionsStatus = [
        {key: 0, text: 'Pendente', value: 0},
        {key: 1, text: 'Original', value: 1},
        {key: 2, text: 'Modificada', value: 2},
        {key: 3, text: 'Excluída', value: 3},
        {key: 4, text: 'Todos', value: 4}
    ];

    return (
        <Fragment>
            <Content>
                <Filter>
                    <Input
                        transparent
                        value={search}
                        icon={<Icomoon name={'search'}/>}
                        onChange={(e, {value}) => setSearch(value)}
                        placeholder={'Pesquisar'}
                    />

                    <Dropdown
                        inline
                        options={optionsStatus}
                        defaultValue={drop}
                        direction={'left'}
                        onChange={(e, {value}) => setDrop(value)}
                    />
                </Filter>

                {
                    isEmpty(records)
                        ? <div className={'empty__div'}><Empty/></div>
                        : <Container>
                            {
                                records.map((zone, index) => (
                                    <Zone
                                        actions
                                        fixedRight
                                        key={index}
                                        data={zone}
                                        toggleMessages={value => toggleMessages(value)}
                                        toggleLog={value => toggleLog(value)}
                                        fetchZones={() => fetchZones()}
                                        auditing={auditing}
                                        history={history}
                                        step={step}
                                        proposed={proposed}
                                        approved={approved}
                                        finished={finished}
                                        conflict={conflict}
                                        toggleGroup={value => toggleGroup(value)}
                                        visible={visible}
                                        temporary={temporary}
                                        handleTemporary={() => handleTemporary()}
                                        toggleConfirm={value => refConfirm.current.toggleModal({...value})}
                                        window={window}
                                    />
                                ))
                            }
                        </Container>
                }
            </Content>

            <Messages ref={refMessages}/>
            <Logs ref={refLogs} auditing={auditing}/>
            <Confirm ref={refConfirm} size={'mini'} onCallback={() => handleUpdateAll()}/>
        </Fragment>
    )
};

GroupRoutes.propTypes = {
    routes: PropTypes.array,
    fetchZones: PropTypes.func,
    auditing: PropTypes.string,
    history: PropTypes.object,
    approved: PropTypes.shape({
        id: PropTypes.number
    }),
    proposed: PropTypes.shape({
        id: PropTypes.number
    }),
    step: PropTypes.number,
    finished: PropTypes.bool,
    conflict: PropTypes.bool.isRequired,
    toggleGroup: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    temporary: PropTypes.bool.isRequired,
    handleTemporary: PropTypes.func.isRequired,
    handleUpdateAll: PropTypes.func.isRequired,
    window: PropTypes.number.isRequired
};

GroupRoutes.defaultProps = {
    routes: [],
    fetchZones: (() => {}),
    auditing: '0',
    history: {},
    approved: {
        id: 0
    },
    proposed: {
        id: 0
    },
    step: 1,
    finished: false,
    visible: false
};

export default GroupRoutes;
