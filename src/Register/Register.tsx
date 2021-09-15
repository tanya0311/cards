import s from './Register.module.css'
import {Formik} from 'formik';
import {CreateUserThunk} from '../state/register-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {TextField} from '@material-ui/core';
import {AppRootStateType} from '../state/store';
import {Redirect, useHistory} from 'react-router-dom';
import React from 'react';
import {ErrorSnackbar} from '../Snackbar/ErrorSnackBar';


export const Register: React.FC = () => {
    let dispatch = useDispatch()
    const history = useHistory()


    let isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)

    if(isRegister){
        return <Redirect to="/login" />
    }

    return (
        <div className={s.register}>
            <div className={s.registerBlock}>
                <h1>It-incubator</h1>
                <h2>Sign Up</h2>
                <div className={s.form}>
                    <Formik
                        initialValues={{email: '', password: '', confirmPassword: ''}}
                        validate={values => {
                            const errors:any = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 7) {
                                errors.password = 'Password too short';
                            }
                            if (!values.confirmPassword) {
                                errors.confirmPassword = 'Required';
                            } else if (values.password != values.confirmPassword) {
                                errors.password = `Password don't match`;
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            dispatch(CreateUserThunk(values.email, values.password))
                            setSubmitting(false);
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (<div className={s.formInput}>
                                <form onSubmit={handleSubmit}>
                                    <TextField type="email"
                                               name="email"
                                               required id="standard-required"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.email}
                                               placeholder={'Email'}
                                               helperText={
                                                   errors.email && touched.email
                                                       ? errors.email
                                                       : 'Enter email-id'
                                               }/>
                                    <TextField id="password"
                                               type="password"
                                               name="password"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.password}
                                               helperText={
                                                   errors.password && touched.password
                                                       ? errors.password
                                                       : 'Enter password'
                                               }
                                               placeholder={'Password'}/>
                                    <TextField id="confirmPassword"
                                               type="password"
                                               name="confirmPassword"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.confirmPassword}
                                               placeholder={'Confirm Password'}
                                               helperText={
                                                   errors.confirmPassword && touched.confirmPassword
                                                       ? errors.confirmPassword
                                                       : 'Enter the password again'
                                               }/>
                                    <div className={s.buttonBlock}>
                                        <button className={s.cancelButton} onClick={history.goBack}>
                                            Cancel
                                        </button>
                                        <button className={s.registerButton} type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
            <ErrorSnackbar/>
        </div>
    )
};