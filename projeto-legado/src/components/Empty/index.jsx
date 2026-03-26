import PropTypes from 'prop-types';
import { Component } from 'react';
import { defineMessages, FormattedMessage } from "react-intl";
import { Container, Header, Image } from 'semantic-ui-react';
import { Icomoon } from '..';
import './index.css';

const messages = defineMessages({
    title: {
        id: 'empty.title',
        defaultMessage: 'Nenhum resultado encontrado',
    },
    description: {
        id: 'empty.description',
        defaultMessage: 'Altere os parâmetros da sua busca e tente novamente',
    }
});

export class Empty extends Component {
    render() {
        const {title, description, image, icon, position, className} = this.props;
        return (
            <Container textAlign={'center'} className={`component-empty ${className}`}>
                {
                    (position === 'top' && icon) &&
                    <Icomoon name={icon}/>
                }

                <Header as={'h4'} className={'mb-4 mt-0'}>
                    {
                        title
                            ? title
                            : <FormattedMessage {...messages.title}/>
                    }
                    <Header.Subheader>
                        {
                            description
                                ? description
                                : <FormattedMessage {...messages.description}/>
                        }
                    </Header.Subheader>
                </Header>
                {
                    (position === 'bottom') &&
                        <Image src={image} size='small' centered/>
                }
                {
                    (position === 'bottom' && icon) &&
                        <Icomoon name={icon}/>
                }
            </Container>
        );
    }
}

Empty.propTypes = {
    title: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    image: PropTypes.string,
    icon: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom']),
    className: PropTypes.string

};

Empty.defaultProps = {
    image: '/assets/images/empty-state-charts.svg',
    position: 'bottom',
    className: ''
};
