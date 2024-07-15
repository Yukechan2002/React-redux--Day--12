// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./components/Card";
import { Provider } from "react-redux";
import store from "./components/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Shopping Cart</h1>
        </header>
        <div className="main-content">
          <Card />
        </div>
        <footer className="App-footer">
          <p>© 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
