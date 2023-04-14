import React, {useState} from 'react'

import "../css/customer_view.css"

import CustomerBanner from "../components/customer/customer_banner.js"
import CustomerBody from "../components/customer/customer_body.js"
import CustomerFooter from "../components/customer/customer_footer"

function Customer() {
  // share the one variable <Orderlist>
  const [orderList, setOrderList] = useState([{"category":"coffee", "item": "iced coffee", "size": "tall", "addons": ['1', '2']}]);
  // const [discountList, setDiscountList] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0.0)

  return (
    <div className="root">
      <div className="customer-banner">
        <CustomerBanner/>
      </div>
      
      <div className="customer-body">
        <CustomerBody orderList={orderList} setOrderList={setOrderList}/>
      </div>

      <div className="customer-footer">
        <CustomerFooter orderList={orderList} totalItems={totalItems} totalPrice={totalPrice}/>
      </div>
    </div>
  );
}

export default Customer;
