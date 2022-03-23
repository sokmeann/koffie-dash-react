import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { base_layout, palette_pastel_bright } from "../chart_utils";

const GroupByMake = () => {
  const [data, setData] = useState([
    { values: [], labels: [], type: "pie" },
  ]) as Array<any>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/parquet/groupby/make/10`
      );
      const { data } = result;
      const chartData = [
        {
          values: Object.values(data) as Array<number>,
          labels: Object.keys(data) as Array<String>,
          type: "pie",
          marker: {
            colors: palette_pastel_bright,
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
      layout={{ title: "Incident Reports by Make", ...base_layout }}
    />
  );
};

export default GroupByMake;
