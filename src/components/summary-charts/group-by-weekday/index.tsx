import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { base_layout, palette_pastel_bright } from "../chart_utils";

const GroupByWeekday = () => {
  const [data, setData] = useState([
    {
      x: [],
      y: [],
    },
  ]) as Array<any>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/parquet/groupby/report_date/weekday`
      );
      const { data } = result;
      const values = Object.values(data) as Array<number>;
      const chartData = [
        {
          y: values,
          x: Object.keys(data),
          mode: "markers",
          marker: {
            color: palette_pastel_bright,
            size: values.map((val: number) => val * 0.6),
          },
        },
      ];
      setData(chartData);
    };
    fetchData();
  }, []);

  const layout = {
    title: "Incident Reports by Weekday",
    showlegend: false,
    ...base_layout,
  };

  return <Plot data={data} layout={layout} />;
};

export default GroupByWeekday;
