import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Card from "./components/Card";
import AddCard from "./components/AddCard";
import AddCardForm from "./components/AddCardForm";

function App() {
  const [page, setpage] = useState("home");
  const [subpage, setSubpage] = useState("wanted-list");

  const wantedCriminals = [
    {
      name: "Rishabh Saini",
      age: "52",
      crime: "Less Attendance",
      image: "http://localhost:5173/src/components/rishabh.jpg",
    },
    {
      name: "Rishabh Saini",
      age: "52",
      crime: "Less Attendance",
      image: "http://localhost:5173/src/components/rishabh.jpg",
    },
    {
      name: "Rishabh Saini",
      age: "52",
      crime: "Less Attendance",
      image: "http://localhost:5173/src/components/rishabh.jpg",
    },
    {
      name: "Rishabh Saini",
      age: "52",
      crime: "Less Attendance",
      image: "http://localhost:5173/src/components/rishabh.jpg",
    },
    {
      name: "Rishabh Saini",
      age: "52",
      crime: "Less Attendance",
      image: "http://localhost:5173/src/components/rishabh.jpg",
    },
    {
      name: "Rishabh Saini",
      age: "52",
      crime: "Less Attendance",
      image: "http://localhost:5173/src/components/rishabh.jpg",
    },
  ];
  const [addCard, setAddCard] = useState(false);
  const [criminals, setCriminals] = useState(wantedCriminals);
  return (
    <div className="main-container">
      <Header page={page} setpage={setpage} />
      {page === "home" ? <Hero /> : null}
      <div className="main-page">
        {page === "login" ? <Login page={page} setpage={setpage} /> : null}
        {page === "dashboard" ? (
          <DashBoard subpage={subpage} setSubpage={setSubpage} />
        ) : null}
        {page === "dashboard" && subpage === "add-card" ? (
          <AddCardForm
            criminals={criminals}
            setCriminals={setCriminals}
            setSubpage={setSubpage}
          />
        ) : null}
        ;
        {page === "dashboard" && subpage === "wanted-list" ? (
          <div className="card-container">
            <AddCard subpage={subpage} setSubpage={setSubpage}></AddCard>
            {criminals.map((criminal) => (
              <Card
                name={criminal.name}
                age={criminal.age}
                crime={criminal.crime}
                image={criminal.image}
                criminals={criminals}
                setCriminals={setCriminals}
              ></Card>
            ))}
          </div>
        ) : null}
        {page === "dashboard" && subpage === "cameras" ? (
          <div className="camera-container"></div>
        ) : null}
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
