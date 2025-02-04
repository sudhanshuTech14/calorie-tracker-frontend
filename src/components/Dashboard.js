import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFoods, getConsumedFoodsByDate, addConsumption, updateConsumption, deleteConsumption } from "../api";
import AddFoodModal from "./AddFoodModal";  // Import the new modal
import NutritionPieChart from "./NutritionPieChart";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
    const { token, username } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [consumedFoods, setConsumedFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [totalCalories, setTotalCalories] = useState(0);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editQuantity, setEditQuantity] = useState(1);
    const [editId, setEditId] = useState(null);

    // State for accordion
    const [expandedId, setExpandedId] = useState(null);

    const fetchData = useCallback(async () => {
        if (!token) return;

        try {
            const foodsData = await getFoods();
            console.log(foodsData);
            const consumedData = await getConsumedFoodsByDate(token, selectedDate);

            // Map consumedData to consumedFoods if necessary
            const consumedFoodsArray = consumedData.consumed_foods || [];
            setFoods(foodsData);
            setConsumedFoods(consumedFoodsArray);
            const total = consumedFoodsArray.reduce(
                (sum, item) => sum + (item.food_consumed.calories * item.quantity),
                0
            );
            setTotalCalories(total);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [token, selectedDate]);

    useEffect(() => {
        console.log("Fetching data...");
        fetchData();
    }, [fetchData]);

    const handleAddConsumption = async (e) => {
        e.preventDefault();
        if (!selectedFood || quantity <= 0) return;

        try {
            await addConsumption(selectedFood, quantity, token);
            fetchData();
        } catch (error) {
            console.error("Error adding consumption:", error);
        }
    };

    const handleAddFood = (newFood) => {
        setFoods([...foods, newFood]);
        fetchData();
    };

    const handleEditClick = (id, currentQuantity) => {
        setEditId(id);
        setEditQuantity(currentQuantity);
        setIsEditModalOpen(true);
    };

    const handleEditSave = async () => {
        try {
            await updateConsumption(editId, editQuantity, token);
            fetchData();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating consumption:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteConsumption(id, token);
            fetchData();
        } catch (error) {
            console.error("Error deleting consumption:", error);
        }
    };

    const toggleAccordion = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="dashboard-container">
            <h2 className="welcome-heading">Welcome back, {username}!! 👋</h2>
            {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                    <div className="add-food">
                        <h3 className="section-heading">🍽️ Add Food Consumption</h3>
                        <form onSubmit={handleAddConsumption} className="food-form">
                            <select
                                value={selectedFood}
                                onChange={(e) => setSelectedFood(e.target.value)}
                                required
                                className="food-select"
                            >
                                <option value="">Select Food</option>
                                {foods.length > 0 ? (
    foods.map((food) => (
        <option key={food.id} value={food.id}>
            {food.name} - {food.calories} cal
        </option>
    ))
) : (
    <option value="">No foods available</option>
)}

                            </select>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                                required
                                className="quantity-input"
                            />
                            <button type="submit" className="add-button">
                                ➕ Add
                            </button>
                        </form>
                    </div>

                    <button className="add-other-food-button" onClick={() => setIsModalOpen(true)}>
                        Add Your Custom Meal Details
                    </button>

                    <AddFoodModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddFood={handleAddFood}
                        token={token}
                    />

                    <>
                    <br/>
                    <br/>
                    </>

                    <div className="consumed-foods">
    <h2 className="section-heading">Today's Consumption</h2>
    {/* Date Picker & Total Calories */}
    <div className="date-picker-container">
        <label>Select Date: </label>
        <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
        />
        <span className="total-calories">Total Calories Intake: {totalCalories} kcal</span>
    </div>

    {/* Pie Chart */}
    <NutritionPieChart selectedDate={selectedDate} />

    <ul className="consumedList">
        {consumedFoods.length > 0 ? (
            consumedFoods.map((item) => (
                <li key={item.id} className="consumedItem">
                    <div className="food-header" onClick={() => toggleAccordion(item.id)}>
                        <div className="food-name">
                            <strong>{item.food_consumed.name}</strong>
                        </div>
                        <div className="food-quantity">
                            {item.quantity} serving(s)
                        </div>
                        <div className="food-date">
                            {/* Format the date appropriately */}
                            <p>{new Date(item.date_consumed).toLocaleDateString()}</p>
                        </div>
                        <span className="toggle-icon">
                            {expandedId === item.id ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>

                    {expandedId === item.id && (
                        <div className="food-details">
                            <div className="food-details-header">
                                <p>Calories: {item.food_consumed.calories * item.quantity}</p>
                                <p>Carbs: {item.food_consumed.carbs * item.quantity} g</p>
                                <p>Protein: {item.food_consumed.protein * item.quantity} g</p>
                                <p>Fats: {item.food_consumed.fats * item.quantity} g</p>
                                <div className="icons">
                                    <FaEdit
                                        className="edit-icon"
                                        onClick={() => handleEditClick(item.id, item.quantity)}
                                    />
                                    <FaTrash
                                        className="delete-icon"
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            ))
        ) : (
            <p>No food consumed yet.</p>
        )}
    </ul>
</div>


                

            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Quantity</h3>
                        <input
                            type="number"
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(e.target.value)}
                            min="1"
                            required
                        />
                        <button className="save-button" onClick={handleEditSave}>
                            Save
                        </button>
                        <button className="close-button" onClick={() => setIsEditModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            </>
    )}
        </div>
    );
};

export default Dashboard;
