// import React, { useEffect, useState } from "react";
// import { getConsumedFoods } from "../api";
// import styles from "./ConsumptionList.module.css";

// const ConsumptionList = ({ token }) => {
//     const [consumedFoods, setConsumedFoods] = useState([]);
//     const [activeIndex, setActiveIndex] = useState(null); // State to manage which food item is expanded

//     useEffect(() => {
//         if (token) {
//             getConsumedFoods(token).then(setConsumedFoods);
//         }
//     }, [token]);

//     const toggleAccordion = (index) => {
//         // If clicked item is already active, close it, else open it
//         setActiveIndex(index === activeIndex ? null : index);
//     };

//     return (
//         <div>
//             <h2>Consumed Foods</h2>
//             <ul className={styles.consumedList}>
//                 {consumedFoods.map((item, index) => (
//                     <li key={item.id} className={styles.consumedItem}>
//                         <div
//                             className={styles.foodHeader}
//                             onClick={() => toggleAccordion(index)}
//                         >
//                             <span>{item.food_consumed.name}</span>
//                             <span className={styles.quantity}>
//                                 {item.quantity} serving(s)
//                             </span>
//                         </div>
//                         {activeIndex === index && (
//                             <div className={styles.foodDetails}>
//                                 <p><strong>Calories:</strong> {item.food_consumed.calories} kcal</p>
//                                 <p><strong>Carbs:</strong> {item.food_consumed.carbs} g</p>
//                                 <p><strong>Protein:</strong> {item.food_consumed.protein} g</p>
//                                 <p><strong>Fats:</strong> {item.food_consumed.fats} g</p>
//                                 <p><strong>Date Consumed:</strong> {new Date(item.date_consumed).toLocaleString()}</p>
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ConsumptionList;
