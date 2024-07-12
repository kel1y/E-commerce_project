/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordInput = ({
  type,
  name,
  placeholder,
  register,
  onClick,
  error
}) => {
  return (
   <div>
     <input type={type} className="pswdInput" name={name} placeholder={placeholder} {...register}/>
     <span className="passwordIcon" onClick={onClick}>
                 <FontAwesomeIcon
                    icon={type === "text"? faEye:faEyeSlash}
                    style={{ color: 'black'}}
                    />
             </span>
     { error  && <p className="error">{error.message}</p>}  
   </div>
  )
};

export default PasswordInput;
