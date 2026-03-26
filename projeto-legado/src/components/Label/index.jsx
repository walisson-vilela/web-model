import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Label as LSemantic } from 'semantic-ui-react';

import { Container } from './style';

const Label = props => {
    const {
        color,
        empty,
        circular,
        content,
        size,
        inverted
    } = props;

    return (
        <Container label={isEmpty(content) ? undefined : 1} inverted={JSON.stringify(inverted)}>
            <LSemantic empty={empty} circular={circular} color={color} size={size}/>
            <p>{content}</p>
        </Container>
    )
};

Label.propTypes = {
    color: PropTypes.oneOf(['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']).isRequired,
    empty: PropTypes.bool,
    circular: PropTypes.bool,
    content: PropTypes.string,
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']),
    inverted: PropTypes.bool
};

Label.defaulProps = {
    empty: false,
    circular: false,
    content: '',
    size: 'mini',
    inverted: false
};

export default Label;
