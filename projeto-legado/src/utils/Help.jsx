import { Icomoon } from '../components';

/**
 * Formata moeda no padrão BR (R$ 0,00).
 *
 * @param value
 * @returns {string}
 */
export const formatMoney = (value) => {
    return value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
};

/**
 * Realiza comparação entre dois valores e retorna icone da porcentagem calculada.
 *
 * @param initial
 * @param end
 * @returns {*}
 */
export const compareValues = (initial, end) => {
    const v1 = parseFloat(initial);
    const v2 = parseFloat(end);

    const calcule = parseFloat(Math.abs(((v1 - v2) / v1 * 100)).toFixed(2));

    return <Icomoon name={`arrow-${(end > initial) ? 'up' : 'down'}`} legend={`${calcule}%`}/>
};
