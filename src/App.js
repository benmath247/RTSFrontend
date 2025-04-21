import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import MainNavBar from "./components/nav/MainNavBar";
import AuthProvider from "./providers/AuthProvider";
import SiteFooter from "./components/footer/SiteFooter";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import FavoriteStocksPage from "./pages/FavoriteStocksPage";
import StockData from "./pages/StockDataPage";
import ToastContainerWrapper from "./components/wrappers/ToastContainerWrapper";

function App() {
  return (
    <AuthProvider>
      <ToastContainerWrapper>
        <Router>
          <MainNavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks" element={<StockData />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/favorites"
              element={
                <FavoriteStocksPage
                  favoriteStocks={[
                    {
                      symbol: "AAPL",
                      name: "Apple Inc.",
                      price: 150,
                      change: 1.2,
                      marketCap: "2.5T",
                    },
                    {
                      symbol: "GOOGL",
                      name: "Alphabet Inc.",
                      price: 2800,
                      change: -0.5,
                      marketCap: "1.8T",
                    },
                    {
                      symbol: "AMZN",
                      name: "Amazon.com Inc.",
                      price: 3400,
                      change: 0.8,
                      marketCap: "1.7T",
                    },
                  ]}
                />
              }
            />
          </Routes>
          <SiteFooter />
        </Router>
      </ToastContainerWrapper>
    </AuthProvider>
  );
}

export default App;
