import { Component } from 'react';
import { connect } from "react-redux";

import { errorsClose } from "../../redux/actions/ErrorsActions";

import Alert from '../Alert';


class Errors extends Component {

  render() {
    const {open, result} = this.props.errors;

    if (!open) {
      return false;
    }

    const onPress = () => {
      this.props.errorsClose();
    }

    if ([401, 403].includes(result.code)) {
      return (<></>);
    }

    return (
      <Alert
        onPress={onPress}
        title={result.title || undefined}
        description={result.description || undefined}
      >
        {[
          result.code === 401 && 'Acesso não autorizado',
          result.code === 404 && 'Registro não encontrado',
          result.code === 405 && 'Método não permitido',
          result.code === 422 && 'Erro de validação',
        ]}
      </Alert>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.Errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    'errorsClose': () => {
      dispatch(errorsClose());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
