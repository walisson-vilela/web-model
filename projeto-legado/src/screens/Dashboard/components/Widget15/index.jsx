import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Widget15Failure, Widget15Request, Widget15Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';



export function Widget15(){
    const {isError} = useSelector((state) => state.Loading)
    const dispatch = useDispatch()
    const [s0, setS0] = useState({});
    const [s1, setS1] = useState({})
    const [loading, setLoading] = useState(false)

    const options ={
        chart: {
          type: 'column',
          backgroundColor:null
        },
        title: {
            text: ''
        },

        yAxis:{
            title:{
                text: null,
            }
        },
        xAxis:{
            title:{
                text: null
            }
        },

        credits: {
            enabled: false
        },
        colors:['#1E63A3','#2D9AFF'],
        series: [{
            name: 'S1',
            data: [22.22]
        }, {
            name: 'S0',
            data: []
        }]
     }

     useEffect(() =>{
        async function loadData(){
            dispatch(Widget15Request())
            try{
                const response = await api.post('/v1/widgets/stats/15?parents%5B%5D=13',[
                    {
                        "name":"S1",
                         "start":"2021-07-04",
                          "end":"2021-07-10"
                    },
                    {
                         "name":"S0",
                         "start":"2021-07-11",
                        "end":"2021-07-17"
                    }

                ])
                 console.log('SO',response.data.chart.series[0].data[0]);
                 dispatch(Widget15Sucess())
                 setLoading(false)
            }catch(error){
            dispatch(Widget15Failure())
            }
        }
        loadData()
     },[])



 return(

    <>
     <Container>
      <AiOutlineExpandAlt size={20} color="#000"/>
      <Error isError={isError}/>
      <InternalLoading  isLoading={loading}/>
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
