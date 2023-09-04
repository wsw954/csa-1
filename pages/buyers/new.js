import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

// Define the Yup validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .test("is-username-unique", "Username already exists", async (value) => {
      const response = await axios.get(
        `/api/users?action=check-username&username=${value}`
      );
      return !response.data.exists;
    }),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  streetAddress1: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  streetAddress2: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .nullable(),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  state: Yup.string()
    .length(2, "State should be 2 characters long.")
    .required("Required"),
  zip: Yup.string()
    .matches(/^\d{5}$/, "ZIP code should be exactly 5 digits.")
    .required("Required"),
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .required("Required"),
  creditScore: Yup.number()
    .nullable()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string" && originalValue.trim() === "") {
        return null;
      }
      return value;
    })
    .min(300, "Credit score should be at least 300.")
    .max(850, "Credit score should be at most 850.")
    .notRequired()
    .typeError("Offers may not be accurate"),
});

export default function BuyersNew() {
  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      password: "",
      creditScore: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/buyers", values);
        if (response.status === 201) {
          console.log("Buyer created successfully:", response.data);
          const router = useRouter(); // <-- Use the useRouter hook
          router.push("/buyers/dashboard"); // <-- Redirect to dashboard
        } else {
          console.error("Error creating buyer:", response.data.error);
          // Handle the error, maybe show an error message to the user
        }
      } catch (error) {
        console.error("Error creating buyer:", error);
        // Handle the error, maybe show an error message to the user
      }
    },
  });

  return (
    <div>
      <h1>Create New Buyer</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div>
          <label>Street Address Line 1</label>
          <input
            type="text"
            name="streetAddress1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.streetAddress1}
          />
          {formik.errors.streetAddress1 && formik.touched.streetAddress1 ? (
            <div>{formik.errors.streetAddress1}</div>
          ) : null}
        </div>
        <div>
          <label>Street Address Line 2 (Optional)</label>
          <input
            type="text"
            name="streetAddress2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.streetAddress2 || ""}
          />
          {formik.errors.streetAddress2 && formik.touched.streetAddress2 ? (
            <div>{formik.errors.streetAddress2}</div>
          ) : null}
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.errors.city && formik.touched.city ? (
            <div>{formik.errors.city}</div>
          ) : null}
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
          />
          {formik.errors.state && formik.touched.state ? (
            <div>{formik.errors.state}</div>
          ) : null}
        </div>
        <div>
          <label>ZIP Code</label>
          <input
            type="text"
            name="zip"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zip}
          />
          {formik.errors.zip && formik.touched.zip ? (
            <div>{formik.errors.zip}</div>
          ) : null}
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
          <label>Credit Score (Optional)</label>
          <input
            type="number"
            name="creditScore"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.creditScore || ""}
          />
          {formik.errors.creditScore && formik.touched.creditScore ? (
            <div>{formik.errors.creditScore}</div>
          ) : null}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
