/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import TextField from '../TextField';
import { updateProfile } from '../../redux/slices/profile/updateProfile';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { SubmitButton } from '../Button';

const AddressDetails = ({billingAddress}) => {
  const [profileAddress, setProfileAdsress] = useState(billingAddress || '')
  const { isLoading } = useSelector(store => store.profileUpdate)
  const dispatch = useDispatch()
    const inputField=[

        {
          label: 'Province',
          name: 'province',
          value: profileAddress.province,
          inputProps: {type: 'text', placeholder: 'Province'},
          errorMessage:'Province is not allowed to be empty',
        },
        {
          label: 'District',
          name: 'district',
          value: profileAddress.district,
          inputProps: {type: 'text', placeholder: 'District'},
          errorMessage:'district is not allowed to be empty',
  
        },
        {
          label: 'sector',
          name: 'sector',
          value: profileAddress.sector,
          inputProps: {type: 'text', placeholder: 'sector'},
          errorMessage:'sector is not allowed to be empty',  
      },
        {
          label: 'cell',
          name: 'cell',
          value: profileAddress.cell,
          inputProps: {type: 'text', placeholder: 'cell'},
        errorMessage:'cell is not allowed to be empty',  
      },
        {
          label: 'street',
          name: 'street',
          value: profileAddress.street,
          inputProps: {type: 'text', placeholder: 'street'},
           errorMessage:'street is not allowed to be empty',
    
      }
      ]
      const handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
    setProfileAdsress({ ...profileAddress, [name]: value });
      };
      const handleSubmit =async (e) => {
        try {
          e.preventDefault();
        const data = {billingAddress: profileAddress}
       const res = await dispatch(updateProfile(data));
        showSuccessMessage(res.payload.message)
        } catch (error) {
          showErrorMessage(error.message)
        }
      };
  return (
    <div data-testid='address-details'>
        <form onSubmit={handleSubmit} className='profile-form'>
          {inputField.map((filed) =>{
            return (
            <TextField key={filed.name} 
            label={filed.label}
            {...filed}
            inputProps={filed.inputProps}
            name={filed.name}
            value={filed.value}
            onChange={handleInput}
            />)
            })}
            
        <SubmitButton loading={isLoading} text='save' />
            </form>
            </div>
)
}

export default AddressDetails