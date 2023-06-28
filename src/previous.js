import React, { useEffect, useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import { Radio, Select } from "antd";
import "./index.css";

/**
 ******************************* ScoreCart 숫자형 ******************************
 *
 * */

const NumberScoreCard = () => {
  const data = [
    { id: 1, name: "페이지뷰", value: 32 },
    { id: 2, name: "전체 방문수", value: 27 },
    { id: 3, name: "북마크/직접입력 방문수", value: 17 },
    { id: 4, name: "외부유입 방문 랜딩페이지 통과율", value: "44.44%" },
    { id: 5, name: "전체 반송수", value: 22 },
  ];

  return (
    <table className="scorecard">
      <tbody>
        <tr>
          {data.map((item) => (
            <td key={item.id} className="cardName">
              {item.name}
              <br /> <strong className="emphasis">{item.value}</strong>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

/**
 ******************************* ScoreCart 차트형 ******************************
 *
 * */

const ChartScoreCard = () => {
  const title = "총 광고비";
  const value = "3,283,872";
  const unit = "원";
  const percent = 100;
  const upAnddown = percent > 0 ? "▲" : "▼";
  const upAnddownColor = percent > 0 ? "#de481f" : "#4993e4";

  return (
    <div className="chartScoreCardDiv">
      <div className="chartScoreCard">
        <h3 className="CardTitle">{title}</h3>
        <div className="CardValueDiv">
          <h1 className="CardValue">
            {value}
            <span className="won">{unit}</span>
          </h1>
          <span className="percent">
            ( {percent}%{" "}
            <span className="upAnddown" style={{ color: upAnddownColor }}>
              &nbsp;{upAnddown}
            </span>{" "}
            )
          </span>
        </div>
        <div className="areaChartCard">
          <AreaChart />
        </div>
      </div>
    </div>
  );
};

/**
 ******************************* LineChart **********************************
 *
 * */

const LineChart = ({ colors }) => {
  //x축 데이터
  const xdata = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //실제 데이터 (이름, 값)
  const data = [
    { name: "a", value: [150, 230, 224, 218, 135, 147, 260] },
    { name: "b", value: [160, 250, 21, 518, 95, 77, 210] },
    { name: "c", value: [100, 200, 101, 318, 195, 107, 210] },
    { name: "d", value: [10, 20, 11, 31, 15, 17, 20] },
    { name: "e", value: [110, 60, 111, 91, 215, 117, 120] },
    { name: "f", value: [30, 40, 91, 101, 115, 117, 200] },
  ];

  //차트에 데이터값 출력
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

  //차트 속성
  const [options] = useState({
    grid: {
      left: 50,
      right: 50,
      top: 10,
      bottom: 50,
    },
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
      // opts={{ renderer: "svg", width: "auto", height: "auto" }}
    />
  );
};

/**
 ******************************* PieChart **********************************
 *
 * */

const PieChart = ({ colors }) => {
  //실제 데이터 (이름, 값)
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
    { value: 100, name: "기타" },
  ];

  //data이름이 기타일 경우 지정색 고정
  const ColoredData = data.map((item) => ({
    ...item,
    itemStyle: {
      color:
        item.name === "기타"
          ? "#bababa"
          : colors[data.findIndex((d) => d.name === item.name)],
    },
  }));

  const [options] = useState({
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
        data: ColoredData,
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
          // opts={{ renderer: "svg", width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

/**
 ******************************* BarChart **********************************
 *
 * */

const BarChart = () => {
  //실제 데이터 (이름, 값)
  const data = [
    { value: 21, name: "Direct" },
    { value: 13, name: "Referral" },
  ];

  const [options] = useState({
    grid: {
      left: 100,
      right: 100,
      top: 50,
      bottom: 50,
    },
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
    <div className="BarChartDiv" style={{ height: "400px" }}>
      <ECharts
        option={options}
        // opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};

/**
 ******************************* DynamicChart **********************************
 *
 * */
const DynamicChart = ({ colors }) => {
  //범례
  const category = ["Bardata", "Linedata"];

  //x축 데이터
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

  //barchart로 출력될 데이터
  const bardata = [
    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
  ];

  //linechart로 출력될 데이터
  const linedata = [
    2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
  ];

  const [options] = useState({
    grid: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
    },
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
        // opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};

/**
 ******************************* AreaChart **********************************
 *
 * */
const AreaChart = () => {
  //실제 데이터
  const data = [0, 145, 211, 301, 234, 290, 130, 100, 0];
  //   const datazero = [145, 211, 301, 234, 290, 130, 110];

  const [options] = useState({
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
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
    <div className="AreaChart">
      <ECharts
        option={options}
        style={{ height: "30px" }}
        // opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </div>
  );
};

/**
 ******************************* FilterChart **********************************
 *
 * */
const FilterChart = () => {
  const handleSizeChange = () => {};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: 20,
      }}
    >
      <div>
        <Radio.Group onChange={handleSizeChange}>
          <Radio.Button value="a">광고주</Radio.Button>
          <Radio.Button value="b">매체</Radio.Button>
        </Radio.Group>
        &nbsp;&nbsp;
        <Select
          defaultValue={{ value: 10, label: "노출수" }}
          className="selectBox"
          options={[
            { value: 10, label: "노출수" },
            { value: 20, label: "클릭수" },
            { value: 30, label: "CTR" },
            { value: 40, label: "CPC" },
          ]}
          onChange={handleSizeChange}
        />
      </div>
      <div>
        <Radio.Group onChange={handleSizeChange}>
          <Radio.Button value="day">일</Radio.Button>
          <Radio.Button value="week">주</Radio.Button>
          <Radio.Button value="month">월</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

//차트 컬러(순서고정, max 10)
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
  ].slice(0, 10);

  //원하는 차트컴포넌트 출력
  return (
    <div>
      <FilterChart />
      <LineChart colors={colors} />
      <NumberScoreCard />
      <div className="chartScoreCardContainer">
        <ChartScoreCard />
        <ChartScoreCard />
        <ChartScoreCard />
        <ChartScoreCard />
      </div>
      <PieChart colors={colors} />
      <DynamicChart colors={colors} />
      <AreaChart />
      <BarChart />
    </div>
  );
};

export default ChartComponent;
