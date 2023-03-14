import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Content from "./components/content";
import axios from "axios";
function App() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setLocation(
          `${response.data.city}, ${response.data.region}, ${response.data.country_name}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <Header location={location}/>
      <Content location={location}/>
    </div>
  );
}

export default App;
