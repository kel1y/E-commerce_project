import React from 'react'
import PropTypes from 'prop-types'

const UserAddress = ({BillingAddress}) => {
  return (
          <div>
           <h4> address</h4>
            <div className='profile-address'>
                <p>province: <span>{BillingAddress?.province}</span></p>
                <p>district: <span>{BillingAddress?.district}</span></p>
                <p>sector: <span>{BillingAddress?.sector}</span></p>
                <p>cell: <span>{BillingAddress?.cell}</span></p>
                <p>street: <span>{BillingAddress?.street}</span></p>
            </div>
            </div>
  )
}

UserAddress.propTypes = {
    province: PropTypes.string,
    district: PropTypes.string,
    sector: PropTypes.string,
    cell: PropTypes.string,
    street: PropTypes.string
}

export default UserAddress;
