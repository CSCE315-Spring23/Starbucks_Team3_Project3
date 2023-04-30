import React, {useEffect, useState} from 'react'

import CustomerBanner from "../components/customer/customer_banner.js"
import CustomerBody from "../components/customer/customer_body.js"
import CustomerFooter from "../components/customer/customer_footer"
import FinalizeOrder from '../components/customer/finalize_order'
import ThankYou from '../components/customer/thank_you'

import '../css/customer.css'

function Customer() {
  const [orderList, setOrderList] = useState([]);
  // const [discountList, setDiscountList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0)
  const [currSection, setSection] = useState(0)
  const [customerName, setCustomerName] = useState("Customer")
  const [transactionID, setTransactionID] = useState(0)

  return (
    <div className="root">
      <div className="customer-banner">
        <CustomerBanner setSection={setSection}/>
      </div>
      
      {(currSection !== 4 && currSection !== 5) ? (
        <>
        <div className="customer-body">
        <CustomerBody orderList={orderList}
                      setOrderList={setOrderList}
                      totalPrice={totalPrice}
                      setTotalPrice={setTotalPrice}
                      currSection={currSection}
                      setSection={setSection}
                      />
        </div>
        <div className="customer-footer">
          <CustomerFooter orderList={orderList} totalPrice={totalPrice} setSection={setSection}/>
        </div>
        </>
      ) : currSection === 4 ? (
        <div className='finalize-order'>
          <FinalizeOrder orderList={orderList} totalPrice={totalPrice} setOrderList={setOrderList} setCustomerName={setCustomerName} setTransactionID={setTransactionID} setSection={setSection}/>
        </div>
      ) : currSection === 5 ? (
        <div className='thank-you'>
          <ThankYou customerName={customerName} transactionID={transactionID} setSection={setSection}/>
        </div>
      ) : null}

    </div>
  );
}

export default Customer;
