import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TrendChart({ history }) {

  const chartData = history.map((item, index) => ({
    survey: `#${index + 1}`,
    risk: item.overallRisk,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Health Risk Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="survey" />

          <YAxis
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="risk"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );

}

export default TrendChart;