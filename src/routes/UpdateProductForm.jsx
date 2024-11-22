import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axiosInstance from "../axiosInstance";

const UpdateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    size: "",
    clothingType: "",
    material: "",
    colour: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `http://localhost:8080/products/${id}`
        );
        const productData = response.data;
        setFormData({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          size: productData.size,
          clothingType: productData.clothingType,
          material: productData.material,
          colour: productData.colour,
        });
      } catch (error) {
        setError("Failed to load product data");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImageFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, image: null }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.price || formData.price < 0)
      newErrors.price = "Price is required and cannot be less than 0.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.size.trim()) newErrors.size = "Size is required.";
    if (!formData.clothingType.trim())
      newErrors.clothingType = "Clothing type is required.";
    if (!formData.material.trim()) newErrors.material = "Material is required.";
    if (!formData.colour.trim()) newErrors.colour = "Colour is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }
      formDataToSend.append(
        "product",
        JSON.stringify({
          name: formData.name,
          price: formData.price,
          description: formData.description,
          size: formData.size,
          clothingType: formData.clothingType,
          material: formData.material,
          colour: formData.colour,
        })
      );

      const response = await axiosInstance.put(
        `/products/${id}/update`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      setError("Failed to update product");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgColour">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-qbold text-center text-black">
            Edit Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-qregular text-black"
              >
                Image
              </label>
              <input
                id="image"
                type="file"
                name="image"
                accept="image/png, image/jpg"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.image && (
                <div className="text-red-500 text-sm mt-1">{errors.image}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-qregular text-black"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-qregular text-black"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.price && (
                <div className="text-red-500 text-sm mt-1">{errors.price}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-qregular text-black"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-qregular text-black"
              >
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.size && (
                <div className="text-red-500 text-sm mt-1">{errors.size}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="clothingType"
                className="block text-sm font-qregular text-black"
              >
                Clothing Type
              </label>
              <input
                type="text"
                id="clothingType"
                name="clothingType"
                value={formData.clothingType}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.clothingType && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.clothingType}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="material"
                className="block text-sm font-qregular text-black"
              >
                Material
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.material && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.material}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="colour"
                className="block text-sm font-qregular text-black"
              >
                Colour
              </label>
              <input
                type="text"
                id="colour"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
              />
              {errors.colour && (
                <div className="text-red-500 text-sm mt-1">{errors.colour}</div>
              )}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full px-4 py-2 font-qbold text-white bg-accentColour rounded-md hover:bg-linkColour"
            >
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProductForm;
