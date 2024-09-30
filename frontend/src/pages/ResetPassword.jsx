import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { isLoading, isSuccess } = useSelector((state) => state.auth);

    const initialValues = {
        email: '',
        otp: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        otp: Yup.string().required('OTP is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const onSubmit = (values) => {
        dispatch(resetPassword(values));
    };

    if (isSuccess) {
        navigator('/')
    }
    return (
        <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh', position: 'relative' }}>
            <button
                className="btn btn-secondary"
                style={{ position: 'fixed', top: '20px', left: '20px' }}
                onClick={() => navigator(-1)}
            >
                Back
            </button>

            {/* Home Button (top-right corner) */}
            <button
                className="btn btn-secondary"
                style={{ position: 'fixed', top: '20px', right: '20px' }}
                onClick={() => navigator('/')}
            >
                Home
            </button>
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Reset Password</h3>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="otp">OTP</label>
                                <Field type="text" name="otp" className="form-control" />
                                <ErrorMessage name="otp" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <Field type="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <button type="submit" className="btn" disabled={isLoading || isSubmitting}>
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ResetPassword;
