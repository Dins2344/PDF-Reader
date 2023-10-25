// import the navigate hooks
import { useNavigate } from "react-router-dom";

// import formik components and yup for form validation
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// import types for userData
import { userRegisterData } from "../../types/user";

// import API for register user
import { userRegister } from "../../api/login";

// interface for both component
interface ChildProps {
  handleMode: (mode: string) => void;
}

const SignUpComponent: React.FC<ChildProps> = (props: ChildProps) => {
  return (
    <div className="hidden lg:flex loginPageSmall w-full h-full flex-col justify-center items-center">
      <h3 className="text-4xl font-bold text-white mb-4 animate-pulse">
        New Here?
      </h3>
      <p className="text-2xl font-medium text-white text-center">
        Sign up and discover more feature
      </p>
      <button
        onClick={() => {
          props.handleMode("signUp");
        }}
        className="w-28 h-10 bg-[#27b397] rounded-full mt-6 hover:bg-[#38ba8c] transition duration-300 ease-in-out text-2xl font-semibold text-white"
      >
        Sign Up
      </button>
    </div>
  );
};

export const SignUpForm: React.FC<ChildProps> = (props: ChildProps) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    // validation schema for register form
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: userRegisterData) => {
    const res = await userRegister(values); // calling the register API

    if (res.ok) {
      localStorage.setItem("token", res.response);// setting the token in the local storage
      navigate("/");
    }
  };

  return (
    <>
      <div className=" flex flex-col w-full h-full items-center justify-center px-10">
        <h4 className=" text-3xl font-semibold lg:text-5xl lg:font-bold mb-10 lg:mb-24 text-center">
          Create Your Account
        </h4>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="w-full flex flex-col justify-center items-center">
              <div className="rounded-lg bg-green-100 w-full lg:w-[60%] h-10 mb-6">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="rounded-lg bg-green-100 w-[100%] h-10 px-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="rounded-lg bg-green-100 w-full lg:w-[60%] h-10  mb-6">
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="rounded-lg bg-green-100 w-[100%] h-10 px-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="rounded-lg bg-green-100 w-full lg:w-[60%] h-10  mb-6">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="rounded-lg bg-green-100 w-[100%] h-10 px-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="rounded-lg bg-green-100 w-full lg:w-[60%] h-10  mb-6">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="rounded-lg bg-green-100 w-[100%] h-10 px-2"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className=" w-[70%] lg:w-[30%] h-10 lg:h-14 bg-[#27b397] rounded-full mt-6 hover:bg-[#38ba8c] transition duration-300 ease-in-out text-xl lg:text-2xl font-semibold text-white"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <p className="lg:hidden mt-3">
          Already have an account..?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => props.handleMode("login")}
          >
            click here
          </span>
        </p>
      </div>
    </>
  );
};

export default SignUpComponent;
