import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function Login() {
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const goToRegister = () => {
        window.location.href = '/register';
    };

    const onSubmit = (values, { setSubmitting }) => {
        Swal.fire({
            title: 'Logging in...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout( async () => {
            try {
                const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
                const link = document.querySelector('#link_main').val;
                const response = await axios.post(`/api/login`, {
                    email: values.email,
                    password: values.password
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
                    title: 'Login successful!',
                    showConfirmButton: false,
                    timer: 1000 
                }).then(()=>{
                    // navigate('/dashboard');
                    window.location.href = '/dashboard';
                });
                console.log('Submitting...', values);
                setSubmitting(false);
            } catch (error) {
                Swal.close();
                
                Swal.fire({
                    icon: 'Gagal',
                    title: 'Login Gagal!!',
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
                <div className="card-header text-center">Halaman Login</div>
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
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                    <p>Belum punya akun ? <button onClick={goToRegister} className='btn btn-sm btn-primary'>klik disini</button></p>
            </div>
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(
        <React.StrictMode>
            <Login />
        </React.StrictMode>,
        document.getElementById('login')
    );
}
