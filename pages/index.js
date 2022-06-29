

import React, {useState} from 'react'
import web3 from "web3";
import Router from 'next/router'
import axios from "axios"
import { typographyVariant } from '@mui/system';
import {setCookie} from "../middlewares/readCookie"

const Web3 = new web3();
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");


export default function Home() {
  const [email, setEmail] = React.useState("");
  const [passsword, setPassword] = React.useState("");
  const emailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const passwordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  //handle submit after click
  const handleClick = async () => {
    console.log(email, passsword);
    try {
      const postData = await axios.put(
        `${process.env.serverURL}v1/auth/login?email=${email}&password=${passsword}`
      );
      if (!postData) {
        console.log("Data Not Sent");
      } else {
        if (postData.data.status) {
          window.localStorage.setItem('userID', postData.data._id);
          document.cookie =`userID=${postData.data.email}`
          Router.push("/Test");
          console.log(postData);
        } else {
          alert("Wrong Email  or password");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="mainContainor h-full w-full flex flex-col justify-center items-center">
    //   <Navbar />
    //   <BottomContainor />
    //   <MiddleViewer />
    //   <ButtonSection />
    // </div>
    
    <div className="containorTest w-full h-96 flex justify-center items-center flex-col bg-orange-500 ">
      <h1 className="text-xl m-6 font-semibold font-sans text-white">Login Prodigal Wallet</h1>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={emailHandler}
        className="w-[80%] border text-white placeholder-white border-white py-1 px-4 my-2 rounded-md outline-none bg-transparent"
      />
      <input
        type="passsword"
        value={passsword}
        placeholder="password"
        onChange={passwordHandler}
        className="w-[80%] border text-white placeholder-white border-white py-1 px-4 my-2 rounded-md outline-none bg-transparent"
      />
      <div className="buttons w-full flex justify-center items-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 w-[80%] py-2 rounded-md text-white outline-none border-none"
        >
          Login
        </button>
      </div>
    </div>
  );
}
