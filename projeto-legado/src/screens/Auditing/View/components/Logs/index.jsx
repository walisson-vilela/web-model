import { isEmpty } from 'lodash';
import { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dimmer, Loader, Modal } from 'semantic-ui-react';
import { Empty, Icomoon } from '../../../../../components';
import { Body, Container, ContentItem, Header, Item } from './style';

import { getRoutesWindowsParam } from '../../../../../redux/actions/RoutesWindowsActions';

const logsRef = createRef();

class Logs extends Component {
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
            logs: []
        };
    }

    /**
     * Toggle modal.
     *
     * @param props
     * @returns {Promise<void>}
     */
    toggleModal = async (props = {}) => {
        const open = this.state.open;

        await this.setState({
            open: !open,
            logs: [],
            msg: '',
            props
        });

        if (!open) {
            await this.setState({loading: true});

            try {
                await this.handleFetchLogs();
                await this.handleScrollBottom();
            } catch (e) {
                await console.log(e);
            } finally {
                await this.setState({loading: false});
            }
        }
    };

    /**
     * Busca dados de log na API.
     *
     * @returns {Promise<void>}
     */
    handleFetchLogs = async () => {
        await this.setState({loading: true});

        try {
            const {props} = this.state;
            const response = await this.props.getRoutesWindowsParam(this.props.auditing, props.id, 'diff');

            await this.setState({logs: response.data});
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Scroll bottom na div de logs.
     *
     * @returns {Promise<void>}
     */
    handleScrollBottom = async () => {
        logsRef.current.scrollTop = logsRef.current.scrollHeight;
    };

    render() {
        const {open, loading, logs, props} = this.state;

        return (
            <Modal open={open}>
                <Container>
                    <Header>
                        Log de alterações <span>{props.title}</span>
                        <Icomoon
                            name={'x link'}
                            onClick={() => this.toggleModal()}
                        />
                    </Header>

                    <Body ref={logsRef}>
                        <Dimmer inverted active={loading}>
                            <Loader inverted/>
                        </Dimmer>

                        {
                            (isEmpty(logs.deleted) && isEmpty(logs.added))
                                ? <div className={'div__empty'}>
                                    <Empty
                                        description={'Nenhum log foi encontrado para este evento. Tente novamente mais tarde!'}
                                    />
                                </div>
                                : <Fragment>
                                    {
                                        (!isEmpty(logs.deleted)) &&
                                        <Item>
                                            <h1>Lojas removidas</h1>
                                            <div className={'div__container'}>
                                                {
                                                    logs.deleted.map((deleted, index) => (
                                                        <div className="div__row" key={index}>
                                                            <ContentItem first>
                                                                <hgroup>
                                                                    <h1>{deleted.store.id} - {deleted.store.name}</h1>
                                                                    {
                                                                        deleted.store.document &&
                                                                        <h5>CNPJ: {deleted.store.document}</h5>
                                                                    }
                                                                    <p>ID GIV: {deleted.store.id} | COD. INTERNO: {deleted.store.code && deleted.store.code}</p>
                                                                </hgroup>
                                                            </ContentItem>
                                                            {/*<ContentItem>*/}
                                                            {/*    <hgroup>*/}
                                                            {/*        <h1>Alterado por:</h1>*/}
                                                            {/*        <h5>{store.people.name}</h5>*/}
                                                            {/*    </hgroup>*/}
                                                            {/*</ContentItem>*/}
                                                            {/*<ContentItem>*/}
                                                            {/*    <hgroup>*/}
                                                            {/*        <h1>Situação: <span>{store.situation.type}</span></h1>*/}
                                                            {/*        <h5>{store.situation.description}</h5>*/}
                                                            {/*    </hgroup>*/}
                                                            {/*</ContentItem>*/}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </Item>
                                    }

                                    {
                                        (!isEmpty(logs.added)) &&
                                        <Item>
                                            <h1>Lojas adicionadas</h1>
                                            <div className={'div__container'}>
                                                {
                                                    logs.added.map((added, index) => (
                                                        <div className="div__row" key={index}>
                                                            <ContentItem first>
                                                                <hgroup>
                                                                    <h1>{added.store.name}</h1>
                                                                    {
                                                                        added.store.document &&
                                                                        <h5>CNPJ: {added.store.document}</h5>
                                                                    }
                                                                    <p>ID GIV: {added.store.id} | COD. INTERNO: {added.store.code && added.store.code}</p>
                                                                </hgroup>
                                                            </ContentItem>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </Item>
                                    }
                                </Fragment>
                        }
                    </Body>
                </Container>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getRoutesWindowsParam
}, dispatch);

export default connect(undefined, mapDispatchToProps, undefined, {forwardRef: true})(Logs);
