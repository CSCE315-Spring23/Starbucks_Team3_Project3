import React, {useState} from 'react'

import ManagerBanner from "../components/manager/manager_banner";
import ManagerNavbar from "../components/manager/manager_navbar";
import MenuManage from "../components/manager/body/menu_manage";

import "../css/manager_body.css"
import InventoryManage from "../components/manager/body/inventory_manage";
import SalesManage from "../components/manager/body/sales_manage";
import TransactionsManage from "../components/manager/body/transactions_manage";
import EmployeeManage from "../components/manager/body/employees_manage";

function Manager() {

  const [currSection, setSection] = useState(0)

  return (
      <div className="root">
        <div className="manager-banner">
          <ManagerBanner setSection={setSection}/>
        </div>

        <div className='manager-body-container'>

            <div className='manager-body-container-right'>
                <div className='manager-body'>
                    {currSection === 1 ? (
                        <div className='menu-manage-body'>
                            <MenuManage setSection={setSection}/>
                        </div>
                    ) : currSection === 2 ? (
                        <div className='inventory-body'>
                            <InventoryManage/>
                        </div>
                    ) : currSection === 3 ? (
                        <div className='sales-body'>
                            <SalesManage/>
                        </div>
                    ) : currSection === 4 ? (
                        <div className='reports-body'>
                            {/* insert next nav here */}
                        </div>
                    ) : currSection === 5 ? (
                        <div className='transaction-body'>
                            <TransactionsManage/>
                        </div>
                    ) : currSection === 6 ? (
                        <div className='employee-body'>
                            <EmployeeManage/>
                        </div>
                    ) : (
                        <div className='splash-screen'>Choose a menu to from the navbar</div>
                    )}
                </div>
            </div>

          <div className='manager-navbar-container'>
            <ManagerNavbar setSection={setSection}/>
          </div>
        </div>

      </div>
  )
}

export default Manager