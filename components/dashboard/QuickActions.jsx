import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function QuickActions() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Quick Actions

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <Link

                    to="/survey"

                    className="bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-lg"

                >

                    ➕ New Assessment

                </Link>

                <Link

                    to="/result"

                    className="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg"

                >

                    📊 Latest Result

                </Link>

                <button

                    onClick={() => {

                        logout();

                        navigate("/");

                    }}

                    className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg"

                >

                    🚪 Logout

                </button>

            </div>

        </div>

    );

}

export default QuickActions;