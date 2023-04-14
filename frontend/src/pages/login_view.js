import React, {useEffect, useRef, useState} from 'react'

import CustomerBanner from '../components/customer/customer_banner';
import Server from "./server_view"
import Manager from "./manager_view"

function Login() {
  const employee = useState("");

  return (
    <div>
      <CustomerBanner/>
      Login
    </div>
  )
}

export default Login