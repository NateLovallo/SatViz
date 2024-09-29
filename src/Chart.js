import React, { useEffect } from "react";
import 'echarts-gl'
import ReactEcharts from "echarts-for-react"; 
import axios from 'axios';

import data from './sats.json'
import basetexture from './world.topo.bathy.200401.jpg'
import htex from './bathymetry_bw_composite_4k.jpg'
import starfield from './starfield.jpg'

class Chart extends React.Component {
    render () {
      return <ReactEcharts
        option={this.getOption()} 
        onEvents={this.onEvents} 
        ref={(e) => { this.echartRef = e; }}
        style={{height: '800px', width: '100%'}} />;
    }

    onChartClick = (params) => {
      console.log('Chart clicked', params['name']);
    };

    onEvents = {
      click: this.onChartClick,
    };

   /* 
    useEffect = () => {
      console.log('hello world')
      axios.get('http://localhost:5000/oneweb_sats')
        .then(function (response) {
          // handle success
          console.log(response);
          const echartInstance = this.echartRef.getEchartsInstance();

          let new_option = this.getOption()
          new_option['series'] = {
            name: "oneweb",
          type: 'scatter3D',
          coordinateSystem: 'globe',
          symbol: 'circle',
          symbolSize: 10,
          data: data
          }

          console.log(new_option);
          echartInstance.setOption(new_option)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    };*/

    getOption = () => {
      let options = {
      responsive: true,
        title: {
          text: 'Oneweb satellites'
        },
        tooltip: {
            show: true
        },
        backgroundColor: '#000',
        globe: {
          //width: 1000,
         // height: 1000,
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
        },
        series: {
          name: "oneweb",
          type: 'scatter3D',
          coordinateSystem: 'globe',
          symbol: 'circle',
          symbolSize: 10,
          data: data
        }
      };

      return options;
    }
  
  };
  
  export default Chart;