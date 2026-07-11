import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/survey"
                element={
                    <ProtectedRoute>

                        <Survey />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />

            <Route
    path="/result"
    element={<Result />}
/>

        </Routes>

    );
}

export default App;