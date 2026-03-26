import { isArray, isEmpty } from 'lodash';
import * as Proptypes from 'prop-types';
import { Component } from 'react';

import { Modal } from 'semantic-ui-react';
import { Icomoon } from '../../../../components';
import { Container, Header, Item, Scroll } from './style';

class PublishUnpublish extends Component {
    state = {
        open: false,
        props: []
    };

    /**
     * Toggle de modal.
     *
     * @param props
     * @returns {Promise<void>}
     */
    toggleModal = async (props = []) => {
        await this.setState(prevState => ({
            open: !prevState.open,
            props
        }));
    };

    render () {
        const {open, props} = this.state;
        const {title, description, size} = this.props;

        return (
            <Modal open={open} size={size} closeOnEscape={true}>
                <Container>
                    <Header>
                        <h3>{title}</h3>
                        {
                            !isEmpty(description) && description
                        }
                        <Icomoon name={'x link'} onClick={() => this.toggleModal()}/>
                    </Header>

                    <Scroll>
                        {
                            props.map((record, index) => (
                                <Item key={index}>
                                    <div>
                                        <small>ID Rota</small>
                                        {record.route_id}
                                    </div>
                                    <div>
                                        {
                                            isArray(record.errors) ?
                                                record.errors.map(error => (
                                                    <p>{error}</p>
                                                )) : <p>{record.errors}</p>
                                        }
                                    </div>
                                </Item>
                            ))
                        }
                    </Scroll>
                </Container>
            </Modal>
        )
    }
}

PublishUnpublish.propTypes = {
    title: Proptypes.string,
    description: Proptypes.string,
    size: Proptypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
};

PublishUnpublish.defaultProps = {
    title: '',
    description: '',
    size: 'tiny'
};

export default PublishUnpublish;
