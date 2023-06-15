import React, { useEffect, useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import "./index.css";

/**
 ******************************* LineChart **********************************
 *
 * */

const LineChart = ({ colors }) => {
  const xdata = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = [
    { name: "a", value: [150, 230, 224, 218, 135, 147, 260] },
    { name: "b", value: [160, 250, 21, 518, 95, 77, 210] },
    { name: "c", value: [100, 200, 101, 318, 195, 107, 210] },
    { name: "d", value: [10, 20, 11, 31, 15, 17, 20] },
  ];

  const dataSeries = () => {
    return data.map((item) => ({
      name: item.name,
      type: "line",
      smooth: true,
      data: item.value,
      symbol: "circle",
      symbolSize: 6,
    }));
  };
  const [options, setOptions] = useState({
    color: colors,
    legend: {
      data: data.map((item) => item.name),
      bottom: "bottom",
      icon: "circle",
      itemGap: 25,
    },
    xAxis: {
      type: "category",
      data: xdata,
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
      },
    },
    series: dataSeries(),
  });

  return (
    <ECharts
      option={options}
      opts={{ renderer: "svg", width: "auto", height: "auto" }}
    />
  );
};

/**
 ******************************* PieChart **********************************
 *
 * */

const PieChart = ({ colors }) => {
  const data = [
    { value: 1048, name: "서울특별시" },
    { value: 735, name: "부산광역시" },
    { value: 580, name: "경기도" },
    { value: 484, name: "경상남도" },
    { value: 620, name: "경상북도" },
    { value: 378, name: "대구광역시" },
    { value: 921, name: "충청남도" },
    { value: 513, name: "대전광역시" },
    { value: 666, name: "충청북도" },
    { value: 100, name: "나머지 항목" },
  ];

  const [options, setOptions] = useState({
    tooltip: {
      trigger: "item",
      formatter: "{c}",
      textStyle: {
        fontSize: 14,
        color: "#000000",
      },
    },

    legend: {
      orient: "vertical",
      right: "15%",
      bottom: "40",
      itemWidth: 9,
      itemHeight: 9,
      textStyle: {
        fontSize: 10,
      },
    },
    color: colors,

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        label: {
          show: true,
          color: "#ffffff",
          align: "center",
          position: "inside",
          formatter: "{d}%",
          fontSize: 9,
        },
        labelLine: { show: false },
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          borderWidth: "1",
          borderColor: "#ffffff",
        },
      },
    ],
  });

  return (
    <div className="pieChartDiv">
      <div className="pieChart">
        <ECharts
          option={options}
          opts={{ renderer: "svg", width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

/**
 ******************************* BarChart **********************************
 *
 * */

const BarChart = ({ colors }) => {
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
          color: colors,
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

/**
 ******************************* DynamicChart **********************************
 *
 * */
const DynamicChart = ({ colors }) => {
  const category = ["Bardata", "Linedata"];

  const data = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const bardata = [
    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
  ];

  const linedata = [
    2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
  ];

  const [options, setOptions] = useState({
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: category,
      bottom: "bottom",
      icon: "circle",
      itemGap: 25,
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        data: data,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: category[0],
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
      {
        type: "value",
        name: category[1],
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
    ],
    series: [
      {
        name: category[0],
        type: "bar",
        data: bardata,
        smooth: true,
      },

      {
        name: category[1],
        type: "line",
        yAxisIndex: 1,
        data: linedata,
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  });

  return (
    <div className="DynamicChart">
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};

/**
 ******************************* AreaChart **********************************
 *
 * */
const AreaChart = () => {
  const data = [0, 145, 211, 301, 234, 290, 130, 110, 0];
  //   const datazero = [145, 211, 301, 234, 290, 130, 110];

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: data,
        type: "line",
        areaStyle: {
          color: "rgba(65,128,236,0.2)",
        },
        color: "rgba(65,128,236,0.5)",
        symbol: "circle",
        symbolSize: 3,
      },
    ],
  });

  return (
    <ECharts
      option={options}
      opts={{ renderer: "svg", width: "auto", height: "auto" }}
    />
  );
};

const ChartComponent = () => {
  const colors = [
    "#4180ec",
    "#4fd9bc",
    "#494e5f",
    "#30c7e9",
    "#6269e9",
    "#00aaaa",
    "#42c360",
    "#b5cf14",
    "#eaab2f",
    "#bababa",
  ];

  return (
    <div>
      <AreaChart />
      <LineChart colors={colors} />
      <DynamicChart colors={colors} />
      <PieChart colors={colors} />
      <BarChart color={colors} />
    </div>
  );
};

export default ChartComponent;