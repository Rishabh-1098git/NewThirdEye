import React from "react";
import "./Card.css";
// import image from "./rishabh.jpg";

function Card({ name, age, crime, image, criminals, setCriminals }) {
  const handleTerminate = () => {
    // Filter out the criminal with the given ID
    const updatedCriminals = criminals.filter((c) => c.name !== name);

    // Update the state with the filtered list
    setCriminals(updatedCriminals);
  };
  return (
    <div class="wanted-card">
      <img src={image} alt="Criminal Image" />
      <h2>{name}</h2>
      <p>Age:{age}</p>
      <p>Crime: {crime}</p>
      <button onClick={handleTerminate}>Terminated</button>
    </div>
  );
}

export default Card;
