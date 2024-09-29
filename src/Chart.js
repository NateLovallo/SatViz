import React, { useEffect } from "react";
import 'echarts-gl'
import ReactEcharts from "echarts-for-react"; 
import axios from 'axios';

import data from './sats.json'
import basetexture from './world.topo.bathy.200401.jpg'
import htex from './bathymetry_bw_composite_4k.jpg'
import starfield from './starfield.jpg'

function Chart() {

    var routes = [
        [ -112.0391, 46.5891  ],
        [ -111.0373 ,  45.679 ],
        [ -122.3328,  47.6061 ],
        [ -84.3885, 33.7501 ]
    ];

    console.log(JSON.stringify(routes, null, 2));

    const option = {
        title: {
          text: 'Oneweb satellites'
        },
        tooltip: {
            show: true
        },
        backgroundColor: '#000',
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


    return <ReactEcharts option={option} />;
  }
  
  export default Chart;