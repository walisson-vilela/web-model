import PropTypes from 'prop-types';
import { Component } from 'react';

import { Button, Header, Modal } from 'semantic-ui-react';
import { Icomoon } from '..';

export default class Alert extends Component {

    render() {

        const {title, description, size, onPress} = this.props;

        return (
            <Modal
                open
                size={size}
            >
                <Modal.Content>
                    <Header icon textAlign={'center'}>
                        <Icomoon name={'alert-circle'} color={'#db2828'}/>
                        {title}
                        <Header.Subheader
                            content={description}
                            style={{marginTop: 4}}
                        />
                    </Header>

                    {this.props.children}

                </Modal.Content>

                <Modal.Actions style={{textAlign: 'center'}}>
                        <Button
                            primary
                            content='Ok'
                            onClick={onPress}
                        />
                </Modal.Actions>

            </Modal>
        );
    }
}

Alert.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.oneOf(['mini', 'tiny', 'small']),
    onPress: PropTypes.func,
};

Alert.defaultProps = {
    title: 'Atenção',
    description: 'Ocorreu um erro durante o processamento',
    size: 'mini',
    onPress: () => {

    }
};
