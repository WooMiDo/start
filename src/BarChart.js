import React, { useEffect, useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";

const BarChart = () => {
  const data = [
    { value: 21, name: "Direct" },
    { value: 13, name: "Referral" },
  ];

  const [options, setOptions] = useState({
    yAxis: {
      type: "category",
      data: data.map((item) => item.name).reverse(),
    },
    xAxis: {
      type: "value",
      splitNumber: 5,
      interval: 5,
    },
    series: [
      {
        data: data.map((item) => item.value).reverse(),
        type: "bar",
        itemStyle: {
          color: "#4180ec",
        },
        barWidth: "80%",
      },
    ],
  });

  return (
    <div className="BarChartDiv">
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default BarChart;
