import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { Buttons, Container, Content } from './styles';

export function Widget29(){

    const options = {

        chart: {
            type: 'boxplot',
            backgroundColor:null,
        },

        title: {
            text: ''
        },

        legend: {
            enabled: false
        },
        credits: {
            enabled: false
       },


        xAxis: {
            categories: ['Ka Regional', 'KaNacional', 'Atacado Cash', 'Padaria', 'As Direto', 'Varejo Tradicional'],
            title: {
                text: ''
            }
        },


        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        series: [{
            name: 'Observations',
            data: [
                [760, 801, 848, 895, 965],
                [733, 853, 939, 980, 1080],
                [714, 762, 817, 870, 918],
                [724, 802, 806, 871, 950],
                [834, 836, 864, 882, 910]
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }, {
            name: 'Outliers',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [ // x, y positions where 0 is the first category
                [0, 30],
                [4, 718],
                [4, 951],
                [4, 969]
            ],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]

    }

    return(
        <Container>
            <h2> Tempo de Atendimento(Distribuição)</h2>
        <Content>

            <HighchartsReact
             Highcharts={Highcharts}
             options={options}
             containerProps={{ className: 'widget29'}}
             />
            <Buttons>
                <button> S0 </button>
                <button> S-1</button>
                <button> S-2</button>
                <button> S-3</button>
            </Buttons>
        </Content>
        </Container>
    )


}
