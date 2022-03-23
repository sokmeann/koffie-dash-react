import { useState } from "react";
import { Grid } from "gridjs-react";
import axios from "axios";
import { h } from "gridjs";
import Box from "@mui/material/Box";
import GoogleMap from "google-map-react";
import Modal from "@mui/material/Modal";
import { transformDataForTable } from "../../util/transform.data";

const columns: Array<string> = [
  "#",
  "report_number",
  "report_date",
  "report_time",
  "city",
  "state",
  "road_condition",
  "weather_condition",
  "incidents",
  "vin",
  "make",
  "model",
  "model_year",
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const toTitleCase = (str: string) => {
  const title = str.split("_");
  const updatedCase = title.map(
    (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return updatedCase.join(" ");
};

const GridComponent = ({ data }: any) => {
  const [openMap, setOpenMap] = useState(false);
  const [locationLabel, setLocationLabel] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const columnHeaders: Array<
    string | { name: string; formatter: (cell: any, row: any) => any }
  > = columns.map((title: string) => toTitleCase(title));

  const handleClickViewMap = async (city: string, state: string) => {
    const getLocationCoordinates = async () => {
      const result = await axios(
        `${process.env.REACT_APP_GEOCODIO_BASE_URL}/geocode?city=${city}&state=${state}&api_key=${process.env.REACT_APP_GEOCODIO_KEY}`
      );
      const coords = result?.data?.results[0]?.location;
      setLocationLabel(`${city}, ${state}`);
      setCoordinates(coords);
    };
    getLocationCoordinates();
  };

  const handleResetState = () => {
    setOpenMap(false);
    setLocationLabel("");
    setCoordinates({ lat: 0, lng: 0 });
  };

  const viewMap = {
    name: "Map",
    formatter: (cell: any, row: any) => {
      return h(
        "button",
        {
          className: "view-map-button",
          onClick: async () => {
            await handleClickViewMap(row.cells[4].data, row.cells[5].data);
            setOpenMap(true);
          },
        },
        "Map"
      );
    },
  };

  columnHeaders.splice(6, 0, viewMap);

  const gridProps = new Grid({
    data: transformDataForTable(data, columns),
    columns: columnHeaders,
    fixedHeader: true,
    search: true,
    sort: true,
    autoWidth: true,
    pagination: {
      enabled: true,
      limit: 10,
      summary: true,
    },
    className: {
      container: "grid-wrapper",
    },
  });

  return data.length > 0 ? (
    <div>
      <Grid {...gridProps.props} />
      <Modal
        open={openMap}
        onClose={handleResetState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span>
            <b>{locationLabel}</b>
          </span>
          <div style={{ width: "100%", height: "400px", marginTop: "15px" }}>
            <GoogleMap
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAPS_KEY || "",
                language: "en",
                region: "us",
                libraries: ["places"],
              }}
              center={coordinates}
              zoom={10}
            ></GoogleMap>
          </div>
        </Box>
      </Modal>
    </div>
  ) : (
    <>No Data</>
  );
};

export default GridComponent;
