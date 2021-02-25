import React from "react";

import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "Web App" };
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main className="App-main">
          <MainPage />
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
