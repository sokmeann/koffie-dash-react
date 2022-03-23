import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { base_layout, palette_pastel_bright } from "../chart_utils";

const GroupByYear = () => {
  const [byYearData, setByYearData] = useState([
    { x: [], y: [], type: "scatter" },
  ]) as Array<any>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/parquet/groupby/report_date/year`
      );
      const { data } = result;
      const chartData = [
        {
          y: Object.values(data) as Array<number>,
          x: Object.keys(data) as Array<String>,
          type: "scatter",
          line: {
            color: palette_pastel_bright[0],
            width: 3,
          },
        },
      ];
      setByYearData(chartData);
    };
    fetchData();
  }, []);

  return (
    <Plot
      data={byYearData}
      layout={{ title: "Incident Reports by Year", ...base_layout }}
    />
  );
};

export default GroupByYear;
