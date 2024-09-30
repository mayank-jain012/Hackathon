import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';


const schema = Yup.object().shape({
  name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
  email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  role: Yup.string()
      .required("Role is required")
      .oneOf(['Teacher', 'Student', 'Parent'], "Role must be Teacher, Student, or Parent"),
  teacherId: Yup.string()
      .optional()
      .matches(/^\d{3}$/, "Teacher ID must be exactly 3 digits"),
  studentId: Yup.string()
      .optional()
      .matches(/^\d{3}$/, "Student ID must be exactly 3 digits"),
  children: Yup.array()
      .of(Yup.string().length(3, "Each child ID must be exactly 3 characters long"))
      .optional()
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      mobileno: '',
      role: '',
      children: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const { role, children } = values;

      // Generate role-specific IDs
      const id = role === 'Teacher' ? `T-${Date.now()}` : role === 'Student' ? `S-${Date.now()}` : null;

      const dataToSubmit = { 
        ...values, 
        role, 
        ...(role === 'Teacher' && { teacherId: id }), 
        ...(role === 'Student' && { studentId: id }),
        ...(role === 'Parent' && { children }) 
      };

      dispatch(signup(dataToSubmit));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [user, isError, isSuccess, navigate]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Signup</h3>
        <p className="text-center">Create a new account.</p>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Name"
            id="name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name || ''}
          />
          <div className="error mt-2">{formik.touched.name && formik.errors.name}</div>

          <CustomInput
            type="email"
            label="Email"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email || ''}
          />
          <div className="error mt-2">{formik.touched.email && formik.errors.email}</div>

          <CustomInput
            type="password"
            label="Password"
            id="password"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password || ''}
          />
          <div className="error mt-2">{formik.touched.password && formik.errors.password}</div>

          <CustomInput
            type="text"
            label="Mobile No"
            id="mobileno"
            name="mobileno"
            onChng={formik.handleChange("mobileno")}
            onBlr={formik.handleBlur("mobileno")}
            val={formik.values.mobileno || ''}
          />
          <div className="error mt-2">{formik.touched.mobileno && formik.errors.mobileno}</div>

          <label className="mt-3">Role</label>
          <select
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
          >
            <option value="">Select a role</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
          </select>
          <div className="error mt-2">{formik.touched.role && formik.errors.role}</div>

          {/* Conditionally render children input for Parent role */}
          {formik.values.role === 'Parent' && (
            <div className="mt-3">
              <label htmlFor="children">Child IDs (comma-separated)</label>
              <input
                id="children"
                name="children"
                type="text"
                value={formik.values.children.join(', ')}
                onChange={(e) =>
                  formik.setFieldValue(
                    'children',
                    e.target.value.split(',').map((childId) => childId.trim())
                  )
                }
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.children && formik.errors.children ? 'is-invalid' : ''}`}
              />
              <div className="error mt-2">{formik.touched.children && formik.errors.children}</div>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mt-3" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
