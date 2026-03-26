import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';

import { Container } from './styles';

export function Widget16(){

    const options ={
        chart: {
            type: 'column',
            backgroundColor:null,
        },
        credits: {
            enabled: false
        },

        title: {
            text: ''

        },
        yAxis: {
            allowDecimals: false,
            min: null,
            title: {
                text: ''
            }
        },



        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        colors:['#66BB6A','#E23851'],
        series: [{
            name: 'S1',
            data: [100,100],
            style:{
                textAlign:'center',
            }

        }, {
            name: 'S0',
            data: [],
            style:{
                textAlign:'center',
            }

        }]
    }


    return(
    <>
     <Container>
        <AiOutlineExpandAlt size={20} color="#000"/>
         <h1> Performance Proje...</h1>
         <HighchartsReact
          Highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'widget15'}}
         />
     </Container>
    </>
 )
 }
