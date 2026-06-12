import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";

const Home = lazy(() => import("./pages/HomePage.jsx"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetailsPage.jsx"));
const Projects = lazy(() => import("./pages/ProjectsPage.jsx"));
const Contacts = lazy(() => import("./pages/ContactsPage.jsx"));
const Services = lazy(() => import("./pages/ServicesPage.jsx"));
const Error404 = lazy(() => import("./pages/Error404Page.jsx"));

const App = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh] text-xl font-semibold text-neutral">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
        <BackToTop />

      </main>
      <Footer />
    </div>
  );
};

export default App;
