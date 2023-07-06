import React from "react";
import ChartComponent from "./ChartComponent";
import DataGridComponent from "./DataGridComponent";
import ScoreCardChart from "./ChartScoreCard";

function App() {
  return (
    <div className="App">
      <DataGridComponent />
      <ChartComponent />
      <ScoreCardChart />
    </div>
  );
}

export default App;
