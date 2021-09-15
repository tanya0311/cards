import s from './CreateNewPassword.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import {TextField} from "@material-ui/core";
import React from "react";
import {AppRootStateType} from "../state/store";
import {Redirect, useParams} from "react-router-dom";
import {createNewPasswordTC} from "../state/newPassword-reducer";

type FormikErrorType = {
    password?: string;
};

export function CreateNewPassword() {
    const dispatch = useDispatch();
    const {token}:any = useParams()

    const passwordSent = useSelector<AppRootStateType, boolean>((state) => state.newPassword.passwordSent);


    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = "Required";
            } else if (
                !/^[A-Z0-9._%+-]/i.test(values.password)
            ) {
                errors.password = "Not acceptable";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(createNewPasswordTC(values.password, token));
            formik.resetForm();
        }
    })

    if (passwordSent) {
        return <Redirect to={"/login"}/>;

    }

    return (
        <div className={s.newPassword}>
            <div className={s.newPasswordBlock}>
                <h1>It-incubator</h1>
                <h2>Create new password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup className={s.form}>
                        <TextField type="password" placeholder={'Password'}
                                   helperText={"Enter the new password and we we'll send you further instructions"}
                                   {...formik.getFieldProps("password")} />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{color: "red"}}>{formik.errors.password}</div>
                        ) : null}
                        <div className={s.buttonBlock}>
                            <button className={s.createButton}>Create new password</button>
                        </div>
                    </FormGroup>
                </form>
            </div>
        </div>

    )

}