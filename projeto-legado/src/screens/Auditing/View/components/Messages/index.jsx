import { isEmpty, isNull } from 'lodash';
import moment from 'moment';
import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Modal, TextArea } from 'semantic-ui-react';
import { Empty, Icomoon } from '../../../../../components';
import { Body, Container, Footer, Header, Item, Unread } from './style';

import {
  fetchRoutesWindowMessage,
  postRoutesWindowMessage
} from '../../../../../redux/actions/RoutesWindowMessageActions';

const unreadRef = createRef();

class Messages extends Component {

    /**
     * Constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loading: false,
            props: {},
            messages: [],
            msg: ''
        };
    }

    /**
     * Toggle Modal.
     * Busca mensagens na API.
     *
     * @returns {Promise<void>}
     */
    toggleModal = async (props = {}) => {
        const open = this.state.open;

        await this.setState({
            open: !open,
            messages: [],
            msg: '',
            props
        });

        if (!open) {
            await this.setState({loading: true});

            try {
                await this.handleFetchMessages();
                await this.handleScrollBottom();
            } catch (e) {
                await console.log(e);
            } finally {
                await this.setState({loading: false});
            }
        }
    };

    /**
     * Envia mensagem.
     *
     * @returns {Promise<void>}
     */
    handleSendMessage = async () => {
        const {msg, props} = this.state;

        await this.setState({
            loading: true,
            msg: ''
        });

        try {
            await this.props.postRoutesWindowMessage(props.id, {message: msg});
            await this.handleFetchMessages();
            await this.handleScrollBottom();
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Seta mensagem no state local.
     *
     * @param msg
     * @returns {Promise<void>}
     */
    handleSetMessage = async (msg) => {
        await this.setState({msg});
    };

    /**
     * Busca mensagens no servidor API.
     *
     * @returns {Promise<void>}
     */
    handleFetchMessages = async () => {
        await this.setState({loading: true});

        try {
            const {props} = this.state;
            const response = await this.props.fetchRoutesWindowMessage(props.id);

            await this.setState({messages: response.data});
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Scroll bottom na div de mensagens.
     *
     * @returns {Promise<void>}
     */
    handleScrollBottom = async () => {
        unreadRef.current.scrollTop = unreadRef.current.scrollHeight;
    };

    render() {
        const {open, loading, messages, props, msg} = this.state;
        const {logged} = this.props;

        return (
            <Modal open={open}>
                <Container>
                    <Header>
                        Mensagens <span>{props.title}</span>
                        <Icomoon
                            name={'x link'}
                            onClick={() => this.toggleModal()}
                        />
                    </Header>

                    <Body>
                        <Unread ref={unreadRef}>
                            {
                                isEmpty(messages)
                                    ? <div className={'div__empty'}>
                                        <Empty
                                            title={'Nenhuma mensagem encontrada'}
                                            description={'Não existem mensagens cadastradas para este evento.'}
                                        />
                                </div>
                                    : messages.map((message) => {
                                        const {id, user, created_at} = message;

                                        return (
                                            <Item key={id} right={(parseInt(logged.id) === parseInt(user.people.id))}>
                                                <div>
                                                    <img src={isNull(user.people.avatar) ? 'https://react.semantic-ui.com/images/wireframe/image.png' : user.people.avatar.avatar} alt="avatar"/>
                                                </div>
                                                <div>
                                                    <h5>
                                                        {user.people.name}
                                                        {
                                                            !isEmpty(user.profiles) &&
                                                            <span>{user.profiles[0].name}</span>
                                                        }
                                                    </h5>
                                                    <p>{message.message}</p>
                                                    <small>{moment(created_at).format('DD/MM/YYYY à\\s HH:mm')}</small>
                                                </div>
                                            </Item>
                                        )
                                    })
                            }
                        </Unread>

                        <TextArea
                            placeholder={'Digite sua mensagem...'}
                            value={msg}
                            onChange={(e, {value}) => this.handleSetMessage(value)}
                            disabled={loading}
                        />

                        <Footer>
                            <Button
                                color={'green'}
                                onClick={() => this.handleSendMessage()}
                                loading={loading}
                                content={'Enviar'}
                            />
                        </Footer>
                    </Body>
                </Container>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    logged: state.Users.content.result.data.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoutesWindowMessage,
    postRoutesWindowMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, undefined, {forwardRef: true})(Messages);
