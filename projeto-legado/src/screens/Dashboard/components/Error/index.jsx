import PropTypes from 'prop-types';
import React from 'react';
import { Container, Spinner } from './styles';


export function Error({isError}){


    if(!isError) return <></>
    return(

        <Container>
            <Spinner/>
            <p> Esse serviço se encontra indisponivel no momento!</p>
        </Container>
    )
}


Error.defaultProps = {
    isError: false,
  };

  Error.propTypes = {
    isError: PropTypes.bool,
  };
