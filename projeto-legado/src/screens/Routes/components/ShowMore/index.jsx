import { isEmpty } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { createRef, forwardRef, useEffect, useState } from 'react';
import { Input } from 'semantic-ui-react';

import { EventDetails } from '..';
import { Empty, Icomoon, Modal } from '../../../../components';
import { Actions, Container, Content, Header, Item } from './style';

const ShowMore = forwardRef(({events, date, changeCommitment}, ref) => {
    const [search, setSearch] = useState('');
    const records = events.filter(row => row.title.toLowerCase().includes(search.toLowerCase()));
    const detailRef = createRef();

    /**
     * Abre modal com detalhes do evento e fecha o anterior.
     *
     * @param event
     * @returns {Promise<void>}
     */
    const handleShowDetails = async (event) => {
        await ref.current.closeModal();
        await detailRef.current.handleToggleModal(event, records);
    };

    useEffect(() => {
        document.getElementById('myModal').click();
    }, [date]);

    return (
        <div id={'myModal'}>
            <Modal ref={ref}>
                <Container>
                    <Header>
                        {moment(date).utc().format('dddd DD \\d\\e MMMM \\d\\e YYYY')}
                        <Icomoon
                            name={'x link'}
                            onClick={() => {
                                setSearch('');
                                ref.current.closeModal();
                            }}
                        />
                    </Header>

                    <Actions>
                        <div>Lista de Pontos ({events.length})</div>
                        <div>
                            <Input
                                transparent
                                icon={<Icomoon name={'search'}/>}
                                placeholder={'Pesquisar'}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </Actions>

                    <Content>
                        {
                            isEmpty(records) &&
                            <div className={'empty'}><Empty/></div>
                        }
                        {
                            records.map((event, index) => (
                                <Item key={index}>
                                    <div>
                                        <h5>{event.title}</h5>
                                        <p>{event.formatted_address}</p>
                                        <small>ID GIV: {event.id} | COD. INTERNO: {event.code}</small>
                                    </div>
                                    <div>
                                        <span onClick={() => handleShowDetails(event)}>
                                            Ver detalhes
                                        </span>
                                    </div>
                                </Item>
                            ))
                        }
                    </Content>
                </Container>
            </Modal>

            <EventDetails
              ref={detailRef}
              // changeCommitment={event => changeCommitment(event)}
            />
        </div>
    )
});

ShowMore.propTypes = {
    events: PropTypes.array,
    changeCommitment: PropTypes.func
};

ShowMore.defaultProps = {
    date: moment.utc(),
    events: [],
    changeCommitment: (() => {})
};

export default ShowMore;
