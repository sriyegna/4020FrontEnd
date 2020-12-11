import React, { useState } from "react";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "./utils";
import "react-svg-map/lib/index.css";
import { Typography, Link } from "@material-ui/core";

const MapChart = (props) => {
  const { map, country, data, metric } = props;
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });
  const [metr, setMetr] = useState(
    metric === "Public Transit" ? "transit" : metric.toLowerCase()
  );

  React.useEffect(() => {
    setMetr(metric === "Public Transit" ? "transit" : metric.toLowerCase());
  }, [metric]);

  const handleLocationMouseOver = (event) => {
    const location = getLocationName(event);
    setPointedLocation(location);
  };

  const handleLocationMouseOut = (event) => {
    setPointedLocation(null);
    setTooltipStyle({ display: "none" });
  };

  const handleLocationMouseMove = (event) => {
    const tooltipStyle = {
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100,
    };
    setTooltipStyle({ ...tooltipStyle });
  };

  const calcPercentage = (value, max, min) => {
    if (max === min) return 0;
    return (value - min) / (max - min);
  };

  const getValue = (name) => {
    if (name === "Yukon") {
      name = "Yukon Territory";
    } else if (name === "Nunavut") {
      return "Unavailable";
    }
    if (data.regions[name]) {
      return data.regions[name][metr] || "Unavailable";
    }
  };

  const getLocationClassName = (location, index) => {
    const abbr = country === "United States" ? "usa" : "can";
    let name = location.name;
    if (name === "Yukon") {
      name = "Yukon Territory";
    }
    if (data.regions[name]) {
      const value = data.regions[name][metr];
      const max = data.max[metr];
      const min = data.min[metr];
      let increment = (calcPercentage(value, max, min) * 10).toFixed(0);
      if (increment >= 10 || increment < 0) {
        increment = 0;
      }
      return `${abbr}_heat_${Math.abs(increment)}`;
    }
  };

  const getMinMaxMessage = () => {
    return `Minimum value for ${metric} in the date range selected is ${data.min[metr]} and the maximum is ${data.max[metr]}`;
  };

  return (
    <div
      className="examples__block__map examples__block__map--usa"
      style={{ width: "100%" }}
    >
      <SVGMap
        className="svgMapClass"
        map={map}
        locationClassName={getLocationClassName}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
        onLocationMouseMove={handleLocationMouseMove}
      />
      {country === "Canada" ? (
        <Typography align="center" variant="h6">
          *No data is available for Nunavut*
        </Typography>
      ) : null}
      <Typography align="center">
        Data is based on a base value of 100 taken on 2020/01/13.
      </Typography>
      <Typography align="center">
        Minimum value for {metric} in the date range selected is{" "}
        {data.min[metr]} and the maximum is {data.max[metr]}
      </Typography>
      <Typography align="center">
        <Link href="https://covid19.apple.com/mobility">
          *Data is based on Apple Mobility Data.*
        </Link>
      </Typography>
      <div className="examples__block__map__tooltip" style={tooltipStyle}>
        <div>{pointedLocation}</div>
        <div>Value: {getValue(pointedLocation)}</div>
      </div>
    </div>
  );
};

export default MapChart;
