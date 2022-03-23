import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { base_layout, palette_pastel } from "../chart_utils";

const GroupByMonth = () => {
  const [data, setData] = useState([
    { x: [], y: [], type: "bar" },
  ]) as Array<any>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/parquet/groupby/report_date/month`
      );
      const { data } = result;
      const chartData = [
        {
          y: Object.values(data) as Array<number>,
          x: Object.keys(data) as Array<String>,
          type: "bar",
          marker: {
            color: palette_pastel,
          },
        },
      ];
      setData(chartData);
    };
    fetchData();
  }, []);

  return (
    <Plot
      data={data}
      layout={{ title: "Incident Reports by Month", ...base_layout }}
    />
  );
};

export default GroupByMonth;
