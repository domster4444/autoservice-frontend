import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { storeDataByValue } from "services/LocalStorageService";
import styled from "styled-components";
import FormErrorTag from "components/FormErrorTag/FormErrorTag";
import toastMsg from "library/utilities/toastMsg";

//*services
import { UserApiService } from "services/auth/AuthService";

//?  states import
import { useDispatch } from "react-redux";
import { setLoggedUser } from "redux/features/loggedUser/loggedUserSlice";

// ? utilities
import LoginFormAnimation from "library/utilities/animations/LoginFormAnimation";
import LoginHeadingAnimation from "library/utilities/animations/LoginHeadingsAnimations";

// * components
import Logo from "components/Logo";
import Heading from "components/polymorphicComponents/Heading";
import SubParagraph from "components/SubParagraph";
import { TertiaryBtn } from "components/Buttons/Buttons";

const LoginBody = styled.main`
  min-height: 100vh;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1186%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1187)'%3e%3c/rect%3e%3cpath d='M0 0L545.28 0L0 159.63z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 159.63L545.28 0L566.77 0L0 271.85z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 271.85L566.77 0L1036.82 0L0 375.08000000000004z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 375.08000000000004L1036.82 0L1128.9299999999998 0L0 398.20000000000005z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L1425.87 560L1440 396.49z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 396.49L1425.87 560L984.6199999999999 560L1440 380.33z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 380.33000000000004L984.62 560L667.28 560L1440 259.45000000000005z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 259.45000000000005L667.28 560L602.14 560L1440 227.82000000000005z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1186'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1187'%3e%3cstop stop-color='rgba(12%2c 58%2c 96%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(15%2c 82%2c 136%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: cover;
`;

const LoginForm = styled.form`
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const FormInput = styled.input`
  outline: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (localStorage.getItem("accessToken")) {
    window.location.href = "/dashboard-monthly";
  }

  const onSubmit = async (values, actions) => {
    UserApiService.getAllUsers(values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastMsg("Login successful", true);
          dispatch(setLoggedUser(res.data.user));
          res.data.accessToken && storeDataByValue("accessToken", res.data.accessToken);
          navigate("/dashboard-monthly");
        }
      })
      .catch((err) => {
        console.log(err);
        toastMsg(err.response.data.message, false);
      });
    actions.resetForm();
  };

  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <LoginBody>
      <LoginHeadingAnimation>
        <div className='d-flex justify-content-center pt-5'>
          <Logo size='50px' alt='deerwalk logo' className='mt-5 mb-4' />
        </div>
      </LoginHeadingAnimation>
      <Heading as='h1' className='text-white text-center mt-4'>
        Maintenance Simplified
      </Heading>
      <SubParagraph className='text-center'>One stop solution to all your car needs.</SubParagraph>
      <LoginFormAnimation>
        <LoginForm onSubmit={handleSubmit} className='mt-4'>
          <header>
            <Heading as='h5' className='text-white text-center'>
              Login
            </Heading>
          </header>
          <FormInput name='phoneNumber' placeholder='Enter  phone number' type='text' className='roboto_regular mt-3 ' value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
          {errors.phoneNumber && <FormErrorTag> {errors.phoneNumber}</FormErrorTag>}
          <FormInput name='password' placeholder='Enter  password' type='password' className='roboto_regular mt-3 ' value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {errors.phoneNumber && <FormErrorTag> {errors.password}</FormErrorTag>}
          <div className='d-flex justify-content-end mt-3'>
            <Link to='/forgotpassword'>
              <SubParagraph className='text-center'>Forgot Password?</SubParagraph>
            </Link>
          </div>
          <TertiaryBtn className='text-white mt-3' onClick={onSubmit}>
            Login
          </TertiaryBtn>
        </LoginForm>
      </LoginFormAnimation>
    </LoginBody>
  );
};

export default Login;
