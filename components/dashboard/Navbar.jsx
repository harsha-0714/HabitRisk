import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-blue-700">

                        🩺 HealthRisk Radar

                    </h1>

                </div>

                <div className="flex items-center gap-6">

                    <span className="font-semibold text-gray-700">

                        Welcome,

                        <span className="text-blue-600">

                            {" "}
                            {user?.name}

                        </span>

                        👋

                    </span>

                    <button

                        onClick={handleLogout}

                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;