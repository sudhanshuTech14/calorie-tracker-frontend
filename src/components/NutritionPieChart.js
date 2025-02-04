import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getConsumedFoodsByDate } from "../api"; // Import the API function
import "./NutritionPieChart.css"; // Import the CSS file

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionPieChart = ({ selectedDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Ensure token is available
      const data = await getConsumedFoodsByDate(token, selectedDate);

      if (data) {
        // Calculate totals for calories, fat, carbs, and protein
        let totalCalories = 0;
        let totalFat = 0;
        let totalCarbs = 0;
        let totalProtein = 0;

        data.consumed_foods.forEach((food) => {
          const { food_consumed, quantity } = food;
          totalCalories += food_consumed.calories * quantity;
          totalFat += food_consumed.fats * quantity;
          totalCarbs += food_consumed.carbs * quantity;
          totalProtein += food_consumed.protein * quantity;
        });

        setChartData({
          labels: ["Calories", "Fat", "Carbs", "Protein"],
          datasets: [
            {
              data: [totalCalories, totalFat, totalCarbs, totalProtein],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
              hoverBackgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
            },
          ],
        });
      }
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  return (
    <div className="pie-chart-container">
      <h2>Nutrition Breakdown for {selectedDate}</h2>
      {chartData ? (
        <Pie data={chartData} className="pie-chart" />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default NutritionPieChart;
