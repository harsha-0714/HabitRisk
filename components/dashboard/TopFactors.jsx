function TopFactors({ history }) {

    if (history.length === 0) {

        return null;

    }

    const latest = history[history.length - 1];

    const featureNames = {
        sleep_hours: "😴 Sleep Hours",
        diet_score: "🥗 Diet Quality",
        activity_level: "🏃 Physical Activity",
        stress_level: "🧘 Stress Level",
        smoking_status: "🚭 Smoking Status",
        alcohol_use: "🍺 Alcohol Consumption",
        screen_time: "📱 Screen Time",
    };

    const recommendations = {
        sleep_hours: "Aim for 7–9 hours of sleep every night.",
        diet_score: "Increase fruits, vegetables and whole grains.",
        activity_level: "Exercise at least 30 minutes daily.",
        stress_level: "Practice meditation or breathing exercises.",
        smoking_status: "Avoid smoking and seek cessation support.",
        alcohol_use: "Reduce alcohol consumption.",
        screen_time: "Reduce recreational screen time.",
    };

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                🧠 Top AI Contributing Factors

            </h2>

            <div className="space-y-4">

                {latest.shapContributions?.slice(0,3).map((item,index)=>(

                    <div
                        key={index}
                        className="flex justify-between items-center bg-slate-50 rounded-lg p-4"
                    >

                        <span className="font-semibold">

                            {featureNames[item.feature]}

                        </span>

                        <span
                            className={`font-bold ${
                                item.contribution >=0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                        >

                            {item.contribution>0?"+":""}
                            {item.contribution.toFixed(4)}

                        </span>

                    </div>

                ))}

            </div>

            <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">

                    Personalized Recommendations

                </h3>

                <div className="space-y-3">

                    {latest.shapContributions?.slice(0,3).map((item,index)=>(

                        <div
                            key={index}
                            className="bg-blue-50 rounded-lg p-4"
                        >

                            ✅ {recommendations[item.feature]}

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default TopFactors;