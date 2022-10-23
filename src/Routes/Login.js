import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useStore } from "../hooks/useStore";
// import FacebookLogin from 'react-facebook-login';
const Login = () => {
  const navigate = useNavigate();
  const setAuthData = useStore((state) => state.setAuthData);
  //console.log(setAuthData)
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div>
      <h1>Login With Google</h1>
      <GoogleOAuthProvider clientId="717355185317-nb5m0797va30f1c5rdssc71rp1oa2tv8.apps.googleusercontent.com">
        <GoogleLogin
          useOneTap
          onSuccess={async (credentialResponse) => {
            // console.log(credentialResponse)
            const response = await axios.post("http://localhost:5000/login", {
              token: credentialResponse.credential,
            });
            const data = response.data;
            localStorage.setItem("authData", JSON.stringify(data));
            setAuthData(data);
            navigate("/profile");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      {/* <FacebookLogin
 appId="1462161404289204"
 autoLoad={true}
 fields="name,email,picture"
 callback={responseFacebook} /> */}
    </div>
  );
};
export default Login;
