/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import UserAddress from './UserAddress'
import UserInfo from './UserInfo'
import Avatar from './Avatar'

const Profile = ({data} ) => {

  return (
    <div className='profile-container' data-testid='profile'>
        < Avatar {...data} />
        <div className='profile-info'>
            <UserAddress { ...data } />
            <UserInfo { ...data } />
        </div>
        <Link to='/profile/edit'><button type="button" className='btn'>edit profile</button></Link>
    </div>
  )
}

export default Profile