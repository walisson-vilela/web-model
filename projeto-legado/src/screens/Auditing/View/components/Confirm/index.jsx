import { isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react';

import { deleteRoute } from '../../../../../redux/actions/RoutesActions';
import { deleteRoutesVersions } from '../../../../../redux/actions/RoutesVersionsActions';

import { Container } from './style';

class Confirm extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            open: false,
            props: {}
        }
    }

    /**
     * Toggle modal
     *
     * @param props
     * @returns {Promise<void>}
     */
    toggleModal = async (props = {}) => {
        const {open} = this.state;

        await this.setState({
            props,
            open: !open
        });
    };

    /**
     * Confirm action user
     *
     * @returns {Promise<void>}
     */
    handleConfirm = async () => {
        const {route_id, id} = this.state.props;

        await this.setState({loading: true});

        try {
            if (isUndefined(route_id)) {
                await this.props.deleteRoute(id);
            } else {
                await this.props.deleteRoutesVersions(id, route_id);
            }

            await this.props.onCallback();
        } catch (e) {
            await console.log(e);
        } finally {
            await this.setState({loading: false});
            await this.toggleModal();
        }
    };

    render() {
        const {open, loading} = this.state;
        const {size} = this.props;

        return (
            <Modal open={open} size={size}>
                <Dimmer inverted active={loading}>
                    <Loader inverted/>
                </Dimmer>

                <Container>
                    <h1>Confirmação</h1>
                    <p>Você tem certeza que deseja remover esta rota?<br />Esta ação não poderá mais ser desfeita.</p>
                    <div>
                        <Button
                            size={'mini'}
                            className={'bg-transparent text-underline'}
                            content={'Cancelar'}
                            onClick={() => this.toggleModal()}
                        />

                        <Button
                            size={'mini'}
                            content={'Sim, remover!'}
                            color={'red'}
                            onClick={() => this.handleConfirm()}
                        />
                    </div>
                </Container>
            </Modal>
        )
    }
}

Confirm.propTypes = {
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
    onCallback: PropTypes.func
};

Confirm.defaulProps = {
    size: 'tiny',
    onCallback: () => undefined
};

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteRoutesVersions,
    deleteRoute
}, dispatch);

export default connect(undefined, mapDispatchToProps, undefined, {forwardRef: true})(Confirm);
