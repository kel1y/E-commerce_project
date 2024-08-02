/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/prop-types */
import React from 'react'

const TextField = ({label,name, inputProps, value, onChange, errorMessage}) => {
  return (
               <div className='address-container'>
                <label htmlFor='name'>{label}</label>
                <input {...inputProps} value={value} onChange={onChange} name={name} />
                
                <span className='errorMessage'>{errorMessage}</span>
                </div>
  )
}

export default TextField
