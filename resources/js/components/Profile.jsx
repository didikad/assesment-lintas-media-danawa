import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import LogoutButton from "./Logout";

function Profile() {
    const [initialValues, setInitialValues] = useState({
        email: "",
        full_name: "",
        phone: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        full_name: Yup.string().required("Full Name is required"),
        phone: Yup.string()
            .matches(/^[0-9]{10,}$/, "Invalid phone number")
            .required("Phone number is required"),
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get("/profile/data");
                const profileData = response.data;
                setInitialValues({
                    email: profileData.email,
                    full_name: profileData.full_name,
                    phone: profileData.phone,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const onSubmit = async (values, { setSubmitting }) => {
        Swal.fire({
            title: "Updating...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const csrfToken = document.head.querySelector(
                'meta[name="csrf-token"]'
            ).content;
            const response = await axios.post(`/profile`, values, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            console.log("Update successful:", response.data);
            setSubmitting(false);

            Swal.close();

            Swal.fire({
                icon: "success",
                title: "Update Data Successful!",
                showConfirmButton: false,
                timer: 1000,
            }).then(() => {
                window.location.href = "/profile";
            });
        } catch (error) {
            console.error("Error during update:", error);
            setSubmitting(false);

            Swal.close();

            Swal.fire({
                icon: "error",
                title: "Update Data Failed!",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card w-50">
                <LogoutButton />
                <div className="card-header text-center">Edit Profile</div>
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
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="full_name">Full Name</label>
                                    <Field
                                        type="text"
                                        name="full_name"
                                        className="form-control"
                                        placeholder="Enter full name"
                                    />
                                    <ErrorMessage
                                        name="full_name"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter phone"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Updating..."
                                            : "Update"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Profile;

if (document.getElementById("profile")) {
    ReactDOM.render(
        <React.StrictMode>
            <Profile />
        </React.StrictMode>,
        document.getElementById("profile")
    );
}
