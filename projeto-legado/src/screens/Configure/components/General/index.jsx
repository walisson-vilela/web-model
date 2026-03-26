import React, { useState } from 'react';

import { Checkbox } from 'semantic-ui-react';
import { Container, View } from './style';

const General = () => {
    const [active, setActive] = useState(true);

    return (
        <Container>
            <View>
                <h3>Definir exibição de horário para execução</h3>
                <p>Desabilitando esse recurso, não será exibido a definição de horário para os eventos de agendamento no dispositivo móvel.</p>

                <div className="div__footer">
                    <p>{active ? 'Habilitado' : 'Desabilitado'}</p>
                    <Checkbox
                        toggle
                        onChange={(e, {checked}) => setActive(checked)}
                        checked={active}
                    />
                </div>
            </View>
        </Container>
    )
};

export default General;
