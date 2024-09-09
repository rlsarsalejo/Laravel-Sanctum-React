import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function GuestLayouts() {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div>
        <div>
            <header>

            </header>
        </div>
        <main className=''>
            <Outlet />
        </main>
    </div>
  )
}

export default GuestLayouts
