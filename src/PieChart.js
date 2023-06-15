import React, { useEffect, useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import "./index.css";

const PieChart = () => {
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

  const generateColors = (count) => {
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

    const generatedColors = [];
    for (let i = 0; i < count; i++) {
      generatedColors.push(colors[i % colors.length]);
    }

    return generatedColors;
  };

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
    color: generateColors(data.length),

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

export default PieChart;
