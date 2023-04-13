import React, {useEffect, useRef, useState} from 'react'

import "../css/customer_view.css"

import CustomerBanner from "../components/customer/customer_banner.js"
import CustomerBody from "../components/customer/customer_body.js"

function Customer() {
    // share the one variable <Orderlist>
    const [orderList, setOrderList] = useState({});
    return (
        <div className="root">
            <div className="customer-banner">
                <CustomerBanner/>
            </div>

            <div className="customer-body">
                <CustomerBody orderList={orderList} setOrderList={setOrderList}/> // shared here
            </div>

            <div className="customer-footer">
                <CustomerFooter orderList={orderList} setOrderList={setOrderList}/> // shared here
            </div>
        </div>
    );
}

export default Customer;
