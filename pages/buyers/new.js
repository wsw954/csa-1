import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { signUp } from "/utils/auth";

// Define the Yup validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
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
  const router = useRouter();
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
        // Save user to MongoDB
        const response = await axios.post("/api/buyers", values);
        if (response.status !== 201) {
          throw new Error(`MongoDB: ${response.data.error}`);
        }
        console.log("Buyer created successfully:", response.data);

        // Save user to Firebase
        const firebaseUser = await signUp(values.email, values.password);
        console.log("User created in Firebase:", firebaseUser);

        // Redirect to dashboard
        router.push("/buyers/dashboard");
      } catch (error) {
        if (error.message.includes("MongoDB")) {
          console.error("Error creating buyer in MongoDB:", error.message);
        } else {
          console.error("Error creating user in Firebase:", error.message);
        }
      }
    },
  });

  const handleUsernameBlur = async (e) => {
    formik.handleBlur(e);
    if (formik.values.username) {
      try {
        await axios.get(
          `/api/users?action=check-username&username=${formik.values.username}`
        );
      } catch (error) {
        if (error.response && error.response.status === 409) {
          formik.setFieldError("username", "Username already exists");
        } else {
          console.error("Error checking username:", error);
        }
      }
    }
  };

  const handleEmailBlur = async (e) => {
    formik.handleBlur(e);
    if (formik.values.email) {
      try {
        await axios.get(
          `/api/users?action=check-email&email=${formik.values.email}`
        );
      } catch (error) {
        if (error.response && error.response.status === 409) {
          formik.setFieldError("email", "Email already exists");
        } else {
          console.error("Error checking email:", error);
        }
      }
    }
  };

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
            onBlur={handleUsernameBlur}
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
            onBlur={handleEmailBlur}
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
