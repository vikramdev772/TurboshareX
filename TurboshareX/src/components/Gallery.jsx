import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../baseURL";
import Chat from "./Chat";
const Gallery = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('username');
  const checkAuth = () => {
    if (!token) {
      navigate("/");
    }
  };
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    checkAuth();
    const getImagesOfUser = async () => {
      try {
        const username = localStorage.getItem("username");
        const { data } = await axios.post(`${baseURL}/getimages`, { username });
        console.log(data);
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getImagesOfUser();
  }, []);
  
  const getImagesOfUser = async () => {
    try {
      const username = localStorage.getItem("username");
      const { data } = await axios.post(`${baseURL}/getimages`, { username });
      console.log(data);
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddImage = async () => {
    try {
      // Create a FormData object
      const formData = new FormData();
      console.log(formData)
      formData.append("image", image);
      formData.append("username", localStorage.getItem("username"));
      //   Send the image file to the backend API
      console.log("uploading image...")
      const response = await axios.post(`${baseURL}/addimage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response from the backend if needed
      console.log("Image uploaded successfully:", response.data);
      getImagesOfUser();
      setImage(null)
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e) => {
    // Get the selected image file
    const selectedImage = e.target.files[0];
    console.log("selected image",selectedImage);
    setImage(selectedImage);
  };

  // Call handleAddImage when the user clicks a button to confirm the image selection
  const uploadImage = () => {
    if (image) {
      handleAddImage();
    }
  };
  return (
    <div className="MF">
    <div className="flex flex-col items-center justify-center min-h-[33rem] max-h-[33rem] bg-gray-800 m-4 p-3 rounded-2xl">
      <h1 className="text-4xl mb-8 text-white font-bold">Gallery</h1>
      <div className="flex flex-wrap justify-center gap-4 overflow-y-scroll min-h-[20rem] max-w-[44rem]">
        {images && 
          images.map((item, index) => {
            return (
              <div
                key={index}
                className="img_container rounded-lg overflow-hidden"
              >
                <img src={item} alt="item" className="w-40 h-40 object-cover" />
              </div>
            );
          })}

        <div className="container mx-auto px-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="img_container rounded-lg overflow-hidden cursor-pointer bg-gray-200 flex items-center justify-center w-40 h-40"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-600"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </label>
          <button onClick={uploadImage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4" disabled={!image}>
            Upload Image
          </button>
        </div>

      </div>
     
    </div>
    <Chat/>
    </div>
  );
};

export default Gallery;
