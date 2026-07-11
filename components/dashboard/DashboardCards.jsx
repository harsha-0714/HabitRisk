function DashboardCards({ history }) {

    const totalAssessments = history.length;

    const latestRisk =
        totalAssessments > 0
            ? history[history.length - 1].overallRisk
            : 0;

    const averageRisk =
        totalAssessments > 0
            ? (
                  history.reduce(
                      (sum, item) => sum + item.overallRisk,
                      0
                  ) / totalAssessments
              ).toFixed(1)
            : 0;

    const latestCategory =
        totalAssessments > 0
            ? history[history.length - 1].riskCategory
            : "--";

    return (

        <div className="grid md:grid-cols-4 gap-6">

            <Card
                title="Overall Risk"
                value={`${latestRisk}/100`}
            />

            <Card
                title="Latest Risk"
                value={latestCategory.toUpperCase()}
            />

            <Card
                title="Average Risk"
                value={averageRisk}
            />

            <Card
                title="Assessments"
                value={totalAssessments}
            />

        </div>

    );

}

function Card({ title, value }) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h3 className="text-gray-500">

                {title}

            </h3>

            <p className="text-4xl font-bold mt-4">

                {value}

            </p>

        </div>

    );

}

export default DashboardCards;