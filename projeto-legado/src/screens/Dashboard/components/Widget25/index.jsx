import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsModules from 'highcharts/highcharts-more';
import treemap from 'highcharts/modules/treemap';
import React from 'react';
import { Container } from './styles';


HighchartsModules(Highcharts)
treemap(Highcharts)


export function Widget25(){
    const options ={
        credits: {
            enabled: false
       },
        series: [{
            type: "treemap",

            layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [{
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color:'#000'
                    }
                }
            }],
            data: [{
                id: 'A',
                name: 'Atacado',
                color: "#826AF9"
            }, {
                id: 'B',
                name: 'C&C',
                color: "#2D9AFF"
            }, {
                id: 'O',
                name: 'KaRegional',
                color: '#EC9800'
            }, {
                name:'',
                parent: 'A',
                value: 5
            }, {
                name: 'Rick',
                parent: 'B',
                value: 3
            }, {
                name: 'Peter',
                parent: 'O',
                value: 4
            }]
        }],
        title: {
            text: null,
        }
    }

    return(
        <Container>
            <h1> Segmentação por canal</h1>
            <HighchartsReact
             Highcharts={Highcharts}
             options={options}
             containerProps={{ className: 'widget25'}}
            />
        </Container>
    )
}
