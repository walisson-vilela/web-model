import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import { Container, Icon } from './style';

const Icomoon = (props) => {
    const {
        direct,
        name,
        title,
        inverted,
        position,
        onClick,
        rotate,
        circular,
        label,
        color,
        legend,
        link,
        style
    } = props;

    if (direct) {
        return (
            <Icon
                name={name}
                onClick={onClick}
                rotate={rotate ? 1 : undefined}
                circular={circular ? 1 : undefined}
                label={label ? 1 : undefined}
                color={color}
                link={link ? 1 : undefined}
                style={style}
            />
        );
    }

    // Verify is not exists title
    if (isEmpty(title)) {
        return (
            <Container style={style}>
                <Icon
                    name={name}
                    onClick={onClick}
                    rotate={rotate ? 1 : undefined}
                    circular={circular ? 1 : undefined}
                    label={label ? 1 : undefined}
                    color={color}
                    link={link ? 1 : undefined}
                />

                {
                    !isEmpty(legend) &&
                    <span className={'__text'}>{legend}</span>
                }
            </Container>
        )
    }

    return (
        <Popup
            inverted={inverted}
            position={position}
            content={title}
            trigger={
                <Container style={style}>
                    <Icon
                        name={name}
                        onClick={onClick}
                        rotate={rotate ? 1 : undefined}
                        circular={circular ? 1 : undefined}
                        label={label ? 1 : undefined}
                        color={color}
                        link={link ? 1 : undefined}
                    />

                    {
                        !isEmpty(legend) &&
                        <span className={'__text'}>{legend}</span>
                    }
                </Container>
            }
        />
    )
};

Icomoon.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    inverted: PropTypes.bool,
    position: PropTypes.oneOf(['top center', 'top left', 'top right', 'bottom center', 'bottom left', 'bottom right', 'right center', 'left center']),
    onClick: PropTypes.func,
    rotate: PropTypes.bool,
    circular: PropTypes.bool,
    label: PropTypes.bool,
    color: PropTypes.string,
    legend: PropTypes.string,
    link: PropTypes.bool,
    style: PropTypes.object
};

Icomoon.defaultProps = {
    title: '',
    inverted: true,
    position: 'top center',
    onClick: () => undefined,
    rotate: false,
    circular: false,
    label: false,
    color: '#192338',
    legend: '',
    link: false,
    style: {}
};

export default Icomoon;
