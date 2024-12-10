import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const DeleteProduct = (id) => {
  const navigate = useNavigate();

  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`http://localhost:8080/products/${id}/delete`);
      navigate("/products");
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return deleteProduct;
};

export default DeleteProduct;
