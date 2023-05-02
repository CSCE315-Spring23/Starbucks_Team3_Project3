import React, {useState} from 'react'

import ManagerBanner from "../components/manager/manager_banner";
import ManagerNavbar from "../components/manager/manager_navbar";
import MenuManage from "../components/manager/body/menu_manage";

function Manager() {

  const [currSection, setSection] = useState(0)

  return (
      <div className="root">
        <div className="manager-banner">
          <ManagerBanner setSection={setSection}/>
        </div>
        <div className='navbar'>
          <ManagerNavbar setSection={setSection}/>
        </div>
        <div className='body'>
            {currSection === 1 ? (
                <div className='menu-manage-body'>
                  <MenuManage setSection={setSection}/>
                </div>
            ) : currSection === 2 ? (
                <div className='inventory-body'>
                  {/* insert next nav here */}
                </div>
            ) : currSection === 3 ? (
                <div className='sales-body'>
                  {/* insert next nav here */}
                </div>
            ) : currSection === 4 ? (
                <div className='reports-body'>
                  {/* insert next nav here */}
                </div>
            ) : currSection === 5 ? (
                <div className='transaction-body'>
                  {/* insert next nav here */}
                </div>
            ) : currSection === 6 ? (
                <div className='employee-body'>
                  {/* insert next nav here */}
                </div>
            ) : (
                <div className='splash-screen'>Choose a menu to from the navbar</div>
            )}
        </div>

      </div>
  )
}

export default Manager