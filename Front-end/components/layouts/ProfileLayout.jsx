import React from 'react'
import { Outlet } from 'react-router'
import TopMenu from '../profile/TopMenu'

const ProfileLayout = () => {
  return (
    <div>
      <header>
        <TopMenu />
      </header>
      <main className="auth-main-container">
        <Outlet />
      </main>
    </div>
  )
}

export default ProfileLayout
