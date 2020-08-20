import React from "react";
import Attraction from "./Attraction";
import "./Attractions.css";

const Attractions = (props) => {
  return (
    <>
      <article className="explorerList">
        <h3>Attractions</h3>
        {props.attractions.map((ride) => {
          return <Attraction key={ride.id} ride={ride} {...props} />;
        })}
        <section className="section-content">
          <button
            type="button"
            className="btn"
            onClick={() => {
              props.history.push("/attractions/new");
            }}
          >
            Add New Attraction
          </button>
        </section>
      </article>
    </>
  );
};

export default Attractions;
