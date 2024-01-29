import { Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";
import Product from "./pages/Product";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Product />}></Route>
      </Routes>
    </div>
  );
}

export default App;
