/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import TextField from '../TextField';
import { SubmitButton } from '../Button';
import { updateProfile } from '../../redux/slices/profile/updateProfile';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

const AccountDetails = ({data}) => {
  const { isLoading } = useSelector(store => store.profileUpdate)
  const dispatch = useDispatch();
  const [profileData, setprofileData] = useState({
    firstname: data.firstname !=='null' ? data.firstname : '',
    lastname: data.lastname !=='null' ? data.lastname : '',
    gender: data.gender !=='null' ? data.gender : '',
    birthDate: data.birthDate !=='null' ? data.birthDate : '',
    preferredCurrency: data.preferredCurrency !=='null' ? data.preferredCurrency : '',
    preferredLanguage: data.preferredLanguage !=='null' ? data.preferredLanguage : '',
    avatar: data.avatar
  });
  const [url, setUrl] = useState();
  const inputField=[
    {
      label: 'first name',
       name: 'firstname',
       value: profileData.firstname,
      inputProps: {type: 'text', placeholder: 'First Name'},
      errorMessage:'First name is not allowed to be empty',  
    },
    {
      label: 'last name',
      name: 'lastname',
      value: profileData.lastname,
      inputProps: {type: 'text', placeholder: 'Last Name'},
      errorMessage:'Last name is not allowed to be empty',  
    },
    {
      label: 'birth date',
      name: 'birthDate',
      value: profileData.birthDate,
      inputProps: {type: 'date', placeholder: 'birth date'},
    },
    {
      label: 'gender',
      name: 'gender',
      value: profileData.gender,
      inputProps: {type: 'text', placeholder: 'gender'},
      errorMessage:'gender is not allowed to be empty',  
    },
    {
      label: 'preferred language',
      name: 'preferredLanguage',
      value: profileData.preferredLanguage,
      inputProps: {type: 'text', placeholder: 'preference language'},
    },
    {
      label: 'preferred currency',
      name: 'preferredCurrency',
      value: profileData.preferredCurrency,
      inputProps: {type: 'text', placeholder: 'preference currency'},
    }
  ]
  const onSubmit = (e) => {
    const image = e.target.files[0];
    setUrl(image)
  };
  const handleInput = (e) => {
    e.preventDefault();
    const {name, value} = e.target
    setprofileData({ ...profileData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
    formData.append('firstname', String(profileData.firstname));
    formData.append('lastname', String(profileData.lastname));
    formData.append('gender', String(profileData.gender));
    formData.append('birthDate', String(profileData.birthDate));
    formData.append('preferredLanguage', String(profileData.preferredLanguage));
    formData.append('preferredCurrency', String(profileData.preferredCurrency));
   url && formData.append('avatar', url);
   const res = await dispatch(updateProfile(formData));
   showSuccessMessage(res.payload.message);
    } catch (error) {
      showErrorMessage(error.message);
    }
    
  };
  const image = url?  URL.createObjectURL(url) : data.avatar
  const ref =useRef(null);  
  return (
      <div>
        <div className='profile-avatar' data-testid='account-details'>
        <img src={image} alt='avatar' />
        <div className='file'>
        <label htmlFor='file-upload' className='custom-file-upload'>Change avatar</label>
        <input type='file' id='file-upload' name='avatar' ref={ref} onChange={onSubmit}
             />
        </div>
        </div>
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

export default AccountDetails;
