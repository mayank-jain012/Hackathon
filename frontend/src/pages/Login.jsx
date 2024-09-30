import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

// Yup schema for validation
let schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  // Getting authentication state from Redux
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [user, isError, isSuccess, isLoading, navigate]);

  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh', position: 'relative' }}>
      {/* Back Button (top-left corner) */}
      <button
        className="btn btn-secondary"
        style={{ position: 'fixed', top: '20px', left: '20px' }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Home Button (top-right corner) */}
      <button
        className="btn btn-secondary"
        style={{ position: 'fixed', top: '20px', right: '20px' }}
        onClick={() => navigate('/')}
      >
        Home
      </button>

      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange('email')}
            onBlr={formik.handleBlur('email')}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput
            type="password"
            label="Password"
            id="password"
            name="password"
            onChng={formik.handleChange('password')}
            onBlr={formik.handleBlur('password')}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: '#ffd333' }}
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>

        {/* Signup Link */}
        <div className="text-center mt-3">
          <p>Dont have an account?{' '}
            <Link to="/signup" className="text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import {useEffect} from 'react'
// import CustomInput from '../components/CustomInput'
// import {  useNavigate } from 'react-router-dom'
// import * as yup from "yup";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import {login} from '../features/auth/authSlice'
// let schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Email should be valid")
//     .required("Email is Required"),
//   password: yup.string().required("Password is Required"),
// });
// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       dispatch(login(values));
//     },
//   });
//   const authState = useSelector((state) => state);

//   const { user, isError, isSuccess, isLoading, message } = authState.auth;

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/");
//     } else {
//       navigate("");
//     }
//   }, [user, isError, isSuccess, isLoading,navigate]);
//   return (
//     <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
//         <h3 className="text-center title">Login</h3>
//         <p className="text-center">Login to your account to continue.</p>
//         {/* <div className="error text-center">
//           {message.message == "Rejected" ? "You are not an Admin" : ""}
//         </div> */}
//         <form action=""  onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             label="Email Address"
//             id="email"
//             name="email"
//             onChng={formik.handleChange("email")}
//             onBlr={formik.handleBlur("email")}
//             val={formik.values.email}
//           />
//           <div className="error mt-2">
//             {formik.touched.email && formik.errors.email}
//           </div>
//           <CustomInput
//             type="password"
//             label="Password"
//             id="pass"
//             name="password"
//             onChng={formik.handleChange("password")}
//             onBlr={formik.handleBlur("password")}
//             val={formik.values.password}
//           />
//           <div className="error mt-2">
//             {formik.touched.password && formik.errors.password}
//           </div>

//           <button
//             className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
//             style={{ background: "#ffd333" }}
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login