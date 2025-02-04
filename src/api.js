import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Backend API URL

// Configure Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Function to set authorization token for requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Use Bearer instead of Token
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

// ✅ Authentication APIs
export const register = async (username, password, email) => {
    return await api.post("/register/", { username, password, email });
};

export const login = async (username, password) => {
    const response = await api.post("/login/", { username, password });
    const token = response.data.access;
    setAuthToken(token);
    localStorage.setItem("token", token);
    return token;
};

export const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
};

// ✅ Token Refresh API (Optional)
export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");  // Ensure refresh token is stored
    if (!refreshToken) return null;

    try {
        const response = await api.post("/token/refresh/", { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem("token", newAccessToken);
        setAuthToken(newAccessToken);  // Set the new token
        return newAccessToken;
    } catch (error) {
        console.error("Token refresh failed", error);
        logout(); // Optional: Log out the user if refresh fails
        return null;
    }
};

// ✅ Food-related APIs
export const getFoods = async () => {
    const response = await api.get("/foods/");
    return response.data;
};

// Add new food item to the database
export const addFoodItem = async (foodData, token) => {
    setAuthToken(token);  // Ensure token is set for authentication
    try {
        const response = await api.post("/foods/", foodData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;  // Return the response data after adding the food item
    } catch (error) {
        console.error("Error adding food item:", error);
        throw error;  // Propagate error if any occurs
    }
};

export const getConsumedFoods = async () => {
    const token = localStorage.getItem("token");  // Get token from localStorage
    setAuthToken(token);  // Ensure token is set
    const response = await api.get("/consume/");
    return response.data;
};

export const getConsumedFoodsByDate = async (token, selectedDate) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/consumed-foods-by-date/`, 
            {
                params: {
                    date: selectedDate, // This should be the selected date
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Token in the header, not in the URL
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching consumed foods by date:", error);
    }
};


export const addConsumption = async (foodId, quantity) => {
    const token = localStorage.getItem("token");  // Get token from localStorage
    if (!token) {
        throw new Error("Authentication required");
    }

    setAuthToken(token); // Ensure token is set in the header

    try {
        const response = await api.post("/consume/", {
            food_consumed_id: foodId,
            quantity,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired, try to refresh it
            const newToken = await refreshToken();
            if (newToken) {
                return await addConsumption(foodId, quantity);  // Retry request with new token
            }
        }
        throw error; // Propagate error if not 401
    }
};

export const updateConsumption = async (consumptionId, quantity, token) => {
    setAuthToken(token);
    const response = await api.patch(`/consume/${consumptionId}/`, { quantity });
    return response.data;
};

export const deleteConsumption = async (consumptionId, token) => {
    setAuthToken(token);
    await api.delete(`/consume/${consumptionId}/`);
};

