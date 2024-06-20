import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Participants } from "./components/Participants";
import { Disciplins } from "./components/Disciplins";
import Layout from "./Layout";

import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/participants" element={<Participants />} />
        </Routes>

        <Routes>
          <Route path="/disciplins" element={<Disciplins />} />
        </Routes>
      </Layout>
    </>
  );
}
