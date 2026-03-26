import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import { Icomoon } from '../../../../../components';
import RoutesAdd from '../../../../Routes/RoutesAdd';
import { Container, Header } from './style';

class ModalRoute extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            props: {}
        };
    }

    /**
     * Toggle modal.
     * @param props
     * @returns {Promise<void>}
     */
    toggleModal = async (props = {}) => {
        const {open} = this.state;

        await this.setState({
            open: !open,
            props
        });
    };

    /**
     * Success create new route.
     * @returns {Promise<void>}
     */
    handleSuccess = async () => {
        await this.setState({open: false});
        await this.props.handleConfirm();
    };

    render() {
        const {open, props} = this.state;
        const {history, window, proposed, approved} = this.props;

        return (
            <Modal open={open}>
                <Container>
                    <Header>
                        <h1>Adicionar Rota</h1>

                        <Icomoon
                            name={'x link'}
                            onClick={() => this.toggleModal()}
                        />
                    </Header>

                    <RoutesAdd
                        onCancel={() => this.toggleModal()}
                        zone_id={props.id || null}
                        zone={props.name || null}
                        disable_zone={props.disabled}
                        history={history}
                        window={window}
                        proposed={proposed}
                        approved={approved}
                    />
                </Container>
            </Modal>
        )
    }
}

ModalRoute.propTypes = {
    handleConfirm: PropTypes.func,
    history: PropTypes.object,
    window: PropTypes.number.isRequired,
    proposed: PropTypes.number.isRequired,
    approved: PropTypes.number.isRequired
};

ModalRoute.defaultProps = {
    handleConfirm: () => undefined
};

export default ModalRoute;
