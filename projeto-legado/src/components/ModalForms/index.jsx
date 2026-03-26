import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { Dimmer, Loader, Modal } from 'semantic-ui-react';

import { Icomoon } from '..';
import { Container, Content, Header, Icon } from './style';

export class ModalForms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            props: {}
        }
    }

    handleOpen = props => this.setState({open: true, props});

    handleClose = (success = null) => this.setState({open: false, props: {}}, success && this.props.onSuccess());

    render() {
        return (
            <Modal open={this.state.open} closeOnEscape size={this.props.size}>
                <Container>
                    {
                        this.props.icon &&
                            <Icon>
                                <img src={this.props.icon} alt="Icon"/>
                            </Icon>
                    }
                    <Content>
                        <Header>
                            {this.props.title}
                            <Icomoon name={'x link'} onClick={() => this.handleClose()}/>
                        </Header>
                        {
                            this.props.children
                        }

                        <Dimmer inverted active={this.props.loading}>
                            <Loader inverted/>
                        </Dimmer>
                    </Content>
                </Container>
            </Modal>
        )
    }
}

ModalForms.propTypes = {
    title: PropTypes.string,
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
    icon: PropTypes.string,
    onSuccess: PropTypes.func,
    loading: PropTypes.bool
};

ModalForms.defaultProps = {
    title: '',
    size: 'large',
    icon: '',
    onSuccess: (() => {}),
    loading: false
};
