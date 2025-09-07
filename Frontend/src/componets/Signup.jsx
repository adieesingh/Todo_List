import { useCallback, useState } from "react";
import { Head } from "../Pages/Head";
import { InputBox } from "../Pages/InputBox";
import { Button } from "../Pages/Button";
import axios from "axios";
import { BottomWarming } from "../Pages/BottomWarming";
import { Navigate, useNavigate } from "react-router-dom";
import { InputPass } from "../Pages/InputPass";

export const Signup = ({setLoggedIn}) => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signupTodo = useCallback( async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        userName,
        email,
        firstName,
        lastName,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Register sucessfully")
        setLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.message)
      console.log(error);
    }
  },[]);
  return (
    <div className="flex bg-slate-300 justify-center h-screen">
      <div className="flex flex-col justify-center">
        <div className="bg-white h-max rounded-lg text-center w-80 px-5">
          <Head label={"Sign Up"}></Head>
          <InputBox
            label={"Username :"}
            placeholder={"Enter a username"}
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
          ></InputBox>
          <InputBox
            label={"Email :"}
            placeholder={"Enter a email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></InputBox>
          <InputBox
            label={"First Name :"}
            placeholder={"Enter a First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          ></InputBox>
          
          <InputBox
            label={"Last Name :"}
            placeholder={"Enter a Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          ></InputBox>
          <InputPass
            label={"Password :"}
            placeholder={"Enter a Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></InputPass>
          <Button label={"Sign Up"} onClick={signupTodo}></Button>
          <BottomWarming buttonText={"Sign In"} label={"Already have an account"} to={"/sigin"}></BottomWarming>
        </div>
      </div>
    </div>
  );
};
