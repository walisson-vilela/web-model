import { Component } from 'react';
import { connect } from 'react-redux';

import { Dimmer, Loader, Modal } from 'semantic-ui-react';
import { Icomoon } from '../../../../components';
import { Container, Content, Header, Item } from './style';

class TeamInformation extends Component {
    state = {
        open: false,
        loading: false
    };

    /**
     * Toggle open modal.
     * @returns {Promise<void>}
     */
    handleToggleModal = async () => {
        await this.setState(prevState => ({
            open: !prevState.open
        }));
    };

    render() {
        return (
            <Modal open={this.state.open} closeOnEscape={true} closeOnDimmerClick={false}>
                <Container>
                    <Dimmer inverted active={this.state.loading}>
                        <Loader inverted/>
                    </Dimmer>

                    <Header>
                        <Icomoon name={'x link'} onClick={() => this.handleToggleModal()}/>
                        <h1>Informações da Equipe</h1>
                    </Header>

                    <Content>
                        <h5>Equipe (4)</h5>

                        {
                            [0, 0, 0, 0].map((row, index) => (
                                <Item key={index}>
                                    <div>
                                        <strong>John Doe Martins</strong>
                                        <p>Função: CEO</p>
                                    </div>
                                    <div>
                                        <p><strong>Hierarquia:</strong> Presidência MG</p>
                                    </div>
                                </Item>
                            ))
                        }
                    </Content>
                </Container>
            </Modal>
        )
    }
}

export default connect(undefined, undefined, undefined, {forwardRef: true})(TeamInformation);
