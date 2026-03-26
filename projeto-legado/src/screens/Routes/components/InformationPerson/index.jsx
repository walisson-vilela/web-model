import React from 'react';
import * as PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {Placeholder} from 'semantic-ui-react';

import {Content, Description, Header, Image, Loader} from './style';

const InformationPerson = ({image, name, ip, func, loading, trigger}) => {
    if (loading) {
        return (
            <Loader>
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                </Placeholder>
            </Loader>
        )
    } else {
        return (
            <Content>
                <div>
                    <Image
                        src={image ? image : 'https://react.semantic-ui.com/images/wireframe/image.png'}
                        alt={'Usuário'}
                    />
                </div>
                <div>
                    <Header>
                        {name}
                        {
                            ip && <span>IP: {ip}</span>
                        }
                    </Header>
                    <Description>
                        {func}
                        {!isEmpty(trigger) && trigger}
                    </Description>
                </div>
            </Content>
        )
    }
};

InformationPerson.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    ip: PropTypes.string,
    func: PropTypes.string,
    loading: PropTypes.bool,
    trigger: PropTypes.object
};

InformationPerson.defaultProps = {
    image: 'https://react.semantic-ui.com/images/avatar/large/patrick.png',
    name: 'John Doe',
    ip: '',
    func: 'PROMOTOR',
    loading: false,
    trigger: {}
};

export default InformationPerson;
