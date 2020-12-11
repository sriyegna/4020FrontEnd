import React, { useState } from "react";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "./utils";
import "react-svg-map/lib/index.css";

const MapChart = (props) => {
  const { map, country, data, metric } = props;
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });

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
    setTooltipStyle({ tooltipStyle });
  };

  const calcPercentage = (value, max, min) => {
    if (max === min) return 0;
    return (value - min) / (max - min);
  };

  const getLocationClassName = (location, index) => {
    const abbr = country === "United States" ? "usa" : "can";
    let name = location.name;
    if (name === "Yukon") {
      name = "Yukon Territory";
    }
    const metr = metric === "Public Transit" ? "transit" : metric.toLowerCase();
    console.log(metr);
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
      <div className="examples__block__map__tooltip" style={tooltipStyle}>
        {pointedLocation}
      </div>
    </div>
  );
};

export default MapChart;
