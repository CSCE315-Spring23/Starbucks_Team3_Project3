import React, {useEffect, useRef, useState} from 'react'

import CustomerBanner from '../components/customer/customer_banner';
import Server from "./server_view"
import Manager from "./manager_view"
import { redirect, useNavigate } from 'react-router-dom';

function Login() {
  const employee = useState("")

  const loginWithGoogle = () => {
    console.log("login with google")
    window.location.replace("http://localhost:5000/login");
  }

  return (
    <div>
      <button onClick={() => loginWithGoogle()}>Login with Google</button>
    </div>
  )
}

export default Login