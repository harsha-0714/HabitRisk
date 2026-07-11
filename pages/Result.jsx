import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Result() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("latestResult");

    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  if (!result) {
    return <Navigate to="/survey" replace />;
  }

  const risk = result.riskResult;

  if (!risk) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Prediction Unavailable
          </h1>

          <p className="text-gray-600 mb-6">
            Your survey was saved successfully, but the prediction service is
            temporarily unavailable.
          </p>

          <Link
            to="/survey"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Survey
          </Link>
        </div>
      </div>
    );
  }

  const badgeColor = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const featureNames = {
    sleep_hours: "Sleep Hours",
    diet_score: "Diet Quality",
    activity_level: "Physical Activity",
    stress_level: "Stress Level",
    smoking_status: "Smoking",
    alcohol_use: "Alcohol Consumption",
    screen_time: "Screen Time",
  };

  const recommendationMap = {
    sleep_hours:
      "Aim for 7–9 hours of quality sleep every night.",
    diet_score:
      "Increase fruits, vegetables and whole grains in your diet.",
    activity_level:
      "Perform at least 30 minutes of moderate exercise daily.",
    stress_level:
      "Practice meditation, yoga or breathing exercises regularly.",
    smoking_status:
      "Avoid smoking and consider a smoking cessation program.",
    alcohol_use:
      "Reduce alcohol consumption to recommended weekly limits.",
    screen_time:
      "Reduce recreational screen time and take frequent breaks.",
  };

  const topFactors = risk.shapContributions
    .slice(0, 3)
    .map((item) => featureNames[item.feature] || item.feature);

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-center mb-10">
            Health Risk Assessment Report
          </h1>

          {/* Summary Cards */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-50 rounded-xl p-6 text-center shadow">

              <h2 className="text-lg font-semibold">
                Overall Health Risk
              </h2>

              <p className="text-6xl font-bold text-blue-700 mt-5">
                {risk.overallRisk}
              </p>

              <p className="text-gray-500 text-lg">
                /100
              </p>

            </div>

            <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">

              <h2 className="text-lg font-semibold">
                Risk Level
              </h2>

              <span
                className={`inline-block mt-6 px-6 py-3 rounded-full text-white font-bold text-xl ${badgeColor[risk.riskCategory]}`}
              >
                {risk.riskCategory.toUpperCase()}
              </span>

            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center shadow">

              <h2 className="text-lg font-semibold">
                Prediction Confidence
              </h2>

              <p className="text-6xl font-bold text-green-600 mt-5">
                {risk.confidence}%
              </p>

            </div>

          </div>

          {/* Explanation */}

          <div className="mt-10 bg-gray-50 rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Explanation
            </h2>

            <p className="text-gray-700 leading-8">
              Based on your submitted lifestyle information, the model predicts a{" "}
              <strong>{risk.riskCategory}</strong> health risk.

              The strongest contributing factors were{" "}
              <strong>{topFactors.join(", ")}</strong>.

              Improving these lifestyle factors may help lower your overall
              health risk.
            </p>

          </div>

          {/* SHAP Contributions */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Top Contributing Factors
            </h2>

            <div className="space-y-4">

              {risk.shapContributions.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between bg-gray-50 rounded-lg p-4 shadow-sm"
                >

                  <span className="font-medium">
                    {featureNames[item.feature]}
                  </span>

                  <span
                    className={`font-bold ${
                      item.contribution >= 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.contribution > 0 ? "+" : ""}
                    {item.contribution.toFixed(4)}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Recommendations */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Personalized Recommendations
            </h2>

            <ul className="space-y-3">

              {risk.shapContributions.map((item, index) => (

                <li
                  key={index}
                  className="bg-blue-50 rounded-lg p-4"
                >
                  ✅ {recommendationMap[item.feature]}
                </li>

              ))}

            </ul>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-10">

            <Link
              to="/survey"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              New Assessment
            </Link>

            <Link
              to="/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              View Dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Result;