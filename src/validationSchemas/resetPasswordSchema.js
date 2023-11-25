import * as Yup from 'yup';
const Password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;

export const ResetPasswordSchema = Yup.object({
  Password: Yup.string()
    .matches(Password, 'Password limit eight characters')
    .required('Please enter Password'),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    .required('Please enter Confirm Password'),
});
