/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable import/prefer-default-export */
import * as Yup from "yup";

export const passwordSchema = Yup.object().shape({
    oldPassword: Yup
    .string()
    .required(),
    newPassword: Yup
    .string()
    .required()
    .min(8, "Password length should be at least 8 characters").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"password must have at least one letter and one number"),
    confirmPassword: Yup
    .string()
    .required()
    .oneOf([Yup.ref("newPassword")], "Password do not match"),
});
