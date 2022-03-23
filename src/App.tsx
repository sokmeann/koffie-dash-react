import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "./components/grid";
import GroupByYear from "./components/summary-charts/group-by-year";
import GroupByMonth from "./components/summary-charts/group-by-month";
import GroupByWeekday from "./components/summary-charts/group-by-weekday";
import GroupByMake from "./components/summary-charts/group-by-make";
import GroupByModel from "./components/summary-charts/group-by-model";
import GroupByRoadCondition from "./components/summary-charts/group-by-road-condition";
import GroupByWeatherCondition from "./components/summary-charts/group-by-weather-condition";

import "./App.css";

import "gridjs/dist/theme/mermaid.css";

const tabs = [
  { key: 0, label: "General" },
  { key: 1, label: "By Report Date" },
  { key: 2, label: "Explore Data" },
];

const App = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/parquet`
      );
      setData(result?.data);
    };
    fetchData();
  }, []);

  const handleTabClick = (idx: number) => {
    setTabIdx(idx);
  };

  return (
    <div className="App" style={{ padding: "2%" }}>
      <div className="tabs-menu">
        {tabs.map((tab) => {
          return (
            <div
              className={`tab ${tabIdx === tab.key ? "tab-active" : ""}`}
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
      {tabIdx === 2 && <Grid data={data} />}
      {tabIdx === 1 && (
        <div>
          <GroupByYear />
          <GroupByMonth />
          <GroupByWeekday />
        </div>
      )}
      {tabIdx === 0 && (
        <div>
          <GroupByMake />
          <GroupByModel />
          <GroupByRoadCondition />
          <GroupByWeatherCondition />
        </div>
      )}
    </div>
  );
};

export default App;
