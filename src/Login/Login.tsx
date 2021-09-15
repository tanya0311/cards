import { FormControlLabel, TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { ErrorSnackbar } from "../Snackbar/ErrorSnackBar";
import { AppRootStateType } from "../state/store";
import s from "./Login.module.css";
import {loginTC} from '../state/login-reducer';

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export function Login() {
  const isLoginIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 7) {
        errors.password = "Password must be more than 7 symbols";
      }
      return errors;
    },

    onSubmit: (values) => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoginIn) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={s.login}>
      <div className={s.loginBlock}>
        <h1>It-incubator</h1>
        <h2>Sign In</h2>
        <div className={s.form}>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                type="email"
                placeholder={"Email"}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}

              <TextField
                type="password"
                placeholder={"Password"}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <div className={s.rememberMe}>
                <FormControlLabel
                  label={"Remember me"}
                  control={<Checkbox {...formik.getFieldProps("rememberMe")} />}
                />
              </div>
            </FormGroup>

            <div className={s.forgot}>
              <NavLink to={"/recovery"}>Forgot password?</NavLink>
            </div>
            <div className={s.loginButton}>
              <button> Login </button>
            </div>
          </form>
        </div>
        <div className={s.singIn}>
          <p>Don't have an account?</p>
          <NavLink to={"/register"}>Sign Up</NavLink>
        </div>
      </div>
      <ErrorSnackbar />
    </div>
  );
}
