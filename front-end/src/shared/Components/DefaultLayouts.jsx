import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderNav from '../Components/Header/Navbar'
function DefaultLayouts() {
  return (
    <div>
        <div className='pb-16'>
            <HeaderNav />
        </div> 
        <div>
          <main className='pt-5'>
             <Outlet />
          </main>
        </div>
    </div>
  )
}

export default DefaultLayouts
