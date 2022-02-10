import React, { useState, useEffect } from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

const contractPieChart = ({ campusOrderdStudents }) => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // Register the required components
  echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
  ]);

  return (
    <div className='container'>
      <div className='row'>
        <h1>Contracts per region</h1>
      </div>
      <div className='row'>
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          lazyUpdate={true}
          style={{
            height: '50vh',
            top: 30,
            borderRadius: '30%',
          }}
        />
      </div>
    </div>
  );
};
export default contractPieChart;
