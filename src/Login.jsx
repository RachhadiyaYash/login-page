import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least one digit")
    .required("Required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);
        resetForm();
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto bg-white">
        <div className="flex justify-center items-center w-full md:w-1/2 p-4">
          <img
            src="/login.svg"
            alt="Login Illustration"
            className="w-full md:w-auto aspect-square"
          />
        </div>
        <div className="flex flex-col justify-center h-auto lg:pl-12 md:p-4 w-full md:w-1/2">
          <p className="text-left font-extrabold text-3xl md:text-5xl mb-6 md:mb-12">
            Login
          </p>
          <p className="text-left my-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#1FA84F] font-bold hover:underline"
            >
              Register now
            </Link>
            <Link></Link>
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col space-y-4"
          >
            <label className="block">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 font-bold block w-full p-3 md:p-4 border rounded-lg bg-gray-100 focus:outline-none focus:border-transparent"
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </label>
            <label className="block relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 font-bold block w-full p-3 md:p-4 border rounded-lg bg-gray-100 focus:outline-none focus:border-transparent pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                )}
              </button>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </label>
            <p className="text-left my-3">
              Forgot Password?{" "}
              <a href="#" className="font-bold text-[#1FA84F] hover:underline">
                Reset Password
              </a>
            </p>
            <Button text="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}
