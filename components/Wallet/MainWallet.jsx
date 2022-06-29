import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios"

//importing the components
import Navbar from "./Navbar";
import BottomContainor from "./BottomContainor";
import MiddleViewer from "./MiddleViewer";
import ButtonSection from "./ButtonSection";
import { useState, useEffect } from "react";

const MainWallet = () => {
  const [isModal, setIsModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [userData, setUserData] = useState(
    {
      "Balance": 0,
      "WalletAddress": ""
    }
  )
  //function to fetch the balance from the APi
  const findBalance = async () =>
  {
    try {
      const userID = window.localStorage.getItem("userID");
      const findBalance = await axios.get(`${process.env.serverURL}v1/auth/checkBalance/${userID}`);
      if(!findBalance)
      {
        alert("Balance Not Found");
      }
      else 
      {
        setUserData(
          {
            Balance: findBalance.data.balance,
            WalletAddress: findBalance.data.address
          }
        )
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>
  {
     findBalance();

  },[])
  return (
    <div className="containor w-full h-full">
      <Navbar />
      <BottomContainor Address={userData} />
      <MiddleViewer style={`${isClicked ? "hidden" : "block"}`} Balance={userData} />
      <ModalTransaction
        style={`${isClicked ? "block" : "hidden"}`}
        changeContent={setIsClicked}
      />
      <ButtonSection isClickedButton={setIsClicked} />
    </div>
  );
};

//Modal for Transaction
const ModalTransaction = (props) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState();
  const handleInputAddress = (e) =>
  {
    const address= e.target.value;
    setAddress(address)
    
  }
  const handleInputAmount = (e) =>
  {
    const amount = e.target.value;
    setAmount(amount)    
  }
  //signing the transaction 
  const signTransaction = async() =>
  {
    const user = window.localStorage.getItem("userID");
    try {
      const postData = await axios.post(`${process.env.serverURL}v1/Transaction/signTransaction/${user}?toAddress=${address}&valueAmount=${amount}`);
      if(!postData)
      {
        alert("Data Not Posted");

      }
      else 
      {
        console.log(postData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className={`containor w-full flex justify-center items-center px-8 py-10 flex-col ${props.style}`}
    >
      <input
        type="text"
        value={address}
        onChange={handleInputAddress}
        placeholder="0x234.....90786"
        className="px-3 py-2 rounded-md outline-none border border-slate-500 text-slate-500 my-4"
      />
      <input
        type="text"
        value={amount}
        onChange={handleInputAmount}
        placeholder="0.0000 ETH"
        className="px-3 py-2 rounded-md outline-none border border-slate-500 text-slate-500"
      />
      <div className="containorButton flex w-full justify-around items-center">
        <button className="my-4 py-2 px-8 text-white rounded-md bg-blue-500" onClick={signTransaction}>
          Send
        </button>
        <button
          className="my-4 py-2 px-7 text-red-500 rounded-md bg-white border border-red-500 transition-all hover:bg-red-500 hover:text-white"
          onClick={() => {
            props.changeContent(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default MainWallet;
