import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Participants } from "./components/Participants";
import { Disciplins } from "./components/Disciplins";
import { Results } from "./components/Results";
import ParticipantForm from "./form/OpretForm";
import DisciplinForm from "./form/OpretFormDisciplin";
import ResultForm from "./form/OpretResults";

import Home from "./components/Home";

import Layout from "./Layout";

import "./App.css";
export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/participants" element={<Participants />} />
        </Routes>

        <Routes>
          <Route path="/disciplins" element={<Disciplins />} />
        </Routes>

        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>

        <Routes>
          <Route path="/disciplinform" element={<DisciplinForm />} />
        </Routes>

        <Routes>
          <Route path="/opretform" element={<ParticipantForm />} />
        </Routes>

        <Routes>
          <Route path="/opretresult" element={<ResultForm />} />
        </Routes>
      </Layout>
    </>
  );
}
