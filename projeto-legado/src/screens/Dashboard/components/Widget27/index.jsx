import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { Buttons, Container, Content } from './styles';

export function  Widget27(){
    const options ={
        chart: {
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: [
                6,
                12,
                18,
                24,
                30,
                36,
                42,
                48,
                54,
                60,
                66,
                72,
                78,
                84,
                90,
                96,
                102,
                108,
                114,
                120,
                126,
                132,
                138,
                144,
                150,
                156,
                162,
                168,
                174,
                180,
                186,
                192,
                198,
                204,
                210,
                216,
                222,
                228,
                234,
                240,
                246,
                252,
                258,
                264,
                270,
                276,
                282,
                288,
                294,
                300,
                306,
                312,
                318,
                324,
                330,
                336,
                342,
                348,
                354,
                360,
                366,
                372,
                378,
                384,
                390,
                396,
                402,
                408,
                414,
                420,
                426,
                432,
                438,
                444,
                450,
                456,
                462,
                468,
                474,
                480,
                486,
                492,
                498,
                504,
                510,
                516,
                522,
                528,
                534,
                540,
                546,
                552,
                558,
                564,
                570,
                576,
                582,
                588,
                594,
                600
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'John',
            data: [30, 90, 80, 70, 400, 120, 71]
        }, {
            name: 'Jane',
            data: [40, 90, 80, 70, 400, 120, 71]
        }]

    }

    /*   */

    return(
    <>
        <Container>
            <strong> Tempo de Atendimento (Desvio Padrão 2.0)</strong>
            <Content>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget27'}}
            />
            <Buttons>
                <button> S0 </button>
                <button> S-1</button>
                <button> S-2</button>
                <button> S-3</button>
            </Buttons>
            </Content>

        </Container>
    </>

    )
}
