import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Survey() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    sleepHours: 7,
    dietScore: 5,
    activityLevel: 30,
    stressLevel: 5,
    smokingStatus: "never",
    alcoholUse: 0,
    screenTime: 4,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number" || e.target.type === "range"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };
        formData
      );

console.log("Survey Response:", response.data);
      // Save latest prediction
      localStorage.setItem(
        "latestResult",
        JSON.stringify(response.data)
      );

      navigate("/result");

    } catch (err) {

      if (err.response?.status === 207) {

        alert(
          "Survey saved successfully.\nPrediction service is temporarily unavailable."
        );

      } else {

        setError(
          err.response?.data?.message ||
          "Unable to submit survey."
        );

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-3xl mx-auto py-10">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">

            Lifestyle Health Survey

          </h1>

          {

            error &&

            <div className="bg-red-100 text-red-700 p-3 rounded mb-5">

              {error}

            </div>

          }

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Sleep */}

            <div>

              <label className="font-medium">

                Sleep Hours

              </label>

              <input
                type="range"
                min="0"
                max="12"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleChange}
                className="w-full"
              />

              <p>

                {formData.sleepHours} hours

              </p>

            </div>

            {/* Diet */}

            <div>

              <label>

                Diet Score

              </label>

              <input
                type="range"
                min="1"
                max="10"
                name="dietScore"
                value={formData.dietScore}
                onChange={handleChange}
                className="w-full"
              />

              <p>

                {formData.dietScore}/10

              </p>

            </div>

            {/* Activity */}

            <div>

              <label>

                Activity (minutes/day)

              </label>

              <input
                type="number"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />

            </div>

            {/* Stress */}

            <div>

              <label>

                Stress Level

              </label>

              <input
                type="range"
                min="1"
                max="10"
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleChange}
                className="w-full"
              />

              <p>

                {formData.stressLevel}/10

              </p>

            </div>

            {/* Smoking */}

            <div>

              <label>

                Smoking Status

              </label>

              <select
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >

                <option value="never">

                  Never

                </option>

                <option value="former">

                  Former

                </option>

                <option value="current">

                  Current

                </option>

              </select>

            </div>

            {/* Alcohol */}

            <div>

              <label>

                Drinks Per Week

              </label>

              <input
                type="number"
                name="alcoholUse"
                value={formData.alcoholUse}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />

            </div>

            {/* Screen */}

            <div>

              <label>

                Screen Time (Hours)

              </label>

              <input
                type="number"
                name="screenTime"
                value={formData.screenTime}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />

            </div>

            <button
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >

              {

                loading

                ?

                "Analyzing..."

                :

                "Analyze Health Risk"

              }

            </button>

          </form>

        </div>

      </div>

    </div>

  );
}
const response = await api.post("/survey", formData);

console.log("Survey Response:", response.data);

localStorage.setItem(
  "latestResult",
  JSON.stringify(response.data)
);

navigate("/result");
export default Survey;