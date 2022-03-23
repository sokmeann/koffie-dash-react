import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { base_layout, palette_pastel_bright } from "../chart_utils";

const GroupByRoadCondition = () => {
  const [data, setData] = useState([]) as Array<any>;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/parquet/groupby/road_condition`
      );
      const { data } = result;
      const values = Object.values(data) as Array<number>;
      const chartData = [
        {
          y: values,
          x: Object.keys(data).map(
            (e: string) => `RC - ${e === "undefined" ? "other" : e}`
          ),
          type: "bar",
          marker: {
            color: palette_pastel_bright,
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
      layout={{ title: "Incident Reports by Road Condition", ...base_layout }}
    />
  );
};

export default GroupByRoadCondition;
