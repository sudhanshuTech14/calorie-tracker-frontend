// AddFoodModal.js
import React, { useState } from "react";
import { addFoodItem } from "../api";
import "./AddFoodModal.css";  // Style the modal as needed

const AddFoodModal = ({ isOpen, onClose, onAddFood, token }) => {
    const [newFoodName, setNewFoodName] = useState("");
    const [newCarbs, setNewCarbs] = useState("");
    const [newProtein, setNewProtein] = useState("");
    const [newFats, setNewFats] = useState("");
    const [newCalories, setNewCalories] = useState("");

    const handleAddNewFood = async (e) => {
        e.preventDefault();
        if (!newFoodName || newCarbs < 0 || newProtein < 0 || newFats < 0 || newCalories <= 0) return;

        try {
            // Add the new food item using the API
            const addedFood = await addFoodItem(
                {
                    name: newFoodName,
                    carbs: newCarbs,
                    protein: newProtein,
                    fats: newFats,
                    calories: newCalories,
                },
                token
            );
            onAddFood(addedFood);  // Notify the parent (Dashboard) to refresh the food list
            onClose();  // Close the modal
        } catch (error) {
            console.error("Error adding food:", error);
        }
    };

    if (!isOpen) return null;  // Don't render modal if not open

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Add New Food</h3>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={newCarbs}
                    onChange={(e) => setNewCarbs(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Protein (g)"
                    value={newProtein}
                    onChange={(e) => setNewProtein(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Fats (g)"
                    value={newFats}
                    onChange={(e) => setNewFats(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Calories"
                    value={newCalories}
                    onChange={(e) => setNewCalories(e.target.value)}
                    required
                />
                <button className="save-button" onClick={handleAddNewFood}>
                    Add Food
                </button>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddFoodModal;
