import React, { useEffect, useState, useRef } from "react";
import 'echarts-gl'
import ReactEcharts from "echarts-for-react"; 
import axios from 'axios';
import basetexture from './world.topo.bathy.200401.jpg'
import htex from './bathymetry_bw_composite_4k.jpg'
import starfield from './starfield.jpg'

const satApi = 'http://localhost:5000/oneweb_sats';

function Chart() {

    const onChartClick = (params) => {
      console.log('Chart clicked', params['name']);
    };

    const onEvents = {
      click: onChartClick,
    };

    const eChartsRef = useRef(null);

    const apiCall = async () => {
      axios.get(satApi)
        .then(resp => {      
         //console.log(resp)
          let opts = options;
         opts['series'] = {
          name: "oneweb",
          type: 'scatter3D',
          coordinateSystem: 'globe',
          symbol: 'circle',
          symbolSize: 10, 
            data: resp.data
         } 
         if (eChartsRef && eChartsRef.current) {
          console.log(opts)
          var chart = eChartsRef.current?.getEchartsInstance()
          chart.setOption(opts)
         }
         console.log('chartRef inst: ' + eChartsRef.current)
        })
    }

    apiCall()
    
    setInterval(() => apiCall(), 5000)

    const options = {
      responsive: true,
        title: {
          text: 'Oneweb satellites'
        },
        tooltip: {
            show: true
        },
        backgroundColor: '#000',
        animation: true,
        globe: {
          baseTexture: basetexture,
          heightTexture: htex,
          shading: 'realistic',
          environment: starfield,
          light: {
            ambient: {
              intensity: 0.4
            },
            main: {
              intensity: 0.4
            }
          },
          viewControl: {
            autoRotate: false
          }
        }
      };

    return <ReactEcharts
        option={options} 
        onEvents={onEvents} 
        ref={eChartsRef}
        style={{height: '800px', width: '100%'}} />;
  
  };
  
  export default Chart;