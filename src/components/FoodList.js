import React, { useEffect, useState } from "react";
import { getFoods } from "../api";
import styles from "./FoodList.module.css";

const FoodList = ({ onSelectFood }) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getFoods().then(setFoods);
    }, []);

    return (
        <div>
            <h2>Available Foods</h2>
            <ul className={styles.foodList}>
                {foods.map((food) => (
                    <li key={food.id} className={styles.foodItem}>
                        {food.name} - {food.calories} kcal
                        <button onClick={() => onSelectFood(food)}>Consume</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;
