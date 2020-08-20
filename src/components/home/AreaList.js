import React from "react";
import Area from "./Area";
import "./AreaList.css";

const AreaList = (props) => {
  return (
    <>
      <article className="explorerList">
        <h3>Parks</h3>
        {props.areas.map((area) => (
          <Area
            key={area.id}
            getAttractions={props.getAttractions}
            area={area}
          />
        ))}
      </article>

    </>
  );
};

export default AreaList;
