import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import { Layout } from "./Layout";
import RegisterPage from "./pages/RegisterPage";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />}/>
          <Route path='register' element={<RegisterPage />}/>
          <Route path='order' element={<OrderPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
