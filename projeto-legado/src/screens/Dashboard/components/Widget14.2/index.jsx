import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsModules from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget142Failure, Widget142Request, Widget142Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { firstDayWeek, lastDayWeek } from '../../helpers/getCurrentWeek';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container, Icons, Item, Percentage } from './styles';

HighchartsModules(Highcharts)
solidGauge(Highcharts)

export function Widget142(){
    const {isError} = useSelector((state) => state.Loading)
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)
    const [percentage, setPercentage] = useState(0);
    const [range, setRange] = useState(0)
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
            data: [],
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


    useEffect(() =>{
        async function loadData(){
            dispatch(Widget142Request());
            try{
                const response = await api.get(`v1/widgets/stats/14?parents%5B%5D=13&start=${firstDayWeek}&end=${lastDayWeek}`)
                const {data} = response.data
                setData(data);
                setPercentage(data.chart.series[0].data[0])
                setRange(data.goal_amount);
                setLoading(false)
                options.series[0].data[0] = data.goal_amount;
                dispatch(Widget142Sucess())
            }catch(error){
             dispatch(Widget142Failure())
            }
        }
        loadData()
    },[])
    options.yAxis.tickPositions[0]=range;
    return(
    <>
        <Container>
        <Error isError={isError} />
        <InternalLoading  isLoading={loading}/>
            <header>
                <strong> Semana Atual(SO)</strong>
                <div>
                  <strong> S </strong>
                  <strong> T </strong>
                  <strong> Q </strong>
                  <strong> S </strong>
                  <strong> S </strong>
                  <strong> S </strong>
                  <strong> D </strong>
                </div>

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
                    <strong> {data.goal}</strong>
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
