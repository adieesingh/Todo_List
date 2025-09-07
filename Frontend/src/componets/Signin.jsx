import { useCallback, useState } from "react";
import { Head } from "../Pages/Head";
import { InputBox } from "../Pages/InputBox";
import { Button } from "../Pages/Button";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BottomWarming } from "../Pages/BottomWarming";
import { InputPass } from "../Pages/InputPass";

export const Signin = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const responseSigin =  async () => {
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-300 justify-center h-screen">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-2 h-max px-4 w-80 text-center">
          <Head label={"Sign In"}></Head>
          <InputBox
            label={"Email"}
            placeholder={"Enter a username"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></InputBox>
          <InputPass
            label={"Password"}
            placeholder={"Enter a password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></InputPass>
          <Button label={"Login in"} onClick={responseSigin}></Button>

          <BottomWarming
            label={"Don't have a account?"}
            to={"/signup"}
            buttonText={"Sign Up"}
          ></BottomWarming>
        </div>
      </div>
    </div>
  );
};
