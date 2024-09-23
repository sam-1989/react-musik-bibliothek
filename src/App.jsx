import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./Layout/Layout";
import WorksPage from "./pages/WorksPage";
import Composers from "./pages/Composers";
import WorkDetails from "./components/WorkDetails";
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
                        <Route path="/composers" element={<Composers />} />
                        <Route path="/composer/:composerName" element={<WorksPage />} />
                        <Route path="/work/:pageid" element={<WorkDetails />} />
                    </Routes>
                </Layout>
            </Router>
        </AppProvider>
    );
}

export default App;
