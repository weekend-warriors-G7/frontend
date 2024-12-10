import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const DeleteProduct = (id) => {
  const navigate = useNavigate();

  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`http://localhost:8080/products/${id}/delete`);
      alert("Product deleted successfully.");
      navigate("/products");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product. Please try again.");
    }
  };

  return deleteProduct;
};

export default DeleteProduct;
