import React from "react";
import "./AddCard.css";
import { GrUserAdd } from "react-icons/gr";
import addUser from "./add-user.png";

function AddCard({ subpage, setSubpage }) {
  return (
    <div class="add-card">
      <button onClick={() => setSubpage("add-card")}>
        <img src={addUser} alt="" className="add-card-img" />
      </button>
    </div>
  );
}

export default AddCard;
