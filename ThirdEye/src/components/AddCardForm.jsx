import React, { useState } from "react";
import "./AddCardForm.css";

function AddCardForm({ criminals, setCriminals, setSubpage }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [crime, setCrime] = useState("");
  const [image, setImage] = useState("");

  // Handle input changes to update state
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(parseInt(e.target.value));
  };

  const handleCrimeChange = (e) => {
    setCrime(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImage(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const newCriminal = {
      name,
      age,
      crime,
      image, // Save the file object (could also save as URL)
    };

    setCriminals([newCriminal, ...criminals]); // Add the new criminal to the list

    // Clear form fields after submission
    setName("");
    setAge("");
    setCrime("");
    setImage("");

    setSubpage("wanted-list");
  };

  return (
    <div className="form-container">
      <h2>Add New Criminal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            required
            value={age}
            onChange={handleAgeChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="crime">Crime:</label>
          <input
            type="text"
            id="crime"
            name="crime"
            required
            value={crime}
            onChange={handleCrimeChange}
          />
        </div>

        <div class="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image URL"
            required
            value={image}
            onChange={handleImageUrlChange}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Add Criminal" />
        </div>
      </form>
    </div>
  );
}

export default AddCardForm;
