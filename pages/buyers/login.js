// pages/buyers/login.js

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { signIn } from "/utils/auth";
import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css"; // You can create a separate CSS module for login if needed

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const firebaseUser = await signIn(values.email, values.password);
        // Redirect to dashboard
        console.log(firebaseUser);
        router.push("/buyers/dashboard");

        setLoginError(null);
      } catch (error) {
        setLoginError(error.message);
      }
    },
  });

  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          {loginError && <div>{loginError}</div>}

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    </div>
  );
}
