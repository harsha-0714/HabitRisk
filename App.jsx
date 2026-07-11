import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/survey" element={<Survey />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/result" element={<Result />} />

        </Routes>

    );
}

export default App;