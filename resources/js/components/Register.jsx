import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function Register() {
    const initialValues = {
        email: '',
        password: '',
        full_name:'',
        phone:'',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        full_name: Yup.string().required('Full Name is required'),
        phone: Yup.string().matches(/^[0-9]{10,}$/, 'Invalid phone number').required('Phone number is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password')
    });

    const goToLogin = () => {
        window.location.href = '/login';
    };

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        Swal.fire({
            title: 'Logging in...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(async () => {
            try {
                const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
                const link = document.querySelector('#link_main').val;
                const response = await axios.post(`/api/register`, {
                    email: values.email,
                    password: values.password,
                    full_name: values.full_name,
                    phone: values.phone,
                }, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    }
                });

                console.log('Login successful:', response.data);
                setSubmitting(false);

                Swal.close();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Register successful!',
                    showConfirmButton: false,
                    timer: 1000 
                }).then(()=>{
                    window.location.href = '/login';
                });
                console.log('Submitting...', values);
                setSubmitting(false);
            } catch (error) {
                Swal.close();
                
                Swal.fire({
                    icon: 'Gagal',
                    title: 'Register Gagal!!',
                    icon:'error',
                    showConfirmButton: false,
                    timer: 1000 
                });
            }
        }, 2000); 
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card w-50">
                <div className="card-header text-center">Halaman Register</div>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="full_name">Full Name</label>
                                    <Field
                                        type="text"
                                        name="full_name"
                                        className="form-control"
                                        placeholder="Enter full_name"
                                    />
                                    <ErrorMessage name="full_name" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <Field
                                        type="number"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter phone"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Retype Password</label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Retype password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
                                        {isSubmitting ? 'Register....' : 'Register'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            <p>Sudah punya akun ? <button onClick={goToLogin} className='btn btn-sm btn-primary'>klik disini</button></p>
            </div>
        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(
        <React.StrictMode>
            <Register />
        </React.StrictMode>,
        document.getElementById('register')
    );
}
