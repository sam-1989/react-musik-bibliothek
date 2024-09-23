import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ResultPage from "./pages/ResultPage";
import Layout from "./Layout/Layout";
import WorksPage from "./pages/WorksPage";
import Composers from "./pages/Composers";
import { AppProvider } from "./context/AppContext";

function App() {
    return (
        <AppProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<ResultPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/composer/:composerName" element={<WorksPage />} />
                        <Route path="/composers" element={<Composers />} />
                    </Routes>
                </Layout>
            </Router>
        </AppProvider>
    );
}

export default App;
