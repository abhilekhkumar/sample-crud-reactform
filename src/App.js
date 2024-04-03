import { Route, Routes } from "react-router-dom";

import Person from "./components/Person/Person";
import AddPerson from "./components/Person/AddPerson";
import ShowPerson from "./components/Person/ShowPerson";
import EditPerson from "./components/Person/EditPerson";

import Header from "./components/Comn_data/Header";
import Home from "./components/Layout/HomePage";

import { MyContext } from "./MyContext";
import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([]);

  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <MyContext.Provider value={{ persons, setPersons }}>
                    <ShowPerson />
                  </MyContext.Provider>
                </>
              }
            />
            <Route
              path="/edit-person/:id"
              element={
                <MyContext.Provider value={{ persons, setPersons }}>
                  <EditPerson />
                </MyContext.Provider>
              }
            />
            <Route
              path="/person/:id"
              element={
                <MyContext.Provider value={{ persons }}>
                  <Person />
                </MyContext.Provider>
              }
            />
            <Route
              path="/add-person"
              element={
                <MyContext.Provider value={{ persons, setPersons }}>
                  <AddPerson />
                </MyContext.Provider>
              }
            />
            <Route
              path="/show-person"
              element={
                <MyContext.Provider value={{ persons, setPersons }}>
                  <ShowPerson />
                </MyContext.Provider>
              }
            />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
