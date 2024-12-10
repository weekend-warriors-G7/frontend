import axiosInstance from "../axiosInstance";

export const fetchUserRole = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/user/role");
      return response.data.role; // Assuming the response contains a `role` field
    } catch (error) {
      console.error("Error fetching user role:", error);
      throw error;
    }
  };

  export const fetchUserId = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/user/id");
      return response.data.id; // Assuming the response contains a `role` field
    } catch (error) {
      console.error("Error fetching user role:", error);
      throw error;
    }
  };