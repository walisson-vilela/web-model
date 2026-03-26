import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsModules from 'highcharts/highcharts-more';
import pareto from 'highcharts/modules/pareto';
import React from 'react';
import { Container } from './styles';

HighchartsModules(Highcharts)
pareto(Highcharts)
export function Widget33(){

    const options ={
        chart: {
            renderTo: 'container',
            type: 'column',
            backgroundColor:null,
        },
        title: {
            text: '',

        },
        credits: {
            enabled: false
       },

        tooltip: {
            shared: true
        },
        xAxis: {
            categories: [
            '12/29/2020',
            '12/29/2020',
            '12/31/2020',
            '12/31/2020',
            '01/02/2021',
            '01/04/2021',
            '01/06/2021',
            '01/08/2021',
            '01/10/2021',
            '01/12/2021',
            '01/14/2021',
            '01/14/2021',
            '01/16/2021',
            '01/18/2021',

            ],
            crosshair: false,
        },
        yAxis: [{
            title: {
                text: 'Performance',
                style:{
                    fontWeight:'bold'
                }
            }
        }, {
            title: {
                text: '',
                style:{
                    fontWeight:'bold'
                }
            },
            minPadding: 0,
            maxPadding: 0,
            max: 100,
            min: 0,
            opposite: true,
            labels: {
                format: "{value}"
            }
        }],
        colors:['#66BB6A','#1E63A3'],
        series: [{
            type: 'pareto',
            name: 'Perfomance',
            yAxis: 1,
            zIndex: 10,
            baseSeries: 1,
            tooltip: {
                valueDecimals: 2,
                valueSuffix: '%'
            }
        }, {
            name: 'Média Móvel',
            type: 'column',
            zIndex: 2,
            data: [100, 222, 151, 86, 72, 51, 36,100, 222, 151, 86, 72]
        }]
    }

    return(
     <Container>
         <h1> Performance de Atendimento vs Media Móvel 21 dias</h1>
         <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget33'}}
         />
     </Container>
    )
}

