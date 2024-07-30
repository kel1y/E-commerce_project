/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({avatar, firstname, lastname}) => {
  return (
    <div className='profile-avatar'>
    <img src={avatar} alt='avatar' />
    <div className='user-name'>
        <div className='name'>
        <span>{firstname !=='null' ? firstname: ''}</span>
        <span>{lastname !=='null' ? lastname: ''}</span>
        </div>
    </div>
</div>
  )
}

Avatar.propTypes = {
    avatar: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
}

export default Avatar