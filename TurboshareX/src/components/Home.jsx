import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../baseURL";
import "../App.css";

const Home = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const [displayText, setDisplayText] = useState(text);
  const navigate = useNavigate();

  const handleCode = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if( code.length <= 1){
      // return navigate("/home");
      return;
    }
    try {
      const { data } = await axios.post(`${baseURL}/checkuser`, {
        username: code,
      });
      if (data) {
        localStorage.setItem("username", data.username);
        navigate("/gallery");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleClick = () => { //beaware 
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(generateText, 200);
      setIntervalId(id);
      setTimeout(() => {
        clearInterval(id);
      }, 5000); // Stop after 5 seconds
    }
  };

  const generateText = () => {
    let characters = "abcdefghijklmnopqrstuvwxyz1234567890~@!#$%^&*()?";
    let length = Math.floor(Math.random() * 5000) + 50;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setDisplayText((prevText) => prevText + result + " ");
  };

  return (
    <div className="main__container">
      <div className="flex flex-col items-center justify-center min-h-[33rem] inner__container">
        <h1 className="text-4xl text-center font-bold text-white mb-4 ">
          Access Your Data From Anywhere
        </h1>
        <form
          className="m-3 flex items-center justify-center "
          onSubmit={handleCode}
        >
          <input
            placeholder="Enter the code"
            defaultValue=""
            className="border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:ring focus:ring-purple-500 mr-2"
            type="text"
            value={code}
            onChange={(e) => {
              const newCode = e.target.value;
              if (newCode.length >= 1) {
                setCode(newCode);
              }
            }}
          />
          <button
            onClick={(e) => {
              handleCode(e);
              handleClick();
            }}
            className="bg-green500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green500 buttons"
          >
            Open
          </button>
        </form>
      </div>
      
      <div className="text-container h-[34rem]">{displayText}</div>{" "}
      {/* Use displayText */}
    </div>
  );
};

export default Home;
