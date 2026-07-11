import { useEffect, useState } from "react";
import api from "../services/api";

import DashboardCards from "../components/dashboard/DashboardCards";
import TrendChart from "../components/dashboard/TrendChart";
import LatestAssessment from "../components/dashboard/LatestAssessment";
import TopFactors from "../components/dashboard/TopFactors";
import Navbar from "../components/dashboard/Navbar";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get("/survey/history");
            setHistory(response.data.history);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100">

    <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    HealthRisk Radar Dashboard
                </h1>

                {/* Statistics Cards */}
                <DashboardCards history={history} />

                {/* Trend Chart */}
                <TrendChart history={history} />

                <LatestAssessment history={history} />
                <TopFactors history={history} />
                <QuickActions />
                

            </div>

        </div>
    );
}

export default Dashboard;