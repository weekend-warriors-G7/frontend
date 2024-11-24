// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Spinner from "../components/Spinner";
// import axiosInstance from '../axiosInstance';

// const ProfileDashboard = () => {
//     const [formData, setFormData] = useState({
//       name: "",
//       price: "",
//       description: "",
//       size: "",
//       clothingType: "",
//       material: "",
//       colour: "",
//     });
  
//     const [imageFile, setImageFile] = useState(null);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       if (name === "image") {
//         setImageFile(e.target.files[0]);
//       } else {
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       }
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
  
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         const formDataToSend = new FormData();
//         formDataToSend.append("image", imageFile);
//         formDataToSend.append(
//           "product",
//           JSON.stringify({
//             name: formData.name,
//             price: formData.price,
//             description: formData.description,
//             size: formData.size,
//             clothingType: formData.clothingType,
//             material: formData.material,
//             colour: formData.colour,
//           })
//         );
//         const response = await axiosInstance.post(
//           "/products/add",
//           formDataToSend,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
  
//         if (response.status === 200) {
//           navigate("/products");
//         }
//       } catch (error) {
//         setError("Failed to add product");
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-bgColour">
//         {loading ? (
//           <Spinner />
//         ) : (
//           <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-qbold text-center text-black">
//               Add Product
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="image"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Image
//                 </label>
//                 <input
//                   id="image"
//                   type="file"
//                   name="image"
//                   accept="image/png, image/jpg"
//                   value={formData.image}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="price"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="description"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="size"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Size
//                 </label>
//                 <input
//                   type="text"
//                   id="size"
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="clothingType"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Clothing Type
//                 </label>
//                 <input
//                   type="text"
//                   id="clothingType"
//                   name="clothingType"
//                   value={formData.clothingType}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="material"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Material
//                 </label>
//                 <input
//                   type="text"
//                   id="material"
//                   name="material"
//                   value={formData.material}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="colour"
//                   className="block text-sm font-qregular text-black"
//                 >
//                   Colour
//                 </label>
//                 <input
//                   type="text"
//                   id="colour"
//                   name="colour"
//                   value={formData.colour}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
//                 />
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 font-qbold text-white bg-accentColour rounded-md hover:bg-linkColour"
//               >
//                 Add Product
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     );
//   };

// export default ProfileDashboard;
