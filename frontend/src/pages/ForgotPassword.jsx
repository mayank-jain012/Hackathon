import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const onSubmit = (values) => {
    dispatch(forgotPassword(values.email));
  };
  if (isSuccess) {
    navigate('/reset-password');
}
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
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">Enter your email to receive a password reset link.</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <button
                className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                style={{ background: '#ffd333' }}
                type="submit"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
