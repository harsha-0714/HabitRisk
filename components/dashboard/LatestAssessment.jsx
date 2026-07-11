function LatestAssessment({ history }) {

    if (history.length === 0) {

        return (
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
                No assessments available.
            </div>
        );

    }

    const latest = history[history.length - 1];

    const badgeColor = {
        low: "bg-green-500",
        medium: "bg-yellow-500",
        high: "bg-red-500",
    };

    const formattedDate = new Date(
        latest.createdAt
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-8">

                Latest Assessment

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

                <div>

                    <p className="text-gray-500">
                        Overall Risk
                    </p>

                    <p className="text-4xl font-bold text-blue-700">

                        {latest.overallRisk}/100

                    </p>

                </div>

                <div>

                    <p className="text-gray-500">
                        Risk Level
                    </p>

                    <span
                        className={`px-4 py-2 rounded-full text-white font-semibold ${badgeColor[latest.riskCategory]}`}
                    >

                        {latest.riskCategory.toUpperCase()}

                    </span>

                </div>

                <div>

                    <p className="text-gray-500">

                        Confidence

                    </p>

                    <p className="text-3xl font-bold text-green-600">

                        {latest.confidence}%

                    </p>

                </div>

                <div>

                    <p className="text-gray-500">

                        Date

                    </p>

                    <p className="font-semibold">

                        {formattedDate}

                    </p>

                </div>

            </div>

            <div className="mt-8 bg-slate-100 rounded-lg p-6">

                <h3 className="font-bold mb-3">

                    AI Summary

                </h3>

                <p className="text-gray-700 leading-7">

                    Based on your latest lifestyle assessment,
                    the AI model predicts a

                    <strong> {latest.riskCategory} </strong>

                    health risk.

                    Continue monitoring your lifestyle habits
                    regularly to improve your long-term health.

                </p>

            </div>

        </div>

    );

}

export default LatestAssessment;