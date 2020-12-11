import React, { useState } from "react";
import Canada from "@svg-maps/canada";
import { SVGMap } from "react-svg-map";
import { getLocationName } from "../utils";
import "react-svg-map/lib/index.css";

const CanMapChart = () => {
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
    const style = {
      display: "block",
      top: event.clientY - 10,
      left: event.clientX - 100,
    };
    setTooltipStyle({ style });
  };

  return (
    <div className="examples__block__map examples__block__map--usa">
      <SVGMap
        map={Canada}
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

export default CanMapChart;
