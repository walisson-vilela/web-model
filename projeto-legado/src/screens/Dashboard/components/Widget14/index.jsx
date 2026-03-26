import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsModules from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget14Failure, Widget14Request, Widget14Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate, day, weekDay } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container, Icons, Item, Percentage } from './styles';

HighchartsModules(Highcharts)
solidGauge(Highcharts)


export function Widget14(){
    const {isError} = useSelector((state) => state.Loading)
    const [data, setData] = useState({});
    const [percentage, setPercentage] = useState(0);
    const [range, setRange] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const options = {
        chart: {
            type: 'solidgauge',
            backgroundColor:null
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        credits: {
            enabled: false
       },

       colors:['#2D9AFF'],

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:17px">{y}%</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4"></span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }],

        yAxis: {
            labels: {
                enabled: false
              },
              min: 0,
              max: 100,
              gridLineColor: 'transparent',
              lineColor: '#ccc',
              minorTickLength: 0,
              tickPositions: [0],
              tickColor: '#424242',
              tickPosition: 'inside',
              tickLength: 32,
              tickWidth: 3,
              zIndex: 100,
        },
        plotOptions: {
            solidgauge: {
              innerRadius: '60%',
              radius: '100%',
              dataLabels: {
                enabled: false,
                useHTML: true,
                zIndex: 1000 //added
              }
            }
        },

    }

    console.log(isError)



    useEffect(() =>{
        async function loadData(){
            dispatch(Widget14Request());
            try{
            const response = await api.get(`/v1/widgets/stats/14?date=${currentDate}&parents%5B%5D=13`)
            const {data} = response.data
            setData(data);
            setPercentage(data.chart.series[0].data[0])
            setRange(data.goal_amount);
            setIsLoading(false)
            options.series[0].data[0] = data.goal_amount;
            dispatch(Widget14Sucess())
        }catch(error){
            dispatch(Widget14Failure())
        }
    }
    loadData();
},[])




    options.yAxis.tickPositions[0]=range;

    return(

    <>

      <Container>
        <Error isError={isError}/>
        <InternalLoading isLoading={isLoading}/>
            <header>
                <strong> Dia Atual</strong>
                <strong>  {weekDay[day]}</strong>
            </header>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget14'}}
            />
            <Percentage>{percentage}%</Percentage>
            <Icons>
                <Item>
                    <strong> {data.planned}</strong>
                    <span> Projetado </span>
                </Item>

                <Item>
                    <strong> {data.goal} </strong>
                    <span> Meta</span>
                </Item>

                <Item>
                    <strong> {data.performed} </strong>
                    <span> Realizado </span>
                </Item>
            </Icons>
        </Container>


    </>
    )

}
