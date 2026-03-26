import PropTypes from 'prop-types';
import React from 'react';
import { Container, Spinner } from './styles';


export function InternalLoading({isLoading}){


    if(!isLoading) return <></>
    return(
        <Container>
            <Spinner/>
            <p> Esse gráfico será exibido em breve!</p>
        </Container>
    )
}


InternalLoading.defaultProps = {
    isLoading: true,
  };

InternalLoading.propTypes = {
    isError: PropTypes.bool,
  };
