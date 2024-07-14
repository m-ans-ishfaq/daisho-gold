"use client"
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa6';
import { signIn, useSession } from 'next-auth/react';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className="max-w-lg w-full mx-auto p-4 md:p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
            const result = await signIn("credentials", {
              email: values.email,
              password: values.password
            });
            console.log(result);
            setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Field
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="flex justify-end items-center">
              <a href="/my-account/lost-password/" className="text-black text-sm">
                Lost your password?
              </a>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600"
                disabled={isSubmitting}
              >
                Log in
              </button>
            </div>

            <div className="form-group">
              <button
                type="button"
                className="w-full bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 flex gap-2 items-center justify-center"
                
              >
                <FaGoogle />
                Sign in with Google Instead
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};