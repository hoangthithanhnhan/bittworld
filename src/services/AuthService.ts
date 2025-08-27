import axiosClient from "utils/axiosClient";

export const login = async (email: string, password: string) => {
    try {
        // Implement login logic
        const item = await axiosClient.post("/bittworld-lucky/login-email", { email, password });
    } catch (error) {
        // Handle error
        throw error;
    }
};