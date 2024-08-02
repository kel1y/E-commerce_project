/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'

const UserInfo = ({gender, preferredCurrency, preferredLanguage, birthDate}) => {
  return (
    <div>
            <h4>personal information</h4>
            <div className='personal-info'>
                <p>gender: <span>{gender !=='null' ? gender: ''}</span></p>
                <p>preffered language: <span>{preferredLanguage !=='null' ? preferredLanguage: ''}</span></p>
                <p>preffered currency: <span>{preferredCurrency !=='null' ? preferredCurrency: ''}</span></p>
                <p>birth date: <span>{birthDate !=='null' ? birthDate: ''}</span></p>
            </div>
            </div>
  )
}

UserInfo.propTypes = {
    gender: PropTypes.string,
    preferredCurrency: PropTypes.string,
    preferredLanguage: PropTypes.string,
    birthDate: PropTypes.string,

}

export default UserInfo