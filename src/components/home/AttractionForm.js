import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const AttractionForm = (props) => {
  const [attraction, setAttraction] = useState({ name: "", areaId: "" });
  const [areas, setAreas] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getParkAreas = () => {
    if (isAuthenticated()) {
      fetch("http://localhost:8000/parkareas", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("kennywood_token")}`,
        },
      })
        .then((response) => response.json())
        .then((allAreas) => {
          setAreas(allAreas);
        });
    }
  };

  useEffect(() => {
    getParkAreas();
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...attraction };
    stateToChange[evt.target.id] = evt.target.value;
    setAttraction(stateToChange);
  };

  const constructNewAttraction = (evt) => {
    evt.preventDefault();
    
    if (attraction.name === "" || attraction.ateaId === "") {
      window.alert("Please input attraction name and area");
    } else {
      const theAttraction = {
        name: attraction.name,
        area_id: parseInt(attraction.areaId),
      };
      
        fetch("http://localhost:8000/attractions", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("kennywood_token")}`,
          },
          body: JSON.stringify(theAttraction),
        })
          .then((response) => response.json())
          .then(() => {
            console.log("Added");
            props.history.push("/attractions");
          });
      
    }
  };
  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Attraction name"
            />
            <label htmlFor="name">Name</label>

            <select id="areaId" onChange={handleFieldChange}>
              <option value="">Park Area</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <div className="alignRight">
            <button type="button" onClick={constructNewAttraction}>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AttractionForm;
