/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { updatePasswordThunk } from "../redux/Action/updatepswd";
import spinner from '../assets/spinner.svg';
import Input from "../components/passwordInput";
import '../styles/updatePswd.css';
import { passwordSchema } from "../validation/updatePswdValid";

const UpdatePassword = () =>{
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(passwordSchema)
    })
    const dispatch = useDispatch();
    
    const [showOldPassword,setShowOldPassword] = useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
    const [showConfPassword,setShowConfPassword] = useState(false);
    
    const { loading } = useSelector((state)=> state.passwordUpdate);
    const submit = (data) =>{   
        dispatch(updatePasswordThunk(data));
    };
    return(
        <div className="hello">
          <form onSubmit={handleSubmit(submit)} className="updatePswd-form">
            <div className="inputPswd">
              <p className="label">old password</p>
              <div className="inputfield">
                <Input
                     type={showOldPassword ? 'text':'password'}
                     name="oldPassword"
                     placeholder="Old Password"
                     register={register('oldPassword')}
                     error={errors.oldPassword}
                     onClick={()=>setShowOldPassword(!showOldPassword)}
                   />
      </div>

            </div>
            <div className="inputPswd">
              <p className="label">New password</p>
              <div className="inputfield">
                <Input
                     type={showNewPassword ? 'text':'password'}
                     nam e="newPassword"
                     placeholder="New Password"
                     register={register('newPassword')}
                     error={errors.newPassword}
                     onClick={()=>setShowNewPassword(!showNewPassword)}
                   />
      </div>

            </div>
            <div className="inputPswd">
              <p className="label">Confirm password</p>
              <div className="inputfield">
                <Input
                     type={showConfPassword ? 'text':'password'}
                     name="confirmPassword"
                     placeholder="confirm Password"
                     register={register('confirmPassword')}
                     error={errors.confirmPassword}
                     onClick={()=>setShowConfPassword(!showConfPassword)}
                />
      </div>

            </div>
          
   
   
    
    <div className="inputPswd">
    <button data-testid="pswdUpdate-form" type="submit" disabled={loading}>
              {loading ? (
                <img src={spinner} style={{ height: '25px' }} alt="loader" />
              ) : (
                'Save'
              )}
            </button>
            </div>
          </form>
          <ToastContainer />
        </div>
    )
}

export default UpdatePassword;